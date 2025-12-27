// scripts/ui.js
import { products } from "./data.js";

/** Ваша оригинальная функция renderProducts */
export const renderProducts = (productsToShow = products) => {
    const container = document.querySelector('.products_section');
    if (!container) return;
    
    container.innerHTML = '';
    
    const cardsPerRow = 5;
    const totalCards = Math.ceil(productsToShow.length / cardsPerRow) * cardsPerRow;
    
    for (let i = 0; i < totalCards; i += cardsPerRow) {
        const row = document.createElement('section');
        row.className = 'products_row';
        
        for (let j = i; j < i + cardsPerRow; j++) {
            const card = document.createElement('article');
            card.className = 'product_card';
            
            if (j < productsToShow.length) {
                const product = productsToShow[j];
                card.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" class="product_image">
                    <span class="product_price">${product.price} ₽</span>
                    <div class="product_desc"><p>${product.description}</p></div>
                    <button class="add_cart">в корзину</button>
                `;

                // Только ПОСЛЕ добавления HTML находим кнопку
                const addCartBtn = card.querySelector('.add_cart');
                
                // Обработчик клика на карточку
                card.addEventListener('click', (event) => {
                    // Проверяем, что кликнули не на кнопке "в корзину"
                    if (!event.target.classList.contains('add_cart') && 
                        !event.target.closest('.add_cart')) {
                        // Переходим на страницу товара
                        window.location.href = `./hw1-2-page.html?id=${product.id}`;
                    }
                });
                
            } else {
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
    
    // После рендеринга карточек, настраиваем поиск
    setupSearch();
};

/** Настройка поиска */
const setupSearch = () => {
    const searchInput = document.querySelector('.search');
    const findButton = document.querySelector('.find_btn');
    const searchForm = document.querySelector('form'); // находим форму
    
    if (!searchInput || !findButton || !searchForm) return;
    
    // 1. Предотвращаем отправку формы
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault(); // ВАЖНО: предотвращаем перезагрузку
        performSearch();
    });
    
    // 2. Обработчик для кнопки
    findButton.addEventListener('click', (event) => {
        event.preventDefault(); // ВАЖНО: предотвращаем отправку формы
        performSearch();
    });
    
    // 3. Поиск по Enter
    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            performSearch();
        }
    });
    
    // Функция выполнения поиска
    function performSearch() {
        const searchText = searchInput.value.trim();
        
        console.log('Выполняется поиск:', searchText);
        
        if (searchText === '') {
            // Если ничего не введено - показываем все товары
            renderProducts(products);
        } else {
            // Переходим на страницу результатов поиска
            console.log('Переход на hw1-3-page.html?search=', encodeURIComponent(searchText));
            window.location.href = `./hw1-3-page.html?search=${encodeURIComponent(searchText)}`;
        }
    }
};