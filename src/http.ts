import { Layer } from 'effect'
import { HttpHealthLive } from '@/domain/health/http'
import { HttpDemoLive } from '@/domain/demo/http'
import { ResponseHeadersLive } from '@/middleware/response-headers'
import { ApplicationAuthenticationLive } from '@/middleware/application-auth'
import { RequestContextLive } from '@/middleware/context'

export const makeHttpApi = () =>
  Layer.mergeAll(HttpHealthLive, HttpDemoLive).pipe(
    // Middleware
    Layer.provide([
      ResponseHeadersLive,
      RequestContextLive,
      ApplicationAuthenticationLive
    ])
  )
