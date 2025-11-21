// ===============================
// NAVBAR
// ===============================
const navbarNav = document.querySelector('.navbar-nav');
document.querySelector('#search-button').onclick = () => {
  navbarNav.classList.toggle('active');
};

const searchForm = document.querySelector('.search-form');
const shoppingCart = document.querySelector('.shopping-cart');
const hm = document.querySelector('#hamburger-menu');
const sb = document.querySelector('#search-button');
const sc = document.querySelector('#shopping-cart-button');

document.querySelector('#shopping-cart-button').onclick = (e) => {
  e.preventDefault();
  shoppingCart.classList.toggle('active');
  searchForm.classList.remove('active');
};

document.addEventListener('click', function (e) {
  if (hm && !hm.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove('active');
  }
  if (!sb.contains(e.target) && !searchForm.contains(e.target)) {
    searchForm.classList.remove('active');
  }
  if (!sc.contains(e.target) && !shoppingCart.contains(e.target)) {
    shoppingCart.classList.remove('active');
  }
});

// ===============================
// KERANJANG BELANJA
// ===============================
const products = document.querySelectorAll('.product-card');
const cartContainer = document.querySelector('.cart-items');
const cartTotal = document.getElementById('cart-total');
const checkoutButton = document.getElementById('checkout-button');

let cart = [];

products.forEach((product) => {
  const cartBtn = product.querySelector('[data-feather="shopping-cart"]').parentElement;
  cartBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const name = product.querySelector('h3').innerText;
    const priceText = product.querySelector('.product-price').innerText.split(' ')[1];
    const price = parseInt(priceText.replace('K', ''));
    const image = product.querySelector('img').src;

    const existing = cart.find((item) => item.name === name);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ name, price, image, qty: 1 });
    }

    updateCart();
  });
});

function updateCart() {
  cartContainer.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    const div = document.createElement('div');
    div.classList.add('cart-item');
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <div>
        <h4>${item.name}</h4>
        <p>IDR ${item.price}K x ${item.qty}</p>
      </div>
      <button class="delete-btn" data-index="${index}">
        <i data-feather="trash-2"></i>
      </button>
    `;
    cartContainer.appendChild(div);
  });

  cartTotal.innerText = `IDR ${total}K`;
  feather.replace();

  document.querySelectorAll('.delete-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = btn.dataset.index;
      cart.splice(idx, 1);
      updateCart();
    });
  });
}

checkoutButton.addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Keranjang masih kosong!');
  } else {
    alert('Checkout berhasil! Terima kasih sudah berbelanja 💖');
    cart = [];
    updateCart();
  }
});

// ===============================
// ADD TO CART dari Modal
// ===============================
const modalAddButton = document.querySelector('.add-to-cart-modal');

if (modalAddButton) {
  modalAddButton.addEventListener('click', (e) => {
    e.preventDefault();

    const modal = document.getElementById('item-detail-modal');
    const name = modal.querySelector('h3').innerText;
    const priceText = modal.querySelector('.product-price').innerText;
    const price = parseInt(priceText.replace(/\D/g, '')) / 1000;
    const image = modal.querySelector('img').src;

    const existing = cart.find((item) => item.name === name);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ name, price, image, qty: 1 });
    }

    updateCart();
    alert('Produk berhasil ditambahkan ke keranjang 💖');
    modal.style.display = 'none';
  });
};

// ===============================
// MODAL BOX (Dinamis per produk)
// ===============================
const itemDetailModal = document.querySelector('#item-detail-modal');
const itemDetailButtons = document.querySelectorAll('.item-detail-button');

// Ambil elemen di dalam modal
const modalImg = itemDetailModal.querySelector('img');
const modalTitle = itemDetailModal.querySelector('h3');
const modalPrice = itemDetailModal.querySelector('.product-price');
const modalDesc = itemDetailModal.querySelector('p');

// Untuk setiap tombol "lihat detail"
itemDetailButtons.forEach((btn, index) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();

    const productCard = btn.closest('.product-card');
    const imgSrc = productCard.querySelector('img').src;
    const title = productCard.querySelector('h3').innerText;
    const price = productCard.querySelector('.product-price').innerHTML;

    // Update isi modal sesuai produk diklik
    modalImg.src = imgSrc;
    modalTitle.innerText = title;
    modalPrice.innerHTML = price;
    modalDesc.innerText = `Detail lengkap tentang ${title}. Produk ini dibuat dengan bahan terbaik untuk hasil maksimal ✨`;

    // Tampilkan modal
    itemDetailModal.style.display = 'flex';
  });
});

// Tombol close
document.querySelector('.modal .close-icon').onclick = (e) => {
  e.preventDefault();
  itemDetailModal.style.display = 'none';
};

// Klik di luar modal → tutup
window.onclick = (e) => {
  if (e.target === itemDetailModal) {
    itemDetailModal.style.display = 'none';
  }
};

// ====== CEGAH REFRESH SAAT KLIK TOMBOL ======
document.querySelectorAll('a[href="#"]').forEach(link => {
  link.addEventListener('click', e => e.preventDefault());
});