import { Schema } from 'effect'

const APIVersion = Schema.String.pipe(Schema.check(Schema.isPattern(/v\d+/)))

export const HealthResponse = Schema.Struct({
  live: Schema.Boolean.pipe(
    Schema.annotate({
      title: 'Live',
      description: 'Is the API service live.'
    })
  ),
  ready: Schema.Boolean.pipe(
    Schema.annotate({
      title: 'Ready',
      description: 'Is the API service ready to handle requests.'
    })
  ),
  versions: Schema.Struct({
    unstable: Schema.optional(APIVersion),
    current: Schema.optional(APIVersion),
    maintenance: Schema.optional(APIVersion),
    deprecated: Schema.optional(APIVersion)
  }),
  build: Schema.String.pipe(
    Schema.annotate({
      title: 'Build Version',
      description: 'Version of the release build.'
    }),
    Schema.check(
      Schema.isPattern(
        /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/
      )
    )
  )
})
