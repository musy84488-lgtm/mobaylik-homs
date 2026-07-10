import type { Metadata } from 'next'
import { Tajawal } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['200', '300', '400', '500', '700', '800', '900'],
  variable: '--font-tajawal',
})

export const metadata: Metadata = {
  title: 'موبايلك حمص | متجر الهواتف المحمولة',
  description: 'أفضل متجر لبيع الهواتف المحمولة والإكسسوارات في حمص - توصيل مجاني - ضمان شهر',
  keywords: 'هواتف, موبايل, حمص, سوريا, ايفون, سامسونج, شاومي, إكسسوارات',
  openGraph: {
    title: 'موبايلك حمص',
    description: 'أفضل متجر للهواتف المحمولة في حمص',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" className={tajawal.variable}>
      <body className={`${tajawal.className} bg-dark text-white min-h-screen`}>
        <Navbar />
        <main className="pt-20">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}
