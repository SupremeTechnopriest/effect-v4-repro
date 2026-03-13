import { Layer } from 'effect'
import { BunRuntime } from '@effect/platform-bun'

import { makeHttpApi } from '@/http'
import { makeHttpLayer } from '@/layers/http'
import { makeLogLayer } from '@/layers/log'
import { Api } from './api'

const ApiLive = makeHttpApi()
const HttpLive = makeHttpLayer(Api, ApiLive)
const LogLive = makeLogLayer()

HttpLive.pipe(Layer.provide(LogLive), Layer.launch, BunRuntime.runMain)
