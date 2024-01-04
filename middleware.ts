import { NextRequest, NextResponse } from "next/server"
import { UserService } from "@/api/userService"
import { ca, tr } from "date-fns/locale"

// export default withAuth(
//   async function middleware(req) {
//     const token = await getToken({ req })
//
//     const isAuth = !!token
//     const isAuthPage =
//       req.nextUrl.pathname.startsWith("/login") ||
//       req.nextUrl.pathname.startsWith("/signup")
//
//     if (isAuthPage) {
//       if (isAuth) {
//         return NextResponse.redirect(new URL("/dashboard", req.url))
//       }
//
//       return null
//     }
//
//     if (!isAuth) {
//       let from = req.nextUrl.pathname
//       if (req.nextUrl.search) {
//         from += req.nextUrl.search
//       }
//
//       return NextResponse.redirect(
//         new URL(`/login?from=${encodeURIComponent(from)}`, req.url),
//       )
//     }
//   },
//   {
//     callbacks: {
//       async authorized() {
//         // This is a work-around for handling redirect on auth pages.
//         // We return true here so that the middleware function above
//         // is always called.
//         return true
//       },
//     },
//   },
// )

export default async function middleware(req: NextRequest) {
  try {
    if (req.cookies.get("token")?.value === undefined)
      throw new Error("Token is invalid")
    var response = await UserService.me(req.cookies.get("token")?.value!)
    console.log(response)
    var res = NextResponse.next()
    res.cookies.set("userName", response.name)
    res.cookies.set("userEmail", response.email)
    const isAuthPage =
      req.nextUrl.pathname.startsWith("/login") ||
      req.nextUrl.pathname.startsWith("/signup")

    if (isAuthPage) {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }
    return res
  } catch (error) {
    const isAuthPage =
      req.nextUrl.pathname.startsWith("/login") ||
      req.nextUrl.pathname.startsWith("/signup")
    if (isAuthPage) {
      return null
    }
    let from = req.nextUrl.pathname
    if (req.nextUrl.search) {
      from += req.nextUrl.search
    }

    return NextResponse.redirect(
      new URL(`/login?from=${encodeURIComponent(from)}`, req.url),
    )
  }
}
export const config = {
  matcher: ["/dashboard/:path*", "/editor/:path*", "/login", "/register"],
}
