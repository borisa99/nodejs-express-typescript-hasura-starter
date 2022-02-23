import { CorsOptions } from 'cors'
import { Server } from 'socket.io'
import socketIOJWT from 'socketio-jwt'
import { initEventsAndHandlers } from './events_listeners'

export const initSocketIO = (httpServer: any, corsOptions: CorsOptions) => {
  const io = new Server(httpServer, {
    cors: corsOptions,
  })
  io.use(
    socketIOJWT.authorize({
      secret: <string>process.env.JWT_SECRET,
      handshake: true,
      auth_header_required: true,
      decodedPropertyName: 'decoded_token',
    })
  )
  io.on('connection', socket => initEventsAndHandlers(socket))
}
