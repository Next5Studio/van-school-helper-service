import { WebHostRunner } from '@lib/lib-core'
import { ChatServer } from 'apps/chat-service/src/main'
import { ContentServer } from 'apps/content-service/src/main'

WebHostRunner.withHost(ChatServer, ContentServer).run()
