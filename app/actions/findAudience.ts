'use server'

import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Google Generative AI with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function findAudience(formData: FormData) {
  const genre = formData.get('genre')
  const style = formData.get('style')
  const influences = formData.get('influences')
  const description = formData.get('description')

  const prompt = `
    As an AI music industry expert, analyze the following artist information and provide a detailed description of their potential specific audience:
    
    Genre: ${genre}
    Style: ${style}
    Influences: ${influences}
    Description: ${description}
    
    Please provide:
    1. A description of the ideal listener demographic (age range, interests, lifestyle)
    2. Potential geographic locations where this music might be popular
    3. Suggested platforms or venues for reaching this audience
    4. Any niche communities or subcultures that might particularly appreciate this artist's music
    5. Potential collaboration or cross-promotion opportunities
  `

  try {
    // Use Gemini 2.0 Flash model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return { success: true, message: text }
  } catch (error) {
    console.error('Error in AI analysis:', error)
    return { success: false, message: 'An error occurred during the analysis. Please try again.' }
  }
}

