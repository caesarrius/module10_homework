const btn = document.querySelector('.btn');

btn.addEventListener('click', () => {
    alert(`Width: ${document.documentElement.clientWidth}, Height: ${document.documentElement.clientHeight}`);
})