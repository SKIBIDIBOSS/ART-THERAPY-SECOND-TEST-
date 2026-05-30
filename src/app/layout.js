import './globals.css'

export const metadata = {
  title: 'Art Therapy Website',
  description: 'Developed by Aarav',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
