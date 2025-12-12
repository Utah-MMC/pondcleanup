import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Pond Clarity & Algae Basics | DIY Guide | Pond Cleanup',
  description: 'Learn why pond water turns green, how filtration works, and what to change first. Practical DIY guide for clearer, healthier pond water.',
  alternates: {
    canonical: 'https://pondcleanup.com/diy/clarity-algae-basics',
  },
};

export default function ClarityAlgaeBasicsPage() {
  return (
    <main>
      <section className="service-hero">
        <div className="container">
          <h1>Clarity & Algae Basics</h1>
          <p>Understand why water turns green, how filtration works, and what to change first.</p>
        </div>
      </section>

      <section className="service-content">
        <div className="container">
          <div className="service-layout">
            <div className="service-main">
              <h2>Why Does Pond Water Turn Green?</h2>
              <p>
                Green water is caused by single-celled algae (phytoplankton) that multiply rapidly when conditions are right. This happens when there&apos;s too much sunlight, excess nutrients (from fish waste, uneaten food, or decaying organic matter), and insufficient filtration or beneficial bacteria.
              </p>

              <h2>How Filtration Works</h2>
              <p>
                Your pond&apos;s filtration system has two main jobs:
              </p>
              <ul className="service-checklist">
                <li><strong>Mechanical filtration:</strong> Removes physical debris like leaves, fish waste, and uneaten food</li>
                <li><strong>Biological filtration:</strong> Beneficial bacteria break down harmful ammonia and nitrites into less harmful nitrates</li>
              </ul>
              <p>
                When either part isn&apos;t working properly, nutrients build up and algae thrive. A well-balanced pond has clear water because the filtration system keeps nutrients low enough that algae can&apos;t outcompete beneficial bacteria.
              </p>

              <h2>What to Change First</h2>
              <p>
                If your pond is green, start with these steps in order:
              </p>

              <h3>1. Check Your Pump & Filter</h3>
              <p>
                Your pump should run 24/7 during warm months. Make sure:
              </p>
              <ul className="service-checklist">
                <li>Pump is running and water is flowing</li>
                <li>Filter media isn&apos;t clogged (clean if needed)</li>
                <li>Water flow rate matches your pond size (aim for turning over the entire pond volume every 1-2 hours)</li>
              </ul>

              <h3>2. Reduce Sunlight</h3>
              <p>
                If possible, add shade:
              </p>
              <ul className="service-checklist">
                <li>Floating plants like water lilies (cover 40-60% of surface)</li>
                <li>Marginal plants around the edges</li>
                <li>Shade cloth or pergola if pond gets full sun all day</li>
              </ul>

              <h3>3. Reduce Nutrients</h3>
              <p>
                Cut back on what feeds the algae:
              </p>
              <ul className="service-checklist">
                <li>Feed fish less (only what they eat in 2-3 minutes, 1-2 times per day)</li>
                <li>Remove uneaten food after feeding</li>
                <li>Clean out leaves and debris regularly</li>
                <li>Consider reducing fish load if you have too many</li>
              </ul>

              <h3>4. Add Beneficial Bacteria</h3>
              <p>
                Beneficial bacteria help break down waste before algae can use it. Add a quality bacterial supplement weekly during warm months, especially after cleaning or if you&apos;ve just set up the pond.
              </p>

              <h3>5. Consider UV Clarifiers</h3>
              <p>
                UV clarifiers kill free-floating algae as water passes through. They&apos;re effective but treat the symptom, not the root cause. Use alongside the steps above for best results.
              </p>

              <h2>Understanding Water Chemistry</h2>
              <p>
                Test your water regularly to understand what&apos;s happening:
              </p>
              <ul className="service-checklist">
                <li><strong>pH:</strong> Should be 6.5-8.5 (most ponds naturally settle around 7.5-8.0)</li>
                <li><strong>Ammonia:</strong> Should be 0 ppm (toxic to fish and feeds algae)</li>
                <li><strong>Nitrites:</strong> Should be 0 ppm (also toxic)</li>
                <li><strong>Nitrates:</strong> Keep below 40 ppm (lower is better)</li>
              </ul>
              <p>
                High ammonia or nitrites mean your biological filter isn&apos;t working. High nitrates mean you need more plants or water changes.
              </p>

              <h2>When to Get Professional Help</h2>
              <p>
                If you&apos;ve tried these steps and water is still green after 2-3 weeks, or if you&apos;re seeing fish stress, it might be time to call a professional. They can:
              </p>
              <ul className="service-checklist">
                <li>Assess your entire system and identify specific issues</li>
                <li>Clean filters and equipment properly</li>
                <li>Balance water chemistry safely</li>
                <li>Recommend equipment upgrades if needed</li>
              </ul>

              <div style={{ background: 'var(--color-bg-light)', padding: 'var(--spacing-md)', borderRadius: 'var(--border-radius-lg)', marginTop: 'var(--spacing-lg)' }}>
                <h3>Quick Reference: The 3 Pillars of Clear Water</h3>
                <ol style={{ paddingLeft: 'var(--spacing-md)', color: 'var(--color-text-light)' }}>
                  <li style={{ marginBottom: 'var(--spacing-xs)' }}><strong>Filtration:</strong> Mechanical + biological working together</li>
                  <li style={{ marginBottom: 'var(--spacing-xs)' }}><strong>Nutrient control:</strong> Less food in = less algae food</li>
                  <li style={{ marginBottom: 'var(--spacing-xs)' }}><strong>Shade:</strong> Less sunlight = less algae growth</li>
                </ol>
              </div>
            </div>

            <div className="service-sidebar">
              <div className="sidebar-box">
                <h2>Need Help?</h2>
                <p>If DIY isn&apos;t working or you want professional guidance, we&apos;re here to help.</p>
                <Link href="/book" className="btn btn-primary" style={{ width: '100%', display: 'block', textAlign: 'center', marginTop: 'var(--spacing-sm)' }}>Get Professional Help</Link>
              </div>
              <div className="sidebar-box">
                <h2>Other DIY Guides</h2>
                <ul className="related-services">
                  <li><Link href="/diy/spring-opening-checklist">Spring Opening Checklist</Link></li>
                  <li><Link href="/diy/fall-closing-checklist">Fall Closing Checklist</Link></li>
                  <li><Link href="/diy">All DIY Guides</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

