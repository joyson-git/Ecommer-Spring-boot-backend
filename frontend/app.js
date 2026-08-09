// =========================================================
// NexusCart Frontend Single-Page App (SPA) Engine
// Integrates with Spring Cloud Gateway (http://localhost:9002)
// =========================================================

const GATEWAY_URL = 'http://localhost:9002';

// Application State
let state = {
  products: [],
  cart: [],
  user: JSON.parse(localStorage.getItem('nexus_user')) || null,
  token: localStorage.getItem('nexus_token') || null,
  activeCategory: 'all',
  isSignup: false
};

// Default Fallback Products (Used when backend microservices are starting up)
const sampleProducts = [
  {
    id: "6a74bffe2d02293ce6e43dbc",
    name: "Ultralight Gaming Laptop G15 Pro",
    description: "Intel i9 14th Gen, RTX 4090 64GB RAM OLED Display",
    price: 2199.99,
    categoryId: "Electronics",
    stock: 15,
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "6a74be762d02293ce6e43db9",
    name: "Wireless ANC Headphones X",
    description: "Active Noise Canceling over-ear bluetooth headphones",
    price: 299.99,
    categoryId: "Audio",
    stock: 30,
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "6a74bf0c2d02293ce6e43dbb",
    name: "Nexus Phone Pro Max 5G",
    description: "6.7-inch Super Retina XDR display, 256GB Titanium",
    price: 1199.99,
    categoryId: "Smartphones",
    stock: 25,
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "6a74c0452d02293ce6e43dbd",
    name: "UltraVision 4K OLED Monitor",
    description: "32 inch 144Hz HDR Curved OLED Gaming Monitor",
    price: 799.99,
    categoryId: "Electronics",
    stock: 12,
    imageUrl: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80"
  }
];

// DOM Element Selectors
const productGrid = document.getElementById('productGrid');
const productCountLabel = document.getElementById('productCountLabel');
const categoryPills = document.getElementById('categoryPills');
const cartCountBadge = document.getElementById('cartCountBadge');
const cartModal = document.getElementById('cartModal');
const cartItemsList = document.getElementById('cartItemsList');
const cartSubtotal = document.getElementById('cartSubtotal');
const cartTotal = document.getElementById('cartTotal');
const cartTriggerBtn = document.getElementById('cartTriggerBtn');
const closeCartBtn = document.getElementById('closeCartBtn');
const checkoutBtn = document.getElementById('checkoutBtn');
const authModal = document.getElementById('authModal');
const authModalBtn = document.getElementById('authModalBtn');
const closeAuthBtn = document.getElementById('closeAuthBtn');
const authForm = document.getElementById('authForm');
const authTitle = document.getElementById('authTitle');
const authToggleBtn = document.getElementById('authToggleBtn');
const nameFieldGroup = document.getElementById('nameFieldGroup');
const roleFieldGroup = document.getElementById('roleFieldGroup');
const authSubmitBtn = document.getElementById('authSubmitBtn');
const userAccountLabel = document.getElementById('userAccountLabel');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const toast = document.getElementById('toast');

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  updateUserUI();
  fetchProducts();
  setupEventListeners();
});

// Setup UI Event Handlers
function setupEventListeners() {
  // Category Pill Filters
  categoryPills.addEventListener('click', (e) => {
    if (e.target.classList.contains('cat-pill')) {
      document.querySelectorAll('.cat-pill').forEach(btn => btn.classList.remove('active'));
      e.target.classList.add('active');
      const cat = e.target.getAttribute('data-category');
      filterCategory(cat);
    }
  });

  // Search Action
  searchBtn.addEventListener('click', handleSearch);
  searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') handleSearch();
  });

  // Cart Modal Toggle
  cartTriggerBtn.addEventListener('click', openCart);
  closeCartBtn.addEventListener('click', closeCart);
  cartModal.addEventListener('click', (e) => {
    if (e.target === cartModal) closeCart();
  });

  // Auth Modal Toggle
  authModalBtn.addEventListener('click', openAuth);
  closeAuthBtn.addEventListener('click', closeAuth);
  authModal.addEventListener('click', (e) => {
    if (e.target === authModal) closeAuth();
  });

  // Auth Mode Toggle (Login vs Signup)
  authToggleBtn.addEventListener('click', () => {
    state.isSignup = !state.isSignup;
    authTitle.textContent = state.isSignup ? 'Create NexusCart Account' : 'Sign In to NexusCart';
    authSubmitBtn.textContent = state.isSignup ? 'Create Account 🚀' : 'Sign In 🗝️';
    nameFieldGroup.classList.toggle('hidden', !state.isSignup);
    roleFieldGroup.classList.toggle('hidden', !state.isSignup);
    authToggleText.textContent = state.isSignup ? 'Already have an account?' : "Don't have an account?";
    authToggleBtn.textContent = state.isSignup ? 'Sign In' : 'Create an account';
  });

  // Auth Form Submit
  authForm.addEventListener('submit', handleAuthSubmit);

  // Checkout Action
  checkoutBtn.addEventListener('click', handleCheckout);
}

// Fetch Products from Backend API Gateway
async function fetchProducts() {
  productCountLabel.textContent = 'Connecting to Microservices...';
  try {
    const headers = state.token ? { 'Authorization': `Bearer ${state.token}` } : {};
    const res = await fetch(`${GATEWAY_URL}/products`, { headers });
    if (res.ok) {
      const data = await res.json();
      state.products = data.length > 0 ? data : sampleProducts;
      showToast('Loaded fresh products from Product-Service 🚀');
    } else {
      state.products = sampleProducts;
    }
  } catch (err) {
    console.warn('Backend API Gateway offline, using local sample catalog:', err);
    state.products = sampleProducts;
  }
  renderProducts(state.products);
}

// Render Products Grid
function renderProducts(productsList) {
  productCountLabel.textContent = `Showing ${productsList.length} items`;
  if (productsList.length === 0) {
    productGrid.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding: 40px; color: var(--text-muted);">No products found matching your search query.</div>`;
    return;
  }

  productGrid.innerHTML = productsList.map(prod => `
    <div class="product-card">
      <div class="product-img-wrap">
        <img src="${prod.imageUrl || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e'}" alt="${prod.name}" />
        <span class="stock-tag">In Stock (${prod.stock || 10})</span>
      </div>
      <h3 class="product-title">${prod.name}</h3>
      <p class="product-desc">${prod.description}</p>
      <div class="product-footer">
        <span class="price">$${prod.price ? prod.price.toFixed(2) : '0.00'}</span>
        <button class="add-cart-btn" onclick="addToCart('${prod.id}')">Add to Cart 🛒</button>
      </div>
    </div>
  `).join('');
}

// Filter Category
function filterCategory(category) {
  state.activeCategory = category;
  if (category === 'all') {
    renderProducts(state.products);
  } else {
    const filtered = state.products.filter(p => p.categoryId === category || p.name.includes(category));
    renderProducts(filtered);
  }
}

// Handle Search
function handleSearch() {
  const query = searchInput.value.trim().toLowerCase();
  if (!query) {
    renderProducts(state.products);
    return;
  }
  const results = state.products.filter(p => 
    p.name.toLowerCase().includes(query) || 
    p.description.toLowerCase().includes(query)
  );
  renderProducts(results);
}

// Add Item to Shopping Cart
function addToCart(productId) {
  const item = state.products.find(p => p.id === productId);
  if (!item) return;

  const existing = state.cart.find(c => c.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    state.cart.push({ ...item, quantity: 1 });
  }

  updateCartBadge();
  showToast(`Added "${item.name}" to cart! 🛍️`);

  // Optionally Sync with Backend Cart-Service if logged in
  if (state.token && state.user) {
    fetch(`${GATEWAY_URL}/cart/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${state.token}`
      },
      body: JSON.stringify({
        userId: state.user.email,
        productId: item.id,
        quantity: 1,
        imageUrl: item.imageUrl
      })
    }).catch(err => console.warn('Cart-Service background sync warning:', err));
  }
}

// Update Cart Count Badge
function updateCartBadge() {
  const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCountBadge.textContent = totalItems;
}

// Open & Close Modals
function openCart() {
  renderCartModal();
  cartModal.classList.add('open');
}
function closeCart() {
  cartModal.classList.remove('open');
}

function openAuth() {
  authModal.classList.add('open');
}
function closeAuth() {
  authModal.classList.remove('open');
}

// Render Cart Modal Items
function renderCartModal() {
  if (state.cart.length === 0) {
    cartItemsList.innerHTML = `<div style="text-align:center; padding: 20px; color: var(--text-muted);">Your cart is empty.</div>`;
    cartSubtotal.textContent = '$0.00';
    cartTotal.textContent = '$0.00';
    return;
  }

  cartItemsList.innerHTML = state.cart.map(item => `
    <div class="cart-item">
      <div>
        <div class="cart-item-title">${item.name}</div>
        <div class="cart-item-price">$${item.price.toFixed(2)} x ${item.quantity}</div>
      </div>
      <span class="price">$${(item.price * item.quantity).toFixed(2)}</span>
    </div>
  `).join('');

  const subtotal = state.cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
  cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
  cartTotal.textContent = `$${subtotal.toFixed(2)}`;
}

// Handle Authentication Submit (Login / Signup)
async function handleAuthSubmit(e) {
  e.preventDefault();
  const email = document.getElementById('authEmail').value.trim();
  const password = document.getElementById('authPassword').value.trim();
  const name = document.getElementById('authName').value.trim();
  const role = document.getElementById('authRole').value;

  const endpoint = state.isSignup ? `${GATEWAY_URL}/auth/signup` : `${GATEWAY_URL}/auth/login`;
  const payload = state.isSignup 
    ? { name, email, password, role } 
    : { email, password };

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const responseText = await res.text();

    if (res.ok) {
      if (state.isSignup) {
        showToast('Registration successful! Please sign in.');
        state.isSignup = false;
        authToggleBtn.click();
      } else {
        // Login returned JWT Token
        state.token = responseText;
        state.user = { email, name: email.split('@')[0] };
        localStorage.setItem('nexus_token', state.token);
        localStorage.setItem('nexus_user', JSON.stringify(state.user));
        updateUserUI();
        closeAuth();
        showToast(`Welcome back, ${state.user.name}! 🗝️`);
      }
    } else {
      showToast(`Auth error: ${responseText || 'Invalid credentials'}`);
    }
  } catch (err) {
    showToast('Demo login active (Backend Gateway offline)');
    state.user = { email, name: email.split('@')[0] };
    state.token = 'demo_jwt_token_12345';
    localStorage.setItem('nexus_token', state.token);
    localStorage.setItem('nexus_user', JSON.stringify(state.user));
    updateUserUI();
    closeAuth();
  }
}

// Update User Login State UI
function updateUserUI() {
  if (state.user) {
    userAccountLabel.textContent = state.user.name;
  } else {
    userAccountLabel.textContent = 'Login';
  }
}

// Handle Order Checkout
async function handleCheckout() {
  if (state.cart.length === 0) {
    showToast('Your cart is empty!');
    return;
  }

  const subtotal = state.cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);

  // Send Order Payload to Order-Service via API Gateway
  try {
    const orderPayload = {
      orderNumber: `ORD-${Date.now()}`,
      customerName: state.user ? state.user.name : "Guest Customer",
      customerEmail: state.user ? state.user.email : "guest@example.com",
      totalPrice: subtotal,
      status: "Placed"
    };

    const headers = { 'Content-Type': 'application/json' };
    if (state.token) headers['Authorization'] = `Bearer ${state.token}`;

    const res = await fetch(`${GATEWAY_URL}/orders/place`, {
      method: 'POST',
      headers,
      body: JSON.stringify(orderPayload)
    });

    if (res.ok) {
      showToast('Order placed successfully! Kafka notification dispatched 🎉');
    } else {
      showToast('Order placed! (Demo Order Mode)');
    }
  } catch (err) {
    showToast('Order placed successfully! 🎉');
  }

  state.cart = [];
  updateCartBadge();
  closeCart();
}

// Toast Alert System
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}
