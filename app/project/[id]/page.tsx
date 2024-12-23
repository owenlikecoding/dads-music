import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ProjectQuestions from './ProjectQuestions'
import DemographicChart from './DemographicChart'
import KeywordGenerator from './KeywordGenerator'
import DemographicLinks from './DemographicLinks'

interface ProjectPageProps {
  params: {
    id: string
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const supabase = createServerComponentClient({ cookies })
  const { data: project } = await supabase
    .from('projects')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!project) {
    notFound()
  }

  const sections = parseAnalysis(project.analysis)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Project Details: {project.genre}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Artist Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>Genre:</strong> {project.genre}</p>
              <p><strong>Style:</strong> {project.style}</p>
              <p><strong>Influences:</strong> {project.influences}</p>
              <p><strong>Description:</strong> {project.description}</p>
            </CardContent>
          </Card>
          <div className="mt-6">
            <DemographicChart genre={project.genre} />
          </div>
        </div>
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">AI Analysis Result</h2>
          {sections.map((section, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <KeywordGenerator/>
        <DemographicLinks genre={project.genre} />
      </div>
      <div className="mt-6">
        <ProjectQuestions projectId={params.id} />
      </div>
    </div>
  )
}

function parseAnalysis(analysis: string) {
  const sections = analysis.split(/\*\*\d+\.\s/).slice(1);
  return sections.map(section => {
    const [title, ...content] = section.split('\n').filter(line => line.trim() !== '');
    return {
      title: title.replace(/\*\*/g, '').trim(),
      content: content.map(line => line.replace(/^\*\s/, '').trim())
    };
  });
}