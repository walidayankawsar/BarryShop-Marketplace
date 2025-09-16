        // Show home page by default
        document.getElementById('home-page').style.display = 'block';
        
        // Function to show specific page and hide others
        function showPage(pageId) {
            // Hide all page content
            const pages = document.querySelectorAll('.page-content');
            pages.forEach(page => {
                page.style.display = 'none';
            });
            
            // Show the requested page
            document.getElementById(pageId + '-page').style.display = 'block';
            
            // Scroll to top
            window.scrollTo(0, 0);
        }
        
        // Timer for special offer
        function updateTimer() {
            const days = document.getElementById('days');
            const hours = document.getElementById('hours');
            const minutes = document.getElementById('minutes');
            const seconds = document.getElementById('seconds');
            
            let d = parseInt(days.textContent);
            let h = parseInt(hours.textContent);
            let m = parseInt(minutes.textContent);
            let s = parseInt(seconds.textContent);
            
            s--;
            if (s < 0) {
                s = 59;
                m--;
                if (m < 0) {
                    m = 59;
                    h--;
                    if (h < 0) {
                        h = 23;
                        d--;
                    }
                }
            }
            
            days.textContent = d.toString().padStart(2, '0');
            hours.textContent = h.toString().padStart(2, '0');
            minutes.textContent = m.toString().padStart(2, '0');
            seconds.textContent = s.toString().padStart(2, '0');
        }
        
        // Update timer every second
        setInterval(updateTimer, 1000);
        
        // Payment method selection
        const paymentMethods = document.querySelectorAll('.payment-method');
        paymentMethods.forEach(method => {
            method.addEventListener('click', () => {
                paymentMethods.forEach(m => m.classList.remove('active'));
                method.classList.add('active');
            });
        });
        
        // Quantity buttons functionality
        const quantityBtns = document.querySelectorAll('.quantity-btn');
        quantityBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const container = btn.closest('.cart-quantity');
                const quantityElement = container.querySelector('span');
                let quantity = parseInt(quantityElement.textContent);
                
                if (btn.textContent === '+') {
                    quantity++;
                } else {
                    if (quantity > 1) quantity--;
                }
                
                quantityElement.textContent = quantity;
                
                // Update total price for this item
                const item = btn.closest('.cart-item');
                const price = parseFloat(item.querySelector('.cart-price').textContent.replace('$', ''));
                const totalElement = item.querySelector('.cart-total');
                totalElement.textContent = '$' + (price * quantity).toFixed(2);
                
                // Update cart summary
                updateCartSummary();
            });
        });
        
        // Update cart summary
        function updateCartSummary() {
            const items = document.querySelectorAll('.cart-item');
            let subtotal = 0;
            
            items.forEach(item => {
                const total = parseFloat(item.querySelector('.cart-total').textContent.replace('$', ''));
                subtotal += total;
            });
            
            const tax = subtotal * 0.06;
            const total = subtotal + tax;
            
            document.querySelector('.summary-item:nth-child(1) span:last-child').textContent = '$' + subtotal.toFixed(2);
            document.querySelector('.summary-item:nth-child(3) span:last-child').textContent = '$' + tax.toFixed(2);
            document.querySelector('.summary-total span:last-child').textContent = '$' + total.toFixed(2);
        }







// Function to show product details
function showProductDetails(product) {
    // Update product details in the product page
    document.getElementById('product-title').textContent = product.title;
    document.getElementById('product-price').textContent = product.price;
    document.getElementById('main-product-image').src = product.image;
    // You would update other details similarly
    
    // Show the product page
    showPage('product');
}

// Add click event to all product cards
document.addEventListener('DOMContentLoaded', function() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on buttons inside the card
            if (e.target.closest('.action-btn')) return;
            
            // Get product data from the card
            const product = {
                title: card.querySelector('.product-title').textContent,
                price: card.querySelector('.current-price').textContent,
                image: card.querySelector('.product-img img').src,
                // Add other product properties as needed
            };
            
            showProductDetails(product);
        });
    });
    
    // Thumbnail image click handler
    const thumbnails = document.querySelectorAll('.thumbnail-images img');
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            document.getElementById('main-product-image').src = this.src;
        });
    });
});


    function toggleMenu() {
      const dropdown = document.getElementById('menuDropdown');
      dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    }

    // Close menu when clicking outside
    window.addEventListener('click', function(e) {
      const menu = document.getElementById('menuDropdown');
      const icon = document.querySelector('.menu-icon');
      if (!icon.contains(e.target) && !menu.contains(e.target)) {
        menu.style.display = 'none';
      }
    });