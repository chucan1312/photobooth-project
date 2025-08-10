document.getElementById('normal').addEventListener("click", () => {
    document.querySelectorAll('.chosen-photo').forEach(photo => {
        photo.style.filter = 'none';
    });
    selectedFilter = 'none';
})

document.getElementById('brighten').addEventListener("click", () => {
    document.querySelectorAll('.chosen-photo').forEach(photo => {
        photo.style.filter = 'brightness(110%)';
    });
    selectedFilter = 'brighten';
})

document.getElementById('bnw').addEventListener("click", () => {
    document.querySelectorAll('.chosen-photo').forEach(photo => {
        photo.style.filter = 'grayscale(100%)';
    });
    selectedFilter = 'bnw';
})