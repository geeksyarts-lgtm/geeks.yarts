function addToCart(name, price) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({
        name: name,
        price: price
    });

    let cartContainer = document.getElementById("addToCart");

    cartContainer.innerHTML = "Cart(1)";

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(name + " has been added to your cart!");
}

function displayCart() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let cartContainer = document.getElementById("cart-items");
    let total = 0;

    cartContainer.innerHTML = "";

    cart.forEach(function(product, index) {

        total += product.price;

        cartContainer.innerHTML += `
            <div class="cart-item">
                <span>${product.name}</span>
                <span>$${product.price}</span>
                <button onclick="removeFromCart(${index})">
                    Remove
                </button>
            </div>
        `;
    });

    document.getElementById("cart-total").innerHTML =
        "Total: $" + total;
}

function removeFromCart(index) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();
}

function placeOrder() {

    let name = document.getElementById("customer-name").value;
    let email = document.getElementById("customer-email").value;
    let phone = document.getElementById("customer-phone").value;
    let address = document.getElementById("customer-address").value;

    if (name === "" || email === "" || phone === "" || address === "") {
        alert("Please fill in all the information.");
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    let orderDetails = "New Order from Geeks & Yarts%0A%0A";

    orderDetails += "Customer: " + name + "%0A";
    orderDetails += "Email: " + email + "%0A";
    orderDetails += "Phone: " + phone + "%0A";
    orderDetails += "Address: " + address + "%0A%0A";

    orderDetails += "Products:%0A";

    let total = 0;

    cart.forEach(function(product) {
        orderDetails += "- " + product.name + " - $" + product.price + "%0A";
        total += product.price;
    });

    orderDetails += "%0ATotal: $" + total;

    alert("Your order has been prepared!");

    window.location.href =
        "mailto:YOUR-EMAIL@example.com?subject=New Geeks & Yarts Order&body=" + orderDetails;
}