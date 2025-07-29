const pic1 = document.getElementById("pic1");
const pic2 = document.getElementById("pic2");
const pic3 = document.getElementById("pic3");
const pic4 = document.getElementById("pic4");
const pic5 = document.getElementById("pic5");
const pic6 = document.getElementById("pic6");
const pic7 = document.getElementById("pic7");
const pic8 = document.getElementById("pic8");
const pic9 = document.getElementById("pic9");
const pic10 = document.getElementById("pic10");

const selected1 = document.getElementById("selected1");
const selected2 = document.getElementById("selected2");
const selected3 = document.getElementById("selected3");
const selected4 = document.getElementById("selected4");
const selected5 = document.getElementById("selected5");
const selected6 = document.getElementById("selected6");

selected_slot = [false, false, false, false, false, false];
const slots = [selected1, selected2, selected3, selected4, selected5, selected6];

let max;
if (pic9 === null) {
    max = 4;
} else {
    max = 6;
}

function getNextSlot() {
    for (let i = 0; i < max; i++) {
        if (!selected_slot[i]) {
            selected_slot[i] = true;
            return slots[i];
        } 
    }
    return null;
}

selected_picture = [false, false, false, false, false, false, false, false, false, false];

function addEventPic(pic, num, source) {
    pic.addEventListener("click", () => {
        if (!selected_picture[num]) {
            const slot = getNextSlot();
            if (slot) {
                const img = slot.querySelector("img");
                img.src = source;
                selected_picture[num] = true;
            }
        }
    })
}

addEventPic(pic1, 0, "/static/temp-photos/photo_1.png");
addEventPic(pic2, 1, "/static/temp-photos/photo_2.png");
addEventPic(pic3, 2, "/static/temp-photos/photo_3.png");
addEventPic(pic4, 3, "/static/temp-photos/photo_4.png");
addEventPic(pic5, 4, "/static/temp-photos/photo_5.png");
addEventPic(pic6, 5, "/static/temp-photos/photo_6.png");
addEventPic(pic7, 6, "/static/temp-photos/photo_7.png");
addEventPic(pic8, 7, "/static/temp-photos/photo_8.png");
if (pic9) {
    addEventPic(pic9, 8, "/static/temp-photos/photo_9.png");
}
if (pic10) {
    addEventPic(pic10, 9, "/static/temp-photos/photo_10.png");
}

// Return the number of the source picture 
function getSource(src) {
    const match = src.match(/photo_(\d+)\.png/);
    if (match && match[1]) {
        const num = parseInt(match[1], 10);
        return num;
    } else return null;
}

function addEventSelect(selected, num, white) {
    selected.addEventListener("click", () => {
        if (selected_slot[num]) {
            const img = slots[num].querySelector("img");
            const src = img.src;
            const location = getSource(src) - 1;
            img.src = white;
            selected_picture[location] = false;
            selected_slot[num] = false;
        }
    })
}

addEventSelect(selected1, 0, "/static/white/4cuts.png");
addEventSelect(selected2, 1, "/static/white/4cuts.png");
addEventSelect(selected3, 2, "/static/white/4cuts.png");
addEventSelect(selected4, 3, "/static/white/4cuts.png");
addEventSelect(selected5, 4, "/static/white/4cuts.png");
addEventSelect(selected6, 5, "/static/white/4cuts.png");