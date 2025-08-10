// CHOOSE FRAME
const currentFrame = document.querySelector('.frame');
let selectedFrame = "none";

function addEventFrame(elementId, source) {
    const el = document.getElementById(elementId);
    if (!el) return; 
    el.addEventListener("click", () => {
        currentFrame.src = source;
        selectedFrame = source;
    });
}

const cutType = document.querySelector('[name="cut-type"]')?.id;
if (cutType === '4cuts') {
    selectedFrame = "/static/frame/4cuts/white-frame-4.png";
} else if (cutType === '6cuts') {
    selectedFrame = "/static/frame/4cuts/white-frame-6.png";
}

if (cutType === '4cuts') {
    addEventFrame('black', "/static/frame/4cuts/black-frame-4.png");
    addEventFrame('white', "/static/frame/4cuts/white-frame-4.png");
    addEventFrame('pink', "/static/frame/4cuts/pink-frame-4.png");
    addEventFrame('blue', "/static/frame/4cuts/blue-frame-4.png");
    addEventFrame('cherry', "/static/frame/4cuts/cherry-frame-4.png");
    addEventFrame('purple-ombre', "/static/frame/4cuts/purple-ombre-frame-4.png");
} else if (cutType === '6cuts') {
    addEventFrame('black', "/static/frame/6cuts/black-frame-6.png");
    addEventFrame('white', "/static/frame/6cuts/white-frame-6.png");
    addEventFrame('pink', "/static/frame/6cuts/pink-frame-6.png");
    addEventFrame('blue', "/static/frame/6cuts/blue-frame-6.png");
    addEventFrame('cherry', "/static/frame/6cuts/cherry-frame-6.png");
    addEventFrame('purple-ombre', "/static/frame/6cuts/purple-ombre-frame-6.png");
} 

// CHOOSE FILTER
let selectedFilter = 'none';

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

document.querySelector('.done-button').addEventListener('click', () => {
    document.getElementById('frame-input').value = selectedFrame;
    document.getElementById('filter-input').value = selectedFilter;
  });