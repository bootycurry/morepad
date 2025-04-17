import { redirect } from "next/navigation"
import { v4 as uuidv4 } from "uuid"

export default function Home() {
  redirect(`/documents/${uuidv4()}`)
}