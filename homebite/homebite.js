let cart = JSON.parse(localStorage.getItem("homebiteCart")) || [];

function addToCart(name, price) {
    let existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    localStorage.setItem("homebiteCart", JSON.stringify(cart));
    updateCart();

    alert(name + " added to your cart!");
}

function updateCart() {
    let totalItems = cart.reduce(
        (total, item) => total + item.quantity, 0
    );

    document.getElementById("cart-count").textContent = totalItems;
}

function showCart() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let message = "YOUR HOMEBITE CART\n\n";
    let total = 0;

    cart.forEach(item => {
        let amount = item.price * item.quantity;

        message += `${item.name} x ${item.quantity} = ₹${amount}\n`;
        total += amount;
    });

    message += `\nTotal Amount: ₹${total}`;
    alert(message);
}

function filterFood(category) {
    let cards = document.querySelectorAll(".food-card");

    cards.forEach(card => {
        let matches =
            category === "all" ||
            card.dataset.category === category;

        card.style.display = matches ? "block" : "none";
    });

    checkNoResults();
}

function searchFood() {
    let searchValue = document
        .getElementById("searchInput")
        .value.toLowerCase();

    let cards = document.querySelectorAll(".food-card");

    cards.forEach(card => {
        let name = card.querySelector("h3")
            .textContent.toLowerCase();

        card.style.display = name.includes(searchValue)
            ? "block" : "none";
    });

    checkNoResults();
}

function checkNoResults() {
    let cards = document.querySelectorAll(".food-card");

    let visible = [...cards].filter(
        card => card.style.display !== "none"
    ).length;

    document.getElementById("no-results").style.display =
        visible === 0 ? "block" : "none";
}

document.getElementById("chefForm").addEventListener(
    "submit", function(event) {

        event.preventDefault();

        let chef = {
            name: document.getElementById("chefName").value,
            phone: document.getElementById("chefPhone").value,
            location: document.getElementById("chefLocation").value,
            speciality: document.getElementById("chefSpeciality").value
        };

        let chefs = JSON.parse(
            localStorage.getItem("homeChefs")
        ) || [];

        chefs.push(chef);

        localStorage.setItem("homeChefs", JSON.stringify(chefs));

        document.getElementById("successMessage").textContent =
            "Thank you, " + chef.name +
            "! Your registration is successful.";

        document.getElementById("chefForm").reset();
    }
);

updateCart();
