import { Product, CustomerOrder, StockHealthItem, TodoItem } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    name: 'Bols en Céramique',
    category: 'Céramiques',
    sku: 'CER-001',
    purchasePrice: 6.5,
    sellingPrice: 18.0,
    currentStock: 42,
    minStockAlert: 10,
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80',
    description: 'Bols artisanaux tournés à la main en grès naturel avec finition émaillée douce. Résistant au micro-ondes et lave-vaisselle.',
    variants: [
      { id: 'v1', name: 'Grand Bol Salade', colorName: 'Grès Naturel', colorHex: '#D7C4B7', stock: 24, status: 'good' },
      { id: 'v2', name: 'Bol Petit Déjeuner', colorName: 'Blanc Moucheté', colorHex: '#F0ECE1', stock: 12, status: 'good' },
      { id: 'v3', name: 'Ramequin Tapas', colorName: 'Terre d\'Ocre', colorHex: '#C57D56', stock: 6, status: 'good' },
    ],
    history: [
      {
        id: 'h1',
        productId: 'prod-001',
        productName: 'Bols en Céramique',
        type: 'restock',
        quantity: 20,
        date: 'Aujourd\'hui, 10:30',
        timestamp: Date.now() - 1000 * 60 * 60 * 2,
        note: 'Cuisson au four de l\'atelier terminée.',
        author: 'Léo (Artisan)',
      },
      {
        id: 'h2',
        productId: 'prod-001',
        productName: 'Bols en Céramique',
        type: 'sale',
        quantity: -2,
        date: 'Hier, 16:20',
        timestamp: Date.now() - 1000 * 60 * 60 * 24,
        note: 'Vente en boutique physique',
        author: 'Caisse 1',
        profit: 23,
      }
    ]
  },
  {
    id: 'prod-002',
    name: 'Tasse Artisanale \'Aube\'',
    category: 'Céramiques',
    sku: 'CER-002',
    purchasePrice: 5.0,
    sellingPrice: 15.0,
    currentStock: 42,
    minStockAlert: 12,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    description: 'Une tasse réconfortante pour bien commencer la journée. Fabriquée à la main avec amour et une touche d\'argile locale.',
    variants: [
      { id: 'v2-1', name: 'Blanc Crème', colorName: 'Blanc Crème', colorHex: '#F5EFE6', stock: 24, status: 'good' },
      { id: 'v2-2', name: 'Terre Cuite', colorName: 'Terre Cuite', colorHex: '#A8573C', stock: 8, status: 'low' },
      { id: 'v2-3', name: 'Vert Sauge', colorName: 'Vert Sauge', colorHex: '#6B8773', stock: 10, status: 'good' },
    ],
    history: [
      {
        id: 'h2-1',
        productId: 'prod-002',
        productName: 'Tasse Artisanale \'Aube\'',
        type: 'restock',
        quantity: 12,
        date: 'Aujourd\'hui, 10:30',
        timestamp: Date.now() - 1000 * 60 * 60 * 3,
        note: 'Reçu +12 Tasses Terre Cuite du four.',
        author: 'Atelier Céramique',
      },
      {
        id: 'h2-2',
        productId: 'prod-002',
        productName: 'Tasse Artisanale \'Aube\'',
        type: 'sale',
        quantity: -3,
        date: 'Hier, 15:45',
        timestamp: Date.now() - 1000 * 60 * 60 * 22,
        note: 'Vendu -3 Tasses Blanc Crème à Mme. Dupont.',
        author: 'Boutique Web',
        profit: 30,
      },
      {
        id: 'h2-3',
        productId: 'prod-002',
        productName: 'Tasse Artisanale \'Aube\'',
        type: 'adjustment',
        quantity: 0,
        date: 'Il y a 3 jours',
        timestamp: Date.now() - 1000 * 60 * 60 * 72,
        note: 'Inventaire vérifié par Léo. Tout est bon !',
        author: 'Léo (Inventaire)',
      }
    ]
  },
  {
    id: 'prod-003',
    name: 'Serviettes en Lin',
    category: 'Textile de Maison',
    sku: 'TEX-045',
    purchasePrice: 4.2,
    sellingPrice: 12.5,
    currentStock: 5,
    minStockAlert: 8,
    image: 'https://images.unsplash.com/photo-1595079672139-bfd9472e3794?auto=format&fit=crop&w=800&q=80',
    description: 'Serviettes de table 100% lin lavé européen. Douceur incomparable et texture froissée naturelle au charme intemporel.',
    variants: [
      { id: 'v3-1', name: 'Terracotta Pastel', colorName: 'Pêche Poudrée', colorHex: '#E29578', stock: 2, status: 'low' },
      { id: 'v3-2', name: 'Bleu Brume', colorName: 'Bleu Ciel', colorHex: '#A5C4D4', stock: 3, status: 'low' },
    ],
    history: [
      {
        id: 'h3-1',
        productId: 'prod-003',
        productName: 'Serviettes en Lin',
        type: 'sale',
        quantity: -4,
        date: 'Hier, 11:15',
        timestamp: Date.now() - 1000 * 60 * 60 * 28,
        note: 'Commande client #1039',
        profit: 33.2,
      }
    ]
  },
  {
    id: 'prod-004',
    name: 'Bougies Naturelles',
    category: 'Senteurs & Ambiance',
    sku: 'BGI-012',
    purchasePrice: 3.5,
    sellingPrice: 14.0,
    currentStock: 0,
    minStockAlert: 6,
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80',
    description: 'Bougies artisanales moulées en cire d\'abeille et cire de soja biologique, mèche coton non traité.',
    variants: [
      { id: 'v4-1', name: 'Duo Cannelé', colorName: 'Écru Naturel', colorHex: '#ECE7DE', stock: 0, status: 'empty' },
      { id: 'v4-2', name: 'Cierge Végétal', colorName: 'Miel Doré', colorHex: '#DEBA72', stock: 0, status: 'empty' },
    ],
    history: [
      {
        id: 'h4-1',
        productId: 'prod-004',
        productName: 'Bougies Naturelles',
        type: 'sale',
        quantity: -6,
        date: 'Il y a 2 jours',
        timestamp: Date.now() - 1000 * 60 * 60 * 48,
        note: 'Rupture après vente marché de créateurs',
        profit: 63,
      }
    ]
  },
  {
    id: 'prod-005',
    name: 'Vase "Terre Cuite"',
    category: 'Céramiques',
    sku: 'CER-003',
    purchasePrice: 14.0,
    sellingPrice: 38.0,
    currentStock: 14,
    minStockAlert: 5,
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
    description: 'Vase sculptural aux lignes organiques. Idéal pour bouquets de fleurs séchées ou branches de pivoines.',
    variants: [
      { id: 'v5-1', name: 'Taille M (22cm)', colorName: 'Argile Ocre', colorHex: '#A25942', stock: 9, status: 'good' },
      { id: 'v5-2', name: 'Taille L (30cm)', colorName: 'Terre Noire', colorHex: '#3D312A', stock: 5, status: 'good' },
    ],
    history: []
  },
  {
    id: 'prod-006',
    name: 'Lot Carnets "Nature"',
    category: 'Papeterie',
    sku: 'PAP-088',
    purchasePrice: 3.8,
    sellingPrice: 11.0,
    currentStock: 18,
    minStockAlert: 5,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    description: 'Lot de 2 carnets reliés fil de lin, papier kraft recyclé 120g/m² idéal pour le dessin ou l\'écriture intime.',
    variants: [],
    history: []
  },
  {
    id: 'prod-007',
    name: 'Plateau en Bois Brut',
    category: 'Art de la table',
    sku: 'ART-007',
    purchasePrice: 12.0,
    sellingPrice: 34.0,
    currentStock: 8,
    minStockAlert: 4,
    image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80',
    description: 'Plateau de service en chêne massif huilé à l\'huile de lin biologique, bords biseautés fait main.',
    variants: [],
    history: []
  }
];

export const INITIAL_ORDERS: CustomerOrder[] = [
  {
    id: 'ord-1042',
    orderNumber: '1042',
    customerName: 'Sophie Martin',
    city: 'Paris',
    timeAgo: 'Il y a 2h',
    createdAt: '2026-09-01T08:11:00Z',
    status: 'to_prepare',
    totalAmount: 66.0,
    items: [
      { productName: 'Vase "Terre Cuite"', quantity: 1, price: 38.0, image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=200&q=80' },
      { productName: 'Bougies Artisanales', quantity: 2, price: 14.0, image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=200&q=80' },
    ]
  },
  {
    id: 'ord-1043',
    orderNumber: '1043',
    customerName: 'Julien Dubois',
    city: 'Lyon',
    timeAgo: 'Hier',
    createdAt: '2026-08-31T15:20:00Z',
    status: 'to_prepare',
    totalAmount: 33.0,
    items: [
      { productName: 'Lot Carnets "Nature"', quantity: 3, price: 11.0, image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=200&q=80' },
    ]
  },
  {
    id: 'ord-1041',
    orderNumber: '1041',
    customerName: 'Emma L.',
    city: 'Bordeaux',
    timeAgo: 'Hier',
    createdAt: '2026-08-31T10:45:00Z',
    status: 'ready_to_ship',
    totalAmount: 45.0,
    items: [
      { productName: 'Tasse Artisanale \'Aube\' (Blanc Crème)', quantity: 3, price: 15.0, image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=200&q=80' },
    ]
  },
  {
    id: 'ord-1040',
    orderNumber: '1040',
    customerName: 'Antoine Moreau',
    city: 'Nantes',
    timeAgo: 'Il y a 2 jours',
    createdAt: '2026-08-30T14:10:00Z',
    status: 'shipped',
    totalAmount: 54.0,
    items: [
      { productName: 'Bols en Céramique', quantity: 3, price: 18.0, image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=200&q=80' }
    ]
  }
];

export const INITIAL_HEALTH_ITEMS: StockHealthItem[] = [
  {
    id: 'sh-1',
    name: 'Matières premières (Terre cuite)',
    percentage: 85,
    level: 'good',
    detail: 'En stock (85%)'
  },
  {
    id: 'sh-2',
    name: 'Emballages & Cartons',
    percentage: 40,
    level: 'medium',
    detail: 'Moyen (40%)'
  },
  {
    id: 'sh-3',
    name: 'Vernis Brillant (Transparent)',
    percentage: 12,
    level: 'low',
    detail: 'Stock faible (12%)'
  }
];

export const INITIAL_TODOS: TodoItem[] = [
  {
    id: 'td-1',
    title: 'Commander du Vernis Brillant',
    subtitle: 'Urgent - Reste 2 bouteilles',
    urgent: true,
    completed: false
  },
  {
    id: 'td-2',
    title: 'Vérifier livraison fournisseur Dupont',
    subtitle: 'Prévue ce matin',
    urgent: false,
    completed: false
  },
  {
    id: 'td-3',
    title: 'Préparer les colis de Sophie & Julien',
    subtitle: 'Ramassage postal à 16h30',
    urgent: false,
    completed: true
  }
];
