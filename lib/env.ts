import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_SYNC_URL: z.string().url(),
  NEXT_PUBLIC_APP_NAME: z.string().optional(),
})

export const env = envSchema.parse({
  NEXT_PUBLIC_SYNC_URL: process.env.NEXT_PUBLIC_SYNC_URL,
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
})
