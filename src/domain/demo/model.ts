import { Schema } from 'effect'

export const DemoResponse = Schema.Struct({
  message: Schema.String,
  timestamp: Schema.String
})
