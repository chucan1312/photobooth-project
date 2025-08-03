window.addEventListener("DOMContentLoaded", () => {
    let count = 14;
    const countdownEl = document.getElementById('timer');
    countdownEl.textContent = ``;

    setInterval(() => {
        count--;
        if (count <= 10) {
            countdownEl.textContent = count;
        }
        if (count <= 0) {
            count = 11;
        }
    }, 1000);
})
