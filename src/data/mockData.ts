
export interface Wine {
  id: string;
  name: string;
  winery: string;
  wineryId: string;
  year: number;
  description: string;
  price: number;
  imageUrl: string;
  type: 'Red' | 'White' | 'Rosé' | 'Sparkling';
  varietal: string;
  region: string;
  country: string;
  rating: number;
  minOrderQuantity: number;
  available: boolean;
  tags: string[];
}

export interface Winery {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
  coverImageUrl: string;
  location: {
    region: string;
    country: string;
  };
  established: number;
  featured: boolean;
}

export const wineries: Winery[] = [
  {
    id: 'winery-1',
    name: 'Sula Vineyards',
    description: 'India\'s largest wine producer, known for pioneering wine production in Nashik and introducing Indians to wine culture.',
    logoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ55VA6Thc7AVlCEIi0Nahmg9oBh3Tm9h6mMw&s',
    coverImageUrl: 'https://storage.googleapis.com/goa-app-12a91.appspot.com/2024-08-12T12%3A07%3A27.947Zsula1.webp?GoogleAccessId=firebase-adminsdk-zeqcj%40goa-app-12a91.iam.gserviceaccount.com&Expires=16447017600&Signature=TWSdqbRtxOFdvkN%2FIzaLOJnd9JuV8pNwpOFVbRi0yHLL1b%2FfjNmxlGE1k5TjQ6BiAz4tpAA0zIhK7zQykO%2FOyXWI48G9ROPRqRQywkTuteuYNYk2lyxAGMBmDfEbk39kMJcgXv%2BmiMMJHrTq5QjWYKILe%2Br7XsgIuaM3%2FUSGYaMjSTYz1id%2BbwRbYqkw5ChvY%2FharQ7vBJN3yL%2BvATUB7X9YZF24cofbUig1iaBLd9rDSiKLLGtpbBh6RJgq40K8UTAHmybTNn%2FdZVulzrhrzBf7yQQemBJ72M%2BBzwCGP1oUN9mW4ztDrOPUBbicNrWtddY3KLSiVkiX%2B8inZSisfA%3D%3D',
    location: {
      region: 'Nashik',
      country: 'India'
    },
    established: 1999,
    featured: true
  },
  {
    id: 'winery-2',
    name: 'York Winery',
    description: 'A boutique winery producing award-winning wines in the heart of Nashik Valley.',
    logoUrl: 'https://source.unsplash.com/random/200x200/?winery,logo',
    coverImageUrl: 'https://source.unsplash.com/random/1200x400/?vineyard,india',
    location: {
      region: 'Nashik',
      country: 'India'
    },
    established: 2005,
    featured: true
  },
  {
    id: 'winery-3',
    name: 'Grover Zampa',
    description: 'One of India\'s oldest and most prestigious wineries, combining French expertise with Indian terroir.',
    logoUrl: 'https://source.unsplash.com/random/200x200/?winery,logo',
    coverImageUrl: 'https://source.unsplash.com/random/1200x400/?vineyard,india',
    location: {
      region: 'Nashik',
      country: 'India'
    },
    established: 1992,
    featured: false
  },
  {
    id: 'winery-4',
    name: 'Fratelli Wines',
    description: 'A collaboration between Italian and Indian families creating wines that blend international standards with Indian passion.',
    logoUrl: 'https://source.unsplash.com/random/200x200/?winery,logo',
    coverImageUrl: 'https://source.unsplash.com/random/1200x400/?vineyard,india',
    location: {
      region: 'Nashik',
      country: 'India'
    },
    established: 2007,
    featured: true
  },
  {
    id: 'winery-5',
    name: 'Vallonné Vineyards',
    description: 'A boutique winery specializing in French-style premium wines using sustainable practices.',
    logoUrl: 'https://source.unsplash.com/random/200x200/?winery,logo',
    coverImageUrl: 'https://source.unsplash.com/random/1200x400/?vineyard,india',
    location: {
      region: 'Nashik',
      country: 'India'
    },
    established: 2009,
    featured: false
  }
];

export const wines: Wine[] = [
  {
    id: 'wine-1',
    name: 'Cabernet Sauvignon Reserve',
    winery: 'Sula Vineyards',
    wineryId: 'winery-1',
    year: 2019,
    description: 'A full-bodied red wine with rich flavors of blackcurrant, black cherry, and subtle oak notes. Perfect with grilled meats.',
    price: 2800,
    imageUrl: 'https://source.unsplash.com/random/800x600/?wine,red',
    type: 'Red',
    varietal: 'Cabernet Sauvignon',
    region: 'Nashik',
    country: 'India',
    rating: 4.5,
    minOrderQuantity: 12,
    available: true,
    tags: ['Bold', 'Oaked', 'Export Quality']
  },
  {
    id: 'wine-2',
    name: 'Sauvignon Blanc',
    winery: 'York Winery',
    wineryId: 'winery-2',
    year: 2021,
    description: 'A crisp, aromatic white wine with notes of tropical fruits, green apple, and a refreshing finish.',
    price: 1200,
    imageUrl: 'https://source.unsplash.com/random/800x600/?wine,white',
    type: 'White',
    varietal: 'Sauvignon Blanc',
    region: 'Nashik',
    country: 'India',
    rating: 4.2,
    minOrderQuantity: 24,
    available: true,
    tags: ['Crisp', 'Aromatic', 'International Standard']
  },
  {
    id: 'wine-3',
    name: 'Chenin Blanc Reserve',
    winery: 'Sula Vineyards',
    wineryId: 'winery-1',
    year: 2020,
    description: 'A medium-bodied white wine with a perfect balance of fruit and acidity. Features notes of pear, apple, and honey.',
    price: 1500,
    imageUrl: 'https://source.unsplash.com/random/800x600/?wine,white',
    type: 'White',
    varietal: 'Chenin Blanc',
    region: 'Nashik',
    country: 'India',
    rating: 4.3,
    minOrderQuantity: 12,
    available: true,
    tags: ['Medium-bodied', 'Versatile', 'Award-winning']
  },
  {
    id: 'wine-4',
    name: 'Syrah Reserve',
    winery: 'Grover Zampa',
    wineryId: 'winery-3',
    year: 2018,
    description: 'An intense, spicy red wine with black pepper, dark berries, and a hint of chocolate on the palate.',
    price: 2500,
    imageUrl: 'https://source.unsplash.com/random/800x600/?wine,red',
    type: 'Red',
    varietal: 'Syrah',
    region: 'Nashik',
    country: 'India',
    rating: 4.6,
    minOrderQuantity: 6,
    available: true,
    tags: ['Spicy', 'Full-bodied', 'Premium']
  },
  {
    id: 'wine-5',
    name: 'Brut Rosé',
    winery: 'Fratelli Wines',
    wineryId: 'winery-4',
    year: 2022,
    description: 'A sparkling wine with delicate bubbles, strawberry aromas, and a crisp, dry finish.',
    price: 1800,
    imageUrl: 'https://source.unsplash.com/random/800x600/?wine,sparkling',
    type: 'Sparkling',
    varietal: 'Chenin Blanc, Pinot Noir',
    region: 'Nashik',
    country: 'India',
    rating: 4.4,
    minOrderQuantity: 12,
    available: true,
    tags: ['Sparkling', 'Celebration', 'Elegant']
  },
  {
    id: 'wine-6',
    name: 'Merlot Reserve',
    winery: 'Vallonné Vineyards',
    wineryId: 'winery-5',
    year: 2019,
    description: 'A smooth red wine with gentle tannins and flavors of plum, black cherry, and herbs.',
    price: 2200,
    imageUrl: 'https://source.unsplash.com/random/800x600/?wine,red',
    type: 'Red',
    varietal: 'Merlot',
    region: 'Nashik',
    country: 'India',
    rating: 4.3,
    minOrderQuantity: 6,
    available: true,
    tags: ['Smooth', 'Medium-bodied', 'Food-friendly']
  },
  {
    id: 'wine-7',
    name: 'Late Harvest Chenin Blanc',
    winery: 'Sula Vineyards',
    wineryId: 'winery-1',
    year: 2020,
    description: 'A dessert wine with luscious sweetness, balanced acidity, and flavors of honey, apricot, and tropical fruits.',
    price: 1600,
    imageUrl: 'https://source.unsplash.com/random/800x600/?wine,dessert',
    type: 'White',
    varietal: 'Chenin Blanc',
    region: 'Nashik',
    country: 'India',
    rating: 4.7,
    minOrderQuantity: 6,
    available: true,
    tags: ['Sweet', 'Dessert', 'Special Reserve']
  },
  {
    id: 'wine-8',
    name: 'Chardonnay',
    winery: 'Fratelli Wines',
    wineryId: 'winery-4',
    year: 2021,
    description: 'A balanced white wine with notes of tropical fruits, vanilla, and a buttery texture from oak aging.',
    price: 1400,
    imageUrl: 'https://source.unsplash.com/random/800x600/?wine,white',
    type: 'White',
    varietal: 'Chardonnay',
    region: 'Nashik',
    country: 'India',
    rating: 4.1,
    minOrderQuantity: 12,
    available: false,
    tags: ['Oaked', 'Buttery', 'Premium']
  }
];

export interface CartItem {
  wine: Wine;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  company: string;
  role: 'buyer' | 'seller';
  country: string;
}

// Initial cart state (empty)
export const emptyCart: CartItem[] = [];
