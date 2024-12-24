'use server'

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

async function getAIResponse(prompt: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

export async function generateKeywords(genre: string, style: string, influences: string) {
  const prompt = `Generate 10 relevant keywords for a ${genre} artist with a ${style} style and influences including ${influences}. Return the keywords as a comma-separated list.`;
  const response = await getAIResponse(prompt);
  return response.split(',').map(keyword => keyword.trim());
}

export async function findDemographicLinks(genre: string) {
  const prompt = `Provide 5 useful online platforms or resources for ${genre} artists to connect with their audience. For each, provide the name and URL in the format "name: url". Each entry should be on a new line.`;
  const response = await getAIResponse(prompt);
  return response.split('\n').map(line => {
    const [name, url] = line.split(': ');
    return { name: name?.trim(), url: url?.trim() };
  }).filter(link => link.name && link.url);
}

export async function getDemographicData(genre: string) {
  const prompt = `
    Analyze the demographic distribution for ${genre} music listeners.
    Respond ONLY with a valid JSON object in this exact format:
    {
      "13-17": 20,
      "18-24": 30,
      "25-34": 25,
      "35-44": 15,
      "45+": 10
    }
    The numbers should be percentages that add up to 100. Do not include any other text or formatting.
  `;
  
  try {
    const response = await getAIResponse(prompt);
    // Clean the response to ensure it's valid JSON
    const cleanedResponse = response.trim().replace(/```json|```/g, '').trim();
    const data = JSON.parse(cleanedResponse);
    
    // Validate the data structure
    const requiredKeys = ['13-17', '18-24', '25-34', '35-44', '45+'];
    const hasAllKeys = requiredKeys.every(key => key in data);
    const valuesAreNumbers = Object.values(data).every(value => typeof value === 'number');
    
    if (!hasAllKeys || !valuesAreNumbers) {
      throw new Error('Invalid data structure');
    }
    
    return data;
  } catch (error) {
    console.error('Error parsing demographic data:', error);
    // Return fallback data if parsing fails
    return {
      '13-17': 20,
      '18-24': 30,
      '25-34': 25,
      '35-44': 15,
      '45+': 10
    };
  }
}

