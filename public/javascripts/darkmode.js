document.addEventListener('DOMContentLoaded', (event) => {
    const toggle = document.getElementById('theme-checkbox');
    const body = document.body;
    const leftbar = document.querySelectorAll('.social-bar');
    const rightbar = document.querySelectorAll('.right-bar');
    const addblogInput = document.querySelectorAll('.form-control');
    const backButton = document.querySelectorAll('.right-bar-opt');
    const editButton = document.querySelectorAll('.right-bar-opt-2');
    const cards = document.querySelectorAll('.card');
    const blogBody = document.querySelectorAll('.body-container');
    const topBtn = document.querySelectorAll('.add-btn');
    const progressBar = document.querySelectorAll('.progress-loader');
    const navbar = document.querySelectorAll('.navbar navbar-expand-lg');
    
    const applyDarkMode = () => {
        body.classList.add('dark-mode');
        leftbar.forEach(link => link.classList.add('dark-mode'));
        rightbar.forEach(link => link.classList.add('dark-mode'));
        addblogInput.forEach(link => link.classList.add('dark-mode'));
        backButton.forEach(link => link.classList.add('dark-mode'));
        editButton.forEach(link => link.classList.add('dark-mode'));
        cards.forEach(link => link.classList.add('dark-mode'));
        blogBody.forEach(link => link.classList.add('dark-mode'));
        topBtn.forEach(link => link.classList.add('dark-mode'));
        progressBar.forEach(link => link.classList.add('dark-mode'));
    };

    const removeDarkMode = () => {
        body.classList.remove('dark-mode');
        leftbar.forEach(link => link.classList.remove('dark-mode'));
        rightbar.forEach(link => link.classList.remove('dark-mode'));
        addblogInput.forEach(link => link.classList.remove('dark-mode'));
        backButton.forEach(link => link.classList.remove('dark-mode'));
        editButton.forEach(link => link.classList.remove('dark-mode'));
        cards.forEach(link => link.classList.remove('dark-mode'));
        blogBody.forEach(link => link.classList.remove('dark-mode'));
        topBtn.forEach(link => link.classList.remove('dark-mode'));
        progressBar.forEach(link => link.classList.remove('dark-mode'));
    };

    if (localStorage.getItem('dark-mode') === 'enabled') {
        applyDarkMode();
        toggle.checked = true;
    }

    toggle.addEventListener('change', () => {
        if (toggle.checked) {
            applyDarkMode();
            localStorage.setItem('dark-mode', 'enabled');
        } else {
            removeDarkMode();
            localStorage.setItem('dark-mode', 'disabled');
        }
    });
});
