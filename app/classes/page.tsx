import { UserService } from "@/api/userService"
import { QueryKey, useQuery } from "@tanstack/react-query"
import {
  CreditCard,
  DollarSign,
  LineChart,
  List,
  User,
  Users,
} from "lucide-react"
import { getCookies } from "next-client-cookies/server"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import ListClasses from "./components/ListClasses"

interface Props {}
export default function Page({}: Props) {
  const cookies = getCookies()
  return (
    <div className='space-y-8'>
      <div className='flex justify-between'>
        <h1 className='text-4xl font-bold'>
          Enrolled Classes, {cookies.get("userName")}
        </h1>
      </div>
      <ListClasses />
      <div className='space-y-4'>
        <div className='grid grid-cols-2 gap-4 xl:grid-cols-4'></div>
      </div>
    </div>
  )
}
