'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

type GenreData = {
  [key: string]: { age: string; percentage: number }[];
};

const mockData: GenreData = {
  'Pop': [
    { age: '13-17', percentage: 25 },
    { age: '18-24', percentage: 35 },
    { age: '25-34', percentage: 20 },
    { age: '35-44', percentage: 10 },
    { age: '45+', percentage: 10 },
  ],
  'Rock': [
    { age: '13-17', percentage: 15 },
    { age: '18-24', percentage: 25 },
    { age: '25-34', percentage: 30 },
    { age: '35-44', percentage: 20 },
    { age: '45+', percentage: 10 },
  ],
  
}

export default function DemographicChart({ genre }: { genre: string }) {
    const [data, setData] = useState<{ age: string; percentage: number }[]>([])

  useEffect(() => {
    // In a real application, you would fetch this data from an API
    setData(mockData[genre] || mockData['Pop'])
  }, [genre])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Demographic Distribution for {genre}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="age" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="percentage" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

