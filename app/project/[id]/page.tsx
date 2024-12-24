import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProjectInfo from './ProjectInfo'
import AIAnalysis from './AIAnalysis'
import DemographicChart from './DemographicChart'
import KeywordGenerator from './KeywordGenerator'
import DemographicLinks from './DemographicLinks'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ProjectPage({ params }: PageProps) {
  const { id } = await params
  const supabase = createServerComponentClient({ cookies })
  const { data: project } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single()

  if (!project) {
    notFound()
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">{project.genre} Project</h1>
      
      <Tabs defaultValue="info">
        <TabsList>
          <TabsTrigger value="info">Project Info</TabsTrigger>
          <TabsTrigger value="analysis">AI Analysis</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>
        
        <TabsContent value="info">
          <ProjectInfo project={project} />
        </TabsContent>
        
        <TabsContent value="analysis">
          <AIAnalysis analysis={project.analysis} />
        </TabsContent>
        
        <TabsContent value="demographics">
          <Card>
            <CardHeader>
              <CardTitle>Audience Demographics</CardTitle>
            </CardHeader>
            <CardContent>
              <DemographicChart genre={project.genre} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="resources">
          <div className="grid gap-6 md:grid-cols-2">
            <KeywordGenerator genre={project.genre} style={project.style} influences={project.influences} />
            <DemographicLinks genre={project.genre} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

