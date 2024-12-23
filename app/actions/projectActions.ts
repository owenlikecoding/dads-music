'use server'

import { createClient } from '@supabase/supabase-js'
import { GoogleGenerativeAI } from "@google/generative-ai"

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function askQuestion(projectId: string, question: string) {
  const { data: project } = await supabase
    .from('projects')
    .select('*')
    .eq('id', projectId)
    .single()

  if (!project) {
    throw new Error('Project not found')
  }

  const prompt = `
    Based on the following project information, please answer this question: "${question}"

    Project Information:
    Genre: ${project.genre}
    Style: ${project.style}
    Influences: ${project.influences}
    Description: ${project.description}
    Analysis: ${project.analysis}
    Additional Info: ${project.additional_info || 'None provided'}
  `

  const model = genAI.getGenerativeModel({ model: "gemini-pro" })
  const result = await model.generateContent(prompt)
  const response = await result.response
  return response.text()
}

export async function addInfo(projectId: string, info: string) {
  const { data, error } = await supabase
    .from('projects')
    .update({ additional_info: info })
    .eq('id', projectId)

  if (error) {
    console.error('Error updating project:', error)
    throw new Error('Failed to add information')
  }

  return data
}