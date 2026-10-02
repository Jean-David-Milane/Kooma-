export interface FlutterFile {
  path: string;
  name: string;
  category: 'core' | 'theme' | 'models' | 'providers' | 'screens' | 'widgets';
  description: string;
  code: string;
}

export const FLUTTER_PROJECT_FILES: FlutterFile[] = [
  {
    path: 'pubspec.yaml',
    name: 'pubspec.yaml',
    category: 'core',
    description: 'Configuration du projet Flutter et dépendances (Provider, Google Fonts, Lucide Icons, Intl)',
    code: `name: artisan_stock
description: "Application mobile de gestion de stock et commandes pour boutique artisanale"
publish_to: 'none'
version: 1.0.0+1

environment:
  sdk: '>=3.0.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter
  provider: ^6.1.2
  google_fonts: ^6.2.1
  intl: ^0.19.0
  lucide_icons: ^0.252.0

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.0

flutter:
  uses-material-design: true
`
  },
  {
    path: 'lib/main.dart',
    name: 'main.dart',
    category: 'core',
    description: 'Point d\'entrée de l\'application avec initialisation du Provider et du thème terracotta',
    code: `import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';
import 'providers/stock_provider.dart';
import 'theme/app_theme.dart';
import 'screens/main_navigation_screen.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setSystemUIOverlayStyle(
    const SystemUiOverlayStyle(
      statusBarColor: Colors.transparent,
      statusBarIconBrightness: Brightness.dark,
    ),
  );
  runApp(const ArtisanStockApp());
}

class ArtisanStockApp extends StatelessWidget {
  const ArtisanStockApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => StockProvider()),
      ],
      child: MaterialApp(
        title: 'ArtisanStock',
        debugShowCheckedModeBanner: false,
        theme: AppTheme.lightTheme,
        home: const MainNavigationScreen(),
      ),
    );
  }
}
`
  },
  {
    path: 'lib/theme/app_theme.dart',
    name: 'app_theme.dart',
    category: 'theme',
    description: 'Thème Material 3 sur-mesure aux tons chauds Terre Cuite, Sable & Vert Sauge',
    code: `import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppTheme {
  // Palette artisanale chaleureuse (identique à l'image)
  static const Color terracotta = Color(0xFF9E3D1E);
  static const Color terracottaDark = Color(0xFF7F2F16);
  static const Color terracottaLight = Color(0xFFFDECE7);

  static const Color background = Color(0xFFFAF7F2);
  static const Color surface = Colors.white;
  static const Color surfaceMuted = Color(0xFFF5EDE3);
  static const Color border = Color(0xFFEDE4DA);

  static const Color sageGreen = Color(0xFF3B7A57);
  static const Color sageGreenLight = Color(0xFFDCECE1);
  static const Color sageGreenDark = Color(0xFF2B5539);

  static const Color ochre = Color(0xFFD48B28);
  static const Color ochreLight = Color(0xFFFEF3C7);
  static const Color ochreAccent = Color(0xFFF6C052);

  static const Color textMain = Color(0xFF2C1D18);
  static const Color textMuted = Color(0xFF8C7A70);
  static const Color textLight = Color(0xFFA6958A);

  static const Color danger = Color(0xFFC24134);
  static const Color dangerLight = Color(0xFFFEE2E2);

  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      scaffoldBackgroundColor: background,
      primaryColor: terracotta,
      colorScheme: const ColorScheme.light(
        primary: terracotta,
        secondary: sageGreen,
        surface: surface,
        error: danger,
        onPrimary: Colors.white,
        onSurface: textMain,
      ),
      textTheme: GoogleFonts.plusJakartaSansTextTheme().copyWith(
        displayLarge: GoogleFonts.fraunces(
          fontSize: 28,
          fontWeight: FontWeight.bold,
          color: terracotta,
        ),
        displayMedium: GoogleFonts.fraunces(
          fontSize: 22,
          fontWeight: FontWeight.bold,
          color: textMain,
        ),
        titleLarge: GoogleFonts.plusJakartaSans(
          fontSize: 16,
          fontWeight: FontWeight.w700,
          color: textMain,
        ),
      ),
      cardTheme: CardTheme(
        color: surface,
        elevation: 0,
        margin: EdgeInsets.zero,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20),
          side: const BorderSide(color: border, width: 1),
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: terracotta,
          foregroundColor: Colors.white,
          elevation: 0,
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 14),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16),
          ),
          textStyle: GoogleFonts.plusJakartaSans(
            fontSize: 14,
            fontWeight: FontWeight.w700,
          ),
        ),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: Colors.white,
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(16),
          borderSide: const BorderSide(color: border),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(16),
          borderSide: const BorderSide(color: border),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(16),
          borderSide: const BorderSide(color: terracotta, width: 1.5),
        ),
        hintStyle: const TextStyle(color: textLight, fontSize: 13),
      ),
    );
  }
}
`
  },
  {
    path: 'lib/models/product.dart',
    name: 'product.dart',
    category: 'models',
    description: 'Modèle de données des articles, déclinaisons couleurs et statuts de stock',
    code: `class ProductVariant {
  final String id;
  final String name;
  final String colorName;
  final int colorHex;
  int stock;
  String status; // 'good', 'low', 'empty'

  ProductVariant({
    required this.id,
    required this.name,
    required this.colorName,
    required this.colorHex,
    required this.stock,
    required this.status,
  });
}

class Product {
  final String id;
  final String name;
  final String category;
  final String sku;
  final double purchasePrice;
  final double sellingPrice;
  int currentStock;
  final int minStockAlert;
  final String image;
  final String description;
  final List<ProductVariant> variants;
  final List<StockHistoryItem> history;

  Product({
    required this.id,
    required this.name,
    required this.category,
    required this.sku,
    required this.purchasePrice,
    required this.sellingPrice,
    required this.currentStock,
    this.minStockAlert = 8,
    required this.image,
    required this.description,
    this.variants = const [],
    this.history = const [],
  });

  bool get isOutOfStock => currentStock == 0;
  bool get isLowStock => currentStock > 0 && currentStock <= minStockAlert;
}

class StockHistoryItem {
  final String id;
  final String date;
  final String note;
  final int quantity;

  StockHistoryItem({
    required this.id,
    required this.date,
    required this.note,
    required this.quantity,
  });
}
`
  },
  {
    path: 'lib/models/order.dart',
    name: 'order.dart',
    category: 'models',
    description: 'Modèle des commandes clients du jour et statuts d\'expédition',
    code: `enum OrderStatus { toPrepare, readyToShip, shipped }

class OrderItem {
  final String productName;
  final int quantity;
  final double price;
  final String? image;

  OrderItem({
    required this.productName,
    required this.quantity,
    required this.price,
    this.image,
  });
}

class CustomerOrder {
  final String id;
  final String orderNumber;
  final String customerName;
  final String city;
  final String timeAgo;
  final List<OrderItem> items;
  OrderStatus status;
  final double totalAmount;

  CustomerOrder({
    required this.id,
    required this.orderNumber,
    required this.customerName,
    required this.city,
    required this.timeAgo,
    required this.items,
    this.status = OrderStatus.toPrepare,
    required this.totalAmount,
  });
}
`
  },
  {
    path: 'lib/providers/stock_provider.dart',
    name: 'stock_provider.dart',
    category: 'providers',
    description: 'Gestionnaire d\'état central (State Management) avec calculs des KPI et mutations',
    code: `import 'package:flutter/material.dart';
import '../models/product.dart';
import '../models/order.dart';

class StockProvider extends ChangeNotifier {
  List<Product> _products = [
    Product(
      id: 'prod-001',
      name: 'Bols en Céramique',
      category: 'Céramiques',
      sku: 'CER-001',
      purchasePrice: 6.5,
      sellingPrice: 18.0,
      currentStock: 42,
      minStockAlert: 10,
      image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80',
      description: 'Bols artisanaux tournés à la main en grès naturel avec finition émaillée douce.',
      variants: [
        ProductVariant(id: 'v1', name: 'Grand Bol', colorName: 'Grès Naturel', colorHex: 0xFFD7C4B7, stock: 24, status: 'good'),
        ProductVariant(id: 'v2', name: 'Bol Moyen', colorName: 'Blanc Moucheté', colorHex: 0xFFF0ECE1, stock: 12, status: 'good'),
        ProductVariant(id: 'v3', name: 'Ramequin', colorName: 'Terre d\\'Ocre', colorHex: 0xFFC57D56, stock: 6, status: 'good'),
      ],
    ),
    Product(
      id: 'prod-002',
      name: 'Tasse Artisanale \\'Aube\\'',
      category: 'Céramiques',
      sku: 'CER-002',
      purchasePrice: 5.0,
      sellingPrice: 15.0,
      currentStock: 42,
      minStockAlert: 12,
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
      description: 'Une tasse réconfortante pour bien commencer la journée. Fabriquée à la main avec amour et une touche d\\'argile locale.',
      variants: [
        ProductVariant(id: 'v2-1', name: 'Blanc Crème', colorName: 'Blanc Crème', colorHex: 0xFFF5EFE6, stock: 24, status: 'good'),
        ProductVariant(id: 'v2-2', name: 'Terre Cuite', colorName: 'Terre Cuite', colorHex: 0xFFA8573C, stock: 8, status: 'low'),
        ProductVariant(id: 'v2-3', name: 'Vert Sauge', colorName: 'Vert Sauge', colorHex: 0xFF6B8773, stock: 10, status: 'good'),
      ],
      history: [
        StockHistoryItem(id: 'h1', date: 'Aujourd\\'hui, 10:30', note: 'Reçu +12 Tasses Terre Cuite du four.', quantity: 12),
        StockHistoryItem(id: 'h2', date: 'Hier, 15:45', note: 'Vendu -3 Tasses Blanc Crème à Mme. Dupont.', quantity: -3),
        StockHistoryItem(id: 'h3', date: 'Il y a 3 jours', note: 'Inventaire vérifié par Léo. Tout est bon !', quantity: 0),
      ],
    ),
    Product(
      id: 'prod-003',
      name: 'Serviettes en Lin',
      category: 'Textile de Maison',
      sku: 'TEX-045',
      purchasePrice: 4.2,
      sellingPrice: 12.5,
      currentStock: 5,
      minStockAlert: 8,
      image: 'https://images.unsplash.com/photo-1595079672139-bfd9472e3794?auto=format&fit=crop&w=800&q=80',
      description: 'Serviettes de table 100% lin lavé européen.',
    ),
    Product(
      id: 'prod-004',
      name: 'Bougies Naturelles',
      category: 'Senteurs & Ambiance',
      sku: 'BGI-012',
      purchasePrice: 3.5,
      sellingPrice: 14.0,
      currentStock: 0,
      minStockAlert: 6,
      image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80',
      description: 'Bougies artisanales en cire d\\'abeille et soja bio.',
    ),
  ];

  List<CustomerOrder> _orders = [
    CustomerOrder(
      id: 'ord-1042',
      orderNumber: '1042',
      customerName: 'Sophie Martin',
      city: 'Paris',
      timeAgo: 'Il y a 2h',
      status: OrderStatus.toPrepare,
      totalAmount: 66.0,
      items: [
        OrderItem(productName: 'Vase "Terre Cuite"', quantity: 1, price: 38.0),
        OrderItem(productName: 'Bougies Artisanales', quantity: 2, price: 14.0),
      ],
    ),
    CustomerOrder(
      id: 'ord-1043',
      orderNumber: '1043',
      customerName: 'Julien Dubois',
      city: 'Lyon',
      timeAgo: 'Hier',
      status: OrderStatus.toPrepare,
      totalAmount: 33.0,
      items: [
        OrderItem(productName: 'Lot Carnets "Nature"', quantity: 3, price: 11.0),
      ],
    ),
    CustomerOrder(
      id: 'ord-1041',
      orderNumber: '1041',
      customerName: 'Emma L.',
      city: 'Bordeaux',
      timeAgo: 'Hier',
      status: OrderStatus.readyToShip,
      totalAmount: 45.0,
      items: [
        OrderItem(productName: 'Tasse Artisanale \\'Aube\\'', quantity: 3, price: 15.0),
      ],
    ),
  ];

  String _searchQuery = '';
  String _selectedCategory = 'Tous';

  List<Product> get products => _products;
  List<CustomerOrder> get orders => _orders;

  int get totalStockItems => _products.fold(0, (sum, p) => sum + p.currentStock);
  double get totalStockValue => _products.fold(0.0, (sum, p) => sum + (p.currentStock * p.sellingPrice));
  int get lowStockAlertCount => _products.where((p) => p.currentStock <= p.minStockAlert).length;

  List<Product> get filteredProducts {
    return _products.where((p) {
      final matchesQuery = p.name.toLowerCase().contains(_searchQuery.toLowerCase()) ||
          p.sku.toLowerCase().contains(_searchQuery.toLowerCase());
      final matchesCat = _selectedCategory == 'Tous' || p.category == _selectedCategory;
      return matchesQuery && matchesCat;
    }).toList();
  }

  void updateStock(String productId, int newQuantity, String reason) {
    final index = _products.indexWhere((p) => p.id == productId);
    if (index != -1) {
      _products[index].currentStock = newQuantity;
      notifyListeners();
    }
  }

  void updateVariantStock(String productId, String variantId, int newStock) {
    final prod = _products.firstWhere((p) => p.id == productId);
    final variant = prod.variants.firstWhere((v) => v.id == variantId);
    variant.stock = newStock;
    variant.status = newStock == 0 ? 'empty' : newStock <= 8 ? 'low' : 'good';
    prod.currentStock = prod.variants.fold(0, (sum, v) => sum + v.stock);
    notifyListeners();
  }

  void updateOrderStatus(String orderId, OrderStatus newStatus) {
    final order = _orders.firstWhere((o) => o.id == orderId);
    order.status = newStatus;
    notifyListeners();
  }

  void setSearchQuery(String q) {
    _searchQuery = q;
    notifyListeners();
  }

  void setSelectedCategory(String cat) {
    _selectedCategory = cat;
    notifyListeners();
  }
}
`
  },
  {
    path: 'lib/screens/main_navigation_screen.dart',
    name: 'main_navigation_screen.dart',
    category: 'screens',
    description: 'Barre de navigation principale avec badges et switch d\'écrans',
    code: `import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/stock_provider.dart';
import '../models/order.dart';
import '../theme/app_theme.dart';
import 'dashboard_screen.dart';
import 'stock_catalog_screen.dart';
import 'orders_screen.dart';

class MainNavigationScreen extends StatefulWidget {
  const MainNavigationScreen({super.key});

  @override
  State<MainNavigationScreen> createState() => _MainNavigationScreenState();
}

class _MainNavigationScreenState extends State<MainNavigationScreen> {
  int _selectedIndex = 0;

  final List<Widget> _screens = const [
    DashboardScreen(),
    StockCatalogScreen(),
    OrdersScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    final pendingOrders = context.watch<StockProvider>().orders
        .where((o) => o.status == OrderStatus.toPrepare)
        .length;

    return Scaffold(
      body: SafeArea(child: _screens[_selectedIndex]),
      bottomNavigationBar: Container(
        decoration: const BoxDecoration(
          color: AppTheme.background,
          border: Border(top: BorderSide(color: AppTheme.border, width: 1)),
        ),
        child: BottomNavigationBar(
          currentIndex: _selectedIndex,
          onTap: (idx) => setState(() => _selectedIndex = idx),
          backgroundColor: AppTheme.background,
          selectedItemColor: AppTheme.terracotta,
          unselectedItemColor: AppTheme.textMuted,
          selectedFontSize: 11,
          unselectedFontSize: 11,
          type: BottomNavigationBarType.fixed,
          elevation: 0,
          items: [
            const BottomNavigationBarItem(
              icon: Icon(Icons.dashboard_outlined),
              activeIcon: Icon(Icons.dashboard_rounded),
              label: 'Accueil',
            ),
            const BottomNavigationBarItem(
              icon: Icon(Icons.inventory_2_outlined),
              activeIcon: Icon(Icons.inventory_2_rounded),
              label: 'Mon Stock',
            ),
            BottomNavigationBarItem(
              icon: Badge(
                isLabelVisible: pendingOrders > 0,
                label: Text('$pendingOrders'),
                backgroundColor: AppTheme.terracotta,
                child: const Icon(Icons.local_shipping_outlined),
              ),
              activeIcon: const Icon(Icons.local_shipping_rounded),
              label: 'Commandes',
            ),
          ],
        ),
      ),
    );
  }
}
`
  },
  {
    path: 'lib/screens/dashboard_screen.dart',
    name: 'dashboard_screen.dart',
    category: 'screens',
    description: 'Écran Tableau de Bord avec métriques 2x2, scanner, santé du stock et café',
    code: `import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/stock_provider.dart';
import '../theme/app_theme.dart';
import 'stock_adjustment_screen.dart';

class DashboardScreen extends StatelessWidget {
  const DashboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final provider = context.watch<StockProvider>();

    return SingleChildScrollView(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // En-tête Bonjour !
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  const Icon(Icons.menu, color: AppTheme.textMain),
                  const SizedBox(width: 12),
                  Text(
                    'Bonjour !',
                    style: Theme.of(context).textTheme.displayLarge,
                  ),
                ],
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  color: AppTheme.surfaceMuted,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: const Text(
                  'Mardi, 24 Octobre',
                  style: TextStyle(
                    fontSize: 11,
                    fontWeight: FontWeight.w600,
                    color: AppTheme.textMuted,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 4),
          const Text(
            'C\\'est une belle journée pour gérer votre boutique.',
            style: TextStyle(fontSize: 12, color: AppTheme.textMuted),
          ),
          const SizedBox(height: 20),

          // Bouton Scanner un produit (Terre Cuite)
          SizedBox(
            width: double.infinity,
            height: 50,
            child: ElevatedButton.icon(
              onPressed: () {
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(
                    content: Text('Scanner prêt : Caméra activée'),
                    backgroundColor: AppTheme.terracotta,
                  ),
                );
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: AppTheme.terracotta,
              ),
              icon: const Icon(Icons.qr_code_scanner, color: Colors.white),
              label: const Text('Scanner un produit'),
            ),
          ),
          const SizedBox(height: 10),

          // Bouton Ajouter du stock (Vert Sauge)
          SizedBox(
            width: double.infinity,
            height: 50,
            child: OutlinedButton.icon(
              onPressed: () {
                final firstProd = provider.products.first;
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (_) => StockAdjustmentScreen(product: firstProd),
                  ),
                );
              },
              style: OutlinedButton.styleFrom(
                backgroundColor: AppTheme.sageGreenLight,
                foregroundColor: AppTheme.sageGreenDark,
                side: const BorderSide(color: Color(0xFFBFDEC9)),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(16),
                ),
              ),
              icon: const Icon(Icons.add_circle_outline, color: AppTheme.sageGreenDark),
              label: const Text(
                'Ajouter du stock',
                style: TextStyle(fontWeight: FontWeight.w700),
              ),
            ),
          ),
          const SizedBox(height: 20),

          // Grille Métriques 2x2
          GridView.count(
            crossAxisCount: 2,
            crossAxisSpacing: 10,
            mainAxisSpacing: 10,
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            childAspectRatio: 1.35,
            children: [
              _MetricCard(
                title: 'Articles en stock',
                value: '\${provider.totalStockItems}',
                subtitle: '+12 ce mois',
                subtitleColor: AppTheme.sageGreen,
                icon: Icons.inventory_2_outlined,
              ),
              _MetricCard(
                title: 'Valeur totale',
                value: '\${(provider.totalStockValue / 1000).toStringAsFixed(1)}k€',
                subtitle: 'Estimée',
                subtitleColor: AppTheme.textMuted,
                icon: Icons.euro,
              ),
              _MetricCard(
                title: 'Stock faible',
                value: '\${provider.lowStockAlertCount > 0 ? provider.lowStockAlertCount : 24}',
                subtitle: 'Produits à réapprovisionner',
                subtitleColor: AppTheme.danger,
                icon: Icons.warning_amber_rounded,
                isAlert: true,
              ),
              _MetricCard(
                title: 'Activité récente',
                customChild: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: const [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text('Livraison ...', style: TextStyle(fontSize: 10, color: AppTheme.textMuted)),
                        Text('+45', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppTheme.sageGreen)),
                      ],
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text('Vente en lig...', style: TextStyle(fontSize: 10, color: AppTheme.textMuted)),
                        Text('-3', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppTheme.terracotta)),
                      ],
                    ),
                  ],
                ),
                icon: Icons.timeline,
              ),
            ],
          ),
          const SizedBox(height: 24),

          // Santé du Stock
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: const [
              Text('Santé du Stock', style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold)),
              Text('Voir les détails', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: AppTheme.terracotta)),
            ],
          ),
          const SizedBox(height: 12),
          Card(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                children: const [
                  _HealthBarItem(name: 'Matières premières (Terre cuite)', detail: 'En stock (85%)', percent: 0.85, color: AppTheme.sageGreen),
                  SizedBox(height: 12),
                  _HealthBarItem(name: 'Emballages & Cartons', detail: 'Moyen (40%)', percent: 0.40, color: AppTheme.ochre),
                  SizedBox(height: 12),
                  _HealthBarItem(name: 'Vernis Brillant (Transparent)', detail: 'Stock faible (12%)', percent: 0.12, color: AppTheme.terracotta),
                ],
              ),
            ),
          ),
          const SizedBox(height: 20),

          // Note café
          Container(
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: const Color(0xFFFAF0E6),
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: const Color(0xFFEEDCCB)),
            ),
            child: const Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(Icons.coffee, size: 16, color: AppTheme.terracotta),
                SizedBox(width: 8),
                Text(
                  'Tout semble en ordre ! Prenez un café.',
                  style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: Color(0xFF8A5232)),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _MetricCard extends StatelessWidget {
  final String title;
  final String? value;
  final String? subtitle;
  final Color? subtitleColor;
  final IconData icon;
  final bool isAlert;
  final Widget? customChild;

  const _MetricCard({
    required this.title,
    this.value,
    this.subtitle,
    this.subtitleColor,
    required this.icon,
    this.isAlert = false,
    this.customChild,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Row(
              children: [
                Icon(icon, size: 14, color: isAlert ? AppTheme.danger : AppTheme.terracotta),
                const SizedBox(width: 4),
                Expanded(
                  child: Text(
                    title,
                    style: TextStyle(
                      fontSize: 11,
                      fontWeight: FontWeight.w600,
                      color: isAlert ? AppTheme.danger : AppTheme.textMuted,
                    ),
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
              ],
            ),
            if (customChild != null)
              customChild!
            else ...[
              Text(
                value ?? '',
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                  color: isAlert ? AppTheme.danger : AppTheme.textMain,
                ),
              ),
              Text(
                subtitle ?? '',
                style: TextStyle(fontSize: 10, color: subtitleColor ?? AppTheme.textMuted, fontWeight: FontWeight.w600),
                overflow: TextOverflow.ellipsis,
              ),
            ],
          ],
        ),
      ),
    );
  }
}

class _HealthBarItem extends StatelessWidget {
  final String name;
  final String detail;
  final double percent;
  final Color color;

  const _HealthBarItem({
    required this.name,
    required this.detail,
    required this.percent,
    required this.color,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(name, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: AppTheme.textMain)),
            Text(detail, style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: color)),
          ],
        ),
        const SizedBox(height: 6),
        ClipRRect(
          borderRadius: BorderRadius.circular(6),
          child: LinearProgressIndicator(
            value: percent,
            minHeight: 6,
            backgroundColor: AppTheme.surfaceMuted,
            valueColor: AlwaysStoppedAnimation<Color>(color),
          ),
        ),
      ],
    );
  }
}
`
  },
  {
    path: 'lib/screens/stock_catalog_screen.dart',
    name: 'stock_catalog_screen.dart',
    category: 'screens',
    description: 'Écran Mon Stock avec photos d\'articles, filtres catégories, badges d\'alerte et navigation vers Fiche Produit',
    code: `import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/stock_provider.dart';
import '../theme/app_theme.dart';
import 'product_detail_screen.dart';

class StockCatalogScreen extends StatelessWidget {
  const StockCatalogScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final provider = context.watch<StockProvider>();
    final products = provider.filteredProducts;

    final categories = ['Tous', 'Céramiques', 'Textile de Maison', 'Senteurs & Ambiance'];

    return Column(
      children: [
        // En-tête
        Padding(
          padding: const EdgeInsets.fromLTRB(20, 16, 20, 12),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  const Icon(Icons.menu, color: AppTheme.textMain),
                  const SizedBox(width: 12),
                  Text('Bonjour !', style: Theme.of(context).textTheme.displayLarge),
                ],
              ),
              const SizedBox(height: 4),
              const Text('Mon Stock', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
              const Text('Voici ce que vous avez en rayon.', style: TextStyle(fontSize: 12, color: AppTheme.textMuted)),
              const SizedBox(height: 12),

              // Barre de Recherche
              TextField(
                onChanged: provider.setSearchQuery,
                decoration: const InputDecoration(
                  hintText: 'Chercher un produit...',
                  prefixIcon: Icon(Icons.search, size: 20, color: AppTheme.textMuted),
                ),
              ),
            ],
          ),
        ),

        // Liste des Produits
        Expanded(
          child: ListView.builder(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
            itemCount: products.length,
            itemBuilder: (context, index) {
              final product = products[index];
              return _ProductCard(product: product);
            },
          ),
        ),
      ],
    );
  }
}

class _ProductCard extends StatelessWidget {
  final dynamic product;

  const _ProductCard({required this.product});

  @override
  Widget build(BuildContext context) {
    final isOut = product.isOutOfStock;
    final isLow = product.isLowStock;

    String badgeText = '● Tout va bien';
    Color badgeBg = AppTheme.sageGreenLight;
    Color badgeColor = AppTheme.sageGreenDark;

    if (isOut) {
      badgeText = '● Plus de stock';
      badgeBg = AppTheme.dangerLight;
      badgeColor = AppTheme.danger;
    } else if (isLow) {
      badgeText = '● Attention : peu de stock';
      badgeBg = AppTheme.ochreLight;
      badgeColor = AppTheme.ochre;
    }

    return Card(
      margin: const EdgeInsets.only(bottom: 14),
      child: InkWell(
        onTap: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (_) => ProductDetailScreen(product: product),
            ),
          );
        },
        borderRadius: BorderRadius.circular(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Photo du produit
            ClipRRect(
              borderRadius: const BorderRadius.vertical(top: Radius.circular(20)),
              child: Image.network(
                product.image,
                height: 140,
                width: double.infinity,
                fit: BoxFit.cover,
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(14),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    product.name,
                    style: const TextStyle(fontSize: 15, fontWeight: FontWeight.bold, color: AppTheme.textMain),
                  ),
                  Text(
                    'Réf: \${product.sku}',
                    style: const TextStyle(fontSize: 11, color: AppTheme.textMuted),
                  ),
                  const SizedBox(height: 10),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        'Quantité : \${product.currentStock}',
                        style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold),
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                        decoration: BoxDecoration(
                          color: badgeBg,
                          borderRadius: BorderRadius.circular(20),
                        ),
                        child: Text(
                          badgeText,
                          style: TextStyle(fontSize: 10.5, fontWeight: FontWeight.bold, color: badgeColor),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
`
  },
  {
    path: 'lib/screens/stock_adjustment_screen.dart',
    name: 'stock_adjustment_screen.dart',
    category: 'screens',
    description: 'Écran Changer le Stock avec boutons d\'action (Ajouter, Enlever, Corriger) et stepper',
    code: `import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/product.dart';
import '../providers/stock_provider.dart';
import '../theme/app_theme.dart';

class StockAdjustmentScreen extends StatefulWidget {
  final Product product;

  const StockAdjustmentScreen({super.key, required this.product});

  @override
  State<StockAdjustmentScreen> createState() => _StockAdjustmentScreenState();
}

class _StockAdjustmentScreenState extends State<StockAdjustmentScreen> {
  String _mode = 'correct'; // 'add', 'remove', 'correct'
  int _quantity = 45;
  final TextEditingController _noteController = TextEditingController();

  @override
  void initState() {
    super.initState();
    _quantity = widget.product.currentStock;
  }

  @override
  Widget build(BuildContext context) {
    final diff = _quantity - widget.product.currentStock;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Mettre à jour', style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold)),
        centerTitle: true,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new, size: 18),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Carte résumé produit
            Card(
              child: Padding(
                padding: const EdgeInsets.all(12),
                child: Row(
                  children: [
                    ClipRRect(
                      borderRadius: BorderRadius.circular(12),
                      child: Image.network(widget.product.image, width: 50, height: 50, fit: BoxFit.cover),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(widget.product.category, style: const TextStyle(fontSize: 11, color: AppTheme.textMuted)),
                          Text(widget.product.name, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold)),
                        ],
                      ),
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                      decoration: BoxDecoration(
                        color: AppTheme.surfaceMuted,
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Text('En stock : \${widget.product.currentStock}', style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold)),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 20),

            const Text('Que souhaitez-vous faire ?', style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold)),
            const SizedBox(height: 10),

            // Bouton Ajouter (+)
            _ActionButton(
              label: 'Ajouter (+)',
              icon: Icons.add,
              isSelected: _mode == 'add',
              bgColor: AppTheme.sageGreenLight,
              textColor: AppTheme.sageGreenDark,
              onTap: () => setState(() {
                _mode = 'add';
                _quantity = widget.product.currentStock + 5;
              }),
            ),
            const SizedBox(height: 8),

            // Bouton Enlever (-)
            _ActionButton(
              label: 'Enlever (-)',
              icon: Icons.remove,
              isSelected: _mode == 'remove',
              bgColor: AppTheme.dangerLight,
              textColor: AppTheme.danger,
              onTap: () => setState(() {
                _mode = 'remove';
                _quantity = widget.product.currentStock > 0 ? widget.product.currentStock - 1 : 0;
              }),
            ),
            const SizedBox(height: 8),

            // Bouton Corriger
            _ActionButton(
              label: 'Corriger',
              icon: Icons.edit,
              isSelected: _mode == 'correct',
              bgColor: AppTheme.ochreAccent,
              textColor: const Color(0xFF4A3205),
              onTap: () => setState(() => _mode = 'correct'),
            ),
            const SizedBox(height: 24),

            // Stepper Quantité
            const Text('Nouvelle quantité totale', style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold)),
            const SizedBox(height: 10),
            Card(
              child: Padding(
                padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 16),
                child: Column(
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        IconButton.filledTonal(
                          onPressed: _quantity > 0 ? () => setState(() => _quantity--) : null,
                          icon: const Icon(Icons.remove),
                        ),
                        Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 24),
                          child: Text(
                            '$_quantity',
                            style: const TextStyle(fontSize: 32, fontWeight: FontWeight.bold),
                          ),
                        ),
                        IconButton.filledTonal(
                          onPressed: () => setState(() => _quantity++),
                          icon: const Icon(Icons.add),
                        ),
                      ],
                    ),
                    const SizedBox(height: 8),
                    Text(
                      diff >= 0 ? 'Ajustement : +$diff articles' : 'Ajustement : $diff articles',
                      style: TextStyle(
                        fontSize: 11,
                        fontWeight: FontWeight.bold,
                        color: diff >= 0 ? AppTheme.sageGreen : AppTheme.danger,
                      ),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 16),

            // Note
            const Text('Note (optionnel)', style: TextStyle(fontSize: 12, color: AppTheme.textMuted)),
            const SizedBox(height: 6),
            TextField(
              controller: _noteController,
              decoration: const InputDecoration(
                hintText: 'Ex: Arrivage atelier, casse, inventaire...',
              ),
            ),
            const SizedBox(height: 24),

            // Bouton Valider
            SizedBox(
              width: double.infinity,
              height: 50,
              child: ElevatedButton.icon(
                onPressed: () {
                  context.read<StockProvider>().updateStock(
                    widget.product.id,
                    _quantity,
                    _noteController.text.trim().isNotEmpty ? _noteController.text : 'Ajustement manuel',
                  );
                  Navigator.pop(context);
                },
                icon: const Icon(Icons.check),
                label: const Text('Valider le changement'),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _ActionButton extends StatelessWidget {
  final String label;
  final IconData icon;
  final bool isSelected;
  final Color bgColor;
  final Color textColor;
  final VoidCallback onTap;

  const _ActionButton({
    required this.label,
    required this.icon,
    required this.isSelected,
    required this.bgColor,
    required this.textColor,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(16),
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 14),
        decoration: BoxDecoration(
          color: bgColor,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(
            color: isSelected ? textColor : Colors.transparent,
            width: isSelected ? 2 : 1,
          ),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(icon, size: 18, color: textColor),
            const SizedBox(width: 8),
            Text(label, style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold, color: textColor)),
          ],
        ),
      ),
    );
  }
}
`
  },
  {
    path: 'lib/screens/product_detail_screen.dart',
    name: 'product_detail_screen.dart',
    category: 'screens',
    description: 'Écran Fiche Produit avec tableau des déclinaisons de couleurs et historique des flux',
    code: `import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/product.dart';
import '../providers/stock_provider.dart';
import '../theme/app_theme.dart';
import 'stock_adjustment_screen.dart';

class ProductDetailScreen extends StatelessWidget {
  final Product product;

  const ProductDetailScreen({super.key, required this.product});

  @override
  Widget build(BuildContext context) {
    final provider = context.watch<StockProvider>();
    final current = provider.products.firstWhere((p) => p.id == product.id, orElse: () => product);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Détails', style: TextStyle(fontSize: 15, fontWeight: FontWeight.bold)),
        centerTitle: true,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new, size: 18),
          onPressed: () => Navigator.pop(context),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.edit_outlined, color: AppTheme.terracotta),
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (_) => StockAdjustmentScreen(product: current)),
              );
            },
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Image principale
            ClipRRect(
              borderRadius: BorderRadius.circular(24),
              child: Image.network(
                current.image,
                height: 220,
                width: double.infinity,
                fit: BoxFit.cover,
              ),
            ),
            const SizedBox(height: 16),

            Text(
              'Catégorie : \${current.category}',
              style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppTheme.textMuted),
            ),
            const SizedBox(height: 4),
            Text(current.name, style: Theme.of(context).textTheme.displayMedium),
            const SizedBox(height: 6),
            Text(current.description, style: const TextStyle(fontSize: 12, color: AppTheme.textMuted)),
            const SizedBox(height: 20),

            // Quantité totale disponible Card
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text('Quantité totale disponible', style: TextStyle(fontSize: 11, color: AppTheme.textMuted)),
                            Text('\${current.currentStock} unités', style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
                          ],
                        ),
                        Row(
                          children: [
                            IconButton.filledTonal(
                              onPressed: () => provider.updateStock(current.id, current.currentStock > 0 ? current.currentStock - 1 : 0, 'Retrait rapide'),
                              icon: const Icon(Icons.remove, size: 16),
                            ),
                            const SizedBox(width: 4),
                            IconButton.filled(
                              style: IconButton.styleFrom(backgroundColor: AppTheme.terracotta),
                              onPressed: () => provider.updateStock(current.id, current.currentStock + 1, 'Ajout rapide'),
                              icon: const Icon(Icons.add, size: 16),
                            ),
                          ],
                        ),
                      ],
                    ),
                    const Divider(height: 20),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: const [
                        Text('Niveau de stock (Confortable)', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold)),
                        Text('Bon', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: AppTheme.sageGreen)),
                      ],
                    ),
                    const SizedBox(height: 6),
                    ClipRRect(
                      borderRadius: BorderRadius.circular(6),
                      child: const LinearProgressIndicator(
                        value: 0.85,
                        minHeight: 6,
                        backgroundColor: AppTheme.surfaceMuted,
                        valueColor: AlwaysStoppedAnimation<Color>(AppTheme.sageGreen),
                      ),
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 20),

            // Tableau des déclinaisons
            if (current.variants.isNotEmpty) ...[
              const Text('Les différentes versions', style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold)),
              const SizedBox(height: 10),
              Card(
                child: ListView.separated(
                  shrinkWrap: true,
                  physics: const NeverScrollableScrollPhysics(),
                  itemCount: current.variants.length,
                  separatorBuilder: (_, __) => const Divider(height: 1),
                  itemBuilder: (context, idx) {
                    final v = current.variants[idx];
                    return Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                      child: Row(
                        children: [
                          Container(
                            width: 14,
                            height: 14,
                            decoration: BoxDecoration(
                              color: Color(v.colorHex),
                              shape: BoxShape.circle,
                              border: Border.all(color: Colors.black12),
                            ),
                          ),
                          const SizedBox(width: 8),
                          Expanded(child: Text(v.colorName, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600))),
                          Text('\${v.stock}', style: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold)),
                          const SizedBox(width: 14),
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                            decoration: BoxDecoration(
                              color: v.status == 'good' ? AppTheme.sageGreenLight : AppTheme.ochreLight,
                              borderRadius: BorderRadius.circular(12),
                            ),
                            child: Text(
                              v.status == 'good' ? '● Bien rempli' : '● Bientôt vide',
                              style: TextStyle(
                                fontSize: 10,
                                fontWeight: FontWeight.bold,
                                color: v.status == 'good' ? AppTheme.sageGreenDark : AppTheme.ochre,
                              ),
                            ),
                          ),
                        ],
                      ),
                    );
                  },
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }
}
`
  },
  {
    path: 'lib/screens/orders_screen.dart',
    name: 'orders_screen.dart',
    category: 'screens',
    description: 'Écran Commandes et Envois avec actions "Préparer le colis" et "C\'est envoyé !"',
    code: `import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../models/order.dart';
import '../providers/stock_provider.dart';
import '../theme/app_theme.dart';

class OrdersScreen extends StatefulWidget {
  const OrdersScreen({super.key});

  @override
  State<OrdersScreen> createState() => _OrdersScreenState();
}

class _OrdersScreenState extends State<OrdersScreen> {
  OrderStatus _filter = OrderStatus.toPrepare;

  @override
  Widget build(BuildContext context) {
    final provider = context.watch<StockProvider>();
    final orders = provider.orders.where((o) => o.status == _filter).toList();

    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              const Icon(Icons.menu, color: AppTheme.textMain),
              const SizedBox(width: 12),
              Text('Bonjour !', style: Theme.of(context).textTheme.displayLarge),
            ],
          ),
          const SizedBox(height: 4),
          const Text('Vos commandes du jour', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
          const Text('Prenez votre temps, tout est sous contrôle.', style: TextStyle(fontSize: 12, color: AppTheme.textMuted)),
          const SizedBox(height: 16),

          // Filtres onglets
          Row(
            children: [
              _FilterChip(
                label: 'À préparer',
                isSelected: _filter == OrderStatus.toPrepare,
                onTap: () => setState(() => _filter = OrderStatus.toPrepare),
              ),
              const SizedBox(width: 8),
              _FilterChip(
                label: 'Prêt à partir',
                isSelected: _filter == OrderStatus.readyToShip,
                onTap: () => setState(() => _filter = OrderStatus.readyToShip),
              ),
            ],
          ),
          const SizedBox(height: 16),

          // Liste des commandes
          ListView.builder(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            itemCount: orders.length,
            itemBuilder: (context, idx) {
              final order = orders[idx];
              return Card(
                margin: const EdgeInsets.only(bottom: 14),
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(order.customerName, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold)),
                          Text(order.timeAgo, style: const TextStyle(fontSize: 11, color: AppTheme.ochre, fontWeight: FontWeight.bold)),
                        ],
                      ),
                      Text('Commande #\${order.orderNumber} • \${order.city}', style: const TextStyle(fontSize: 11, color: AppTheme.textMuted)),
                      const SizedBox(height: 12),

                      ...order.items.map((it) => Padding(
                        padding: const EdgeInsets.only(bottom: 6),
                        child: Row(
                          children: [
                            const Icon(Icons.inventory_2_outlined, size: 16, color: AppTheme.textMuted),
                            const SizedBox(width: 8),
                            Expanded(child: Text(it.productName, style: const TextStyle(fontSize: 12))),
                            Text('Quantité : \${it.quantity}', style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
                          ],
                        ),
                      )),
                      const SizedBox(height: 14),

                      if (order.status == OrderStatus.toPrepare)
                        SizedBox(
                          width: double.infinity,
                          child: ElevatedButton.icon(
                            onPressed: () => provider.updateOrderStatus(order.id, OrderStatus.readyToShip),
                            icon: const Icon(Icons.inventory_rounded, size: 16),
                            label: const Text('Préparer le colis'),
                          ),
                        )
                      else if (order.status == OrderStatus.readyToShip)
                        SizedBox(
                          width: double.infinity,
                          child: ElevatedButton.icon(
                            style: ElevatedButton.styleFrom(backgroundColor: AppTheme.sageGreen),
                            onPressed: () => provider.updateOrderStatus(order.id, OrderStatus.shipped),
                            icon: const Icon(Icons.send_rounded, size: 16),
                            label: const Text('C\\'est envoyé !'),
                          ),
                        ),
                    ],
                  ),
                ),
              );
            },
          ),
        ],
      ),
    );
  }
}

class _FilterChip extends StatelessWidget {
  final String label;
  final bool isSelected;
  final VoidCallback onTap;

  const _FilterChip({required this.label, required this.isSelected, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(16),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
        decoration: BoxDecoration(
          color: isSelected ? AppTheme.terracotta : AppTheme.surfaceMuted,
          borderRadius: BorderRadius.circular(16),
        ),
        child: Text(
          label,
          style: TextStyle(
            fontSize: 12,
            fontWeight: FontWeight.bold,
            color: isSelected ? Colors.white : AppTheme.textMuted,
          ),
        ),
      ),
    );
  }
}
`
  }
];
