'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { findAudience } from '@/app/actions/findAudience'
import { AudienceAnalysisResult } from './AudienceAnalysisResult'

export default function ArtistForm() {
  const [result, setResult] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [artistData, setArtistData] = useState<{
    genre: string;
    style: string;
    influences: string;
    description: string;
  } | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    const formData = new FormData(event.currentTarget)
    const response = await findAudience(formData)
    setResult(response.message)
    setArtistData({
      genre: formData.get('genre') as string,
      style: formData.get('style') as string,
      influences: formData.get('influences') as string,
      description: formData.get('description') as string,
    })
    setIsLoading(false)
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="genre">Genre</Label>
          <Input id="genre" name="genre" required />
        </div>
        <div>
          <Label htmlFor="style">Style</Label>
          <Input id="style" name="style" required />
        </div>
        <div>
          <Label htmlFor="influences">Influences</Label>
          <Input id="influences" name="influences" required />
        </div>
        <div>
          <Label htmlFor="description">Brief Description of Your Music</Label>
          <Textarea id="description" name="description" required />
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Analyzing...' : 'Find My Audience'}
        </Button>
      </form>
      {result && artistData && (
        <AudienceAnalysisResult analysis={result} artistData={artistData} />
      )}
    </div>
  )
}

