import { HttpApi, OpenApi } from 'effect/unstable/httpapi'

import { v0 } from '@/api/versions/v0'
import { HealthApi } from '@/domain/health/api'
import { ApplicationAuthentication } from '@/middleware/application-auth'
import { RequestContextMiddleware } from '@/middleware/context'
import { ResponseHeaders } from '@/middleware/response-headers'

export const Api = HttpApi.make('Repro')
  .addHttpApi(v0)
  .add(HealthApi)
  .middleware(ResponseHeaders)
  .middleware(ApplicationAuthentication)
  .middleware(RequestContextMiddleware)
  .annotate(OpenApi.Title, 'Repro API')
  .annotate(
    OpenApi.Description,
    'Minimal reproduction of the auth API wiring pattern.'
  )
  .annotate(OpenApi.Servers, [
    {
      url: 'http://localhost:3001',
      description: 'Local'
    }
  ])
