import { Layer } from 'effect'
import { HttpApiBuilder } from 'effect/unstable/httpapi'

import { Api } from '@/api/index'
import { HttpHealthLive } from '@/domain/health/http'
import { HttpDemoLive } from '@/domain/demo/http'
import { ResponseHeadersLive } from '@/middleware/response-headers'
import { ApplicationAuthenticationLive } from '@/middleware/application-auth'
import { RequestContextLive } from '@/middleware/context'

export const makeHttpApi = () =>
  HttpApiBuilder.layer(Api, { openapiPath: '/docs' }).pipe(
    Layer.provide([HttpHealthLive, HttpDemoLive]),
    // Middleware
    Layer.provide([
      ResponseHeadersLive,
      RequestContextLive,
      ApplicationAuthenticationLive
    ])
  )
