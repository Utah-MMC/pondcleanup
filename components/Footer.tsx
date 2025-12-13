import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>&copy; 2025 Pond Cleanup (pondcleanup.com). All rights reserved.</p>
        <nav className="footer-nav">
          <Link href="/about">About</Link>
          <Link href="/services">Services</Link>
          <Link href="/services/pond-cleaning">Pond Cleaning</Link>
          <Link href="/services/pond-maintenance">Maintenance</Link>
          <Link href="/services/pond-opening-closing">Opening & Closing</Link>
          <Link href="/services/pond-restoration">Restoration</Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="/locations">Locations</Link>
          <Link href="/contractors">Contractors</Link>
          <Link href="/diy">DIY Guides</Link>
          <Link href="/how-it-works">How It Works</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/book">Book a Cleaning</Link>
        </nav>
      </div>
    </footer>
  );
}

