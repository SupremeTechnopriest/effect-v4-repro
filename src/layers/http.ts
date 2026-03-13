import { Effect, Config, Layer } from 'effect'
import { HttpMiddleware, HttpRouter } from 'effect/unstable/http'
import { BunHttpServer } from '@effect/platform-bun'
import { HttpApi, HttpApiBuilder, HttpApiGroup } from 'effect/unstable/httpapi'

export const makeHttpLayer = <
  Id extends string,
  Groups extends HttpApiGroup.Any,
  A,
  E,
  R
>(
  Api: HttpApi.HttpApi<Id, Groups>,
  ApiLive: Layer.Layer<A, E, R>
) =>
  Effect.gen(function* () {
    const PORT = yield* Config.port('PORT').pipe(Config.withDefault(3001))

    return HttpRouter.serve(
      HttpApiBuilder.layer(Api, { openapiPath: '/docs' }).pipe(
        Layer.provide(ApiLive)
      ),
      {
        middleware: HttpMiddleware.cors()
      }
    ).pipe(Layer.provide(BunHttpServer.layer({ port: PORT })))
  }).pipe(Layer.unwrap)
