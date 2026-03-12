import { Effect, Schema, Layer, Redacted, ServiceMap } from 'effect'
import {
  HttpApiMiddleware,
  HttpApiSecurity,
  OpenApi
} from 'effect/unstable/httpapi'

export const ApplicationEnvironment = Schema.Literals(['live', 'test'])
export type ApplicationEnvironment = typeof ApplicationEnvironment.Type

export const ActiveEnvironment = ServiceMap.Reference<ApplicationEnvironment>(
  'ActiveEnvironment',
  { defaultValue: () => 'live' as ApplicationEnvironment }
)

export const CurrentApplicationContext = Schema.Struct({
  id: Schema.String,
  name: Schema.String,
  environment: ApplicationEnvironment
})

export type CurrentApplicationContext = typeof CurrentApplicationContext.Type

export class CurrentApplication extends ServiceMap.Service<
  CurrentApplication,
  CurrentApplicationContext
>()(`@/CurrentApplication`) {}

export class UnauthorizedApplication extends Schema.TaggedErrorClass<UnauthorizedApplication>()(
  'UnauthorizedApplication',
  {},
  { httpApiStatus: 401 }
) {}

export class ApplicationAuthentication extends HttpApiMiddleware.Service<
  ApplicationAuthentication,
  {
    provides: CurrentApplication
  }
>()('ApplicationAuthentication', {
  error: UnauthorizedApplication,
  security: {
    appKeyHeader: HttpApiSecurity.apiKey({
      key: 'x-app-key',
      in: 'header'
    }).pipe(
      HttpApiSecurity.annotate(OpenApi.Description, 'Application key header')
    )
  }
}) {}

export const ApplicationAuthenticationLive = Layer.effect(
  ApplicationAuthentication,
  Effect.gen(function* () {
    // NOTE: This gets references to the services in production
    const service = yield* Effect.succeed('service')

    return {
      appKeyHeader: (effect, opts) =>
        Effect.gen(function* () {
          // NOTE: This is a service interaction in the production app
          const plaintext = Redacted.value(opts.credential)

          const appContext = CurrentApplicationContext.makeUnsafe({
            id: 'repro-app',
            name: 'Repro App',
            environment: 'live'
          })

          return yield* effect.pipe(
            Effect.provideService(CurrentApplication, appContext),
            Effect.provideService(ActiveEnvironment, 'live')
          )
        }).pipe(Effect.withSpan('@/Middleware/ApplicationAuth'))
    }
  })
)
