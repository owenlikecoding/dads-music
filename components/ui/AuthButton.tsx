'use client'

import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button } from "@/components/ui/button"
import { Session } from '@supabase/auth-helpers-nextjs'



interface AuthButtonProps {
    session: Session | null; 
}

export default function AuthButton({ session }: AuthButtonProps) {
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return session ? (
    <Button onClick={handleSignOut}>Sign out</Button>
  ) : (
    <Button onClick={() => router.push('/login')}>Sign in</Button>
  )
}

