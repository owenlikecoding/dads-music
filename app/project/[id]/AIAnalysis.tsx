import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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

interface AIAnalysisProps {
  analysis: string;
}

export default function AIAnalysis({ analysis }: AIAnalysisProps) {
  const sections = parseAnalysis(analysis)

  return (
    <div className="space-y-6">
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
  )
}

