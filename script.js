// Mock product data
const products = [
  {
    id: 'towel-1',
    name: 'Ultra-Soft Cotton Baby Towel (Blue)',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1582103101467-9e0f8e3b3f4c?q=80&w=600&auto=format&fit=crop',
    rating: 4.8,
    features: ['100% cotton', 'Extra absorbent', 'Hooded option']
  },
  {
    id: 'towel-2',
    name: 'Gentle Microfiber Baby Towel (Pink)',
    price: 12.5,
    image: 'https://images.unsplash.com/photo-1581719965195-0e8a3f2f9e0f?q=80&w=600&auto=format&fit=crop',
    rating: 4.7,
    features: ['Soft microfiber', 'Quick dry']
  },
  {
    id: 'towel-3',
    name: 'Hooded Baby Towel (Grey)',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1582582545924-7d3b3b4d3b8a?q=80&w=600&auto=format&fit=crop',
    rating: 4.6,
    features: ['Hooded', 'Premium terry']
  },
  {
    id: 'towel-4',
    name: 'Premium Bamboo Towels (Cream)',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1865bb3f1?q=80&w=600&auto=format&fit=crop',
    rating: 4.9,
    features: ['Bamboo-based', 'Hypoallergenic']
  }
];

// Simple cart state
const cart = [];

// UI bindings
const productGrid = document.getElementById('productGrid');
const cartButton = document.getElementById('cartButton');
const cartDrawer = document.getElementById('cartDrawer');
const cartCount = document.getElementById('cartCount');
const closeCart = document.getElementById('closeCart');
const drawerContent = document.getElementById('drawerContent');
const cartItemsEl = document.getElementById('cartItems');
const emptyCart = document.getElementById('emptyCart');
const cartTotalEl = document.getElementById('cartTotal');
const shopNowBtn = document.getElementById('shopNow');
const checkoutBtn = document.getElementById('checkoutBtn');

// Render products
function renderProducts() {
  productGrid.innerHTML = '';
  products.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}" loading="lazy" />
      <h3>${p.name}</h3>
      <div class="price">$${p.price.toFixed(2)}</div>
      <div class="meta">Rating: ${p.rating} ★</div>
      <div class="card-actions">
        <button class="btn add" data-id="${p.id}">Add to cart</button>
        <button class="btn secondary" disabled aria-disabled="true">Details</button>
      </div>
    `;
    productGrid.appendChild(card);
  });

  // Bind add-to-cart buttons
  document.querySelectorAll('.btn.add').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      addToCart(id);
    });
  });
}

// Cart operations
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: productId, name: product.name, price: product.price, qty: 1 });
  }
  updateCartUI();
  openCart();
}

function removeFromCart(productId) {
  const idx = cart.findIndex(item => item.id === productId);
  if (idx >= 0) {
    cart.splice(idx, 1);
  }
  updateCartUI();
}

function updateCartUI() {
  // Update count
  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
  cartCount.textContent = totalItems;

  // Update drawer content
  cartItemsEl.innerHTML = '';
  if (cart.length === 0) {
    emptyCart.style.display = 'block';
  } else {
    emptyCart.style.display = 'none';
    cart.forEach(item => {
      const li = document.createElement('li');
      li.className = 'cart-item';
      li.innerHTML = `
        <span class="name">${item.name}</span>
        <span class="qty">
          <button class="qty-btn" data-id="${item.id}" data-op="dec">-</button>
          <span>${item.qty}</span>
          <button class="qty-btn" data-id="${item.id}" data-op="inc">+</button>
        </span>
        <span class="price">$${(item.price * item.qty).toFixed(2)}</span>
        <button class="remove-btn" data-id="${item.id}" title="Remove">🗑</button>
      `;
      cartItemsEl.appendChild(li);
    });

    // Bind quantity controls
    document.querySelectorAll('.qty-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const op = btn.getAttribute('data-op');
        adjustQty(id, op);
      });
    });
    // Bind remove
    document.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        removeFromCart(id);
      });
    });
  }

  // Total
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  cartTotalEl.textContent = `$${total.toFixed(2)}`;
}

// Quantity adjust
function adjustQty(productId, op) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  if (op === 'inc') item.qty += 1;
  if (op === 'dec') {
    item.qty -= 1;
    if (item.qty <= 0) {
      removeFromCart(productId);
      return;
    }
  }
  updateCartUI();
}

// Drawer controls
function openCart() {
  cartDrawer.setAttribute('aria-hidden', 'false');
  drawerContent.scrollTop = 0;
}
function closeCartFn() {
  cartDrawer.setAttribute('aria-hidden', 'true');
}

// Init
function init() {
  renderProducts();
  updateCartUI();
  // Bind header/cart interactions
  cartButton.addEventListener('click', openCart);
  closeCart.addEventListener('click', closeCartFn);
  shopNowBtn.addEventListener('click', () => {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
  });
  checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) return;
    alert('Checkout flow would proceed here. Total: ' + cartTotalEl.textContent);
  });
  // Close cart on outside click (optional UX)
  document.addEventListener('click', (e) => {
    if (cartDrawer.getAttribute('aria-hidden') === 'false') {
      const within = cartDrawer.contains(e.target) || cartButton.contains(e.target);
      if (!within) {
        closeCartFn();
      }
    }
  });
}

// Start
init();
