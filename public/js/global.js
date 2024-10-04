const delay = 200;
window.addEventListener('load', () => {
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, delay);
});
