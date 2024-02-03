"use client"

import * as React from 'react'

import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'   
    
export function LogoutAuth() {
    const session = useSession();
    const router = useRouter();
    const onLogout = () => {
        signOut();
    }

    React.useEffect(() => {
        if (session?.status === 'unauthenticated') {
          router.push('/login')
        }
      }, [session, router])

    return (
        <div className="grid gap-2">
            <Button
                variant="default"
                onClick={() => {onLogout()}}
                className="w-max"
            >
                Logout
            </Button>
        </div>
    )
}