window.addEventListener("DOMContentLoaded", () => {
    let count = 11;
    const countdownEl = document.getElementById('timer');
    countdownEl.textContent = count;

    setInterval(() => {
        count--;
        countdownEl.textContent = count;
        if (count <= 1) {
            count = 11;
        }
    }, 1000);
})
