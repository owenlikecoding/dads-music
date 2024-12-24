'use client'

import { useState, useEffect } from 'react'
import {  CardContent } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { getDemographicData } from '../../actions/aiActions'

interface DemographicData {
  age: string;
  percentage: number;
}

export default function DemographicChart({ genre }: { genre: string }) {
  const [data, setData] = useState<DemographicData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const demographicData = await getDemographicData(genre)
        const formattedData = Object.entries(demographicData).map(([age, percentage]) => ({
          age,
          percentage: Number(percentage)
        }))
        setData(formattedData)
      } catch (error) {
        console.error('Error fetching demographic data:', error)
        setError('Failed to load demographic data')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [genre])

  return (
    <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-[300px]">
            <p>Loading demographic data...</p>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-[300px]">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="age" />
              <YAxis domain={[0, 100]} />
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Percentage']}
                labelFormatter={(label) => `Age: ${label}`}
              />
              <Legend />
              <Bar 
                dataKey="percentage" 
                fill="hsl(var(--primary))" 
                name="Age Distribution"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
  )
}

