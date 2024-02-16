const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


const products = ["Product A", "Product B", "Product C"];
const prices = [20, 40, 50];

// Getting input from user for quantities and gift wrapping
const quantities = [];
const gift_wrapping = [];
let index = 0;
function getProductDetails() {
    if (index < products.length) {
        rl.question(`Enter the quantity of ${products[index]}: `, (quantity) => {
            quantities.push(parseInt(quantity));

            rl.question(`Wrap ${products[index]} as a gift? (y/n): `, (wrap) => {
                gift_wrapping.push(wrap.toLowerCase() === 'y');
                index++;
                getProductDetails();
            });
        });
    } else {
        rl.close();
        calculate_total();
    }
}

function calculate_total() {
    // Calculating subtotal
    let subtotal = 0;
    for (let i = 0; i < products.length; i++) {
        subtotal += quantities[i] * prices[i];
    }

    let discount_name = "";
    let discount_amount = 0;

    // Calculating flat 10 discount
if (subtotal > 200) {
    discount_name = "flat_10_discount";
    discount_amount = 10;
}

    // calculating bulk 5 discount
for (let i = 0; i < products.length; i++) {
    if (quantities[i] > 10 && prices[i] * quantities[i] * 0.05 > discount_amount) {
        discount_name = "bulk_5_discount";
        discount_amount = prices[i] * quantities[i] * 0.05;
    }
}
    // calculating total quantities of products
let total_quantity = 0;
for (let i = 0; i < quantities.length; i++) {
    total_quantity += quantities[i];
}

    // calculating bulk 10 discount
if (total_quantity > 20 && subtotal * 0.1 > discount_amount) {
    discount_name = "bulk_10_discount";
    discount_amount = subtotal * 0.1;
}

    // calculating tiered 50 discount
if (total_quantity > 30) {
    for (let i = 0; i < products.length; i++) {
        if (quantities[i] > 15 && (quantities[i] - 15) * prices[i] * 0.5 > discount_amount) {
            discount_name = "tiered_50_discount";
            discount_amount = (quantities[i] - 15) * prices[i] * 0.5;
        }
    }
}

    // Calculating total packages rounding up to the nearest 10
const total_packages = Math.ceil(total_quantity / 10);

    // Calculating shipping fee
const shipping_fee = total_packages * 5;

    // Calculating gift wrap fee
let gift_wrap_fee = 0;
for (let i = 0; i < products.length; i++) {
    if (gift_wrapping[i]) {
        gift_wrap_fee += quantities[i];
    }
}

    // Calculating total amount
const total = subtotal - discount_amount + shipping_fee + gift_wrap_fee;


    // Displaying order details
    console.log("\nOrder Details:");
    for (let i = 0; i < products.length; i++) {
        console.log(` Quantity of ${products[i]}: ${quantities[i]}, Total amount of ${products[i]}: ${quantities[i] * prices[i]}`);
    }
    console.log(`\nSubtotal: $${subtotal}`);
    console.log(`Discount Applied: ${discount_name}`);
    console.log(`Discount Amount: $${discount_amount}`);
    console.log(`Shipping Fee: $${shipping_fee}`);
    console.log(`Gift Wrap Fee: $${gift_wrap_fee}`);
    console.log(`Total: $${total}`);
}

getProductDetails();
