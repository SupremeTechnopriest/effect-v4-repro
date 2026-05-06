import { Layer } from "effect";
import { HttpDemoLive } from "@/domain/demo/versions/v0/http";
import { ResponseHeadersLive } from "@/middleware/response-headers";
import { ApplicationAuthenticationLive } from "@/middleware/application-auth";
import { RequestContextLive } from "@/middleware/context";

export const v0 = HttpDemoLive.pipe(
  // Middleware
  Layer.provide([ResponseHeadersLive, RequestContextLive, ApplicationAuthenticationLive]),
);
