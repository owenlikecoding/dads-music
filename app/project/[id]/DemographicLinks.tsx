import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type GenreLinks = {
  [key: string]: { name: string; url: string }[];
};

const mockLinks: GenreLinks = {
  'Pop': [
    { name: 'Spotify for Artists', url: 'https://artists.spotify.com/' },
    { name: 'TikTok for Business', url: 'https://www.tiktok.com/business/' },
    { name: 'Instagram for Business', url: 'https://business.instagram.com/' },
  ],
  'Rock': [
    { name: 'Bandcamp for Artists', url: 'https://bandcamp.com/artists' },
    { name: 'ReverbNation', url: 'https://www.reverbnation.com/' },
    { name: 'Last.fm', url: 'https://www.last.fm/' },
  ],
  // Add more genres as needed
}

export default function DemographicLinks({ genre }: { genre: string }) {
  const links = mockLinks[genre] || mockLinks['Pop']

  return (
    <Card>
      <CardHeader>
        <CardTitle>Useful Links for {genre} Artists</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-5 space-y-2">
          {links.map((link, index) => (
            <li key={index}>
              <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

