// Verified business facts only (Google Business Profile). Edit here; every section reads from this.
export const SITE = {
  name: 'Crystals World',
  type: 'Rock & Crystal Shop',
  street: '3202 Guadalupe St Ste C',
  city: 'Austin, TX 78705',
  phone: '(737) 320-8079',
  tel: 'tel:+17373208079',
  rating: '5.0',
  reviews: 203,
  directions: 'https://www.google.com/maps/dir/?api=1&destination=Crystals+World,+3202+Guadalupe+St+Ste+C,+Austin,+TX+78705',
  googleProfile: 'https://www.google.com/maps/search/?api=1&query=Crystals+World+3202+Guadalupe+St+Ste+C+Austin+TX+78705',
  // Review excerpts supplied from the Google listing — do not add invented ones.
  quotes: [
    'This store has the most beautiful pieces, the vibe and the staff is unmatched!',
    'Such a nice place with nice owner, gave me nice discount for my first visit!',
    'Great service and super clean organized environment.',
  ],
}

// Photography is the shop's own (supplied files + its Instagram/TikTok). Drop larger originals into
// public/images with the same file names for a crisper result.
const base = import.meta.env.BASE_URL
export const img = (name: string) => `${base}images/${name}.jpg`
