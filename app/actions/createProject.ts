'use server'

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!)

export async function createProject(data: {
  analysis: string;
  genre: string;
  style: string;
  influences: string;
  description: string;
}) {
  try {
    const { data: project, error } = await supabase
      .from('projects')
      .insert([
        {
          analysis: data.analysis,
          genre: data.genre,
          style: data.style,
          influences: data.influences,
          description: data.description,
        },
      ])
      .select()

    if (error) {
      console.error('Error inserting project:', error)
      throw new Error(`Failed to create project: ${error.message}`)
    }

    if (!project || project.length === 0) {
      throw new Error('Project was not created')
    }

    return project[0].id
  } catch (error) {
    console.error('Unexpected error:', error)
    throw new Error('An unexpected error occurred while creating the project')
  }
}

