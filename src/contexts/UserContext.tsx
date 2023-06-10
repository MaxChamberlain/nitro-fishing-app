import React, { useState, useEffect, createContext } from 'react'
import { getUserDetails } from '../api/user'

export const UserContext = createContext({ user: undefined, loadingUser: false } as { user: User | undefined, loadingUser: boolean })

export default function UserContextProvider ({ children }: { children: React.ReactNode }): React.ReactElement {
  const [user, setUser] = useState<User | undefined>(undefined)
  const [loadingUser, setLoadingUser] = useState(true)

  useEffect(() => {
    const checkUser: () => Promise<null> = async () => {
        setLoadingUser(true)
        try {
        const data = await getUserDetails()
        console.log(data)
        setUser(data)
      } catch (e: any) {
        setUser(undefined)
      }
        setLoadingUser(false)
        return null
    }
    checkUser()
  }, [])

  return (
        <UserContext.Provider value={{user, loadingUser}}>
            {children}
        </UserContext.Provider>
  )
}