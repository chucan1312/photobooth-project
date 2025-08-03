window.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById('photo-container');
    const maxPhotos = parseInt(container.dataset.max, 10);

    let count = 0;
    const countdownEl = document.getElementById('count');
    countdownEl.textContent = `${count}/${maxPhotos}`;

    function updateCount() {
        if (count > maxPhotos) return;

        countdownEl.textContent = `${count}/${maxPhotos}`;
        count++;
        setTimeout(updateCount, 11000);
    }

    setTimeout(updateCount, 1000);
});