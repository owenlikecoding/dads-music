'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { askQuestion, addInfo } from '../../actions/projectActions'

export default function ProjectQuestions({ projectId }: { projectId: string }) {
  const [question, setQuestion] = useState('')
  const [additionalInfo, setAdditionalInfo] = useState('')
  const [answer, setAnswer] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleAskQuestion() {
    setIsLoading(true)
    try {
      const result = await askQuestion(projectId, question)
      setAnswer(result)
      setQuestion('')
    } catch (error) {
      console.error('Error asking question:', error)
      alert('Failed to ask question. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleAddInfo() {
    setIsLoading(true)
    try {
      await addInfo(projectId, additionalInfo)
      setAdditionalInfo('')
      alert('Additional information added successfully!')
    } catch (error) {
      console.error('Error adding info:', error)
      alert('Failed to add information. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mt-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Ask a Question</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask a question about this project..."
            className="mb-4"
          />
          <Button onClick={handleAskQuestion} disabled={isLoading || !question}>
            {isLoading ? 'Asking...' : 'Ask Question'}
          </Button>
          {answer && (
            <div className="mt-4">
              <h3 className="font-semibold">Answer:</h3>
              <p>{answer}</p>
            </div>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Add Additional Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            placeholder="Provide additional information about this project..."
            className="mb-4"
          />
          <Button onClick={handleAddInfo} disabled={isLoading || !additionalInfo}>
            {isLoading ? 'Adding...' : 'Add Information'}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

