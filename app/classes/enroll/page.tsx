"use client"

import { useCookies } from "next-client-cookies"

import { ScrollArea } from "@/components/ui/scroll-area"

import ListClasses from "../components/ListClasses"

interface Props {}

export default function Page({}: Props) {
  const cookies = useCookies()
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
