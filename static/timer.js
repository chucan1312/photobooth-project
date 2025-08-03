window.addEventListener("DOMContentLoaded", () => {
    let count = 12;
    const countdownEl = document.getElementById('timer');
    countdownEl.textContent = count;

    setInterval(() => {
        count--;
        countdownEl.textContent = count;
        if (count <= 0) {
            count = 11;
        }
    }, 1000);
})
