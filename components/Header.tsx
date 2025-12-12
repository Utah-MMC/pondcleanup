import Link from 'next/link';
import Image from 'next/image';
import CartButton from '@/components/cart/CartButton';

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="logo">
          <Image
            src="/images/logo/pondcleanuplogo.png"
            alt="Pond Cleanup"
            className="logo-img"
            width={350}
            height={104}
            priority
          />
        </Link>
        <nav className="main-nav">
          <Link href="/services">Services</Link>
          <Link href="/contractors">Contractor Network</Link>
          <Link href="/diy">DIY</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/locations">Locations</Link>
          <Link href="/about">About</Link>
          <CartButton />
          <Link href="/book" className="btn btn-primary">Book a Cleaning</Link>
        </nav>
      </div>
    </header>
  );
}

