import { WebApplicationHostBuilder } from '@lib/lib-core'
import { ChatApplication } from 'apps/chat-service/src/app'
import { ContentApplication } from '../../content-service/src/app'

WebApplicationHostBuilder.withApplications(
    ChatApplication,
    ContentApplication
).run()
