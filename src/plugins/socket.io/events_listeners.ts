import { Socket } from 'socket.io'

export const initEventsAndHandlers = (socket: Socket) => {
  socket.emit('welcome', 'welcome')
}
