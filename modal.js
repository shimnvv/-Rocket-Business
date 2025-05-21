const openModalBtn = document.querySelectorAll('.btn');
const modalOverlay = document.getElementById('modal');
const modalClose = document.getElementById('modalClose');
const applicationForm = document.getElementById('applicationForm');
const submitBtn = document.querySelector('.submit-btn');

openModalBtn.forEach(btn  => {
    btn.addEventListener('click', () => {
        modalOverlay.classList.add('active');
    })
});

modalClose.addEventListener('click', () => {
    modalOverlay.classList.remove('active');
});

modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
    }
});

document.getElementById('applicationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let isValid = true;
    
    document.querySelectorAll('.form-input[required]').forEach(input => {
        const errorElement = input.nextElementSibling;

        if (!input.value.trim()) {
            input.classList.add('error');
            errorElement.textContent = 'Поле не заполнено';
            errorElement.style.display = 'block';
            isValid = false;
        } else {
            input.classList.remove('error');
            errorElement.style.display = 'none';
        }
    });

        const formData = new FormData(this);
    
        fetch('sendmail.php', {
            method: 'POST',
            body: new URLSearchParams(formData),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
    .then(response => response.json())
    .then(data => console.log(data));

    submitBtn.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
    });
});

document.getElementById('phone').addEventListener('input', function(e) {
    let x = e.target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
    e.target.value = !x[2] ? x[1] : '+7 (' + x[2] + (x[3] ? ') ' + x[3] : '') + (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : '');
});

document.querySelectorAll('.form-input[required]').forEach(input => {
input.addEventListener('blur', function() {
    const errorElement = this.nextElementSibling;

    if (!this.value.trim()) {
        this.classList.add('error');
        errorElement.textContent = 'Поле не заполнено';
        errorElement.style.display = 'block';
    } else {
        this.classList.remove('error');
        errorElement.style.display = 'none';
    }
});
});