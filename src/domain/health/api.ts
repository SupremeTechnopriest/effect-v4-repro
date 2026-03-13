import { HttpApiEndpoint, HttpApiGroup, OpenApi } from 'effect/unstable/httpapi'
import { HealthResponse } from './model'

export const HealthApi = HttpApiGroup.make('health')
  .add(
    HttpApiEndpoint.get('check', '/health', {
      success: HealthResponse
    }).annotateMerge(
      OpenApi.annotations({
        title: 'Health Check',
        description: 'API information and health checks.'
      })
    )
  )
  .annotate(OpenApi.Title, 'Health')
  .annotate(OpenApi.Description, 'API health checks.')
