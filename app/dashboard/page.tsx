import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default async function Dashboard() {
  const supabase = createServerComponentClient({ cookies })
  const { data: projects } = await supabase.from('projects').select('*')

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects?.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <CardTitle>{project.genre}</CardTitle>
              <CardDescription>{project.style}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-2"><strong>Influences:</strong> {project.influences}</p>
              <p className="mb-4"><strong>Description:</strong> {project.description}</p>
              <Link href={`/project/${project.id}`}>
                <Button>View Details</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-8">
        <Link href="/">
          <Button>Create New Project</Button>
        </Link>
      </div>
    </div>
  )
}

