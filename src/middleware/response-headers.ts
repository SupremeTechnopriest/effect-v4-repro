import { Effect, Layer } from 'effect'
import { HttpApiMiddleware } from 'effect/unstable/httpapi'
import { HttpServerResponse } from 'effect/unstable/http'

export class ResponseHeaders extends HttpApiMiddleware.Service<ResponseHeaders>()(
  '@/Http/Middleware/Header'
) {}

export const ResponseHeadersLive = Layer.succeed(
  ResponseHeaders,
  (httpEffect) =>
    Effect.gen(function* () {
      const response = yield* httpEffect
      const span = yield* Effect.currentSpan.pipe(Effect.orDie)
      return HttpServerResponse.setHeader(
        HttpServerResponse.setHeader(response, 'x-request-id', span.traceId),
        'x-powered-by',
        'Repro'
      )
    })
)
