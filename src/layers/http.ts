import { BunHttpServer } from "@effect/platform-bun";
import { Config, Effect, Layer } from "effect";
import { HttpMiddleware, HttpRouter } from "effect/unstable/http";

export const makeHttpLayer = <A, E, R>(ApiLive: Layer.Layer<A, E, R>) =>
  Effect.gen(function* () {
    const PORT = yield* Config.port("PORT").pipe(Config.withDefault(3001));

    const Routes = Layer.mergeAll(ApiLive);

    return HttpRouter.serve(Routes, {
      middleware: HttpMiddleware.cors(),
    }).pipe(
      Layer.provide(BunHttpServer.layer({ port: PORT })),
      Layer.provide(
        HttpMiddleware.layerTracerDisabledForUrls([
          "/",
          "/health",
          "/openapi.json",
          "/v0/openapi.json",
          "/login",
          "/logout",
        ]),
      ),
    );
  }).pipe(Layer.unwrap);
