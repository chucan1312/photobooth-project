document.addEventListener("DOMContentLoaded", () => {
    const wrapper = document.querySelector('.video-wrapper')
    const video = document.getElementById('camera');
    const canvas = document.getElementById('snapshot');
    const context = canvas.getContext('2d');
    const container = document.getElementById('photo-container');

    let count = 0;
    const maxPhotos = parseInt(container.dataset.max, 10);

    if (maxPhotos === 10) {
        wrapper.classList.add('video-wrapper-6')
        video.classList.add('resizable-video-6')
    }

    navigator.mediaDevices.getUserMedia({ video:true })
    .then(stream=> {    
        video.srcObject = stream; 
        video.play();
        takePhoto();
    })
    .catch(error => {
        console.error("Camera access failed:", error);         
    });

    function takePhoto() {
        if (count >= maxPhotos) {
            if (maxPhotos === 8) window.location.href = "/choose4cuts";
            else window.location.href = "/choose6cuts";
        } 
    
        setTimeout(() => {
            if (maxPhotos === 8) {
                canvas.width = 774;
                canvas.height = 612;
                const cropX = (video.width - canvas.width) / 2;
                const cropY = (video.height - canvas.height) / 2;
                context.save();
                context.drawImage(video, cropX, cropY, canvas.width, canvas.height,
                    0, 0, canvas.width, canvas.height
                );
                context.scale(-1, 1);
                context.restore();
            } else {
                canvas.width = 675;
                canvas.height = 630;
                const cropX = (video.width - canvas.width) / 2;
                const cropY = (video.height - canvas.height) / 2;
                context.save();
                context.drawImage(video, cropX, cropY, canvas.width, canvas.height,
                    0, 0, canvas.width, canvas.height
                );
                context.scale(-1, 1);
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
        }, 10000);    
    }
})