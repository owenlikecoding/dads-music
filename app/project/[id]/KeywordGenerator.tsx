'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function KeywordGenerator() {
  const [keywords, setKeywords] = useState<string[]>([])

  const generateKeywords = async () => {
    // In a real application, you would call an API to generate keywords
    const mockKeywords = ['Music', 'Artist', 'Genre', 'Audience', 'Fans', 'Concert', 'Album', 'Streaming', 'Social Media', 'Promotion']
    setKeywords(mockKeywords)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Keyword Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={generateKeywords}>Generate Keywords</Button>
        <div className="mt-4 flex flex-wrap gap-2">
          {keywords.map((keyword, index) => (
            <Badge key={index} variant="secondary">{keyword}</Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

