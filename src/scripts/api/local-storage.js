const CART_KEY = 'pet-store-cart';

export function addToCart(product) {
    console.log('addToCart вызван');
    console.log('Товар:', product);
    
    if (!product) {
        console.error('Товар не передан в addToCart');
        return;
    }
    
    // Получаем корзину
    const cartJson = localStorage.getItem(CART_KEY);
    console.log('Данные из localStorage:', cartJson);
    
    const cart = cartJson ? JSON.parse(cartJson) : [];
    console.log('Текущая корзина:', cart);
    
    // Добавляем товар
    cart.push({
        ...product,
        quantity: 1
    });
    
    console.log('Корзина после добавления:', cart);
    
    // Сохраняем
    try {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
        console.log('Успешно сохранено');
        console.log('Проверка:', localStorage.getItem(CART_KEY));
    } catch (error) {
        console.error('Ошибка сохранения:', error);
    }
    
    return cart;
}

export function getCart() {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
}