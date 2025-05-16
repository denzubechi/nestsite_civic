import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nestsite • Your All-in-One Online Space Builder',
  description: "Create stunning booking & event sites, showcase your work with portfolios, open digital storefronts, and share your knowledge through masterclasses. Empower your online presence effortlessly with NestSite's intuitive platform. Start building your dream digital space today!",
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
      <link rel="icon" href="/favicon.ico" sizes="any" />
                {children}
      </body>
    </html>
  )
}
