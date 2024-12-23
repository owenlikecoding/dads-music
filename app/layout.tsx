import './globals.css'
import { Inter } from 'next/font/google'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import AuthButton from '@/components/ui/AuthButton'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Owens Artist Audience Finder',
  description: 'Find your specific audience with AI analysis',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Artist Audience Finder</h1>
              {session && (
                <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
                  Dashboard
                </Link>
              )}
            </div>
            <AuthButton session={session} />
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  )
}

