"use client"

import { UserService } from "@/api/userService"
import { useQuery } from "@tanstack/react-query"
import { useCookies } from "next-client-cookies"

interface ClassItem {
  id: number
  name: string
}
interface Props {}

export default function ListClasses({}: Props) {
  var cookies = useCookies()
  const { data, isLoading, error } = useQuery<ClassItem[]>({
    queryKey: ["classes"],
    queryFn: async () => await UserService.getClasses(cookies.get("token")!),
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div>
      <h1>Classes List</h1>
      <ul>
        {data?.map((classItem) => <li key={classItem.id}>{classItem.name}</li>)}
      </ul>
    </div>
  )
}
