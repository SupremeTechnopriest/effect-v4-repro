import { HttpApiEndpoint, HttpApiGroup, OpenApi } from "effect/unstable/httpapi";
import { DemoResponse } from "../../model";
import { Effect, Schema, Struct } from "effect";
import { HttpServerResponse } from "effect/unstable/http";
import { ApplicationAuthentication } from "@/middleware/application-auth";

export const DemoApi = HttpApiGroup.make("demo")
  .add(
    HttpApiEndpoint.get("get", "/demo", {
      success: DemoResponse,
      payload: {
        id: Schema.String,
      },
    }).annotateMerge(
      OpenApi.annotations({
        title: "Demo",
        description: "Demo endpoint for repro testing.",
      }),
    ),
  )
  .middleware(ApplicationAuthentication)
  .annotate(OpenApi.Title, "Demo")
  .annotate(OpenApi.Description, "Demo endpoints.");

type Endpoints = HttpApiGroup.Endpoints<typeof DemoApi>;

export const handler = <Name extends HttpApiEndpoint.Name<Endpoints>>(
  _name: Name,
  fn: (
    request: Struct.Simplify<HttpApiEndpoint.Request<HttpApiEndpoint.WithName<Endpoints, Name>>>,
  ) => Effect.Effect<
    | HttpApiEndpoint.WithName<Endpoints, Name>["~Success"]["Type"]
    | HttpServerResponse.HttpServerResponse,
    HttpApiEndpoint.WithName<Endpoints, Name>["~Error"]["Type"],
    never
  >,
) => fn;
