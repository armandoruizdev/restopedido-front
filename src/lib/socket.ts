import { io, Socket } from 'socket.io-client'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL as string | undefined

export const socket: Socket = io(apiBaseUrl ?? '/', {
  withCredentials: true,
  transports: ['websocket'],
})

export default socket


