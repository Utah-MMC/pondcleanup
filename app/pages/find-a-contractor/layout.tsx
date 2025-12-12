import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Find Pond Contractors Near You | Pond Cleanup',
  description: 'Search our nationwide network of pond and water-feature experts.',
  alternates: {
    canonical: 'https://pondcleanup.com/pages/find-a-contractor',
  },
};

export default function FindContractorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

