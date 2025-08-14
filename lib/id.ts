import { nanoid } from 'nanoid'

export const generateRoomId = (): string => {
  return nanoid(10)
}

export const isValidRoomId = (id: string): boolean => {
  return /^[A-Za-z0-9_-]{10}$/.test(id)
}
