/*
 * @Author: xiaohu
 * @Date: 2024-04-05 21:07:07
 * @LastEditTime: 2024-04-05 21:19:09
 * @LastEditors: xiaohu
 * @Description: auth
 */
import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({ providers: [GitHub] })
