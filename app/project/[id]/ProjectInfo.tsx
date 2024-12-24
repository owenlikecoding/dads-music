import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Project {
  genre: string;
  style: string;
  influences: string;
  description: string;
}

export default function ProjectInfo({ project }: { project: Project }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p><strong>Genre:</strong> {project.genre}</p>
        <p><strong>Style:</strong> {project.style}</p>
        <p><strong>Influences:</strong> {project.influences}</p>
        <p><strong>Description:</strong> {project.description}</p>
      </CardContent>
    </Card>
  )
}

