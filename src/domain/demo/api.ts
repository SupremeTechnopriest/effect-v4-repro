import { HttpApiEndpoint, HttpApiGroup, OpenApi } from 'effect/unstable/httpapi'
import { DemoResponse } from './model'

export const DemoApi = HttpApiGroup.make('demo')
  .add(
    HttpApiEndpoint.get('get', '/demo', {
      success: DemoResponse
    }).annotateMerge(
      OpenApi.annotations({
        title: 'Demo',
        description: 'Demo endpoint for repro testing.'
      })
    )
  )
  .annotate(OpenApi.Title, 'Demo')
  .annotate(OpenApi.Description, 'Demo endpoints.')
