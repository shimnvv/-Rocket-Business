const svgElement = document.querySelectorAll('.icon');

svgElement.forEach(icon => {
    icon.addEventListener('click', function() {
        const isNowActive = this.classList.toggle('active');
        console.log(`Продукт ${isNowActive ? 'добавлен в избранное' : 'удалён из избранного'}!`);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider-container');
    const button1 = document.querySelector('.slider-buttons1');
    const button2 = document.querySelector('.slider-buttons2');
    const productRows = document.querySelectorAll('.product-row');

    let touchStartX = 0;
    let touchEndX = 0;
    const swipeThreshold = 50;

    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        if (touchStartX - touchEndX > swipeThreshold) {
            switchSlide('next');
        } else if (touchEndX - touchStartX > swipeThreshold) {
            switchSlide('prev');
        }
    }

    function switchSlide(direction) {
        if (direction === 'next') {
            slider.classList.add('slide-active');
            button2.classList.add('active');
            button1.classList.remove('active');
        } else {
            slider.classList.remove('slide-active');
            button1.classList.add('active');
            button2.classList.remove('active');
        }
    }

    button1.addEventListener('click', function() {
        slider.classList.remove('slide-active');
        button1.classList.add('active');
        button2.classList.remove('active');
    });

    button2.addEventListener('click', function() {
        slider.classList.add('slide-active');
        button2.classList.add('active');
        button1.classList.remove('active');
    });
});