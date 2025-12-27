// scripts/product-detail.js
import { products } from './data.js';
// ★ Импортируем обе функции ★
import { initCart, updateCartCounter } from './api/cart-handler.js';

document.addEventListener('DOMContentLoaded', () => {
    // Получаем ID товара из URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    
    console.log('Загружена страница товара, ID:', productId);
    
    if (!productId) {
        showError('Товар не найден');
        return;
    }
    
    // Находим товар
    const product = products.find(p => p.id === productId);
    console.log('Найден товар:', product);
    
    if (!product) {
        showError('Товар не найден');
        return;
    }
    
    // Заполняем страницу данными
    renderProductDetails(product);
    
    // ★ Инициализируем корзину ★
    initCart();
    
    // ★ Обновляем счетчик ★
    updateCartCounter();
    
    // Настраиваем кнопки
    setupButtons();
});

/** Заполняем страницу данными товара */
function renderProductDetails(product) {
    console.log('Заполняем данные товара:', product.name);
    
    // Название товара
    const productName = document.querySelector('.product__name');
    if (productName) {
        productName.textContent = product.name;
    }
    
    // Фото товара
    const productPhoto = document.querySelector('.product__photo');
    if (productPhoto) {
        productPhoto.src = product.image;
        productPhoto.alt = product.name;
        productPhoto.onerror = function() {
            console.log('Ошибка загрузки изображения:', product.image);
            this.src = 'https://placehold.co/500x500/cccccc/666666?text=Нет+фото';
        };
    }
    
    // Описание товара
    const productText = document.querySelector('.product__text');
    if (productText) {
        productText.textContent = product.description;
    }
    
    // Цена товара
    const priceElement = document.querySelector('.price');
    if (priceElement) {
        priceElement.textContent = `${product.price} рублей`;
    }

    // Записываем ID товара в data-атрибут кнопки
    const addToCartBtn = document.querySelector('.to_cart');
    if (addToCartBtn) {
        // ★ Добавляем класс add_cart для совместимости ★
        addToCartBtn.classList.add('add_cart');
        addToCartBtn.dataset.id = product.id;
        console.log('ID товара добавлен в кнопку:', addToCartBtn.dataset.id);
    }
}

function setupButtons() {
    // Кнопка "назад"
    const returnBtn = document.querySelector('.return_btn');
    if (returnBtn) {
        returnBtn.addEventListener('click', () => {
            window.history.back();
        });
    }
    
    // ★ Добавляем обработчик для самой иконки корзины на странице товара ★
    const basketWrapper = document.querySelector('.icons_img_wrapper');
    if (basketWrapper) {
        basketWrapper.style.cursor = 'pointer';
        
        // Обработчик клика на обертку иконки
        basketWrapper.addEventListener('click', (event) => {
            event.preventDefault();
            // ★ Импортируем и вызываем showCartSummary ★
            import('./api/cart-handler.js').then(module => {
                module.showCartSummary();
            });
        });
    }
}

function showError(message) {
    const container = document.querySelector('.main_material_section');
    if (container) {
        container.innerHTML = `<div style="text-align: center; padding: 50px; color: #666;">${message}</div>`;
    }
}