"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { RegisterResponse, UserService } from "@/api/userService"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

export default function SignUpForm() {
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const formSchema = z.object({
    name: z
      .string()
      .min(4, { message: "Name must not be less than 4 characters." }),
    email: z.string().email({ message: "Invalid email address." }),
    password: z.string().min(1, { message: "Invalid password." }),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const mutation = useMutation<
    RegisterResponse,
    Error,
    z.infer<typeof formSchema>
  >({
    mutationFn: async (values) => {
      return await UserService.register(values)
    },
    onSuccess(data, variables, context) {
      setLoading(false)
      toast({
        title: "Sign up successful.",
        description: "You can now login.",
        duration: 5000,
      })
      router.replace("/login")
    },
    onError(error, variables, context) {
      setLoading(false)
      toast({
        title: "Sign up failed.",
        description: error.message,
        variant: "destructive",
      })
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await mutation.mutateAsync(values)
    setLoading(true)
  }

  const {
    formState: { errors },
  } = form

  const erStyle = "border-red-500 focus-visible:ring-red-500 shadow-sm-red-400"

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder='name'
                      {...field}
                      className={errors.name && erStyle}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder='name@example.com'
                      {...field}
                      className={errors.email && erStyle}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder='password'
                    type='password'
                    {...field}
                    className={errors.password && erStyle}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='w-full' disabled={loading}>
            {loading && <Loader2 className='mr-2 animate-spin' size={16} />}
            Continue
          </Button>
        </form>
      </Form>
    </>
  )
}
