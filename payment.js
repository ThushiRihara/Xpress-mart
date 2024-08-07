// Function to calculate delivery date
function calculateDeliveryDate() {
    const today = new Date();
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + 7);
    return deliveryDate.toLocaleDateString(); 
}

// Function to validate form fields and display message
function validateForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const branch = document.getElementById('branch').value;
    const zipcode = document.getElementById('zipcode').value;
    const cardNumber = document.getElementById('cardnumber').value;
    const expMonth = document.getElementById('expmonth').value;
    const expYear = document.getElementById('expyear').value;
    const cvv = document.getElementById('cvv').value;

    // Check if all fields are filled
    if (name && email && address && city && branch !== "Choose branch" && zipcode && cardNumber && expMonth && expYear !== "Choose Year..." && cvv) {
        const deliveryDate = calculateDeliveryDate();
        alert(`Thank you for your purchase, ${name}! Your order will be delivered on ${deliveryDate}.`);
    } else {
        alert('Please fill in all the fields correctly.');
    }
}

// Attach event listener to the button
document.addEventListener('DOMContentLoaded', () => {
    const checkoutButton = document.querySelector('input[type="submit"]');
    checkoutButton.addEventListener('click', (event) => {
        event.preventDefault(); 
        validateForm(); 
    });
});
