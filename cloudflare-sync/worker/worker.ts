import { TldrawDurableObject } from './durable-object'

export default {
  async fetch(request: Request, env: any, ctx: any) {
    const url = new URL(request.url)
    
    // Handle WebSocket upgrade
    if (request.headers.get('Upgrade') === 'websocket') {
      const roomId = url.searchParams.get('roomId')
      if (!roomId) {
        return new Response('No room ID provided', { status: 400 })
      }
      
      // Get the durable object for this room
      const durableObjectId = env.TLDRAW_DURABLE_OBJECT.idFromName(roomId)
      const durableObject = env.TLDRAW_DURABLE_OBJECT.get(durableObjectId)
      
      // Forward the WebSocket request to the durable object
      return durableObject.fetch(request)
    }
    
    // Handle regular HTTP requests
    return new Response('Tldraw Sync Server', { status: 200 })
  }
}

export { TldrawDurableObject }
