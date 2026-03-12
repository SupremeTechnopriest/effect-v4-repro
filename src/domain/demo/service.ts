import { Effect, Layer, ServiceMap } from 'effect'
import { DemoResponse } from './model'

const make = Effect.gen(function* () {
  const GetDemo = Effect.succeed(
    DemoResponse.makeUnsafe({
      message: 'hello from repro',
      timestamp: new Date().toISOString()
    })
  )

  return { getDemo: GetDemo } as const
})

export class DemoService extends ServiceMap.Service<DemoService>()('@/Demo/Service', { make }) {
  static Default = Layer.effect(DemoService, DemoService.make)
}
