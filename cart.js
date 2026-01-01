/* ==========================
      CART LOGIC
=========================== */
const cartContainer = document.getElementById("cart-container");
const totalPriceEl = document.getElementById("total-price");
const itemCountEl = document.getElementById("item-count");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Notification
function showNotification(message) {
  const n = document.getElementById("cart-notification");
  n.textContent = message;
  n.classList.add("show");
  setTimeout(() => n.classList.remove("show"), 2000);
}

// Render cart items
function renderCart() {
  cartContainer.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty</p>";
    totalPriceEl.textContent = "$0";
    itemCountEl.textContent = "0";
    return;
  }

  cart.forEach((item, index) => {
    total += Number(item.price);
    cartContainer.innerHTML += `
      <div class="cart-card">
        <div class="cart-item-info">
          <img src="${item.img}" class="cart-item-img">
          <div>
            <h3>${item.name}</h3>
            <p>$${item.price}</p>
          </div>
        </div>
        <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
      </div>
    `;
  });

  totalPriceEl.textContent = "$" + total;
  itemCountEl.textContent = cart.length;
}

// Remove item
function removeItem(index) {
  const name = cart[index].name;
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  showNotification(`${name} removed`);
}

renderCart();

/* ==========================
      CHECKOUT OVERLAY
=========================== */
const overlay = document.getElementById("checkout-overlay");
const openCheckout = document.getElementById("open-checkout");
const closeCheckout = document.getElementById("close-checkout");
const payBtn = document.getElementById("pay-btn");

const popupItemCount = document.getElementById("popup-item-count");
const popupTotalPrice = document.getElementById("popup-total-price");

const paymentRadios = document.querySelectorAll('input[name="payment"]');
const transferDetails = document.getElementById("transferDetails");
const transferCheckbox = document.getElementById("transferConfirmed");

function updatePayButton() {
  const selectedPayment = document.querySelector('input[name="payment"]:checked').value;

  if (selectedPayment === "Bank Transfer") {
    transferDetails.style.display = "block";
    payBtn.disabled = !transferCheckbox.checked;
    payBtn.style.opacity = transferCheckbox.checked ? "1" : "0.5";
  } else {
    transferDetails.style.display = "none";
    payBtn.disabled = false;
    payBtn.style.opacity = "1";
  }
}

// Event listeners for payment method change
paymentRadios.forEach(radio => {
  radio.addEventListener("change", updatePayButton);
});

// Event listener for transfer confirmation checkbox
transferCheckbox.addEventListener("change", updatePayButton);

updatePayButton();

// Open checkout
openCheckout.onclick = () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  let total = cart.reduce((sum, item) => sum + Number(item.price), 0);
  popupItemCount.textContent = cart.length;
  popupTotalPrice.textContent = "$" + total;

  overlay.classList.add("show");
};

// Close checkout
closeCheckout.onclick = () => overlay.classList.remove("show");
overlay.onclick = (e) => {
  if (e.target === overlay) overlay.classList.remove("show");
};

/* ==========================
      PLACE ORDER
=========================== */
payBtn.onclick = async () => {
  const email = document.getElementById("email").value;
  if (!email) {
    alert("Please enter your email");
    return;
  }

  const items = cart.map((item, i) => `${i + 1}. ${item.name} - $${item.price}`);
  const total = cart.reduce((sum, item) => sum + Number(item.price), 0);
  const payment = document.querySelector('input[name="payment"]:checked').value;
  const transferConfirmed = payment === "Bank Transfer" ? transferCheckbox.checked : true;

  if (payment === "Bank Transfer" && !transferConfirmed) {
    alert("Please confirm your bank transfer");
    return;
  }

  try {
    const response = await fetch("https://novastore-production.up.railway.app/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        items,
        total: "$" + total,
        payment,
        transferConfirmed
      })
    });

    const data = await response.json();

    if (data.success) {
      localStorage.removeItem("cart");
      window.location.href = "orders.html";
    } else {
      alert("Order failed. Try again.");
    }
  } catch (err) {
    console.error(err);
    alert("Something went wrong. Try again.");
  }
};

/* ==========================
      HAMBURGER MENU
=========================== */
const hamburger = document.getElementById("hamburger");
const menuLinks = document.getElementById("menuLinks");
hamburger.onclick = () => menuLinks.classList.toggle("show");
