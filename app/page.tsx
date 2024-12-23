import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import ArtistForm from '@/components/ui/ArtistForm'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default async function Home() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Create New Project</CardTitle>
          <CardDescription>Find your specific audience with AI analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <ArtistForm />
        </CardContent>
      </Card>
    </div>
  )
}

