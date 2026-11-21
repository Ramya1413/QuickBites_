
let cart = JSON.parse(localStorage.getItem("quickbiteCart")) || [];

function addToCart(name, price) {
    let existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    localStorage.setItem("quickbiteCart", JSON.stringify(cart));
    updateCart();

    alert(name + " added to your cart!");
}

function updateCart() {
    let count = cart.reduce(
        (total, item) => total + item.quantity, 0
    );

    document.getElementById("cart-count").textContent = count;
}

function showCart() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let message = "YOUR QUICKBITE CART\n\n";
    let total = 0;

    cart.forEach(item => {
        let amount = item.price * item.quantity;

        message += `${item.name} x ${item.quantity} = ₹${amount}\n`;
        total += amount;
    });

    message += `\nTotal Amount: ₹${total}`;
    alert(message);
}

function recommendFood(mood) {
    let suggestions = {
        happy: "🥞 Enjoy a crispy ghee roast dosa!",
        spicy: "🌶️ Try a spicy Chettinad biryani!",
        comfort: "❤️ Enjoy hot idli with sambar!",
        sweet: "🍮 Enjoy delicious South Indian kesari!"
    };

    document.getElementById("recommendation").textContent =
        suggestions[mood];
}

updateCart();
