document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.containercard');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    
    const cards = document.querySelectorAll('.card');
    const overlay = document.getElementById('overlay');
    const detailsContainer = document.getElementById('details-container');
    const orderModal = document.getElementById('order-modal');
    const closeOrderModalButton = document.getElementById('close-order-modal');
    const buyButtons = document.querySelectorAll('.btn-buy');

    let scrollAmount = 0;

    // Логика для карусели
    rightArrow.addEventListener('click', () => {
        container.scrollBy({ left: 300, behavior: 'smooth' });
        scrollAmount += 300;
    });

    leftArrow.addEventListener('click', () => {
        container.scrollBy({ left: -300, behavior: 'smooth' });
        scrollAmount -= 300;
    });

    // Логика для отображения информации о букете
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const name = card.querySelector('.dark-overlay').textContent;
            const description = card.dataset.description;
            const price = card.dataset.price;
            const imageSrc = card.querySelector('img').src;

            document.getElementById('product-name').textContent = name;
            document.querySelector('.information').textContent = description;
            document.getElementById('product-price').textContent = price;
            document.getElementById('product-image').src = imageSrc;

            // Закрыть окно заказа, если оно открыто
            orderModal.classList.remove('active');

            // Открыть окно с подробной информацией о букете
            overlay.classList.remove('hidden');
            detailsContainer.classList.remove('hidden');
        });
    });

    // Закрытие окна с деталями букета при клике на затемнение
    overlay.addEventListener('click', (event) => {
        // Проверяем, был ли клик именно на затемнение
        if (event.target === overlay) {
            // Скрываем оба окна: информацию о букете и окно с заказом
            overlay.classList.add('hidden');
            detailsContainer.classList.add('hidden');
            orderModal.classList.remove('active');  // Закрыть окно заказа
        }
    });

    // Привязка ко всем кнопкам "Купить"
    buyButtons.forEach(buyButton => {
        buyButton.addEventListener('click', () => {
            // Закрыть окно с деталями букета перед открытием окна покупки
            detailsContainer.classList.add('hidden');
            overlay.classList.add('hidden');

            // Открыть модальное окно с заказом
            orderModal.classList.add('active');
            overlay.classList.remove('hidden');  // Показать затемнение при открытии окна заказа
        });
    });

    // Закрытие окна заказа при нажатии на кнопку закрытия
    closeOrderModalButton.addEventListener('click', () => {
        orderModal.classList.remove('active');
        overlay.classList.add('hidden');
    });
});
