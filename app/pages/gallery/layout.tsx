import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Photo Gallery | Pond Cleanup',
  description: 'View our gallery of beautiful ponds we\'ve cleaned and maintained. Before and after photos of pond cleaning, restoration, and maintenance projects.',
  alternates: {
    canonical: 'https://pondcleanup.com/pages/gallery',
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

