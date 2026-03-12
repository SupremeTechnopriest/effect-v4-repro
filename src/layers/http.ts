import { Effect, Config, Layer } from 'effect'
import { HttpApi, HttpApiBuilder } from 'effect/unstable/httpapi'
import { HttpMiddleware, HttpRouter, HttpServer } from 'effect/unstable/http'
import { BunHttpServer } from '@effect/platform-bun'

export const makeHttpLayer = <
  A extends HttpApi.HttpApi<string, any>,
  T extends Layer.Layer<any, any, never>
>(
  Api: A,
  ApiLive: T
) =>
  Effect.gen(function* () {
    const PORT = yield* Config.port('PORT').pipe(Config.withDefault(3001))

    return HttpRouter.serve(
      HttpApiBuilder.layer(Api, { openapiPath: '/docs' }).pipe(
        Layer.provide(ApiLive)
      ),
      { middleware: HttpMiddleware.cors() }
    ).pipe(
      HttpServer.withLogAddress,
      Layer.provide(BunHttpServer.layer({ port: PORT }))
    )
  }).pipe(Layer.unwrap)
