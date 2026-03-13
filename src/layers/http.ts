import { Effect, Config, Layer } from 'effect'
import { HttpMiddleware, HttpRouter } from 'effect/unstable/http'
import { BunHttpServer } from '@effect/platform-bun'

export const makeHttpLayer = <A, E, R>(ApiLive: Layer.Layer<A, E, R>) =>
  Effect.gen(function* () {
    const PORT = yield* Config.port('PORT').pipe(Config.withDefault(3001))

    return HttpRouter.serve(ApiLive, {
      middleware: HttpMiddleware.cors()
    }).pipe(Layer.provide(BunHttpServer.layer({ port: PORT })))
  }).pipe(Layer.unwrap)
