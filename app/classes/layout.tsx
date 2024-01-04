// import {getCurrentUser} from "@/lib/auth"
import React from "react"

import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"
import SwitchMode from "@/components/SwitchMode"

export default async function ClassesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // const user = await getCurrentUser()

  return (
    <main className='flex min-h-screen'>
      <div className='flex-1'>
        <Header>
          {/*<SwtichLanguage/>*/}
          <SwitchMode />
          {/*<Setting/>*/}
          {/*<UserMenu*/}
          {/*  user={{*/}
          {/*    name: user?.name,*/}
          {/*    image: user?.image,*/}
          {/*    email: user?.email,*/}
          {/*  }}*/}
          {/*/>*/}
        </Header>
        <Sidebar className='fixed hidden border-r xl:flex' />

        <div className='container mt-24 pb-8 xl:pl-[256px]'>{children}</div>
      </div>
    </main>
  )
}
