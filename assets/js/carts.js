//  Get cart data from localStorage
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

// Save the cart to localStorage
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Add a product to the cart
function addToCart(productId, productName, productPrice, productImage) {
  let cart = getCart();
  const product = cart.find((item) => item.id === productId);

  if (product) {
    product.quantity += 1;
  } else {
    cart.push({
      id: productId,
      name: productName,
      price: productPrice,
      image: productImage,
      quantity: 1,
    });
  }

  saveCart(cart);
  displayCart();
}

// Display all cart items from localStorage
function displayCart() {
  const cart = getCart();
  const cartContainer = $("#cart");
  cartContainer.empty();

  if (!cart.length) {
    const html = `
        <div class="empty-cart">
            <h3>You have no order yet!</h3>
            <a class="link" href="coffee-selection.html">Order coffee now</a>
        </div>
    `;
    cartContainer.append(html);
    return;
  }

  cart.forEach((item) => {
    const productHTML = `
        <article class="product" data-product-id="${item.id}">
            <header>
                <img src="${item.image}" alt="${item.name}" />
            </header>
            <div class="content">
                <h1>${item.name}</h1>
                <button class="remove" title='Remove'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM8 9h8v10H8zm7.5-5l-1-1h-5l-1 1H5v2h14V4z" />
                  </svg>
                </button>
            </div>
            <footer class="content">
                <span class="qt-minus">-</span>
                <span class="qt">${item.quantity}</span>
                <span class="qt-plus">+</span>
                <h2 class="full-price">${item.price * item.quantity} Ks</h2>
                <h2 class="price">${item.price} Ks</h2>
            </footer>
        </article>`;
    cartContainer.append(productHTML);
  });

  bindCartEvents();
  updateCartTotal();
}

function bindCartEvents() {
  $(".remove")
    .off()
    .on("click", function () {
      const productId = $(this).closest(".product").data("product-id");
      removeFromCart(productId);
    });

  $(".qt-plus")
    .off()
    .on("click", function () {
      const productId = $(this).closest(".product").data("product-id");
      updateQuantity(productId, 1);
    });

  $(".qt-minus")
    .off()
    .on("click", function () {
      const productId = $(this).closest(".product").data("product-id");
      updateQuantity(productId, -1);
    });
}

function updateQuantity(productId, amount) {
  let cart = getCart();
  const product = cart.find((item) => item.id === productId);

  if (product) {
    product.quantity += amount;
    if (product.quantity <= 0) {
      cart = cart.filter((item) => item.id !== productId);
    }
  }

  saveCart(cart);
  displayCart();
}

function removeFromCart(productId) {
  let cart = getCart().filter((item) => item.id !== productId);
  saveCart(cart);
  displayCart();
}

function updateCartTotal() {
  let subtotal = 0;

  $(".full-price").each(function () {
    subtotal += parseFloat($(this).html());
  });

  subtotal = Math.round(subtotal * 100) / 100;
  const tax = Math.round(subtotal * 0.02 * 100) / 100;
  const shipping = parseFloat($(".shipping span").html()) || 0;
  const total = Math.round((subtotal + tax + shipping) * 100) / 100;

  $(".subtotal span").html(subtotal);
  $(".tax span").html(tax);
  $(".total span").html(total);
}

$(document).ready(function () {
  $(document).on("click", "#clear-cart", function () {
    localStorage.removeItem("cart");
    displayCart();
  });
});

$(document).ready(function () {
  displayCart();

  $(document).on("click", ".add-to-cart-btn", function () {
    const productId = $(this).data("product-id");
    const productName = $(this).data("product-name");
    const productPrice = parseFloat($(this).data("product-price"));
    const productImage = $(this).data("product-image");
    addToCart(productId, productName, productPrice, productImage);
  });
});
