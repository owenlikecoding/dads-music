'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { generateKeywords } from '../../actions/aiActions'

export default function KeywordGenerator({ genre, style, influences }: { genre: string, style: string, influences: string }) {
  const [keywords, setKeywords] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleGenerateKeywords = async () => {
    setIsLoading(true)
    try {
      const generatedKeywords = await generateKeywords(genre, style, influences)
      setKeywords(generatedKeywords)
    } catch (error) {
      console.error('Error generating keywords:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <Button onClick={handleGenerateKeywords} disabled={isLoading}>
        {isLoading ? 'Generating...' : 'Generate Keywords'}
      </Button>
      <div className="mt-4 flex flex-wrap gap-2">
        {keywords.map((keyword, index) => (
          <Badge key={index} variant="secondary">{keyword}</Badge>
        ))}
      </div>
    </div>
  )
}

