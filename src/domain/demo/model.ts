import { Schema } from "effect";

export const DemoResponse = Schema.Struct({
  id: Schema.String,
  appId: Schema.String,
  message: Schema.String,
  timestamp: Schema.String,
});
