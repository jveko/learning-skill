"use client"

import React from "react"
import Link from "next/link"
import {usePathname} from "next/navigation"
import {BookmarkIcon} from "@radix-ui/react-icons"
import {FormInput, Home,} from "lucide-react"

import {cn} from "@/lib/utils"

import {Button} from "../ui/button"

export type SidebarNavItem = {
  title: string
  disabled?: boolean
  external?: boolean
  href?: string
  icon?: React.ReactNode
  items?: SidebarNavItem[]
}

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  onClick?: () => void
}

const menu: SidebarNavItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Home",
        href: "/dashboard",
        icon: <Home size={16}/>,
      },
      // {
      //   title: "Form",
      //   href: "/dashboard/form",
      //   icon: <GanttChartSquare size={16} />,
      // },
      // {
      //   title: "Table",
      //   href: "/dashboard/table",
      //   icon: <Table size={16} />,
      // },
      // {
      //   title: "Charts",
      //   href: "/dashboard/analytics",
      //   icon: <LineChart size={16} />,
      // },
      // {
      //   title: "Bill",
      //   href: "/dashboard/list",
      //   icon: <Receipt size={16} />,
      // },
    ],
  },
  // {
  //   title: "Components",
  //   items: [
  //     {
  //       title: "Inputs",
  //       href: "/dashboard/inputs",
  //       icon: <FormInput size={16} />,
  //     },
  //     {
  //       title: "Feedback",
  //       href: "/dashboard/feedback",
  //       icon: <MessageSquarePlus size={16} />,
  //     },
  //     {
  //       title: "Display",
  //       href: "/dashboard/display",
  //       icon: <Container size={16} />,
  //     },
  //     {
  //       title: "Navigaion",
  //       href: "/dashboard/navigation",
  //       icon: <Navigation size={16} />,
  //     },
  //     {
  //       title: "Surfaces",
  //       href: "/dashboard/surfaces",
  //       icon: <Layers3 size={16} />,
  //     },
  //   ],
  // },
  {
    title: "Classes",
    items: [
      {
        title: "Enrolled",
        href: "/classes/enroll",
        icon: <FormInput size={16}/>,
      },
    ]
  },
  {
    title: "Admin",
    items: [
      {
        title: "Class",
        href: "/dashboard/inputs",
        icon: <FormInput size={16}/>,
      },
      // {
      //   title: "Feedback",
      //   href: "/dashboard/feedback",
      //   icon: <MessageSquarePlus size={16} />,
      // },
      // {
      //   title: "Display",
      //   href: "/dashboard/display",
      //   icon: <Container size={16} />,
      // },
      // {
      //   title: "Navigaion",
      //   href: "/dashboard/navigation",
      //   icon: <Navigation size={16} />,
      // },
      // {
      //   title: "Surfaces",
      //   href: "/dashboard/surfaces",
      //   icon: <Layers3 size={16} />,
      // },
    ],
  },

]

export default function Sidebar({className, onClick}: SidebarProps) {
  const pathName = usePathname()

  return (
    <div className={cn("flex h-full w-[240px] flex-col", className)}>
      <div className='flex items-center justify-center w-full h-16 gap-2 text-lg font-medium border-b'>
        <BookmarkIcon className='h-9 w-9'/> Learning Skill
      </div>
      <div className='py-4'>
        {menu.map((item, index) => (
          <div key={index} className='px-3 py-2'>
            <h2 className='px-4 mb-2 text-lg font-semibold tracking-tight'>
              {item.title}
            </h2>
            {item.items ? (
              <SidebarItems
                pathName={pathName}
                onClick={onClick}
                items={item.items}
              />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}

function SidebarItems({
                        items,
                        pathName,
                        onClick,
                      }: {
  onClick?: () => void

  items: SidebarNavItem[]
  pathName: string | null
}) {
  return items.length
    ? items.map((item, index) => (
      <Button
        key={index}
        asChild
        onClick={onClick}
        variant={item.href === pathName ? "secondary" : "ghost"}
        className={cn("mb-1 w-full justify-start", {
          "text-primary": item.href === pathName,
        })}
      >
        {!item.disabled && item.href ? (
          <Link href={item.href}>
            {item.icon && <span className='mr-2'>{item.icon}</span>}
            {item.title}
          </Link>
        ) : (
          <span className='flex items-center w-full p-2 rounded-md cursor-not-allowed opacity-60'>
              {item.title}
            </span>
        )}
      </Button>
    ))
    : null
}
