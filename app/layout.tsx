import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CartProvider } from '@/components/cart/CartProvider';

export const metadata: Metadata = {
  title: 'Pond Cleanup | Nationwide Pond Cleaning & Maintenance',
  description: 'Pond Cleanup provides professional pond cleaning, muck removal, and maintenance services nationwide. Keep your pond clear, healthy, and beautiful.',
  keywords: 'pond cleaning, pond maintenance, muck removal, pond services, water clarity, algae control, pond cleanup',
  authors: [{ name: 'Pond Cleanup' }],
  openGraph: {
    type: 'website',
    url: 'https://pondcleanup.com/',
    title: 'Pond Cleanup | Nationwide Pond Cleaning & Maintenance',
    description: 'Pond Cleanup provides professional pond cleaning, muck removal, and maintenance services nationwide. Keep your pond clear, healthy, and beautiful.',
    images: [{ url: 'https://pondcleanup.com/images/logo.png' }],
    siteName: 'Pond Cleanup',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pond Cleanup | Nationwide Pond Cleaning & Maintenance',
    description: 'Pond Cleanup provides professional pond cleaning, muck removal, and maintenance services nationwide. Keep your pond clear, healthy, and beautiful.',
    images: ['https://pondcleanup.com/images/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://pondcleanup.com/',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/images/logo/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/logo/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/logo/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/logo/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/images/logo/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/images/logo/android-chrome-512x512.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Pond Cleanup',
              url: 'https://pondcleanup.com',
              description: 'Nationwide pond cleaning and maintenance service',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://pondcleanup.com/pages/book?location={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Pond Cleanup',
              url: 'https://pondcleanup.com',
              logo: 'https://pondcleanup.com/images/logo.png',
              description: 'Nationwide pond cleaning and maintenance service',
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'Customer Service',
                email: 'info@pondcleanup.com',
              },
              sameAs: [],
            }),
          }}
        />
      </head>
      <body>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-R7MX5CJ43F"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-R7MX5CJ43F');
          `}
        </Script>
        <CartProvider>
          <Header />
          {children}
        </CartProvider>
        <Footer />
      </body>
    </html>
  );
}

