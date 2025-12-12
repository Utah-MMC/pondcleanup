export type DIYGuide = {
  slug: string;
  title: string;
  shortDescription: string;
  content: string;
  category: 'maintenance' | 'troubleshooting' | 'seasonal' | 'setup';
};

export const diyGuides: DIYGuide[] = [
  {
    slug: 'spring-opening-checklist',
    title: 'Spring Pond Opening Checklist',
    shortDescription: 'Step-by-step guide to prepare your pond for the warm season.',
    category: 'seasonal',
    content: `# Spring Pond Opening Checklist

Spring is the perfect time to give your pond a fresh start. Follow this checklist to ensure your pond is ready for the season ahead.

## Before You Start

- **Wait for consistent temperatures**: Don't start too early. Wait until nighttime temperatures stay above 50°F (10°C).
- **Gather supplies**: Net, pond vacuum or pump, beneficial bacteria, water conditioner, test kit.

## Step 1: Remove Debris

1. Use a net to remove leaves, twigs, and any large debris from the surface.
2. If you have a pond vacuum, clean the bottom to remove accumulated sludge.
3. Trim back dead or overgrown aquatic plants.

## Step 2: Check Equipment

1. **Pump**: Remove, clean, and inspect your pump. Replace any worn parts.
2. **Filter**: Clean filter media thoroughly. Replace if damaged.
3. **UV Sterilizer**: Check the bulb and replace if needed (typically every 6-12 months).
4. **Aerator**: Test and clean air stones or diffusers.

## Step 3: Partial Water Change

1. Drain 20-30% of the pond water.
2. Refill with fresh, dechlorinated water.
3. Use a water conditioner to neutralize chlorine and chloramines.

## Step 4: Test Water Quality

Test for:
- **pH** (ideal: 6.5-8.5)
- **Ammonia** (should be 0)
- **Nitrite** (should be 0)
- **Nitrate** (keep below 40 ppm)

## Step 5: Add Beneficial Bacteria

Start adding beneficial bacteria to establish the biological filter. This helps break down waste and prevents algae blooms.

## Step 6: Reintroduce Fish (If Removed)

1. Acclimate fish slowly by floating their bag in the pond for 15-20 minutes.
2. Gradually mix pond water into the bag.
3. Release fish gently.

## Step 7: Monitor Closely

For the first week, check water quality daily and watch for any signs of stress in fish or plants.

## Common Mistakes to Avoid

- Starting too early in cold weather
- Skipping water testing
- Adding too many fish at once
- Forgetting to condition new water

## When to Call a Professional

If you notice persistent water quality issues, sick fish, or equipment problems you can't fix, it's time to call a pond specialist.`,
  },
  {
    slug: 'fall-closing-checklist',
    title: 'Fall Pond Closing Checklist',
    shortDescription: 'How to properly winterize your pond to protect fish and equipment.',
    category: 'seasonal',
    content: `# Fall Pond Closing Checklist

Properly closing your pond in the fall protects your investment and ensures a healthy start next spring.

## Timing

Start closing when:
- Water temperatures drop to 50-60°F (10-15°C)
- Leaves begin falling regularly
- You're done feeding fish for the season

## Step 1: Clean Thoroughly

1. Remove all fallen leaves and debris from the surface.
2. Clean the bottom with a pond vacuum to remove sludge.
3. Trim back aquatic plants, but leave some for winter protection.

## Step 2: Stop Feeding Fish

When water temperature drops below 50°F, fish metabolism slows. Stop feeding to prevent waste buildup.

## Step 3: Prepare Equipment

1. **Pump**: Remove and store in a bucket of water (keeps seals from drying).
2. **Filter**: Clean and store in a dry place.
3. **UV Sterilizer**: Remove and store safely.
4. **Hoses and fittings**: Drain and store.

## Step 4: Install Winter Equipment

1. **De-icer or aerator**: Install to keep a hole open in the ice for gas exchange.
2. **Net cover**: Consider a net to catch falling leaves.

## Step 5: Partial Water Change

Do a final 20-30% water change before temperatures freeze. This removes accumulated waste.

## Step 6: Protect Fish

- If your pond is shallow (under 2 feet), consider moving fish indoors.
- For deeper ponds, fish can overwinter if there's an open area for gas exchange.
- Don't break ice by hitting it—use warm water to melt a hole.

## Step 7: Final Check

- Ensure de-icer/aerator is working
- Remove any remaining debris
- Check that water level is adequate

## What NOT to Do

- Don't completely drain the pond
- Don't remove all plants
- Don't feed fish in cold weather
- Don't let the pond freeze solid

## Spring Preparation

When spring arrives, you'll be ready to follow the Spring Opening Checklist for a smooth start.`,
  },
  {
    slug: 'clarity-algae-basics',
    title: 'Water Clarity & Algae Control Basics',
    shortDescription: 'Understanding and managing common pond water quality issues.',
    category: 'troubleshooting',
    content: `# Water Clarity & Algae Control Basics

Clear, healthy water is the goal of every pond owner. Here's how to achieve and maintain it.

## Understanding Algae

Algae is a natural part of pond ecosystems, but excessive growth indicates an imbalance.

### Types of Algae

1. **Green Water (Planktonic)**: Tiny algae that turn water green
2. **String Algae (Filamentous)**: Long, hair-like strands
3. **Blue-Green Algae (Cyanobacteria)**: Can be harmful

## Root Causes

- **Excess nutrients**: Fish waste, decaying organic matter, overfeeding
- **Too much sunlight**: Direct sun for 6+ hours daily
- **Insufficient filtration**: Biological filter not established
- **Overstocking**: Too many fish for pond size

## Solutions

### 1. Improve Filtration

- Ensure your biological filter is properly sized
- Clean mechanical filters regularly (but not too often—you need beneficial bacteria)
- Consider adding a UV sterilizer for green water

### 2. Reduce Nutrients

- **Don't overfeed**: Feed only what fish eat in 5 minutes, 1-2 times daily
- **Remove debris**: Net leaves and organic matter regularly
- **Add plants**: Aquatic plants compete with algae for nutrients

### 3. Add Beneficial Bacteria

Beneficial bacteria break down waste and reduce nutrients that feed algae. Add regularly, especially after cleanings.

### 4. Shade the Pond

- Add floating plants (water lilies, water lettuce)
- Install shade cloth if needed
- Plant trees or shrubs nearby (but watch for leaf drop)

### 5. Physical Removal

For string algae:
- Use a brush or rake to remove manually
- Consider barley straw (natural algae inhibitor)

## Water Testing

Regular testing helps catch problems early:

- **pH**: 6.5-8.5 (stable is more important than exact number)
- **Ammonia**: 0 ppm (toxic to fish)
- **Nitrite**: 0 ppm (toxic to fish)
- **Nitrate**: Below 40 ppm (high levels feed algae)

## When to Seek Help

If you've tried these steps and water remains cloudy or algae persists, a professional can:
- Assess your filtration system
- Test for specific imbalances
- Recommend targeted treatments

## Prevention

The best algae control is prevention:
- Maintain proper fish stocking levels
- Feed appropriately
- Keep filtration running
- Regular maintenance`,
  },
];

export function getDIYGuideBySlug(slug: string): DIYGuide | undefined {
  return diyGuides.find((g) => g.slug === slug);
}

export function getDIYGuidesByCategory(category: DIYGuide['category']): DIYGuide[] {
  return diyGuides.filter((g) => g.category === category);
}

