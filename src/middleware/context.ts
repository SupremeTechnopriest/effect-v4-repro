import { Effect, Layer, Schema, Context, Option } from "effect";
import { HttpServerRequest } from "effect/unstable/http";
import { HttpApiMiddleware } from "effect/unstable/httpapi";

export const RequestMetadata = Schema.Struct({
  requestId: Schema.optional(Schema.String),
  ipAddress: Schema.String,
  userAgent: Schema.String,
  timezone: Schema.String,
});

export type RequestMetadata = typeof RequestMetadata.Type;

export class RequestContext extends Context.Service<RequestContext, RequestMetadata>()(
  `@/RequestContext`,
) {}

export class RequestContextMiddleware extends HttpApiMiddleware.Service<
  RequestContextMiddleware,
  {
    provides: RequestContext;
  }
>()("RequestContextMiddleware", {
  error: Schema.Struct({
    cause: Schema.String,
  }),
}) {}

export const RequestContextLive = Layer.succeed(RequestContextMiddleware, (effect) =>
  Effect.provideServiceEffect(
    effect,
    RequestContext,
    Effect.gen(function* () {
      const request = yield* HttpServerRequest.HttpServerRequest;
      const span = yield* Effect.currentSpan.pipe(Effect.orDie);
      const headers = request.headers;

      const ipAddress =
        headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
        headers["x-real-ip"] ||
        headers["cf-connecting-ip"] ||
        headers["x-client-ip"] ||
        Option.getOrNull(request.remoteAddress) ||
        "unknown";

      const userAgent = headers["x-forwarded-user-agent"] || headers["user-agent"] || "Unknown";

      return {
        requestId: span.traceId,
        ipAddress,
        userAgent,
        timezone: "UTC",
      };
    }),
  ),
);
