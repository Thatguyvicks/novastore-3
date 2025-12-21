function addToCart(button) {
  const card = button.parentElement;

  const product = {
    name: card.dataset.name,
    price: Number(card.dataset.price)
  };

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));

  alert(product.name + " added to cart");
}