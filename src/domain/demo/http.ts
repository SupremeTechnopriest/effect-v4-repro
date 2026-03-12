import { Effect, Layer } from 'effect'
import { HttpApiBuilder } from 'effect/unstable/httpapi'

import { Api } from '@/api'
import { DemoService } from './service'

export const HttpDemoLive = HttpApiBuilder.group(Api, 'demo', (handlers) =>
  Effect.gen(function* () {
    const demo = yield* DemoService

    return handlers.handle('get', () => demo.getDemo)
  })
).pipe(Layer.provide([DemoService.Default]))
