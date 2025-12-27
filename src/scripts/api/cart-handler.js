import { addToCart } from './local-storage.js';
import { products } from '../data.js';

// Счетчик товаров в корзине
export function updateCartCounter() {
    const cartJson = localStorage.getItem('pet-store-cart');
    const cart = cartJson ? JSON.parse(cartJson) : [];
    
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const totalPrice = cart.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 1)), 0);
    
    console.log('Товаров в корзине:', totalItems, 'на сумму:', totalPrice, '₽');
    
    const basketWrapper = document.querySelector('.icons_img_wrapper');
    if (!basketWrapper) return;
    
    basketWrapper.style.position = 'relative';
    
    let counterElement = basketWrapper.querySelector('.cart-counter');
    if (!counterElement) {
        counterElement = document.createElement('span');
        counterElement.className = 'cart-counter';
        counterElement.style.cssText = `
            position: absolute;
            top: -8px;
            right: -8px;
            background: #DC6A4E;
            color: white;
            border-radius: 50%;
            min-width: 20px;
            height: 20px;
            font-size: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            z-index: 100;
            padding: 0 4px;
            cursor: pointer;
            box-shadow: 0 0 5px rgba(0,0,0,0.3);
        `;
        basketWrapper.appendChild(counterElement);
        
        // Клик по счетчику
        counterElement.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            showCartSummary();
        });
    }
    
    if (totalItems > 0) {
        counterElement.textContent = totalItems > 99 ? '99+' : totalItems;
        counterElement.style.display = 'flex';
        counterElement.title = `Товаров: ${totalItems}\nСумма: ${totalPrice} ₽`;
    } else {
        counterElement.style.display = 'none';
    }
}

// Показать содержимое корзины
export function showCartSummary() {
    const cartJson = localStorage.getItem('pet-store-cart');
    const cart = cartJson ? JSON.parse(cartJson) : [];
    
    if (cart.length === 0) {
        alert('Ваша корзина пуста');
        return;
    }
    
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const totalPrice = cart.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 1)), 0);
    
    let cartList = 'СОДЕРЖИМОЕ КОРЗИНЫ:\n\n';
    
    cart.forEach((item, index) => {
        cartList += `${index + 1}. ${item.name}\n`;
        cartList += `   Цена: ${item.price} ₽ × ${item.quantity || 1} = ${item.price * (item.quantity || 1)} ₽\n\n`;
    });
    
    cartList += `════════════════════════════\n`;
    cartList += `ИТОГО: ${totalItems} товаров на сумму ${totalPrice} ₽\n\n`;
    
    const result = confirm(cartList + 'Очистить корзину?');
    
    if (result) {
        const confirmClear = confirm(`Подтвердите очистку\n\n${totalItems} товаров на сумму ${totalPrice} ₽ будут удалены.`);
        
        if (confirmClear) {
            localStorage.removeItem('pet-store-cart');
            updateCartCounter();
            alert('Корзина очищена!');
        }
    }
}

// Инициализация корзины
export function initCart() {
    console.log('initCart вызван');
    
    // Обновляем счетчик при загрузке
    updateCartCounter();
    
    document.addEventListener('click', (event) => {
        // Проверяем кнопки корзины
        const isCartButton = event.target.classList.contains('add_cart') || 
                             event.target.classList.contains('to_cart');
        
        if (isCartButton) {
            event.preventDefault();
            event.stopPropagation();
            
            console.log('Нажата кнопка корзины');
            
            let productData;
            
            // Если есть data-id (страница товара)
            if (event.target.dataset.id) {
                const productId = parseInt(event.target.dataset.id);
                console.log('ID товара:', productId);
                
                const foundProduct = products.find(p => p.id === productId);
                
                if (foundProduct) {
                    productData = {
                        id: foundProduct.id,
                        name: foundProduct.name,
                        price: foundProduct.price,
                        image: foundProduct.image
                    };
                }
            } else {
                // Карточка товара на главной
                const card = event.target.closest('.product_card');
                if (card) {
                    const productName = card.querySelector('.product_price')?.previousElementSibling?.alt || 
                                      card.querySelector('img')?.alt || 'Неизвестный товар';
                    const priceText = card.querySelector('.product_price')?.textContent || '0 ₽';
                    const price = parseInt(priceText.replace(/[^\d]/g, ''));
                    
                    productData = {
                        id: Date.now(),
                        name: productName,
                        price: price,
                        image: card.querySelector('img')?.src || ''
                    };
                }
            }
            
            if (productData) {
                addToCart(productData);
                updateCartCounter();
                alert('Товар добавлен в корзину!');
            }
        }
        
        // Клик на иконку корзины
        const basketIcon = event.target.closest('.icons_img_wrapper, .icons_img, [data*="basket"]');
        if (basketIcon) {
            event.preventDefault();
            showCartSummary();
        }
    });
}