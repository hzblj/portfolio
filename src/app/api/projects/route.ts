import {entries} from '@/db'

export async function GET() {
  return Response.json({data: entries})
}
