import { notFound } from 'next/navigation'
import { isValidRoomId } from '@/lib/id'
import RoomClient from './RoomClient'

interface RoomPageProps {
  params: {
    roomId: string
  }
}

export default function RoomPage({ params }: RoomPageProps) {
  const { roomId } = params

  if (!isValidRoomId(roomId)) {
    notFound()
  }

  return <RoomClient roomId={roomId} />
}
