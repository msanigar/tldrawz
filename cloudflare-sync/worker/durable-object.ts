// Cloudflare-specific type declarations
declare class WebSocketPair {
  constructor()
  0: WebSocket
  1: any
}

declare interface ResponseInit {
  webSocket?: WebSocket
}

export class TldrawDurableObject {
  private state: any
  private env: any
  private sessions: Map<string, any> = new Map()
  private roomData: any = {
    clock: 0,
    documents: [],
    tombstones: {}
  }

  constructor(state: any, env: any) {
    this.state = state
    this.env = env
  }

  async fetch(request: Request) {
    const url = new URL(request.url)
    
    if (request.headers.get('Upgrade') === 'websocket') {
      const pair = new WebSocketPair()
      const [client, server] = Object.values(pair) as [WebSocket, any]
      
      const sessionId = url.searchParams.get('sessionId') || 'default'
      const storeId = url.searchParams.get('storeId') || 'default'
      
      console.log('New WebSocket connection:', { sessionId, storeId })
      
      this.sessions.set(sessionId, server)
      
      server.accept()
      
      // Send initial connection confirmation
      const connectMessage = {
        type: 'connected',
        sessionId,
        storeId
      }
      console.log('Sending connect message:', connectMessage)
      server.send(JSON.stringify(connectMessage))
      
      server.addEventListener('message', (event: any) => {
        try {
          const message = JSON.parse(event.data as string)
          console.log('Received message from', sessionId, ':', message)
          
          // Handle different message types
          switch (message.type) {
            case 'push':
              // Handle push updates
              this.handlePush(message, sessionId)
              break
            case 'pull':
              // Handle pull requests
              this.handlePull(message, sessionId)
              break
            case 'ping':
              // Handle ping
              const pongMessage = { type: 'pong' }
              console.log('Sending pong to', sessionId)
              server.send(JSON.stringify(pongMessage))
              break
            case 'connect':
              // Handle connect request
              const connectResponse = {
                type: 'connect_response',
                sessionId,
                storeId
              }
              console.log('Sending connect response to', sessionId)
              server.send(JSON.stringify(connectResponse))
              break
            default:
              // For unknown message types, just broadcast to others
              console.log('Unknown message type:', message.type, 'broadcasting to others')
              this.broadcastToOthers(event.data, sessionId)
          }
        } catch (error) {
          console.error('Error parsing message from', sessionId, ':', error)
          console.error('Raw message:', event.data)
        }
      })
      
      server.addEventListener('close', () => {
        console.log('Session closed:', sessionId)
        this.sessions.delete(sessionId)
      })
      
      server.addEventListener('error', (error: any) => {
        console.error('WebSocket error for session', sessionId, ':', error)
      })
      
      return new Response(null, {
        status: 101,
        webSocket: client,
      } as any)
    }
    
    return new Response('Not found', { status: 404 })
  }

  private handlePush(message: any, sessionId: string) {
    console.log('Handling push from', sessionId, ':', message)
    
    // Update room data
    if (message.updates) {
      this.roomData.clock = Math.max(this.roomData.clock, message.clock || 0)
      // Process updates...
    }
    
    // Broadcast to other sessions
    this.broadcastToOthers(JSON.stringify(message), sessionId)
  }

  private handlePull(message: any, sessionId: string) {
    console.log('Handling pull from', sessionId, ':', message)
    
    // Send current room state
    const response = {
      type: 'pull_response',
      clock: this.roomData.clock,
      documents: this.roomData.documents,
      tombstones: this.roomData.tombstones
    }
    
    const session = this.sessions.get(sessionId)
    if (session && session.readyState === 1) {
      console.log('Sending pull response to', sessionId)
      session.send(JSON.stringify(response))
    }
  }

  private broadcastToOthers(data: string, excludeSessionId: string) {
    console.log('Broadcasting to others, excluding', excludeSessionId)
    this.sessions.forEach((session, id) => {
      if (id !== excludeSessionId && session.readyState === 1) {
        console.log('Sending to session', id)
        session.send(data)
      }
    })
  }
}
