import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-content">
            <h1>Nationwide Pond Cleaning &amp; Maintenance</h1>
            <p>Professional pond cleaning, muck removal, and seasonal maintenance to keep your water clear and healthy — available across the U.S.</p>

            <div className="hero-ctas">
              <Link href="/book" className="btn btn-primary">Book a Pond Cleaning</Link>
              <Link href="/book" className="btn btn-secondary">Get a Free Quote</Link>
            </div>

            <p className="hero-trust-line">Serving residential and small commercial ponds nationwide.</p>

            {/* HERO FORM */}
            <form className="hero-form" action="/book" method="GET">
              <div className="form-row">
                <label htmlFor="location">Your City or ZIP</label>
                <input type="text" id="location" name="location" placeholder="e.g. Austin, TX or 73301" required />
              </div>
              <div className="form-row">
                <label htmlFor="pond-type">Pond Type</label>
                <select id="pond-type" name="pond_type">
                  <option value="">Select pond type</option>
                  <option value="koi">Koi pond</option>
                  <option value="decorative">Decorative pond</option>
                  <option value="water-garden">Water garden</option>
                  <option value="other">Other / not sure</option>
                </select>
              </div>
              <div className="form-row">
                <label htmlFor="service">Service Needed</label>
                <select id="service" name="service">
                  <option value="cleaning">Pond cleaning / muck removal</option>
                  <option value="maintenance">Maintenance plan</option>
                  <option value="opening-closing">Opening / closing</option>
                  <option value="restoration">Deep clean / restoration</option>
                  <option value="not-sure">Not sure, need advice</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary btn-full">Check Availability</button>
              <p className="hero-note">No obligation. We&apos;ll follow up with a clear, upfront quote.</p>
            </form>
          </div>

          <div className="hero-image">
            <Image
              src="/images/PXL_20250628_171207914.jpg"
              alt="Beautiful clean pond"
              width={600}
              height={500}
              style={{ width: '100%', height: '500px', objectFit: 'cover', borderRadius: 'var(--border-radius-lg)' }}
              priority
            />
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="what-we-do">
        <div className="container">
          <h2>Pond Cleaning &amp; Maintenance Services</h2>
          <div className="services-grid">
            <article className="service-card service-card-bg" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('/images/0b89a8b10a3cdccda885b1d037df7b2d-enhance-4x.jpeg')` }}>
              <div className="service-card-content">
                <h3>Pond Cleaning &amp; Muck Removal</h3>
                <p>Remove sludge, leaves, and debris that cloud water and cause odors.</p>
                <Link href="/services/pond-cleaning" className="service-link">Learn more →</Link>
              </div>
            </article>
            <article className="service-card service-card-bg" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('/images/PXL_20250621_161924645.jpg')` }}>
              <div className="service-card-content">
                <h3>Seasonal Pond Maintenance</h3>
                <p>Spring start-ups, fall shut-downs, and routine health checks.</p>
                <Link href="/services/pond-maintenance" className="service-link">Learn more →</Link>
              </div>
            </article>
            <article className="service-card service-card-bg" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('/images/5aa18b8372424c85813aa67ea1c6814d-enhance-4x.jpeg')` }}>
              <div className="service-card-content">
                <h3>Water Clarity &amp; Algae Management</h3>
                <p>Help control algae, balance water quality, and improve visibility.</p>
                <Link href="/services/pond-restoration" className="service-link">Learn more →</Link>
              </div>
            </article>
            <article className="service-card service-card-bg" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('/images/PXL_20250719_000452911.jpg')` }}>
              <div className="service-card-content">
                <h3>Pond Opening &amp; Closing</h3>
                <p>Prepare your pond for the season ahead or safely shut it down for winter.</p>
                <Link href="/services/pond-opening-closing" className="service-link">Learn more →</Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* WHY POND CLEANUP */}
      <section className="why-us section-with-bg" style={{ backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.97)), url('/images/443bd1b5cddc4d945e924f40dfbcba96-enhance-4x.jpeg')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
        <div className="container">
          <h2>Why Pond Owners Choose Pond Cleanup</h2>
          <div className="why-grid">
            <div className="why-item">
              <h3>Pond-focused specialists</h3>
              <p>We work with techs who specialize in ponds and water gardens, not generic lawn crews.</p>
            </div>
            <div className="why-item">
              <h3>Nationwide service</h3>
              <p>One brand, consistent standards, and coverage in cities across the U.S.</p>
            </div>
            <div className="why-item">
              <h3>Clear, upfront pricing</h3>
              <p>We provide estimates before work begins, with no surprise add-ons.</p>
            </div>
            <div className="why-item">
              <h3>Healthier, clearer water</h3>
              <p>Our cleanings and maintenance plans are built to keep your pond looking its best.</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-it-works">
        <div className="container">
          <h2>How Pond Cleanup Works</h2>
          <div className="steps-grid">
            <div className="step">
              <span className="step-number">1</span>
              <h3>Tell us about your pond</h3>
              <p>Share your location, pond size, and what you&apos;re seeing (murky water, sludge, algae, etc.).</p>
            </div>
            <div className="step">
              <span className="step-number">2</span>
              <h3>Get a clear quote</h3>
              <p>We recommend the right service and send you a no-obligation estimate.</p>
            </div>
            <div className="step">
              <span className="step-number">3</span>
              <h3>Schedule your cleaning</h3>
              <p>Pick a date and time that works. We confirm your appointment in advance.</p>
            </div>
            <div className="step">
              <span className="step-number">4</span>
              <h3>Enjoy your cleaned pond</h3>
              <p>We clean, check equipment, and give you simple care tips for after the visit.</p>
            </div>
          </div>
        </div>
      </section>

      {/* BEFORE & AFTER */}
      <section className="before-after">
        <div className="container">
          <h2>Before &amp; After Pond Cleanups</h2>
          <p className="section-intro">See the dramatic transformation our professional cleaning service delivers</p>
          <div className="before-after-grid">
            <figure className="before-after-item">
              <div className="before-after-images">
                <div className="before-photo">
                  <Image
                    src="/images/0b89a8b10a3cdccda885b1d037df7b2d-enhance-4x.jpeg"
                    alt="Before: murky pond with algae"
                    width={400}
                    height={280}
                    style={{ width: '100%', height: '280px', objectFit: 'cover' }}
                    loading="lazy"
                  />
                  <span className="label">Before</span>
                </div>
                <div className="after-photo">
                  <Image
                    src="/images/PXL_20250628_171207914.jpg"
                    alt="After: crystal clear pond"
                    width={400}
                    height={280}
                    style={{ width: '100%', height: '280px', objectFit: 'cover' }}
                    loading="lazy"
                  />
                  <span className="label">After</span>
                </div>
              </div>
              <figcaption>Backyard koi pond transformed in one day</figcaption>
            </figure>
            <figure className="before-after-item">
              <div className="before-after-images">
                <div className="before-photo">
                  <Image
                    src="/images/1df1ecf8852a8a526517efdf414917a7-denoise-enhance-4x.jpeg"
                    alt="Before: pond with heavy debris"
                    width={400}
                    height={280}
                    style={{ width: '100%', height: '280px', objectFit: 'cover' }}
                    loading="lazy"
                  />
                  <span className="label">Before</span>
                </div>
                <div className="after-photo">
                  <Image
                    src="/images/2d38a8065acb69433f4ac7658de69f6c-enhance-4x.jpeg"
                    alt="After: pristine water garden"
                    width={400}
                    height={280}
                    style={{ width: '100%', height: '280px', objectFit: 'cover' }}
                    loading="lazy"
                  />
                  <span className="label">After</span>
                </div>
              </div>
              <figcaption>Water garden restored to crystal clarity</figcaption>
            </figure>
            <figure className="before-after-item">
              <div className="before-after-images">
                <div className="before-photo">
                  <Image
                    src="/images/3f524798b831b933a60d3f6d15f38e3b-denoise-enhance-4x.jpeg"
                    alt="Before: algae-covered pond"
                    width={400}
                    height={280}
                    style={{ width: '100%', height: '280px', objectFit: 'cover' }}
                    loading="lazy"
                  />
                  <span className="label">Before</span>
                </div>
                <div className="after-photo">
                  <Image
                    src="/images/5aa18b8372424c85813aa67ea1c6814d-enhance-4x.jpeg"
                    alt="After: beautiful clear waterfall"
                    width={400}
                    height={280}
                    style={{ width: '100%', height: '280px', objectFit: 'cover' }}
                    loading="lazy"
                  />
                  <span className="label">After</span>
                </div>
              </div>
              <figcaption>Waterfall feature cleaned and restored</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* POND GALLERY */}
      <section className="pond-gallery">
        <div className="container">
          <h2>Beautiful Ponds We&apos;ve Cleaned &amp; Maintained</h2>
          <p className="section-intro">From small backyard ponds to elaborate water gardens</p>
          <div className="gallery-grid">
            <div className="gallery-item">
              <Image
                src="/images/PXL_20250628_171207914.jpg"
                alt="Clean koi pond with waterfall"
                width={300}
                height={225}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                loading="lazy"
              />
            </div>
            <div className="gallery-item">
              <Image
                src="/images/PXL_20250621_161924645.jpg"
                alt="Natural pond ecosystem"
                width={300}
                height={225}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                loading="lazy"
              />
            </div>
            <div className="gallery-item">
              <Image
                src="/images/PXL_20250719_000452911.jpg"
                alt="Water garden with plants"
                width={300}
                height={225}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                loading="lazy"
              />
            </div>
            <div className="gallery-item">
              <Image
                src="/images/PXL_20250719_231921157.jpg"
                alt="Evening pond lighting"
                width={300}
                height={225}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                loading="lazy"
              />
            </div>
            <div className="gallery-item">
              <Image
                src="/images/PXL_20250610_174445773.jpg"
                alt="Decorative pond feature"
                width={300}
                height={225}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                loading="lazy"
              />
            </div>
            <div className="gallery-item">
              <Image
                src="/images/2d38a8065acb69433f4ac7658de69f6c-enhance-4x.jpeg"
                alt="Crystal clear pond water"
                width={300}
                height={225}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                loading="lazy"
              />
            </div>
            <div className="gallery-item">
              <Image
                src="/images/5aa18b8372424c85813aa67ea1c6814d-enhance-4x.jpeg"
                alt="Waterfall and stream"
                width={300}
                height={225}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                loading="lazy"
              />
            </div>
            <div className="gallery-item">
              <Image
                src="/images/443bd1b5cddc4d945e924f40dfbcba96-enhance-4x.jpeg"
                alt="Pond with aquatic plants"
                width={300}
                height={225}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                loading="lazy"
              />
            </div>
            <div className="gallery-item">
              <Image
                src="/images/31df9f7919a035760e792bef0b3d2bb1-enhance-4x.jpeg"
                alt="Professional pond installation"
                width={300}
                height={225}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                loading="lazy"
              />
            </div>
            <div className="gallery-item">
              <Image
                src="/images/50b7c5b5336aff2aeaf6690696e3e42f-denoise-enhance-4x.jpeg"
                alt="Garden pond ecosystem"
                width={300}
                height={225}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                loading="lazy"
              />
            </div>
            <div className="gallery-item">
              <Image
                src="/images/65f25c8086c8955b83251f79c1f77da1-enhance-4x.jpeg"
                alt="Backyard water feature"
                width={300}
                height={225}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                loading="lazy"
              />
            </div>
            <div className="gallery-item">
              <Image
                src="/images/735e2dfc82cdc5f4ee2cede5bd9c631f-enhance-4x.jpeg"
                alt="Pond with natural stone"
                width={300}
                height={225}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                loading="lazy"
              />
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: 'var(--spacing-lg)' }}>
            <Link href="/gallery" className="btn btn-secondary">View Full Gallery</Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials">
        <div className="container">
          <h2>What Pond Owners Are Saying</h2>
          <div className="testimonials-grid">
            <article className="testimonial">
              <p className="testimonial-text">&quot;They turned our murky pond into a clear water garden. The fish are happier and so are we.&quot;</p>
              <p className="testimonial-meta">— Amanda R., Columbus, OH</p>
            </article>
            <article className="testimonial">
              <p className="testimonial-text">&quot;Professional, on time, and they explained everything. We&apos;ll be booking seasonal cleanings from now on.&quot;</p>
              <p className="testimonial-meta">— Mark D., Plano, TX</p>
            </article>
            <article className="testimonial">
              <p className="testimonial-text">&quot;They turned our swampy backyard pond into a clear water garden in one day.&quot;</p>
              <p className="testimonial-meta">— Sarah M., Denver, CO</p>
            </article>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="bottom-cta" style={{ backgroundImage: `linear-gradient(rgba(0, 102, 204, 0.9), rgba(0, 163, 163, 0.85)), url('/images/PXL_20250628_171207914.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
        <div className="container">
          <h2>Ready to clean up your pond?</h2>
          <p>Get a free, no-obligation quote from Pond Cleanup today.</p>
          <Link href="/book" className="btn btn-primary">Get a Free Quote</Link>
        </div>
      </section>
    </>
  );
}

