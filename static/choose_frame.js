const currentFrame = document.querySelector('.frame');

function addEventFrame(elementId, source) {
    const el = document.getElementById(elementId);
    if (!el) return; 
    el.addEventListener("click", () => {
        if (currentFrame) {
            currentFrame.src = source;
        }
    });
}

const cutType = document.querySelector('[name="cut-type"]')?.id;

if (cutType === '4-cuts') {
    addEventFrame('black', "/static/frame/4cuts/black-frame-4.png");
    addEventFrame('white', "/static/frame/4cuts/white-frame-4.png");
    addEventFrame('pink', "/static/frame/4cuts/pink-frame-4.png");
    addEventFrame('blue', "/static/frame/4cuts/blue-frame-4.png");
    addEventFrame('cherry', "/static/frame/4cuts/cherry-frame-4.png");
    addEventFrame('purple-ombre', "/static/frame/4cuts/purple-ombre-frame-4.png");
} else if (cutType === '6-cuts') {
    addEventFrame('black', "/static/frame/6cuts/black-frame-6.png");
    addEventFrame('white', "/static/frame/6cuts/white-frame-6.png");
    addEventFrame('pink', "/static/frame/6cuts/pink-frame-6.png");
    addEventFrame('blue', "/static/frame/6cuts/blue-frame-6.png");
    addEventFrame('cherry', "/static/frame/6cuts/cherry-frame-6.png");
    addEventFrame('purple-ombre', "/static/frame/6cuts/purple-ombre-frame-6.png");
} 

