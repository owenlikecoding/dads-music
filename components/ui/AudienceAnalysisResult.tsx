import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { createProject } from '@/app/actions/createProject'
import { useRouter } from 'next/navigation'

interface AnalysisSection {
  title: string;
  content: string[];
}

interface AudienceAnalysisResultProps {
  analysis: string;
  artistData: {
    genre: string;
    style: string;
    influences: string;
    description: string;
  };
}

export function AudienceAnalysisResult({ analysis, artistData }: AudienceAnalysisResultProps) {
  const [isCreating, setIsCreating] = useState(false)
  const router = useRouter()
  const sections: AnalysisSection[] = parseAnalysis(analysis);

  async function handleCreateProject() {
    setIsCreating(true)
    try {
      const projectId = await createProject({ analysis, ...artistData })
      router.push(`/project/${projectId}`)
    } catch (error) {
      console.error('Error creating project:', error)
      alert('Failed to create project. Please try again.')
    } finally {
      setIsCreating(false)
    }
  }

  return (
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
      <Button onClick={handleCreateProject} disabled={isCreating}>
        {isCreating ? 'Creating Project...' : 'Create Project'}
      </Button>
    </div>
  );
}

function parseAnalysis(analysis: string): AnalysisSection[] {
  const sections = analysis.split(/\*\*\d+\.\s/).slice(1);
  return sections.map(section => {
    const [title, ...content] = section.split('\n').filter(line => line.trim() !== '');
    return {
      title: title.replace(/\*\*/g, '').trim(),
      content: content.map(line => line.replace(/^\*\s/, '').trim())
    };
  });
}

