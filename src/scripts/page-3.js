// scripts/search-results.js
import { products } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('Страница результатов поиска загружена');
    
    // Получаем поисковый запрос из URL
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search') || '';
    
    console.log('Поисковый запрос из URL:', searchQuery);
    
    // Заполняем поле поиска
    const searchInput = document.getElementById('search-input');
    if (searchInput && searchQuery) {
        searchInput.value = decodeURIComponent(searchQuery);
    }
    
    // Фильтруем товары
    let filteredProducts = products;
    
    if (searchQuery) {
        const query = decodeURIComponent(searchQuery).toLowerCase().trim();
        filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query)
        );
    }
    
    console.log('Найдено товаров:', filteredProducts.length);
    
    // Обновляем заголовок
    updateResultsTitle(filteredProducts.length, searchQuery);
    
    // Очищаем контейнер и рендерим результаты
    renderSearchResults(filteredProducts);
    
    // Настраиваем кнопки
    setupButtons();
    
    // Настраиваем поиск
    setupSearch();
});

/** Обновление заголовка с результатами */
function updateResultsTitle(count, query) {
    const titleElement = document.getElementById('results-title');
    if (!titleElement) return;
    
    if (query) {
        const decodedQuery = decodeURIComponent(query);
        titleElement.textContent = `Найдено ${count} товаров по запросу "${decodedQuery}"`;
    } else {
        titleElement.textContent = `Все товары (${count})`;
    }
}

/** Рендеринг результатов поиска */
function renderSearchResults(filteredProducts) {
    const container = document.getElementById('products-container');
    if (!container) return;
    
    // Очищаем контейнер (удаляем статические карточки)
    container.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        container.innerHTML = `
            <div class="no-results" style="text-align: center; padding: 40px; color: #666;">
                <h3>Товары не найдены</h3>
                <p>Попробуйте изменить поисковый запрос</p>
                <button id="back-to-catalog" style="margin-top: 20px; padding: 10px 20px; background-color: #DC6A4E; color: white; border: none; border-radius: 5px; cursor: pointer;">
                    Вернуться в каталог
                </button>
            </div>
        `;
        return;
    }
    
    const cardsPerRow = 5;
    const totalCards = Math.ceil(filteredProducts.length / cardsPerRow) * cardsPerRow;
    
    for (let i = 0; i < totalCards; i += cardsPerRow) {
        const row = document.createElement('section');
        row.className = 'products_row';
        
        for (let j = i; j < i + cardsPerRow; j++) {
            const card = document.createElement('article');
            card.className = 'product_card';
            
            if (j < filteredProducts.length) {
                const product = filteredProducts[j];
                card.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" class="product_image">
                    <span class="product_price">${product.price} ₽</span>
                    <div class="product_desc"><p>${product.description}</p></div>
                    <button class="add_cart">в корзину</button>
                `;

                // Обработчик клика на карточку
                card.addEventListener('click', (event) => {
                    if (!event.target.classList.contains('add_cart') && 
                        !event.target.closest('.add_cart')) {
                        window.location.href = `./hw1-2-page.html?id=${product.id}`;
                    }
                });
                
                // Обработчик для кнопки "в корзину"
                card.querySelector('.add_cart').addEventListener('click', (event) => {
                    event.stopPropagation();
                    console.log('Добавить в корзину:', product.id);
                });
                
            } else {
                // Пустая карточка
                card.classList.add('empty_card');
                card.innerHTML = `
                    <div class="product_image" style="background-color: #f0f0f0;"></div>
                    <span class="product_price" style="opacity: 0;">—</span>
                    <div class="product_desc"><p>Нет товара</p></div>
                    <button class="add_cart" disabled style="opacity: 0.5;">—</button>
                `;
            }
            
            row.appendChild(card);
        }
        
        container.appendChild(row);
    }
}

/** Настройка кнопок */
function setupButtons() {
    // Кнопка "каталог" - возврат на главную
    const catalogBtn = document.getElementById('catalog-btn');
    if (catalogBtn) {
        catalogBtn.addEventListener('click', () => {
            window.location.href = './hw1-1-page.html';
        });
    }
    
    // Кнопка "вернуться в каталог" если нет результатов
    document.getElementById('back-to-catalog')?.addEventListener('click', () => {
        window.location.href = './hw1-1-page.html';
    });
}

/** Настройка поиска на странице результатов */
function setupSearch() {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const findButton = document.querySelector('.find_btn');
    
    if (!searchForm || !searchInput || !findButton) return;
    
    // Обработчик отправки формы
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        performSearch();
    });
    
    // Обработчик клика на кнопку
    findButton.addEventListener('click', (event) => {
        event.preventDefault();
        performSearch();
    });
    
    // Поиск по Enter
    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            performSearch();
        }
    });
    
    function performSearch() {
        const searchText = searchInput.value.trim();
        
        if (searchText) {
            // Переходим на эту же страницу с новым запросом
            window.location.href = `./hw1-3-page.html?search=${encodeURIComponent(searchText)}`;
        } else {
            // Если поле пустое - возвращаемся на главную
            window.location.href = './hw1-1-page.html';
        }
    }
}