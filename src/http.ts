import { Layer } from 'effect'
import { HttpApiBuilder } from 'effect/unstable/httpapi'

import { Api } from '@/api'
import { HttpHealthLive } from '@/domain/health/http'
import { HttpDemoLive } from '@/domain/demo/http'
import { ResponseHeadersLive } from '@/middleware/response-headers'
import { ApplicationAuthenticationLive } from '@/middleware/application-auth'
import { RequestContextLive } from '@/middleware/context'

export const makeHttpApi = () =>
  Layer.provide(HttpApiBuilder.layer(Api, { openapiPath: '/docs' }), [
    HttpHealthLive,
    HttpDemoLive,

    // Middleware
    ResponseHeadersLive,
    RequestContextLive,
    ApplicationAuthenticationLive
  ])
