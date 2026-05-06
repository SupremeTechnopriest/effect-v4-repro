import { HttpApi, OpenApi } from "effect/unstable/httpapi";

import { DemoApi } from "@/domain/demo/versions/v0/api";

export const v0 = HttpApi.make("v0")
  .add(DemoApi)
  .annotate(OpenApi.Title, "v0")
  .annotate(OpenApi.Description, "API Version 0")
  .annotate(OpenApi.Version, "v0")
  .prefix("/v0");
