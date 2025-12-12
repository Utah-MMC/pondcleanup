'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const galleryItems = [
    { src: '/images/PXL_20250628_171207914.jpg', alt: 'Beautiful koi pond with waterfall', category: 'koi-ponds' },
    { src: '/images/PXL_20250621_161924645.jpg', alt: 'Natural pond ecosystem with plants', category: 'water-gardens' },
    { src: '/images/PXL_20250719_000452911.jpg', alt: 'Water garden with aquatic plants', category: 'water-gardens' },
    { src: '/images/PXL_20250719_231921157.jpg', alt: 'Evening pond with lighting', category: 'koi-ponds' },
    { src: '/images/PXL_20250610_174445773.jpg', alt: 'Decorative pond waterfall feature', category: 'waterfalls' },
    { src: '/images/2d38a8065acb69433f4ac7658de69f6c-enhance-4x.jpeg', alt: 'Crystal clear koi pond', category: 'koi-ponds' },
    { src: '/images/5aa18b8372424c85813aa67ea1c6814d-enhance-4x.jpeg', alt: 'Natural waterfall and stream', category: 'waterfalls' },
    { src: '/images/443bd1b5cddc4d945e924f40dfbcba96-enhance-4x.jpeg', alt: 'Pond with lilies and aquatic plants', category: 'water-gardens' },
    { src: '/images/31df9f7919a035760e792bef0b3d2bb1-enhance-4x.jpeg', alt: 'Professional pond installation', category: 'koi-ponds' },
    { src: '/images/50b7c5b5336aff2aeaf6690696e3e42f-denoise-enhance-4x.jpeg', alt: 'Garden pond ecosystem', category: 'water-gardens' },
    { src: '/images/65f25c8086c8955b83251f79c1f77da1-enhance-4x.jpeg', alt: 'Backyard koi pond', category: 'koi-ponds' },
    { src: '/images/735e2dfc82cdc5f4ee2cede5bd9c631f-enhance-4x.jpeg', alt: 'Pond with natural stone border', category: 'water-gardens' },
    { src: '/images/74fbce0371cdb09efb1c704f539bc7f6-enhance-4x.jpeg', alt: 'Large koi pond with bridge', category: 'koi-ponds' },
    { src: '/images/76858a7a39560138d598f10f201740f7-enhance-4x.jpeg', alt: 'Multi-tier waterfall feature', category: 'waterfalls' },
    { src: '/images/7944d6d62f5d2d84190bdcc389014193-enhance-4x.jpeg', alt: 'Water garden with fountain', category: 'water-gardens' },
    { src: '/images/915f46a740c26fb8301437faf19c7711-enhance-4x.jpeg', alt: 'Koi pond with clear water', category: 'koi-ponds' },
    { src: '/images/0b89a8b10a3cdccda885b1d037df7b2d-enhance-4x.jpeg', alt: 'Pond transformation - before', category: 'before-after' },
    { src: '/images/1df1ecf8852a8a526517efdf414917a7-denoise-enhance-4x.jpeg', alt: 'Pond transformation - before', category: 'before-after' },
    { src: '/images/3f524798b831b933a60d3f6d15f38e3b-denoise-enhance-4x.jpeg', alt: 'Algae removal - before', category: 'before-after' },
    { src: '/images/0cc90ccee5b37dfa6aed153a01581727-enhance-4x.jpeg', alt: 'Serene water garden', category: 'water-gardens' },
    { src: '/images/1a558e9d94802fd824b157129ebe0e1d-enhance-4x.jpeg', alt: 'Koi pond with rocks', category: 'koi-ponds' },
    { src: '/images/1c7c15865a8fd7d198a5c69c3087e91c-enhance-4x.jpeg', alt: 'Natural pond landscape', category: 'water-gardens' },
    { src: '/images/2b1a14d52ea7e62a36a62f1a2da7203a-enhance-4x.jpeg', alt: 'Backyard koi pond', category: 'koi-ponds' },
    { src: '/images/2b5d2f918801edaa8047c2741195122c-enhance-4x.jpeg', alt: 'Waterfall installation', category: 'waterfalls' },
    { src: '/images/412a45870a56bf675379c3bde8e2ff95-enhance-4x.jpeg', alt: 'Garden pond with equipment', category: 'water-gardens' },
    { src: '/images/5f7d18ebd3b49d6c876141bc5ef48b4f-enhance-4x.jpeg', alt: 'Professional koi pond', category: 'koi-ponds' },
    { src: '/images/0cc109f6c9f0e7a6751414092874206c-enhance-4x.jpeg', alt: 'Water garden design', category: 'water-gardens' },
    { src: '/images/PXL_20250603_205115591.jpg', alt: 'Pond maintenance service', category: 'koi-ponds' },
  ];

  const filteredItems = activeCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <main className="gallery-page">
      <section className="directory-hero">
        <div className="container">
          <h1>Our Pond Projects Gallery</h1>
          <p>Beautiful ponds we&apos;ve cleaned, maintained, and restored across the country</p>
        </div>
      </section>

      <section className="pond-gallery" style={{ paddingTop: 'var(--spacing-md)' }}>
        <div className="container">
          <div className="gallery-categories">
            <button 
              className={`category-btn ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              All Photos
            </button>
            <button 
              className={`category-btn ${activeCategory === 'before-after' ? 'active' : ''}`}
              onClick={() => setActiveCategory('before-after')}
            >
              Before & After
            </button>
            <button 
              className={`category-btn ${activeCategory === 'koi-ponds' ? 'active' : ''}`}
              onClick={() => setActiveCategory('koi-ponds')}
            >
              Koi Ponds
            </button>
            <button 
              className={`category-btn ${activeCategory === 'water-gardens' ? 'active' : ''}`}
              onClick={() => setActiveCategory('water-gardens')}
            >
              Water Gardens
            </button>
            <button 
              className={`category-btn ${activeCategory === 'waterfalls' ? 'active' : ''}`}
              onClick={() => setActiveCategory('waterfalls')}
            >
              Waterfalls
            </button>
          </div>

          <div className="gallery-grid">
            {filteredItems.map((item, index) => (
              <div key={index} className="gallery-item" data-category={item.category}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={300}
                  height={225}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bottom-cta" style={{ backgroundImage: `linear-gradient(rgba(0, 102, 204, 0.9), rgba(0, 163, 163, 0.85)), url('/images/2d38a8065acb69433f4ac7658de69f6c-enhance-4x.jpeg')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
        <div className="container">
          <h2>Want your pond to look this amazing?</h2>
          <p>Book a professional cleaning and see the difference</p>
          <Link href="/book" className="btn btn-primary">Get a Free Quote</Link>
        </div>
      </section>
    </main>
  );
}

