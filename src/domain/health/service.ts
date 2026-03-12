import { Effect, Layer, ServiceMap } from 'effect'
import { HealthResponse } from './model'
import { version, apiVersions } from '../../../package.json'

const make = Effect.gen(function* () {
  const CheckHealth = Effect.succeed(
    HealthResponse.makeUnsafe({
      live: true,
      ready: true,
      versions: {
        unstable: apiVersions.unstable || undefined,
        current: apiVersions.current || undefined,
        maintenance: apiVersions.maintenance || undefined,
        deprecated: apiVersions.deprecated || undefined
      },
      build: version
    })
  )

  return { checkHealth: CheckHealth } as const
})

export class HealthService extends ServiceMap.Service<HealthService>()('@/Health/Service', { make }) {
  static Default = Layer.effect(HealthService, HealthService.make)
}
