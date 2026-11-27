// Content for the portfolio sections (poems, interviews, publications, awards, reviews, gallery).
// Fields left empty are hidden on the site, so an entry can go live before every detail is known.
import authorImg from '../assets/updated-author.jpg';
import starfishImg from '../assets/books/when_mystic_meets_starfish.jpeg';
import caravanImg from '../assets/books/caravan_of_the_cosmos.jpeg';
import poetryContestCertificate from '../assets/international_poem_certificate.jpeg';

export const AUTHOR_LINKS = {
  goodreads: 'https://www.goodreads.com/author/show/21206932.Madhushree_Das',
  amazon: 'https://www.amazon.in/~/e/B0B4PQKJBN',
  instagram: 'https://www.instagram.com/mystic_mithi25'
};

// Where each book can be bought or found online, keyed by book id (see INITIAL_BOOKS in admin/adminStore.js).
export const bookLinks = {
  'when-the-mystic-meets-a-starfish': [
    { store: 'Amazon', url: 'https://www.amazon.in/dp/8194478510' },
    // TODO: this is the author's Goodreads profile, not the book's own Goodreads page
    { store: 'Goodreads', url: 'https://www.goodreads.com/user/show/119793453-mystic-mithi' },
    { store: 'Google', url: 'https://g.co/kgs/wF3upq' },
    { store: 'AbeBooks', url: 'https://www.abebooks.com/servlet/BookDetailsPL?bi=32024234818' }
  ],
  'caravan-to-the-cosmos': [
    { store: 'Amazon', url: 'https://www.amazon.in/Caravan-Cosmos-Madhushree-Das/dp/9355651597' },
    { store: 'Goodreads', url: 'https://www.goodreads.com/book/show/61330776-caravan-to-the-cosmos' }
  ]
};

// Individual poems published in magazines and journals.
export const publishedPoems = [
  {
    id: 'monalisa',
    title: 'Monalisa',
    publication: 'DS Magazine',
    date: 'September 2023',
    link: 'https://dsmag.in/2023/09/24/madhushree-das-poem-monalisa/',
    excerpt: '' // TODO: two or three lines from the poem
  }
];

export const interviews = [
  {
    id: 'waking-writer-2023',
    kind: 'Author Interview',
    outlet: 'Waking Writer',
    outletNote: 'International literary platform',
    title: 'Madhushree Das, author of When the Mystic Meets a Starfish',
    date: 'September 2023',
    link: 'https://wakingwriter.com/2023/09/08/madhushree-das-author-of-when-the-mystic-meets-a-starfish/',
    summary:
      'A conversation about what moves her to write, how she came to call herself a poet, her two collections, and the poets who shaped her voice.',
    topics: [
      'What inspires her to write',
      'When she first felt like a writer',
      'Why poetry, and what people get wrong about it',
      'Her latest book, Caravan to the Cosmos',
      'Advice for aspiring authors',
      'The poets who influenced her'
    ],
    quotes: [
      'Indeed, poetry feels like breathing.',
      'Empowering people through the magic of words is my mysticism.',
      'Poetry is that panacea that heals the hazardous and haphazard, horrendous, and most haggard heart of anyone’s.'
    ]
  }
];

// Full publication record: books, poems in magazines, anthology contributions.
export const literaryPublications = [
  {
    id: 'starfish',
    year: '2020',
    title: 'When the Mystic Meets a Starfish',
    kind: 'Poetry collection · as _Inkling Ink',
    detail: '25 July 2020 · ISBN 9788194478515',
    publisher: 'Delhi Poetry Slam',
    to: '/books/when-the-mystic-meets-a-starfish'
  },
  {
    id: 'caravan',
    year: '2022',
    title: 'Caravan to the Cosmos',
    kind: 'Poetry collection',
    detail: '31 May 2022 · ISBN 9789355651594',
    publisher: 'The Write Order Publications',
    to: '/books/caravan-to-the-cosmos'
  },
  {
    id: 'monalisa',
    year: '2023',
    title: 'Monalisa',
    kind: 'Poem',
    detail: '',
    publisher: 'DS Magazine',
    to: '/poems'
  }
  // TODO: add anthologies and journal contributions here
];

// Awards and certificates. `image` is optional (shown full size on click).
export const awards = [
  {
    id: 'iitt-international-poetry-2020',
    year: '2020',
    date: '30 June 2020',
    title: 'International Poetry Writing Contest',
    presenter: 'IITT Group Events',
    citation: 'Certificate to encourage budding talent',
    note: 'Awarded for a creative piece of distinction, selected for publication on the IITT event social media platform.',
    image: poetryContestCertificate,
    imageAlt: 'International Poetry Writing Contest certificate awarded to Madhushree Das by IITT Group Events, 30 June 2020'
  }
];

// TODO: placeholder reviews — replace with real reader reviews before launch
export const reviews = [
  {
    name: 'Debjani Sarma',
    city: 'Kolkata',
    book: 'When the Mystic Meets a Starfish',
    text: 'Reading ‘When the Mystic Meets a Starfish’ felt like someone sitting beside me in the dark and holding my hand without asking why I was crying. Her words have an almost sacred gentleness to them.'
  },
  {
    name: 'Rahul Sen',
    city: 'Bangalore',
    book: 'Caravan to the Cosmos',
    text: '‘Caravan to the Cosmos’ is the kind of book you read with a pencil in hand. Every few lines demand to be underlined — science, myth and philosophy woven into music.'
  },
  {
    name: 'Priyanka Mehta',
    city: 'Mumbai',
    book: 'When the Mystic Meets a Starfish',
    text: 'I ordered a signed copy as a gift for myself. It arrived beautifully packaged with an author note. Truly one of the most moving poetry collections I have read this year.'
  },
  {
    name: 'Ankita Sharma',
    city: 'Pune',
    book: 'When the Mystic Meets a Starfish',
    text: 'I keep this book on my nightstand and open it to a random page whenever the day feels heavy. Somehow it always knows exactly what I needed to hear.'
  },
  {
    name: 'Sneha Kapoor',
    city: 'New Delhi',
    book: 'Caravan to the Cosmos',
    text: 'Quiet, thoughtful and deeply honest. I finished it in one sitting and then started it again the very next morning.'
  }
];

// TODO: add photos from readings, launches and events
export const gallery = [
  { id: 'author', src: authorImg, alt: 'Madhushree Das (Mystic Mithi)', caption: 'Madhushree Das · Mystic Mithi' },
  { id: 'starfish', src: starfishImg, alt: 'When the Mystic Meets a Starfish, book cover', caption: 'When the Mystic Meets a Starfish' },
  { id: 'caravan', src: caravanImg, alt: 'Caravan to the Cosmos, book cover', caption: 'Caravan to the Cosmos' }
];

// WorldCat (global library catalogue) records for each book.
export const worldcatRecords = [
  {
    bookId: 'when-the-mystic-meets-a-starfish',
    title: 'When the Mystic Meets a Starfish',
    year: '2020',
    image: starfishImg,
    url: 'https://search.worldcat.org/title/1255461260'
  },
  {
    bookId: 'caravan-to-the-cosmos',
    title: 'Caravan to the Cosmos',
    year: '2022',
    image: caravanImg,
    url: 'https://search.worldcat.org/title/1390805095'
  }
];

// Libraries whose catalogues hold her books, drawn as gold lights on the globe.
// Source: the author's official portfolio (authors_bio/, Oct 2026).
// She is also catalogued with the Peter Pal library supplier collections in Australia.
export const libraryFootprint = [
  {
    country: 'United States',
    point: [39.8, -98.6],
    libraries: [
      { name: 'Harvard University Library', city: 'Cambridge, Massachusetts', location: [42.377, -71.117] },
      { name: 'Library of Congress', city: 'Washington, D.C.', location: [38.889, -77.005] },
      { name: 'Princeton University Library', city: 'Princeton, New Jersey', location: [40.343, -74.651] },
      { name: 'University of Chicago Library', city: 'Chicago, Illinois', location: [41.789, -87.6] },
      { name: 'University of Illinois Library', city: 'Urbana-Champaign, Illinois', location: [40.105, -88.229] },
      { name: 'University of Washington Libraries', city: 'Seattle, Washington', location: [47.655, -122.308] },
      { name: 'New York State Library', city: 'Albany, New York', location: [42.649, -73.76] },
      { name: 'Forbes Library', city: 'Northampton, Massachusetts', location: [42.317, -72.638] },
      { name: 'Wrentham Public Library', city: 'Wrentham, Massachusetts', location: [42.067, -71.328] },
      { name: 'Lunenburg Public Library', city: 'Lunenburg, Massachusetts', location: [42.594, -71.725] },
      { name: 'Northfield Public Library', city: 'Northfield, Minnesota', location: [44.458, -93.161] }
    ]
  },
  {
    country: 'United Kingdom',
    point: [52.5, -1.5],
    libraries: [
      { name: 'Bodleian Libraries, University of Oxford', city: 'Oxford, England', location: [51.754, -1.254] },
      { name: 'Cambridge University Library', city: 'Cambridge, England', location: [52.205, 0.108] },
      { name: 'The British Library', city: 'London, England', location: [51.53, -0.127] },
      { name: 'Senate House Library, University of London', city: 'London, England', location: [51.521, -0.129] },
      { name: 'National Library of Scotland', city: 'Edinburgh, Scotland', location: [55.949, -3.192] },
      { name: 'Peckham Library', city: 'London, England', location: [51.474, -0.069] },
      { name: 'Redbridge Central Library', city: 'Ilford, Essex', location: [51.559, 0.072] }
    ]
  },
  {
    country: 'Canada',
    point: [49.28, -123.116],
    libraries: [{ name: 'Vancouver Public Library', city: 'Vancouver, British Columbia', location: [49.28, -123.116] }]
  },
  {
    country: 'Ireland',
    point: [53.365, -6.296],
    libraries: [{ name: 'Cabra Library and Bibliographic Centre', city: 'Dublin', location: [53.365, -6.296] }]
  },
  {
    country: 'Denmark',
    point: [55.673, 12.583],
    libraries: [{ name: 'The Royal Library', city: 'Copenhagen', location: [55.673, 12.583] }]
  },
  {
    country: 'Germany',
    point: [50.5, 10.5],
    libraries: [
      { name: 'German National Library', city: 'Frankfurt am Main & Leipzig', location: [50.131, 8.683] },
      { name: 'University of Regensburg Library', city: 'Regensburg', location: [49.0, 12.095] },
      { name: 'University of Bayreuth Library', city: 'Bayreuth', location: [49.928, 11.586] }
    ]
  },
  {
    country: 'Austria',
    point: [48.228, 15.331],
    libraries: [{ name: 'Melk Abbey Library', city: 'Melk', location: [48.228, 15.331] }]
  },
  {
    country: 'Italy',
    point: [41.903, 12.497],
    libraries: [{ name: 'National Central Library of Rome', city: 'Rome', location: [41.903, 12.497] }]
  },
  {
    country: 'Egypt',
    point: [31.209, 29.909],
    libraries: [{ name: 'Bibliotheca Alexandrina', city: 'Alexandria', location: [31.209, 29.909] }]
  },
  {
    country: 'Qatar',
    point: [25.316, 51.439],
    libraries: [{ name: 'Qatar National Library', city: 'Doha', location: [25.316, 51.439] }]
  },
  {
    country: 'Singapore',
    point: [1.297, 103.854],
    libraries: [{ name: 'National Library Board', city: 'Singapore', location: [1.297, 103.854] }]
  },
  {
    country: 'Taiwan',
    point: [25.03, 121.53],
    libraries: [
      { name: 'National Taiwan University Library', city: 'Taipei', location: [25.017, 121.54] },
      { name: 'National Central Library', city: 'Taipei', location: [25.035, 121.516] }
    ]
  },
  {
    country: 'Australia',
    point: [-31.96, 115.88],
    libraries: [
      { name: 'City of Perth Library', city: 'Perth, Western Australia', location: [-31.955, 115.861] },
      { name: 'Victoria Park Library', city: 'Victoria Park, Western Australia', location: [-31.976, 115.903] }
    ]
  },
  {
    country: 'South Africa',
    point: [-33.93, 18.6],
    libraries: [
      { name: 'Central Library', city: 'Cape Town', location: [-33.925, 18.423] },
      { name: 'Stellenbosch University Library', city: 'Stellenbosch', location: [-33.932, 18.866] }
    ]
  }
];

export const libraryCount = libraryFootprint.reduce((n, c) => n + c.libraries.length, 0);

// One gold light per library, or one per country where no library is named.
export const footprintMarkers = libraryFootprint.flatMap((c) =>
  c.libraries.length
    ? c.libraries.map((l) => ({ location: l.location, size: 0.035 }))
    : [{ location: c.point, size: 0.05 }]
);
