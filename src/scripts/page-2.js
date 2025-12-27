// scripts/product-detail.js
import { products } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    // Получаем ID товара из URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    
    console.log('Загружена страница товара, ID:', productId);
    console.log('Всего товаров в базе:', products.length);
    
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
        // Добавляем обработчик ошибки загрузки изображения
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
    
    console.log('Данные товара заполнены');
}

/** Настраиваем кнопки */
function setupButtons() {
    console.log('Настраиваем кнопки');
    
    // Кнопка "назад"
    const returnBtn = document.querySelector('.return_btn');
    if (returnBtn) {
        returnBtn.addEventListener('click', () => {
            console.log('Нажата кнопка назад');
            window.history.back();
        });
        console.log('Кнопка "назад" настроена');
    }
}
