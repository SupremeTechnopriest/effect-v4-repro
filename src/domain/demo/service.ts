import { Effect, Layer, Context } from "effect";
import { DemoResponse } from "./model";
import { CurrentApplication } from "@/middleware/application-auth";

const make = Effect.sync(function () {
  const GetDemo = (id: string) =>
    Effect.gen(function* () {
      const app = yield* CurrentApplication;

      Effect.succeed(
        DemoResponse.make({
          id,
          appId: app.id,
          message: "hello from repro",
          timestamp: new Date().toISOString(),
        }),
      );
    });

  return { getDemo: GetDemo } as const;
});

export class DemoService extends Context.Service<DemoService>()("@/Demo/Service", { make }) {
  static Live = Layer.effect(DemoService, DemoService.make);
}
