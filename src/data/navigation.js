// Site navigation, shared by the navbar, mobile drawer and footer.
// Items with `items` render as a dropdown on desktop and a labelled group in the drawer.
export const NAV_LEFT = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/books', label: 'Books' },
  {
    label: 'Writings',
    items: [
      { to: '/poems', label: 'Published Poems' },
      { to: '/publications', label: 'Literary Publications' }
    ]
  }
];

export const NAV_RIGHT = [
  {
    label: 'Press',
    items: [
      { to: '/interviews', label: 'Interviews & Features' },
      { to: '/global-footprint', label: 'Global Literary Footprint' },
      { to: '/awards', label: 'Awards & Certificates' },
      { to: '/reviews', label: 'Reviews & Testimonials' }
    ]
  },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' }
];
