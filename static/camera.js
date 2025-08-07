// Setup elements and video sizing
const wrapper = document.querySelector('.video-wrapper')
const video = document.getElementById('camera');
const canvas = document.getElementById('snapshot');
const context = canvas.getContext('2d');
const container = document.getElementById('photo-container');
const countdownEl = document.getElementById('count');

let count = 0;
const maxPhotos = parseInt(container.dataset.max, 10);
countdownEl.textContent = `${count}/${maxPhotos}`;
let width = 900;
let height = 612;
if (maxPhotos === 10) {
    wrapper.classList.add('video-wrapper-6')
    video.classList.add('resizable-video-6')
    width = 899;
    height = 630;
}

// Camera logic
navigator.mediaDevices.getUserMedia({
    video: {
        width: { ideal: width },
        height: { ideal: height },
        facingMode: "user"
    }
})
    .then(stream => {
        video.srcObject = stream;
        video.play();
        takePhoto();
    })
    .catch(error => {
        console.error("Camera access failed:", error);
    });

function takePhoto() {
    flash();

    if (count >= maxPhotos) {
        if (maxPhotos === 8) window.location.href = "/choose4cuts";
        else window.location.href = "/choose6cuts";
    }

    setTimeout(() => {
        if (maxPhotos === 8) {
            canvas.width = 774;
            canvas.height = 612;
            const cropX = (video.videoWidth - canvas.width) / 2;
            const cropY = (video.videoHeight - canvas.height) / 2;
            context.save();
            context.scale(-1, 1);
            context.drawImage(video, cropX, 0, canvas.width, canvas.height,
                -canvas.width, 0, canvas.width, canvas.height
            );
            context.restore();
        } else {
            canvas.width = 675;
            canvas.height = 630;
            const cropX = (video.videoWidth - canvas.width) / 2;
            const cropY = (video.videoHeight - canvas.height) / 2;
            context.save();
            context.scale(-1, 1);
            context.drawImage(video, cropX, 0, canvas.width, canvas.height,
                -canvas.width, 0, canvas.width, canvas.height
            );
            context.restore();
        }

        // Conver to base64 PNG
        const imageData = canvas.toDataURL("image/png");

        // Send to backend via fetch
        fetch('/save-photo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                image: imageData,
                filename: `photo_${count + 1}.png`
            })
        })
            .then(response => response.json())
            .then(data => {
                count++;
                takePhoto();
            })
    }, 11000);
}

function flash() {
    const flash = document.getElementById('flash');
    flash.style.opacity = '1';
    setTimeout(() => {
        flash.style.opacity = '0';
    }, 50);
}

// Timer logic
video.addEventListener("playing", () => {
    let count = 11;
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


// Photo counting logic
video.addEventListener("playing", () => {
    function updateCount() {
        if (count > maxPhotos) return;

        countdownEl.textContent = `${count}/${maxPhotos}`;
        setTimeout(updateCount, 11000);
    }

    setTimeout(updateCount, 500);
})