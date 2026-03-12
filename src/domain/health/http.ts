import { Effect, Layer } from 'effect'
import { HttpApiBuilder } from 'effect/unstable/httpapi'

import { Api } from '@/api'
import { HealthService } from './service'

export const HttpHealthLive = HttpApiBuilder.group(Api, 'health', (handlers) =>
  Effect.gen(function* () {
    const health = yield* HealthService

    return handlers.handle('check', () => health.checkHealth)
  })
).pipe(Layer.provide([HealthService.Default]))
