// navbar.js

// Get the hamburger menu icon
const menuIcon = document.getElementById('menu-bar');

// Get the navbar
const navbar = document.getElementById('navbar');

// Toggle the "active" class on click
menuIcon.addEventListener('click', () => {
    navbar.classList.toggle('active');
});



