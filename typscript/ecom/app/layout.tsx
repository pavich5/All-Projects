import { ClerkProvider } from '@clerk/nextjs'
import Header from './components/header/Header'
 
export const metadata = {
  title: 'Next.js 13 with Clerk',
}
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

    console.log(process.env, 'TUKA')
  return (
    <ClerkProvider publishableKey='pk_test_YmlnLWJhcm5hY2xlLTMxLmNsZXJrLmFjY291bnRzLmRldiQ'>
      <html lang="en">
        <body>
          <Header/>
          {children}
          </body>
      </html>
    </ClerkProvider>
  )
}