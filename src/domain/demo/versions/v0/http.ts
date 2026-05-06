import { Effect } from "effect";
import { HttpApiBuilder } from "effect/unstable/httpapi";

import { v0 } from "@/http/versions/v0/api";
import { get } from "@/domain/demo/handlers/get";

export const HttpDemoLive = HttpApiBuilder.group(v0, "demo", (handlers) =>
  Effect.sync(function () {
    return handlers.handle("get", get);
  }),
);
