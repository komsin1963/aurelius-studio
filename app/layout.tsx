import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th">
      <head>
        <title>Aurelius AI Studio</title>
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}