import { Effect } from 'effect'
import { DemoService } from '@/domain/demo/service'
import { handler } from '@/domain/demo/versions/v0/api'

export const get = handler('get', ({ payload }) =>
  Effect.gen(function* () {
    const demo = yield* DemoService
    return yield* demo.getDemo(payload.id)
  }).pipe(Effect.provide(DemoService.Live))
)
