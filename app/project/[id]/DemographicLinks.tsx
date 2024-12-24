'use client'

import { useState, useEffect } from 'react'
import { findDemographicLinks } from '../../actions/aiActions'

interface Link {
  name: string;
  url: string;
}

export default function DemographicLinks({ genre }: { genre: string }) {
  const [links, setLinks] = useState<Link[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const fetchedLinks = await findDemographicLinks(genre)
        setLinks(fetchedLinks)
      } catch (error) {
        console.error('Error fetching demographic links:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLinks()
  }, [genre])

  return (
    <div>
      {isLoading ? (
        <p>Loading links...</p>
      ) : (
        <ul className="list-disc pl-5 space-y-2">
          {links.map((link, index) => (
            <li key={index}>
              <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

