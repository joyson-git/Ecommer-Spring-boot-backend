// =========================================================================
// Mach Enterprise Frontend Single-Page Application (SPA) Engine v2.5
// Integrates with Spring Cloud Gateway (http://localhost:9002) & Microservices
// =========================================================================

const GATEWAY_URL = 'http://localhost:9002';

// -------------------------------------------------------------------------
// 1. Initial State & High-Fidelity Flagship Catalog
// -------------------------------------------------------------------------
const defaultSampleProducts = [
  {
    id: "prod-g15-pro",
    name: "Ultralight Gaming Laptop G15 Pro",
    description: "Intel Core i9 14th Gen, NVIDIA RTX 4090 16GB, 64GB DDR5 RAM, 2TB NVMe SSD, 16-inch 240Hz QHD OLED Display.",
    price: 2199.99,
    originalPrice: 2499.99,
    category: "Electronics",
    brand: "Asus",
    stock: 15,
    rating: 4.9,
    reviewsCount: 184,
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "prod-anc-x",
    name: "Wireless ANC Headphones X Pro",
    description: "Hybrid Active Noise Cancellation with Custom 40mm Beryllium Drivers, 50-hour battery life, and Hi-Res LDAC Audio.",
    price: 299.99,
    originalPrice: 349.99,
    category: "Audio",
    brand: "Sony",
    stock: 28,
    rating: 4.8,
    reviewsCount: 312,
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "prod-phone-max",
    name: "Nexus Phone Pro Max 5G Titanium",
    description: "6.7-inch Super Retina XDR ProMotion 120Hz display, A17 Bionic chip, 256GB storage, and Aerospace-Grade Titanium chassis.",
    price: 1199.99,
    originalPrice: 1299.99,
    category: "Smartphones",
    brand: "Apple",
    stock: 22,
    rating: 4.9,
    reviewsCount: 420,
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "prod-oled-4k",
    name: "UltraVision 32\" 4K Curved OLED Monitor",
    description: "True 10-bit Color Depth, 0.03ms Response Time, 165Hz Refresh Rate, HDR TrueBlack 400, and USB-C 90W Power Delivery.",
    price: 799.99,
    originalPrice: 949.99,
    category: "Electronics",
    brand: "Nexus",
    stock: 8,
    rating: 4.7,
    reviewsCount: 96,
    imageUrl: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "prod-watch-ultra",
    name: "CyberWatch Ultra Sapphire Titanium",
    description: "Dual-Frequency Precision GPS, ECG & Blood Oxygen Sensing, 100m Water Resistance, and 72-hour battery life in Low Power mode.",
    price: 449.99,
    originalPrice: 499.99,
    category: "Wearables",
    brand: "Apple",
    stock: 19,
    rating: 4.8,
    reviewsCount: 155,
    imageUrl: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "prod-mech-kb",
    name: "Keychron CyberDesk Q1 Pro Wireless",
    description: "CNC Machined Aluminum Body, Hot-swappable Gateron Jupiter Mechanical Switches, PBT Keycaps, and Per-Key RGB Backlighting.",
    price: 189.99,
    originalPrice: 219.99,
    category: "Computing",
    brand: "Keychron",
    stock: 35,
    rating: 4.9,
    reviewsCount: 204,
    imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "prod-drone-4k",
    name: "AeroPro Drone 4K 3-Axis Gimbal",
    description: "4K 60fps HDR Video Recording, Omnidirectional Obstacle Avoidance, 45-minute flight time, and 15km O4 Video Transmission.",
    price: 899.99,
    originalPrice: 1049.99,
    category: "Electronics",
    brand: "DJI",
    stock: 11,
    rating: 4.9,
    reviewsCount: 88,
    imageUrl: "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "prod-studio-mic",
    name: "StudioStream Pro Condenser Microphone",
    description: "24-bit 192kHz Studio-Quality Recording, Cardioid / Omnidirectional Polar Patterns, Built-in Pop Filter, and Headphone Monitoring.",
    price: 149.99,
    originalPrice: 179.99,
    category: "Audio",
    brand: "Sony",
    stock: 25,
    rating: 4.6,
    reviewsCount: 110,
    imageUrl: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "prod-vr-headset",
    name: "Nexus Vision Spatial VR Headset",
    description: "Dual 4K Micro-OLED Displays, Real-time Hand & Eye Tracking, Spatial Audio Drivers, and Lightweight Carbon-Fiber headband.",
    price: 1399.99,
    originalPrice: 1599.99,
    category: "Electronics",
    brand: "Nexus",
    stock: 6,
    rating: 4.8,
    reviewsCount: 64,
    imageUrl: "https://images.unsplash.com/photo-1622979135225-d2ba269bc1df?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "prod-powerbank-mag",
    name: "Titanium MagCharge Duo 25000mAh",
    description: "140W USB-C PD 3.1 Fast Charging, 15W Qi2 Magnetic Wireless Pad, Smart OLED Status Display, and Aircraft Airline Approved.",
    price: 89.99,
    originalPrice: 119.99,
    category: "Accessories",
    brand: "Nexus",
    stock: 40,
    rating: 4.7,
    reviewsCount: 230,
    imageUrl: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "prod-mouse-master",
    name: "MX CyberMaster Wireless Ergonomic Mouse",
    description: "8000 DPI Darkfield Laser Sensor, MagSpeed Electromagnetic Scrolling Wheel, Quiet Click Switches, and USB-C Quick Charge.",
    price: 99.99,
    originalPrice: 129.99,
    category: "Computing",
    brand: "Nexus",
    stock: 30,
    rating: 4.8,
    reviewsCount: 175,
    imageUrl: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "prod-soundbar-dolby",
    name: "SoundPulse Cinema 7.1 Atmos Soundbar",
    description: "Wireless Subwoofer & Rear Satellites, Dolby Atmos & DTS:X Decoding, eARC HDMI 2.1, and AirPlay 2 / Spotify Connect.",
    price: 499.99,
    originalPrice: 599.99,
    category: "Audio",
    brand: "Sony",
    stock: 14,
    rating: 4.9,
    reviewsCount: 140,
    imageUrl: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80"
  }
];

// App Global State
let state = {
  products: JSON.parse(localStorage.getItem('nexus_products')) || defaultSampleProducts,
  cart: JSON.parse(localStorage.getItem('nexus_cart')) || [],
  wishlist: JSON.parse(localStorage.getItem('nexus_wishlist')) || [],
  orders: JSON.parse(localStorage.getItem('nexus_orders')) || [
    {
      orderNumber: "ORD-2026-9843",
      customerName: "Alex Mercer",
      customerEmail: "alex@mach.com",
      items: [
        { name: "Wireless ANC Headphones X Pro", price: 299.99, quantity: 1 },
        { name: "Titanium MagCharge Duo 25000mAh", price: 89.99, quantity: 1 }
      ],
      totalPrice: 389.98,
      status: "Out for Delivery",
      step: 4,
      date: "Today, 14:32"
    }
  ],
  user: JSON.parse(localStorage.getItem('nexus_user')) || {
    name: "Alex Mercer",
    email: "alex@mach.com",
    role: "CUSTOMER"
  },
  token: localStorage.getItem('nexus_token') || 'demo_jwt_token_nexus_2026',
  activeCategory: 'all',
  activeView: 'storefront',
  appliedCoupon: null,
  viewMode: 'grid', // 'grid' | 'list'
  isSignup: false,
  gatewayOnline: false,
  theme: localStorage.getItem('nexus_theme') || 'dark',
  filters: {
    maxPrice: 3000,
    inStockOnly: false,
    brand: 'all',
    sort: 'featured',
    searchQuery: ''
  },
  activeTrackingOrder: null,
  quickViewCurrentItem: null
};

// Available Microservices Directory for Health Telemetry
const microservicesConfig = [
  { name: "Netflix Eureka Registry", port: 8761, url: "http://localhost:8761", icon: "🛰️", desc: "Instance Registry & Health Heartbeats" },
  { name: "Spring Cloud Gateway", port: 9002, url: "http://localhost:9002", icon: "🌐", desc: "Edge Router, CORS & Predicate Filters" },
  { name: "Auth & Security Service", port: 9001, url: "http://localhost:9001/auth", icon: "🗝️", desc: "BCrypt Password Hashing & JWT Validation" },
  { name: "Product Catalog Service", port: 9007, url: "http://localhost:9007/products", icon: "📦", desc: "MongoDB Product Store & Redis Cache" },
  { name: "Category Taxonomy Service", port: 9004, url: "http://localhost:9004/categories", icon: "🏷️", desc: "Taxonomy Tree & Hierarchy" },
  { name: "Reactive Cart Service", port: 9003, url: "http://localhost:9003/cart", icon: "🛒", desc: "User Session Shopping Cart Store" },
  { name: "Order Processing Service", port: 9009, url: "http://localhost:9009/orders", icon: "📦", desc: "Kafka OrderPlacedEvent Producer" },
  { name: "Payment Gateway Service", port: 9006, url: "http://localhost:9006/payments", icon: "💳", desc: "Payment Verification & Refund API" },
  { name: "Search & Filter Service", port: 9008, url: "http://localhost:9008/search", icon: "🔍", desc: "Keyword Search & Elastic/Text Indexing" },
  { name: "Delivery Tracking Service", port: 9010, url: "http://localhost:9010/delivery", icon: "🚚", desc: "Courier Assignment & Live Tracking" },
  { name: "Apache Kafka Event Bus", port: 9092, url: "http://localhost:9092", icon: "⚡", desc: "Topic: order-events (Notification & Stock)" },
  { name: "MongoDB NoSQL Cluster", port: 27018, url: "http://localhost:27018", icon: "🍃", desc: "Replica Set (Port 27018)" }
];

// -------------------------------------------------------------------------
// 2. DOM Elements Selection
// -------------------------------------------------------------------------
const productGrid = document.getElementById('productGrid');
const productCountBadge = document.getElementById('productCountBadge');
const categoryPillsBar = document.getElementById('categoryPillsBar');
const searchInput = document.getElementById('searchInput');
const searchAutocompleteList = document.getElementById('searchAutocompleteList');
const clearSearchBtn = document.getElementById('clearSearchBtn');
const priceRangeInput = document.getElementById('priceRangeInput');
const priceRangeDisplay = document.getElementById('priceRangeDisplay');
const inStockFilterCheck = document.getElementById('inStockFilterCheck');
const brandFilterSelect = document.getElementById('brandFilterSelect');
const sortSelect = document.getElementById('sortSelect');
const viewGridBtn = document.getElementById('viewGridBtn');
const viewListBtn = document.getElementById('viewListBtn');
const catalogEmptyState = document.getElementById('catalogEmptyState');
const activeFilterTags = document.getElementById('activeFilterTags');
const filterChipsContainer = document.getElementById('filterChipsContainer');
const clearAllFiltersBtn = document.getElementById('clearAllFiltersBtn');

// Nav & Badges
const brandLogoBtn = document.getElementById('brandLogoBtn');
const gatewayStatusBtn = document.getElementById('gatewayStatusBtn');
const gatewayPulseDot = document.getElementById('gatewayPulseDot');
const gatewayStatusText = document.getElementById('gatewayStatusText');
const themeToggleBtn = document.getElementById('themeToggleBtn');
const navWishlistBtn = document.getElementById('navWishlistBtn');
const wishlistCountBadge = document.getElementById('wishlistCountBadge');
const tabWishlistCount = document.getElementById('tabWishlistCount');
const cartTriggerBtn = document.getElementById('cartTriggerBtn');
const cartCountBadge = document.getElementById('cartCountBadge');
const navCartSubtotal = document.getElementById('navCartSubtotal');

// User Menu
const authModalBtn = document.getElementById('authModalBtn');
const userAvatarCircle = document.getElementById('userAvatarCircle');
const userAccountLabel = document.getElementById('userAccountLabel');
const userRoleBadge = document.getElementById('userRoleBadge');
const userDropdownMenu = document.getElementById('userDropdownMenu');
const dropdownUserEmail = document.getElementById('dropdownUserEmail');
const logoutBtn = document.getElementById('logoutBtn');
const menuMyOrdersBtn = document.getElementById('menuMyOrdersBtn');
const menuWishlistBtn = document.getElementById('menuWishlistBtn');
const menuAdminBtn = document.getElementById('menuAdminBtn');
const menuDiagnosticsBtn = document.getElementById('menuDiagnosticsBtn');
const quickDemoCustomerBtn = document.getElementById('quickDemoCustomerBtn');
const quickDemoAdminBtn = document.getElementById('quickDemoAdminBtn');

// Tabs & Navigation
const mainViewTabs = document.getElementById('mainViewTabs');
const adminStudioTab = document.getElementById('adminStudioTab');
const heroOpenDiagnosticsBtn = document.getElementById('heroOpenDiagnosticsBtn');
const heroViewDealsBtn = document.getElementById('heroViewDealsBtn');

// Cart Drawer
const cartDrawer = document.getElementById('cartDrawer');
const closeCartDrawerBtn = document.getElementById('closeCartDrawerBtn');
const cartItemsList = document.getElementById('cartItemsList');
const drawerItemCountSubtitle = document.getElementById('drawerItemCountSubtitle');
const shippingProgressBar = document.getElementById('shippingProgressBar');
const shippingProgressText = document.getElementById('shippingProgressText');
const couponInput = document.getElementById('couponInput');
const applyCouponBtn = document.getElementById('applyCouponBtn');
const appliedCouponBadge = document.getElementById('appliedCouponBadge');
const removeCouponBtn = document.getElementById('removeCouponBtn');
const cartSubtotal = document.getElementById('cartSubtotal');
const discountRow = document.getElementById('discountRow');
const cartDiscount = document.getElementById('cartDiscount');
const cartTax = document.getElementById('cartTax');
const cartShipping = document.getElementById('cartShipping');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const clearCartBtn = document.getElementById('clearCartBtn');

// Quick View Modal
const quickViewModal = document.getElementById('quickViewModal');
const closeQuickViewBtn = document.getElementById('closeQuickViewBtn');
const qvProductImage = document.getElementById('qvProductImage');
const qvBadge = document.getElementById('qvBadge');
const qvBrand = document.getElementById('qvBrand');
const qvCategory = document.getElementById('qvCategory');
const qvTitle = document.getElementById('qvTitle');
const qvRating = document.getElementById('qvRating');
const qvPrice = document.getElementById('qvPrice');
const qvOriginalPrice = document.getElementById('qvOriginalPrice');
const qvDiscountTag = document.getElementById('qvDiscountTag');
const qvDescription = document.getElementById('qvDescription');
const qvStockStatus = document.getElementById('qvStockStatus');
const qvStockCount = document.getElementById('qvStockCount');
const qvStockBar = document.getElementById('qvStockBar');
const qvQtyMinus = document.getElementById('qvQtyMinus');
const qvQtyPlus = document.getElementById('qvQtyPlus');
const qvQtyInput = document.getElementById('qvQtyInput');
const qvAddToCartBtn = document.getElementById('qvAddToCartBtn');
const qvWishlistBtn = document.getElementById('qvWishlistBtn');
const qvBuyNowBtn = document.getElementById('qvBuyNowBtn');

// Checkout Modal
const checkoutModal = document.getElementById('checkoutModal');
const closeCheckoutBtn = document.getElementById('closeCheckoutBtn');
const shippingForm = document.getElementById('shippingForm');
const paymentForm = document.getElementById('paymentForm');
const cardNumInput = document.getElementById('cardNumInput');
const cardExpInput = document.getElementById('cardExpInput');
const cardCvvInput = document.getElementById('cardCvvInput');
const cardDisplayNum = document.getElementById('cardDisplayNum');
const cardDisplayName = document.getElementById('cardDisplayName');
const cardDisplayExp = document.getElementById('cardDisplayExp');
const checkoutFinalTotal = document.getElementById('checkoutFinalTotal');
const backToStep1Btn = document.getElementById('backToStep1Btn');
const trackPurchasedOrderBtn = document.getElementById('trackPurchasedOrderBtn');

// Auth Modal
const authModal = document.getElementById('authModal');
const closeAuthBtn = document.getElementById('closeAuthBtn');
const authTabSignIn = document.getElementById('authTabSignIn');
const authTabSignUp = document.getElementById('authTabSignUp');
const authForm = document.getElementById('authForm');
const authTitle = document.getElementById('authTitle');
const authSubtitle = document.getElementById('authSubtitle');
const authSubmitBtn = document.getElementById('authSubmitBtn');
const authToggleBtn = document.getElementById('authToggleBtn');
const authToggleText = document.getElementById('authToggleText');
const nameFieldGroup = document.getElementById('nameFieldGroup');
const roleFieldGroup = document.getElementById('roleFieldGroup');
const authEmail = document.getElementById('authEmail');
const authPassword = document.getElementById('authPassword');
const authName = document.getElementById('authName');
const authRole = document.getElementById('authRole');
const togglePasswordVisibilityBtn = document.getElementById('togglePasswordVisibilityBtn');
const quickLoginCustomer = document.getElementById('quickLoginCustomer');
const quickLoginAdmin = document.getElementById('quickLoginAdmin');

// Admin Modal
const productFormModal = document.getElementById('productFormModal');
const closeProductFormModalBtn = document.getElementById('closeProductFormModalBtn');
const adminProductForm = document.getElementById('adminProductForm');
const openAddProductModalBtn = document.getElementById('openAddProductModalBtn');
const seedSampleCatalogBtn = document.getElementById('seedSampleCatalogBtn');
const adminTableSearchInput = document.getElementById('adminTableSearchInput');
const adminProductsTableBody = document.getElementById('adminProductsTableBody');

// Diagnostics & Orders
const pingAllServicesBtn = document.getElementById('pingAllServicesBtn');
const advanceOrderStatusBtn = document.getElementById('advanceOrderStatusBtn');
const cancelCurrentOrderBtn = document.getElementById('cancelCurrentOrderBtn');
const refreshOrdersBtn = document.getElementById('refreshOrdersBtn');
const moveAllWishlistToCartBtn = document.getElementById('moveAllWishlistToCartBtn');

// Toast
const toast = document.getElementById('toast');
const toastTitle = document.getElementById('toastTitle');
const toastMsg = document.getElementById('toastMsg');
const toastIcon = document.getElementById('toastIcon');

// -------------------------------------------------------------------------
// 3. Application Lifecycle Initialization
// -------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  updateUserUI();
  updateCartBadge();
  updateWishlistBadge();
  setupEventListeners();
  checkGatewayStatus();
  fetchProductsFromBackend();
  renderProducts();
  renderDealsView();
  renderWishlistView();
  renderOrdersView();
  renderAdminStudio();
  renderMicroservicesGrid();
  startDealCountdownTimer();
});

// -------------------------------------------------------------------------
// 4. Gateway Connection & Microservices Integration
// -------------------------------------------------------------------------
async function checkGatewayStatus() {
  gatewayStatusText.textContent = "Gateway: Testing...";
  gatewayPulseDot.className = "status-pulse-dot";
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    
    const res = await fetch(`${GATEWAY_URL}/products`, { 
      method: 'GET',
      signal: controller.signal 
    });
    clearTimeout(timeoutId);
    
    if (res.ok) {
      state.gatewayOnline = true;
      gatewayPulseDot.className = "status-pulse-dot online";
      gatewayStatusText.textContent = "Gateway: Live (9002)";
      showToast("Spring Cloud Gateway online & connected!", "success", "🟢");
      return;
    }
  } catch (err) {
    // Gateway is offline, proceed in standalone mode
  }
  
  state.gatewayOnline = false;
  gatewayPulseDot.className = "status-pulse-dot";
  gatewayStatusText.textContent = "Gateway: Standalone Demo";
}

async function fetchProductsFromBackend() {
  try {
    const res = await fetch(`${GATEWAY_URL}/products`);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        state.products = data.map(item => ({
          id: item.id || `prod-${Date.now()}`,
          name: item.name,
          description: item.description || "Flagship technology product",
          price: Number(item.price) || 99.99,
          originalPrice: (Number(item.price) * 1.15) || 119.99,
          category: item.category || item.categoryId || "Electronics",
          brand: item.brand || "Nexus",
          stock: item.stock !== undefined ? item.stock : 15,
          rating: 4.8,
          reviewsCount: 120,
          imageUrl: item.image || item.imageUrl || "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80"
        }));
        saveProducts();
        renderProducts();
        showToast("Fetched real-time catalog from Product-Service (9007)", "info", "📦");
      }
    }
  } catch (e) {
    // Fallback smoothly to pre-loaded flagship catalog
  }
}

// -------------------------------------------------------------------------
// 5. Product Catalog Rendering & Filtering Engine
// -------------------------------------------------------------------------
function getFilteredProducts() {
  return state.products.filter(p => {
    // Category filter
    if (state.activeCategory !== 'all') {
      const matchCat = p.category && p.category.toLowerCase() === state.activeCategory.toLowerCase();
      if (!matchCat) return false;
    }
    // Max price filter
    if (p.price > state.filters.maxPrice) return false;
    // In-stock only filter
    if (state.filters.inStockOnly && p.stock <= 0) return false;
    // Brand filter
    if (state.filters.brand !== 'all') {
      if (!p.brand || p.brand.toLowerCase() !== state.filters.brand.toLowerCase()) return false;
    }
    // Search query filter
    if (state.filters.searchQuery) {
      const q = state.filters.searchQuery.toLowerCase();
      const match = (p.name && p.name.toLowerCase().includes(q)) ||
                    (p.description && p.description.toLowerCase().includes(q)) ||
                    (p.brand && p.brand.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  }).sort((a, b) => {
    switch (state.filters.sort) {
      case 'price-asc': return a.price - b.price;
      case 'price-desc': return b.price - a.price;
      case 'rating-desc': return (b.rating || 4.5) - (a.rating || 4.5);
      case 'name-asc': return a.name.localeCompare(b.name);
      default: return 0; // featured
    }
  });
}

function renderProducts() {
  const filtered = getFilteredProducts();
  productCountBadge.textContent = `Showing ${filtered.length} of ${state.products.length} products`;
  
  // Update Active Filter Tags bar
  renderFilterChips();

  if (filtered.length === 0) {
    productGrid.innerHTML = '';
    catalogEmptyState.style.display = 'block';
    return;
  }
  
  catalogEmptyState.style.display = 'none';
  
  productGrid.innerHTML = filtered.map(prod => {
    const isLiked = state.wishlist.some(w => w.id === prod.id);
    const isLowStock = prod.stock > 0 && prod.stock <= 8;
    const discountPercent = prod.originalPrice && prod.originalPrice > prod.price 
      ? Math.round(((prod.originalPrice - prod.price) / prod.originalPrice) * 100)
      : null;

    return `
      <div class="product-card" data-id="${prod.id}">
        
        <div class="card-floating-badges">
          ${discountPercent ? `<span class="discount-pill">${discountPercent}% OFF</span>` : ''}
          <span class="stock-pill ${isLowStock ? 'low' : ''}">
            ${prod.stock > 0 ? (isLowStock ? `Low Stock (${prod.stock})` : `In Stock (${prod.stock})`) : 'Out of Stock'}
          </span>
        </div>

        <div class="card-quick-actions">
          <button class="quick-action-btn ${isLiked ? 'liked' : ''}" onclick="toggleWishlist('${prod.id}')" title="${isLiked ? 'Remove from Wishlist' : 'Add to Wishlist'}">
            ${isLiked ? '💖' : '🤍'}
          </button>
          <button class="quick-action-btn" onclick="openQuickView('${prod.id}')" title="Quick View">
            👁️
          </button>
          <button class="quick-action-btn" onclick="addToCart('${prod.id}')" title="Add to Cart">
            🛒
          </button>
        </div>

        <div class="product-img-wrap" onclick="openQuickView('${prod.id}')" style="cursor: pointer;">
          <img src="${prod.imageUrl || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e'}" alt="${escapeHtml(prod.name)}" loading="lazy" />
        </div>

        <div class="card-category-brand">
          <span>${prod.brand || 'Nexus'}</span>
          <span>${prod.category || 'Tech'}</span>
        </div>

        <h3 class="product-title" onclick="openQuickView('${prod.id}')" style="cursor: pointer;">${escapeHtml(prod.name)}</h3>
        <p class="product-desc">${escapeHtml(prod.description)}</p>

        <div class="card-rating-row">
          <span class="rating-stars">★★★★★</span>
          <span class="rating-score">${prod.rating || 4.8}</span>
          <span class="reviews-count">(${prod.reviewsCount || 85})</span>
        </div>

        <div class="product-footer">
          <div class="price-group">
            <span class="price">$${prod.price.toFixed(2)}</span>
            ${prod.originalPrice ? `<span class="original-price">$${prod.originalPrice.toFixed(2)}</span>` : ''}
          </div>
          <button class="add-cart-btn" onclick="addToCart('${prod.id}')">
            <span>🛒 Add</span>
          </button>
        </div>

      </div>
    `;
  }).join('');
}

function renderFilterChips() {
  let chipsHtml = '';
  
  if (state.activeCategory !== 'all') {
    chipsHtml += `<span class="filter-chip">Category: ${state.activeCategory} <span style="cursor:pointer;" onclick="resetCategory()">&times;</span></span>`;
  }
  if (state.filters.maxPrice < 3000) {
    chipsHtml += `<span class="filter-chip">Max: $${state.filters.maxPrice} <span style="cursor:pointer;" onclick="resetPriceFilter()">&times;</span></span>`;
  }
  if (state.filters.inStockOnly) {
    chipsHtml += `<span class="filter-chip">In-Stock Only <span style="cursor:pointer;" onclick="toggleInStock(false)">&times;</span></span>`;
  }
  if (state.filters.brand !== 'all') {
    chipsHtml += `<span class="filter-chip">Brand: ${state.filters.brand} <span style="cursor:pointer;" onclick="resetBrandFilter()">&times;</span></span>`;
  }
  if (state.filters.searchQuery) {
    chipsHtml += `<span class="filter-chip">Search: "${state.filters.searchQuery}" <span style="cursor:pointer;" onclick="clearSearch()">&times;</span></span>`;
  }

  if (chipsHtml) {
    activeFilterTags.style.display = 'flex';
    filterChipsContainer.innerHTML = chipsHtml;
  } else {
    activeFilterTags.style.display = 'none';
  }
}

// -------------------------------------------------------------------------
// 6. Shopping Cart & Drawer Management
// -------------------------------------------------------------------------
function addToCart(productId, qty = 1) {
  const product = state.products.find(p => p.id === productId);
  if (!product) return;

  const existing = state.cart.find(c => c.id === productId);
  if (existing) {
    existing.quantity += qty;
  } else {
    state.cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      category: product.category,
      quantity: qty
    });
  }

  saveCart();
  updateCartBadge();
  renderCartDrawer();
  showToast(`Added "${product.name}" to cart!`, "success", "🛍️");

  // Sync with Cart-Service (9003) via Gateway
  if (state.gatewayOnline && state.user) {
    fetch(`${GATEWAY_URL}/cart/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${state.token}`
      },
      body: JSON.stringify({
        userId: state.user.email,
        productId: product.id,
        quantity: qty,
        imageUrl: product.imageUrl
      })
    }).catch(e => console.warn('Cart-service sync:', e));
  }
}

function updateCartQuantity(productId, newQty) {
  if (newQty <= 0) {
    removeFromCart(productId);
    return;
  }
  const item = state.cart.find(c => c.id === productId);
  if (item) {
    item.quantity = newQty;
    saveCart();
    updateCartBadge();
    renderCartDrawer();
  }
}

function removeFromCart(productId) {
  state.cart = state.cart.filter(c => c.id !== productId);
  saveCart();
  updateCartBadge();
  renderCartDrawer();
  showToast("Item removed from cart", "info", "🗑️");

  // Remove from backend Cart-Service
  if (state.gatewayOnline) {
    fetch(`${GATEWAY_URL}/cart/${productId}`, { method: 'DELETE' }).catch(() => {});
  }
}

function clearCart() {
  if (state.cart.length === 0) return;
  state.cart = [];
  state.appliedCoupon = null;
  saveCart();
  updateCartBadge();
  renderCartDrawer();
  showToast("Shopping cart cleared", "info", "🧹");
}

function getCartCalculations() {
  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  let discount = 0;
  
  if (state.appliedCoupon) {
    if (state.appliedCoupon.type === 'percent') {
      discount = subtotal * state.appliedCoupon.rate;
    } else if (state.appliedCoupon.type === 'fixed') {
      discount = Math.min(subtotal, state.appliedCoupon.amount);
    }
  }

  const taxableAmount = Math.max(0, subtotal - discount);
  const tax = taxableAmount * 0.08; // 8% sales tax
  const shipping = subtotal >= 500 || (state.appliedCoupon && state.appliedCoupon.code === 'FREESHIP') ? 0 : 25;
  const total = taxableAmount + tax + shipping;

  return { subtotal, discount, tax, shipping, total };
}

function renderCartDrawer() {
  drawerItemCountSubtitle.textContent = `${state.cart.length} unique items`;
  
  if (state.cart.length === 0) {
    cartItemsList.innerHTML = `
      <div class="empty-state-card" style="margin: 30px auto; padding: 30px 10px;">
        <div class="empty-icon">🛒</div>
        <h3>Your Cart is Empty</h3>
        <p>Explore our flagship tech gear and add items to your cart.</p>
        <button class="btn btn-primary btn-sm" onclick="closeCartDrawer(); switchView('storefront');">Start Shopping</button>
      </div>
    `;
    shippingProgressBar.style.width = '0%';
    shippingProgressText.textContent = 'Add $500 for Free Express Delivery';
    cartSubtotal.textContent = '$0.00';
    cartDiscount.textContent = '-$0.00';
    discountRow.style.display = 'none';
    cartTax.textContent = '$0.00';
    cartShipping.textContent = 'FREE';
    cartTotal.textContent = '$0.00';
    return;
  }

  const { subtotal, discount, tax, shipping, total } = getCartCalculations();

  // Free shipping progress
  const freeShippingThreshold = 500;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  shippingProgressBar.style.width = `${progressPercent}%`;
  if (subtotal >= freeShippingThreshold) {
    shippingProgressText.textContent = '🎉 You unlocked FREE Express Shipping!';
  } else {
    shippingProgressText.textContent = `Add $${(freeShippingThreshold - subtotal).toFixed(2)} more for Free Shipping!`;
  }

  // Render items
  cartItemsList.innerHTML = state.cart.map(item => `
    <div class="cart-item-row">
      <img src="${item.imageUrl || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e'}" alt="${escapeHtml(item.name)}" class="cart-item-thumb" />
      <div class="cart-item-details">
        <h4 class="cart-item-title">${escapeHtml(item.name)}</h4>
        <div class="cart-item-unit-price">$${item.price.toFixed(2)} each</div>
        
        <div class="cart-item-stepper-row">
          <div class="cart-mini-stepper">
            <button class="mini-step-btn" onclick="updateCartQuantity('${item.id}', ${item.quantity - 1})">-</button>
            <span class="mini-step-qty">${item.quantity}</span>
            <button class="mini-step-btn" onclick="updateCartQuantity('${item.id}', ${item.quantity + 1})">+</button>
          </div>
          <span class="cart-item-total">$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
      </div>
      <button class="cart-remove-item-btn" onclick="removeFromCart('${item.id}')" title="Remove Item">&times;</button>
    </div>
  `).join('');

  cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
  if (discount > 0) {
    discountRow.style.display = 'flex';
    cartDiscount.textContent = `-$${discount.toFixed(2)}`;
  } else {
    discountRow.style.display = 'none';
  }
  cartTax.textContent = `$${tax.toFixed(2)}`;
  cartShipping.textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
  cartTotal.textContent = `$${total.toFixed(2)}`;
}

function updateCartBadge() {
  const totalQty = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCountBadge.textContent = totalQty;
  const { subtotal } = getCartCalculations();
  navCartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
  
  cartCountBadge.classList.remove('count-pop');
  void cartCountBadge.offsetWidth; // trigger reflow
  cartCountBadge.classList.add('count-pop');
}

function applyCouponCode() {
  const code = couponInput.value.trim().toUpperCase();
  if (!code) return;

  if (code === 'NEXUS20') {
    state.appliedCoupon = { code: 'NEXUS20', type: 'percent', rate: 0.20, label: '20% Spring Tech Discount' };
    showToast("Coupon 'NEXUS20' applied: 20% OFF! 🎉", "success", "🔥");
  } else if (code === 'FREESHIP') {
    state.appliedCoupon = { code: 'FREESHIP', type: 'free_shipping', label: 'Free Express Shipping' };
    showToast("Coupon 'FREESHIP' applied: Free Express Delivery!", "success", "🚚");
  } else if (code === 'TECH50') {
    state.appliedCoupon = { code: 'TECH50', type: 'fixed', amount: 50.0, label: '$50 Instant Voucher' };
    showToast("Coupon 'TECH50' applied: $50 off!", "success", "💰");
  } else {
    showToast("Invalid promo code. Try 'NEXUS20' or 'FREESHIP'", "error", "⚠️");
    return;
  }

  appliedCouponBadge.style.display = 'flex';
  appliedCouponBadge.querySelector('strong').textContent = state.appliedCoupon.code;
  couponInput.value = '';
  renderCartDrawer();
}

function removeCouponCode() {
  state.appliedCoupon = null;
  appliedCouponBadge.style.display = 'none';
  renderCartDrawer();
  showToast("Coupon removed", "info", "🏷️");
}

function openCartDrawer() {
  renderCartDrawer();
  cartDrawer.classList.add('open');
}

function closeCartDrawer() {
  cartDrawer.classList.remove('open');
}

// -------------------------------------------------------------------------
// 7. Quick View / Product Detail Modal
// -------------------------------------------------------------------------
function openQuickView(productId) {
  const product = state.products.find(p => p.id === productId);
  if (!product) return;

  state.quickViewCurrentItem = product;
  qvProductImage.src = product.imageUrl || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e';
  qvTitle.textContent = product.name;
  qvBrand.textContent = product.brand || 'Nexus';
  qvCategory.textContent = product.category || 'Tech';
  qvDescription.textContent = product.description;
  qvRating.textContent = product.rating || 4.8;
  qvPrice.textContent = `$${product.price.toFixed(2)}`;
  
  if (product.originalPrice && product.originalPrice > product.price) {
    qvOriginalPrice.style.display = 'inline';
    qvOriginalPrice.textContent = `$${product.originalPrice.toFixed(2)}`;
    qvDiscountTag.style.display = 'inline-block';
    const disc = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    qvDiscountTag.textContent = `${disc}% OFF`;
  } else {
    qvOriginalPrice.style.display = 'none';
    qvDiscountTag.style.display = 'none';
  }

  // Stock Meter
  qvStockCount.textContent = `${product.stock} units in warehouse`;
  const pct = Math.min(100, (product.stock / 30) * 100);
  qvStockBar.style.width = `${pct}%`;
  qvStockStatus.textContent = product.stock > 0 ? "In Stock" : "Out of Stock";

  // Quantity input
  qvQtyInput.value = 1;

  // Like button
  const isLiked = state.wishlist.some(w => w.id === product.id);
  qvWishlistBtn.textContent = isLiked ? '💖' : '🤍';

  quickViewModal.classList.add('open');
}

function closeQuickView() {
  quickViewModal.classList.remove('open');
  state.quickViewCurrentItem = null;
}

// -------------------------------------------------------------------------
// 8. Wishlist Management
// -------------------------------------------------------------------------
function toggleWishlist(productId) {
  const product = state.products.find(p => p.id === productId);
  if (!product) return;

  const idx = state.wishlist.findIndex(w => w.id === productId);
  if (idx > -1) {
    state.wishlist.splice(idx, 1);
    showToast(`Removed "${product.name}" from wishlist`, "info", "🤍");
  } else {
    state.wishlist.push(product);
    showToast(`Saved "${product.name}" to wishlist!`, "success", "💖");
  }

  saveWishlist();
  updateWishlistBadge();
  renderProducts();
  renderWishlistView();
}

function updateWishlistBadge() {
  wishlistCountBadge.textContent = state.wishlist.length;
  tabWishlistCount.textContent = state.wishlist.length;
}

function renderWishlistView() {
  const wishlistGrid = document.getElementById('wishlistGrid');
  const emptyState = document.getElementById('wishlistEmptyState');
  if (!wishlistGrid || !emptyState) return;

  if (state.wishlist.length === 0) {
    wishlistGrid.innerHTML = '';
    emptyState.style.display = 'block';
    return;
  }

  emptyState.style.display = 'none';
  wishlistGrid.innerHTML = state.wishlist.map(prod => `
    <div class="product-card">
      <div class="product-img-wrap" onclick="openQuickView('${prod.id}')" style="cursor: pointer;">
        <img src="${prod.imageUrl}" alt="${escapeHtml(prod.name)}" />
      </div>
      <div class="card-category-brand">
        <span>${prod.brand || 'Nexus'}</span>
        <span>${prod.category}</span>
      </div>
      <h3 class="product-title">${escapeHtml(prod.name)}</h3>
      <div class="product-footer">
        <span class="price">$${prod.price.toFixed(2)}</span>
        <div style="display:flex; gap:6px;">
          <button class="btn btn-glass btn-sm" onclick="toggleWishlist('${prod.id}')">Remove</button>
          <button class="btn btn-primary btn-sm" onclick="addToCart('${prod.id}'); toggleWishlist('${prod.id}');">🛒 Cart</button>
        </div>
      </div>
    </div>
  `).join('');
}

function moveAllWishlistToCart() {
  if (state.wishlist.length === 0) {
    showToast("Your wishlist is empty!", "info", "💖");
    return;
  }
  state.wishlist.forEach(item => {
    addToCart(item.id, 1);
  });
  state.wishlist = [];
  saveWishlist();
  updateWishlistBadge();
  renderWishlistView();
  showToast("Moved all wishlist items to cart! 🛍️", "success", "🚀");
}

// -------------------------------------------------------------------------
// 9. Multi-Step Checkout & Order Placement Flow
// -------------------------------------------------------------------------
function openCheckoutModal() {
  if (state.cart.length === 0) {
    showToast("Your cart is empty! Add items before checkout.", "error", "⚠️");
    return;
  }

  closeCartDrawer();
  
  // Fill default customer info if available
  if (state.user) {
    document.getElementById('shippingFullName').value = state.user.name || "Alex Mercer";
    document.getElementById('shippingEmail').value = state.user.email || "alex@mach.com";
  }

  setCheckoutStep(1);
  const { total } = getCartCalculations();
  checkoutFinalTotal.textContent = `$${total.toFixed(2)}`;

  checkoutModal.classList.add('open');
}

function closeCheckoutModal() {
  checkoutModal.classList.remove('open');
}

function setCheckoutStep(stepNumber) {
  document.querySelectorAll('.checkout-step-pane').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.co-step').forEach(s => s.classList.remove('active'));

  document.getElementById(`checkoutStep${stepNumber}`).classList.add('active');
  document.getElementById(`coStepIndicator${stepNumber}`).classList.add('active');
}

async function handleFinalOrderPlacement() {
  const { total } = getCartCalculations();
  const orderNumber = `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  const customerName = document.getElementById('shippingFullName').value || (state.user ? state.user.name : "Guest Customer");
  const customerEmail = document.getElementById('shippingEmail').value || (state.user ? state.user.email : "guest@mach.com");

  const orderPayload = {
    orderNumber: orderNumber,
    customerName: customerName,
    customerEmail: customerEmail,
    items: state.cart.map(i => ({ name: i.name, price: i.price, quantity: i.quantity })),
    totalPrice: total,
    status: "Confirmed (Kafka Dispatched)",
    step: 2,
    date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ", Today"
  };

  // Dispatch to Order-Service & Payment-Service via API Gateway
  if (state.gatewayOnline) {
    try {
      const headers = { 'Content-Type': 'application/json' };
      if (state.token) headers['Authorization'] = `Bearer ${state.token}`;

      // 1. Post to Order-Service (9009)
      await fetch(`${GATEWAY_URL}/orders/place`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          userId: customerEmail,
          customerName: customerName,
          customerEmail: customerEmail,
          totalPrice: total,
          status: "Placed"
        })
      });

      // 2. Post to Payment-Service (9006)
      await fetch(`${GATEWAY_URL}/payments`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          orderId: orderNumber,
          amount: total,
          paymentStatus: "SUCCESS",
          paymentMethod: "CREDIT_CARD"
        })
      });
    } catch (e) {
      console.warn("Backend order placement fallback:", e);
    }
  }

  // Save to persistent user orders
  state.orders.unshift(orderPayload);
  state.activeTrackingOrder = orderPayload;
  saveOrders();

  // Clear cart
  state.cart = [];
  state.appliedCoupon = null;
  saveCart();
  updateCartBadge();

  // Populate receipt screen
  document.getElementById('receiptOrderNum').textContent = orderNumber;
  document.getElementById('receiptTotal').textContent = `$${total.toFixed(2)}`;
  document.getElementById('receiptEmail').textContent = customerEmail;

  setCheckoutStep(3);
  renderOrdersView();
  showToast("Order placed successfully! Kafka event dispatched 🎉", "success", "🚀");
}

// -------------------------------------------------------------------------
// 10. Order Tracking & Delivery Progression
// -------------------------------------------------------------------------
function renderOrdersView() {
  const container = document.getElementById('ordersListContainer');
  const emptyState = document.getElementById('ordersEmptyState');
  const activeTrackerCard = document.getElementById('activeOrderTrackerCard');
  if (!container) return;

  if (state.orders.length === 0) {
    container.innerHTML = '';
    emptyState.style.display = 'block';
    activeTrackerCard.style.display = 'none';
    return;
  }

  emptyState.style.display = 'none';

  // Active tracked order (default to newest order)
  const activeOrder = state.activeTrackingOrder || state.orders[0];
  if (activeOrder) {
    activeTrackerCard.style.display = 'block';
    document.getElementById('trackerOrderNumber').textContent = activeOrder.orderNumber;
    document.getElementById('trackerTimestamp').textContent = `Placed: ${activeOrder.date || 'Recent'}`;
    updateDeliveryStepperUI(activeOrder.step || 1);
  }

  // Render past orders list
  container.innerHTML = state.orders.map(order => `
    <div class="order-history-card">
      <div class="order-card-header">
        <div>
          <span class="order-id-label"># ${order.orderNumber}</span>
          <span class="status-pill-sub green" style="margin-left: 8px;">${order.status}</span>
        </div>
        <span class="order-total-price">$${Number(order.totalPrice).toFixed(2)}</span>
      </div>
      <div style="font-size: 13px; color: var(--text-muted); margin-bottom: 8px;">
        📅 ${order.date || 'Recent'} &nbsp;•&nbsp; Recipient: ${order.customerName} (${order.customerEmail})
      </div>
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        ${order.items ? order.items.map(it => `
          <span class="meta-tag">📦 ${it.name} (x${it.quantity})</span>
        `).join('') : '<span class="meta-tag">1 Flagship Product</span>'}
      </div>
      <div style="margin-top: 12px; display: flex; justify-content: flex-end; gap: 8px;">
        <button class="btn btn-glass btn-sm" onclick="trackSpecificOrder('${order.orderNumber}')">
          📍 Track Status
        </button>
      </div>
    </div>
  `).join('');
}

function updateDeliveryStepperUI(step) {
  const steps = [
    { node: document.getElementById('stepPlaced'), line: null },
    { node: document.getElementById('stepPaid'), line: document.getElementById('line1') },
    { node: document.getElementById('stepPacked'), line: document.getElementById('line2') },
    { node: document.getElementById('stepShipping'), line: document.getElementById('line3') },
    { node: document.getElementById('stepDelivered'), line: document.getElementById('line4') }
  ];

  steps.forEach((s, idx) => {
    const stepNum = idx + 1;
    if (s.node) {
      s.node.classList.remove('active', 'completed');
      if (stepNum < step) s.node.classList.add('completed');
      if (stepNum === step) s.node.classList.add('active');
    }
    if (s.line) {
      if (stepNum <= step) s.line.classList.add('active');
      else s.line.classList.remove('active');
    }
  });
}

function trackSpecificOrder(orderNumber) {
  const order = state.orders.find(o => o.orderNumber === orderNumber);
  if (order) {
    state.activeTrackingOrder = order;
    renderOrdersView();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`Tracking ${orderNumber}`, "info", "📍");
  }
}

function advanceOrderStatus() {
  const activeOrder = state.activeTrackingOrder || state.orders[0];
  if (!activeOrder) return;

  const statusMap = {
    1: { step: 2, status: "Payment Confirmed (Port 9006)" },
    2: { step: 3, status: "Inventory Packed (Port 9007)" },
    3: { step: 4, status: "Out for Delivery (Port 9010)" },
    4: { step: 5, status: "Delivered & Signed" },
    5: { step: 1, status: "Order Placed (Kafka Dispatched)" }
  };

  const next = statusMap[activeOrder.step || 1];
  activeOrder.step = next.step;
  activeOrder.status = next.status;
  saveOrders();
  renderOrdersView();
  showToast(`Simulated Delivery Advance: ${next.status}`, "success", "🚚");
}

function cancelCurrentOrder() {
  const activeOrder = state.activeTrackingOrder || state.orders[0];
  if (!activeOrder) return;

  activeOrder.status = "Cancelled";
  activeOrder.step = 0;
  saveOrders();
  renderOrdersView();
  showToast(`Order ${activeOrder.orderNumber} cancelled`, "info", "🚫");

  // Call Order-Service cancellation route
  if (state.gatewayOnline) {
    fetch(`${GATEWAY_URL}/orders/orders/${activeOrder.orderNumber}/cancel`, { method: 'PUT' }).catch(() => {});
  }
}

// -------------------------------------------------------------------------
// 11. Microservices Topology & Diagnostics Console
// -------------------------------------------------------------------------
function renderMicroservicesGrid() {
  const grid = document.getElementById('servicesGrid');
  if (!grid) return;

  grid.innerHTML = microservicesConfig.map(svc => `
    <div class="service-telemetry-card" id="svcCard-${svc.port}">
      <div class="service-card-top">
        <div class="service-icon-box">${svc.icon}</div>
        <span class="service-status-tag ${state.gatewayOnline ? 'online' : 'offline'}" id="statusTag-${svc.port}">
          ${state.gatewayOnline ? '🟢 Connected' : '🟡 Standalone'}
        </span>
      </div>
      <h3 class="service-name">${svc.name}</h3>
      <div class="service-port">Port: <code>${svc.port}</code></div>
      <p class="service-desc">${svc.desc}</p>
      <div class="service-metrics">
        <span>Latency: <strong id="latency-${svc.port}">&lt; 3ms</strong></span>
        <span>Protocol: <strong>HTTP/REST</strong></span>
      </div>
    </div>
  `).join('');
}

async function pingAllMicroservices() {
  showToast("Pinging microservices network...", "info", "⚡");

  for (const svc of microservicesConfig) {
    const latencyEl = document.getElementById(`latency-${svc.port}`);
    const tagEl = document.getElementById(`statusTag-${svc.port}`);
    
    const startTime = performance.now();
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1200);
      
      await fetch(svc.url, { method: 'GET', signal: controller.signal, mode: 'no-cors' });
      clearTimeout(timeoutId);
      
      const duration = Math.round(performance.now() - startTime);
      if (latencyEl) latencyEl.textContent = `${duration}ms`;
      if (tagEl) {
        tagEl.className = "service-status-tag online";
        tagEl.textContent = "🟢 Live (Online)";
      }
    } catch (e) {
      if (latencyEl) latencyEl.textContent = "Offline (Local Fallback)";
      if (tagEl) {
        tagEl.className = "service-status-tag offline";
        tagEl.textContent = "🟡 Standalone Simulated";
      }
    }
  }

  showToast("Diagnostics complete! All microservices checked.", "success", "🛰️");
}

// -------------------------------------------------------------------------
// 12. Admin Inventory Management Studio
// -------------------------------------------------------------------------
function renderAdminStudio() {
  const tableBody = document.getElementById('adminProductsTableBody');
  const kpiTotalProducts = document.getElementById('kpiTotalProducts');
  const kpiTotalUnits = document.getElementById('kpiTotalUnits');
  const kpiCatalogValue = document.getElementById('kpiCatalogValue');
  const kpiTotalCategories = document.getElementById('kpiTotalCategories');
  if (!tableBody) return;

  // Calculate KPIs
  const totalItems = state.products.length;
  const totalUnits = state.products.reduce((sum, p) => sum + (p.stock || 0), 0);
  const totalVal = state.products.reduce((sum, p) => sum + (p.price * (p.stock || 1)), 0);
  const categories = new Set(state.products.map(p => p.category)).size;

  kpiTotalProducts.textContent = totalItems;
  kpiTotalUnits.textContent = totalUnits;
  kpiCatalogValue.textContent = `$${totalVal.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  kpiTotalCategories.textContent = categories;

  const searchQuery = (adminTableSearchInput && adminTableSearchInput.value) ? adminTableSearchInput.value.toLowerCase() : '';
  const displayProducts = state.products.filter(p => 
    !searchQuery || p.name.toLowerCase().includes(searchQuery) || (p.brand && p.brand.toLowerCase().includes(searchQuery))
  );

  tableBody.innerHTML = displayProducts.map(prod => `
    <tr>
      <td>
        <div style="display:flex; align-items:center; gap:12px;">
          <img src="${prod.imageUrl || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e'}" class="admin-table-thumb" alt="" />
          <div>
            <strong>${escapeHtml(prod.name)}</strong>
            <div style="font-size:11px; color:var(--text-muted);">ID: ${prod.id}</div>
          </div>
        </div>
      </td>
      <td><span class="meta-tag">${prod.category}</span></td>
      <td><strong>${prod.brand || 'Nexus'}</strong></td>
      <td><strong style="color:var(--primary);">$${prod.price.toFixed(2)}</strong></td>
      <td>
        <span class="stock-pill ${prod.stock <= 5 ? 'low' : ''}">
          ${prod.stock} Units
        </span>
      </td>
      <td><span class="status-pill-sub green">Active in DB</span></td>
      <td>
        <div class="admin-action-btns">
          <button class="btn btn-glass btn-xs" onclick="openEditProductModal('${prod.id}')">✏️ Edit</button>
          <button class="btn btn-danger-ghost btn-xs" onclick="deleteProduct('${prod.id}')">🗑️ Delete</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function openAddProductModal() {
  document.getElementById('productFormModalTitle').textContent = "➕ Add New Product to Catalog";
  document.getElementById('adminProductId').value = '';
  adminProductForm.reset();
  productFormModal.classList.add('open');
}

function openEditProductModal(productId) {
  const prod = state.products.find(p => p.id === productId);
  if (!prod) return;

  document.getElementById('productFormModalTitle').textContent = `✏️ Edit Product (${prod.name})`;
  document.getElementById('adminProductId').value = prod.id;
  document.getElementById('adminProdName').value = prod.name;
  document.getElementById('adminProdBrand').value = prod.brand || 'Nexus';
  document.getElementById('adminProdCategory').value = prod.category || 'Electronics';
  document.getElementById('adminProdPrice').value = prod.price;
  document.getElementById('adminProdStock').value = prod.stock;
  document.getElementById('adminProdDesc').value = prod.description;
  document.getElementById('adminProdImage').value = prod.imageUrl;

  productFormModal.classList.add('open');
}

function closeAdminProductModal() {
  productFormModal.classList.remove('open');
}

async function handleAdminProductSubmit(e) {
  e.preventDefault();
  const id = document.getElementById('adminProductId').value;
  const name = document.getElementById('adminProdName').value.trim();
  const brand = document.getElementById('adminProdBrand').value.trim();
  const category = document.getElementById('adminProdCategory').value;
  const price = parseFloat(document.getElementById('adminProdPrice').value);
  const stock = parseInt(document.getElementById('adminProdStock').value, 10);
  const description = document.getElementById('adminProdDesc').value.trim();
  const imageUrl = document.getElementById('adminProdImage').value.trim();

  const productData = {
    id: id || `prod-${Date.now()}`,
    name,
    brand,
    category,
    price,
    originalPrice: price * 1.15,
    stock,
    description,
    imageUrl,
    rating: 4.8,
    reviewsCount: 10
  };

  if (id) {
    // Edit
    const idx = state.products.findIndex(p => p.id === id);
    if (idx > -1) state.products[idx] = { ...state.products[idx], ...productData };
    showToast(`Updated product "${name}"`, "success", "💾");

    // Sync with backend Product-Service
    if (state.gatewayOnline) {
      fetch(`${GATEWAY_URL}/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      }).catch(() => {});
    }
  } else {
    // Create new
    state.products.unshift(productData);
    showToast(`Added new product "${name}" to MongoDB catalog!`, "success", "✨");

    // Sync with backend Product-Service
    if (state.gatewayOnline) {
      fetch(`${GATEWAY_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      }).catch(() => {});
    }
  }

  saveProducts();
  renderProducts();
  renderAdminStudio();
  closeAdminProductModal();
}

function deleteProduct(productId) {
  if (!confirm("Are you sure you want to delete this product from the database?")) return;

  state.products = state.products.filter(p => p.id !== productId);
  saveProducts();
  renderProducts();
  renderAdminStudio();
  showToast("Product deleted successfully", "info", "🗑️");

  // Call DELETE on Product-Service
  if (state.gatewayOnline) {
    fetch(`${GATEWAY_URL}/products/${productId}`, { method: 'DELETE' }).catch(() => {});
  }
}

function seedSampleCatalog() {
  state.products = [...defaultSampleProducts];
  saveProducts();
  renderProducts();
  renderAdminStudio();
  showToast("Restored 12 flagship devices to database catalog!", "success", "🌱");
}

// -------------------------------------------------------------------------
// 13. Authentication & User Management
// -------------------------------------------------------------------------
async function handleAuthSubmit(e) {
  e.preventDefault();
  const email = authEmail.value.trim();
  const password = authPassword.value.trim();
  const name = authName.value.trim();
  const role = authRole.value;

  const endpoint = state.isSignup ? `${GATEWAY_URL}/auth/signup` : `${GATEWAY_URL}/auth/login`;
  const payload = state.isSignup ? { name, email, password, role } : { email, password };

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const responseText = await res.text();
    if (res.ok) {
      if (state.isSignup) {
        showToast("Account created successfully! Please sign in.", "success", "🎉");
        switchAuthMode(false);
      } else {
        state.token = responseText || 'jwt_token_verified';
        state.user = { email, name: name || email.split('@')[0], role: role || 'CUSTOMER' };
        saveAuth();
        updateUserUI();
        closeAuthModal();
        showToast(`Welcome back, ${state.user.name}! 🗝️`, "success", "👋");
      }
      return;
    }
  } catch (err) {
    // Gateway offline fallback demo login
  }

  // Standalone mode login
  state.user = { email, name: name || email.split('@')[0], role: role || 'CUSTOMER' };
  state.token = 'demo_jwt_token_verified_123';
  saveAuth();
  updateUserUI();
  closeAuthModal();
  showToast(`Welcome, ${state.user.name}! (Demo Mode)`, "success", "🗝️");
}

function quickLogin(type) {
  if (type === 'admin') {
    state.user = { name: "Root Admin", email: "admin@mach.com", role: "ADMIN" };
  } else {
    state.user = { name: "Alex Mercer", email: "alex@mach.com", role: "CUSTOMER" };
  }
  state.token = 'demo_jwt_token_verified_root';
  saveAuth();
  updateUserUI();
  closeAuthModal();
  showToast(`Signed in as ${state.user.name} (${state.user.role})`, "success", "⚡");
}

function logoutUser() {
  state.user = null;
  state.token = null;
  localStorage.removeItem('nexus_user');
  localStorage.removeItem('nexus_token');
  updateUserUI();
  userDropdownMenu.classList.remove('show');
  showToast("Signed out successfully", "info", "🚪");
}

function updateUserUI() {
  if (state.user) {
    userAccountLabel.textContent = state.user.name;
    userRoleBadge.textContent = state.user.role;
    userAvatarCircle.textContent = state.user.name.charAt(0).toUpperCase();
    dropdownUserEmail.textContent = state.user.email;
    logoutBtn.style.display = 'flex';

    if (state.user.role === 'ADMIN') {
      adminStudioTab.style.display = 'inline-flex';
    }
  } else {
    userAccountLabel.textContent = "Sign In";
    userRoleBadge.textContent = "Guest";
    userAvatarCircle.textContent = "👤";
    dropdownUserEmail.textContent = "Not signed in";
    logoutBtn.style.display = 'none';
  }
}

function switchAuthMode(isSignup) {
  state.isSignup = isSignup;
  authTabSignIn.classList.toggle('active', !isSignup);
  authTabSignUp.classList.toggle('active', isSignup);
  authTitle.textContent = isSignup ? "Create Mach Account" : "Sign In to Mach";
  authSubmitBtn.textContent = isSignup ? "Create Account 🚀" : "Sign In 🗝️";
  nameFieldGroup.classList.toggle('hidden', !isSignup);
  roleFieldGroup.classList.toggle('hidden', !isSignup);
  authToggleText.textContent = isSignup ? "Already have an account?" : "Don't have an account?";
  authToggleBtn.textContent = isSignup ? "Sign In" : "Create an account";
}

function openAuthModal() {
  authModal.classList.add('open');
}

function closeAuthModal() {
  authModal.classList.remove('open');
}

// -------------------------------------------------------------------------
// 14. Flash Deals View & Countdown Timer
// -------------------------------------------------------------------------
function renderDealsView() {
  const dealsGrid = document.getElementById('dealsGrid');
  if (!dealsGrid) return;

  const dealProducts = state.products.filter(p => p.originalPrice && p.originalPrice > p.price);
  dealsGrid.innerHTML = dealProducts.map(prod => `
    <div class="product-card">
      <div class="card-floating-badges">
        <span class="discount-pill">🔥 20% OFF</span>
      </div>
      <div class="product-img-wrap" onclick="openQuickView('${prod.id}')" style="cursor: pointer;">
        <img src="${prod.imageUrl}" alt="${escapeHtml(prod.name)}" />
      </div>
      <div class="card-category-brand">
        <span>${prod.brand || 'Nexus'}</span>
        <span>${prod.category}</span>
      </div>
      <h3 class="product-title" onclick="openQuickView('${prod.id}')" style="cursor: pointer;">${escapeHtml(prod.name)}</h3>
      <div class="product-footer">
        <div class="price-group">
          <span class="price">$${prod.price.toFixed(2)}</span>
          <span class="original-price">$${prod.originalPrice.toFixed(2)}</span>
        </div>
        <button class="add-cart-btn" onclick="addToCart('${prod.id}')">🛒 Add</button>
      </div>
    </div>
  `).join('');
}

function startDealCountdownTimer() {
  let secondsRemaining = 14 * 3600 + 32 * 60 + 48;
  const hoursEl = document.getElementById('dealHours');
  const minsEl = document.getElementById('dealMins');
  const secsEl = document.getElementById('dealSecs');

  setInterval(() => {
    if (secondsRemaining > 0) secondsRemaining--;
    const h = Math.floor(secondsRemaining / 3600);
    const m = Math.floor((secondsRemaining % 3600) / 60);
    const s = secondsRemaining % 60;
    if (hoursEl) hoursEl.textContent = String(h).padStart(2, '0');
    if (minsEl) minsEl.textContent = String(m).padStart(2, '0');
    if (secsEl) secsEl.textContent = String(s).padStart(2, '0');
  }, 1000);
}

// -------------------------------------------------------------------------
// 15. SPA View Switcher
// -------------------------------------------------------------------------
function switchView(viewName) {
  state.activeView = viewName;

  // Toggle view visibility
  document.querySelectorAll('.spa-view').forEach(view => {
    view.classList.remove('active');
  });
  const targetView = document.getElementById(`${viewName}View`);
  if (targetView) targetView.classList.add('active');

  // Update tabs
  document.querySelectorAll('.view-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-view') === viewName);
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Trigger view-specific re-renders
  if (viewName === 'orders') renderOrdersView();
  if (viewName === 'wishlist') renderWishlistView();
  if (viewName === 'deals') renderDealsView();
  if (viewName === 'admin') renderAdminStudio();
  if (viewName === 'services') renderMicroservicesGrid();
}

// -------------------------------------------------------------------------
// 16. Event Listeners & Interactive Handlers Setup
// -------------------------------------------------------------------------
function setupEventListeners() {
  // Brand Logo & Gateway Pill
  brandLogoBtn.addEventListener('click', () => switchView('storefront'));
  gatewayStatusBtn.addEventListener('click', () => switchView('services'));

  // Theme Toggle
  themeToggleBtn.addEventListener('click', toggleTheme);

  // Nav View Tabs
  mainViewTabs.addEventListener('click', (e) => {
    const btn = e.target.closest('.view-tab-btn');
    if (btn) switchView(btn.getAttribute('data-view'));
  });

  // Hero CTAs
  heroOpenDiagnosticsBtn.addEventListener('click', () => switchView('services'));
  heroViewDealsBtn.addEventListener('click', () => switchView('deals'));

  // Autocomplete Search
  searchInput.addEventListener('input', handleSearchInput);
  clearSearchBtn.addEventListener('click', clearSearch);
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-bar-wrap')) {
      searchAutocompleteList.classList.remove('show');
    }
  });

  // Filter Toolbar Controls
  categoryPillsBar.addEventListener('click', (e) => {
    const chip = e.target.closest('.cat-chip');
    if (chip) {
      document.querySelectorAll('.cat-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      state.activeCategory = chip.getAttribute('data-category');
      renderProducts();
    }
  });

  priceRangeInput.addEventListener('input', (e) => {
    const val = parseInt(e.target.value, 10);
    state.filters.maxPrice = val;
    priceRangeDisplay.textContent = `$${val.toLocaleString()}`;
    renderProducts();
  });

  inStockFilterCheck.addEventListener('change', (e) => {
    state.filters.inStockOnly = e.target.checked;
    renderProducts();
  });

  brandFilterSelect.addEventListener('change', (e) => {
    state.filters.brand = e.target.value;
    renderProducts();
  });

  sortSelect.addEventListener('change', (e) => {
    state.filters.sort = e.target.value;
    renderProducts();
  });

  viewGridBtn.addEventListener('click', () => setViewLayout('grid'));
  viewListBtn.addEventListener('click', () => setViewLayout('list'));

  clearAllFiltersBtn.addEventListener('click', resetAllFilters);
  document.getElementById('resetCatalogSearchBtn').addEventListener('click', resetAllFilters);

  // Cart Drawer Triggers
  cartTriggerBtn.addEventListener('click', openCartDrawer);
  closeCartDrawerBtn.addEventListener('click', closeCartDrawer);
  cartDrawer.addEventListener('click', (e) => {
    if (e.target === cartDrawer) closeCartDrawer();
  });
  applyCouponBtn.addEventListener('click', applyCouponCode);
  removeCouponBtn.addEventListener('click', removeCouponCode);
  checkoutBtn.addEventListener('click', openCheckoutModal);
  clearCartBtn.addEventListener('click', clearCart);

  // Wishlist Triggers
  navWishlistBtn.addEventListener('click', () => switchView('wishlist'));
  moveAllWishlistToCartBtn.addEventListener('click', moveAllWishlistToCart);

  // User Profile & Dropdown
  authModalBtn.addEventListener('click', () => {
    userDropdownMenu.classList.toggle('show');
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.user-menu-wrapper')) {
      userDropdownMenu.classList.remove('show');
    }
  });

  menuMyOrdersBtn.addEventListener('click', () => {
    userDropdownMenu.classList.remove('show');
    switchView('orders');
  });
  menuWishlistBtn.addEventListener('click', () => {
    userDropdownMenu.classList.remove('show');
    switchView('wishlist');
  });
  menuAdminBtn.addEventListener('click', () => {
    userDropdownMenu.classList.remove('show');
    switchView('admin');
  });
  menuDiagnosticsBtn.addEventListener('click', () => {
    userDropdownMenu.classList.remove('show');
    switchView('services');
  });
  quickDemoCustomerBtn.addEventListener('click', () => {
    quickLogin('customer');
    userDropdownMenu.classList.remove('show');
  });
  quickDemoAdminBtn.addEventListener('click', () => {
    quickLogin('admin');
    userDropdownMenu.classList.remove('show');
  });
  logoutBtn.addEventListener('click', logoutUser);

  // Quick View Modal
  closeQuickViewBtn.addEventListener('click', closeQuickView);
  quickViewModal.addEventListener('click', (e) => {
    if (e.target === quickViewModal) closeQuickView();
  });
  qvQtyMinus.addEventListener('click', () => {
    const val = Math.max(1, parseInt(qvQtyInput.value, 10) - 1);
    qvQtyInput.value = val;
  });
  qvQtyPlus.addEventListener('click', () => {
    const val = parseInt(qvQtyInput.value, 10) + 1;
    qvQtyInput.value = val;
  });
  qvAddToCartBtn.addEventListener('click', () => {
    if (state.quickViewCurrentItem) {
      addToCart(state.quickViewCurrentItem.id, parseInt(qvQtyInput.value, 10));
      closeQuickView();
    }
  });
  qvWishlistBtn.addEventListener('click', () => {
    if (state.quickViewCurrentItem) {
      toggleWishlist(state.quickViewCurrentItem.id);
      const isLiked = state.wishlist.some(w => w.id === state.quickViewCurrentItem.id);
      qvWishlistBtn.textContent = isLiked ? '💖' : '🤍';
    }
  });
  qvBuyNowBtn.addEventListener('click', () => {
    if (state.quickViewCurrentItem) {
      addToCart(state.quickViewCurrentItem.id, parseInt(qvQtyInput.value, 10));
      closeQuickView();
      openCheckoutModal();
    }
  });

  // Multi-step Checkout
  closeCheckoutBtn.addEventListener('click', closeCheckoutModal);
  checkoutModal.addEventListener('click', (e) => {
    if (e.target === checkoutModal) closeCheckoutModal();
  });
  shippingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    setCheckoutStep(2);
  });
  backToStep1Btn.addEventListener('click', () => setCheckoutStep(1));
  paymentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    handleFinalOrderPlacement();
  });
  trackPurchasedOrderBtn.addEventListener('click', () => {
    closeCheckoutModal();
    switchView('orders');
  });

  // Interactive Card Graphic Inputs
  cardNumInput.addEventListener('input', (e) => {
    cardDisplayNum.textContent = e.target.value || '•••• •••• •••• 4242';
  });
  cardExpInput.addEventListener('input', (e) => {
    cardDisplayExp.textContent = e.target.value || '12/28';
  });
  document.getElementById('shippingFullName').addEventListener('input', (e) => {
    cardDisplayName.textContent = (e.target.value || 'ALEX MERCER').toUpperCase();
  });

  // Payment Method Tabs
  document.querySelectorAll('.pay-method-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.pay-method-btn').forEach(b => b.classList.remove('active'));
      const target = e.target.closest('.pay-method-btn');
      target.classList.add('active');
      const method = target.getAttribute('data-method');
      if (method === 'instant') {
        showToast("Instant 1-Click Payment Mode enabled", "info", "⚡");
      }
    });
  });

  // Auth Modal
  closeAuthBtn.addEventListener('click', closeAuthModal);
  authModal.addEventListener('click', (e) => {
    if (e.target === authModal) closeAuthModal();
  });
  authTabSignIn.addEventListener('click', () => switchAuthMode(false));
  authTabSignUp.addEventListener('click', () => switchAuthMode(true));
  authToggleBtn.addEventListener('click', () => switchAuthMode(!state.isSignup));
  authForm.addEventListener('submit', handleAuthSubmit);
  quickLoginCustomer.addEventListener('click', () => quickLogin('customer'));
  quickLoginAdmin.addEventListener('click', () => quickLogin('admin'));
  togglePasswordVisibilityBtn.addEventListener('click', () => {
    authPassword.type = authPassword.type === 'password' ? 'text' : 'password';
  });

  // Admin Studio
  openAddProductModalBtn.addEventListener('click', openAddProductModal);
  closeProductFormModalBtn.addEventListener('click', closeAdminProductModal);
  productFormModal.addEventListener('click', (e) => {
    if (e.target === productFormModal) closeAdminProductModal();
  });
  adminProductForm.addEventListener('submit', handleAdminProductSubmit);
  seedSampleCatalogBtn.addEventListener('click', seedSampleCatalog);
  if (adminTableSearchInput) {
    adminTableSearchInput.addEventListener('input', renderAdminStudio);
  }
  document.querySelectorAll('.preset-img-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.getElementById('adminProdImage').value = btn.getAttribute('data-url');
    });
  });

  // Order Tracker Actions
  advanceOrderStatusBtn.addEventListener('click', advanceOrderStatus);
  cancelCurrentOrderBtn.addEventListener('click', cancelCurrentOrder);
  refreshOrdersBtn.addEventListener('click', () => {
    renderOrdersView();
    showToast("Order statuses refreshed from Kafka Delivery-Service", "info", "🔄");
  });

  // Microservices Diagnostics
  pingAllServicesBtn.addEventListener('click', pingAllMicroservices);
}

// -------------------------------------------------------------------------
// 17. Search Autocomplete Handler
// -------------------------------------------------------------------------
function handleSearchInput(e) {
  const query = e.target.value.trim();
  state.filters.searchQuery = query;
  clearSearchBtn.style.display = query ? 'block' : 'none';

  if (!query) {
    searchAutocompleteList.classList.remove('show');
    renderProducts();
    return;
  }

  // Filter matching products for preview
  const q = query.toLowerCase();
  const matches = state.products.filter(p => 
    p.name.toLowerCase().includes(q) || 
    p.category.toLowerCase().includes(q) || 
    (p.brand && p.brand.toLowerCase().includes(q))
  ).slice(0, 5);

  if (matches.length > 0) {
    searchAutocompleteList.innerHTML = matches.map(m => `
      <div class="autocomplete-item" onclick="openQuickView('${m.id}')">
        <img src="${m.imageUrl}" class="autocomplete-thumb" alt="" />
        <div class="autocomplete-info">
          <div class="autocomplete-title">${escapeHtml(m.name)}</div>
          <div class="autocomplete-cat">${m.brand || 'Nexus'} • ${m.category}</div>
        </div>
        <span class="autocomplete-price">$${m.price.toFixed(2)}</span>
      </div>
    `).join('');
    searchAutocompleteList.classList.add('show');
  } else {
    searchAutocompleteList.classList.remove('show');
  }

  renderProducts();
}

function clearSearch() {
  searchInput.value = '';
  state.filters.searchQuery = '';
  clearSearchBtn.style.display = 'none';
  searchAutocompleteList.classList.remove('show');
  renderProducts();
}

function setViewLayout(mode) {
  state.viewMode = mode;
  viewGridBtn.classList.toggle('active', mode === 'grid');
  viewListBtn.classList.toggle('active', mode === 'list');
  productGrid.className = `product-grid view-${mode}`;
}

function resetCategory() {
  state.activeCategory = 'all';
  document.querySelectorAll('.cat-chip').forEach(c => {
    c.classList.toggle('active', c.getAttribute('data-category') === 'all');
  });
  renderProducts();
}

function resetPriceFilter() {
  state.filters.maxPrice = 3000;
  priceRangeInput.value = 3000;
  priceRangeDisplay.textContent = '$3,000';
  renderProducts();
}

function toggleInStock(val) {
  state.filters.inStockOnly = val;
  inStockFilterCheck.checked = val;
  renderProducts();
}

function resetBrandFilter() {
  state.filters.brand = 'all';
  brandFilterSelect.value = 'all';
  renderProducts();
}

function resetAllFilters() {
  state.activeCategory = 'all';
  state.filters.maxPrice = 3000;
  state.filters.inStockOnly = false;
  state.filters.brand = 'all';
  state.filters.sort = 'featured';
  state.filters.searchQuery = '';
  
  searchInput.value = '';
  clearSearchBtn.style.display = 'none';
  priceRangeInput.value = 3000;
  priceRangeDisplay.textContent = '$3,000';
  inStockFilterCheck.checked = false;
  brandFilterSelect.value = 'all';
  sortSelect.value = 'featured';

  document.querySelectorAll('.cat-chip').forEach(c => {
    c.classList.toggle('active', c.getAttribute('data-category') === 'all');
  });

  renderProducts();
  showToast("All filters reset", "info", "🔄");
}

// -------------------------------------------------------------------------
// 18. Theme System (Dark / Light)
// -------------------------------------------------------------------------
function initTheme() {
  document.documentElement.setAttribute('data-theme', state.theme);
}

function toggleTheme() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', state.theme);
  localStorage.setItem('nexus_theme', state.theme);
  showToast(`Switched to ${state.theme === 'dark' ? 'Obsidian Dark' : 'Studio Light'} mode`, "info", state.theme === 'dark' ? "🌙" : "☀️");
}

// -------------------------------------------------------------------------
// 19. Persistent Local Storage Helpers
// -------------------------------------------------------------------------
function saveCart() {
  localStorage.setItem('nexus_cart', JSON.stringify(state.cart));
}

function saveWishlist() {
  localStorage.setItem('nexus_wishlist', JSON.stringify(state.wishlist));
}

function saveProducts() {
  localStorage.setItem('nexus_products', JSON.stringify(state.products));
}

function saveOrders() {
  localStorage.setItem('nexus_orders', JSON.stringify(state.orders));
}

function saveAuth() {
  localStorage.setItem('nexus_user', JSON.stringify(state.user));
  localStorage.setItem('nexus_token', state.token);
}

// -------------------------------------------------------------------------
// 20. Toast Notification System
// -------------------------------------------------------------------------
let toastTimeout = null;
function showToast(message, type = "info", icon = "⚡") {
  if (toastTimeout) clearTimeout(toastTimeout);

  toastTitle.textContent = type === "success" ? "Success" : (type === "error" ? "System Warning" : "Nexus Notification");
  toastMsg.textContent = message;
  toastIcon.textContent = icon;
  
  toast.classList.add('show');
  
  // Progress animation
  const progressFill = document.getElementById('toastProgress');
  progressFill.style.transition = 'none';
  progressFill.style.width = '100%';
  setTimeout(() => {
    progressFill.style.transition = 'width 3.4s linear';
    progressFill.style.width = '0%';
  }, 50);

  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

// -------------------------------------------------------------------------
// Utility: Escape HTML for XSS prevention
// -------------------------------------------------------------------------
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
