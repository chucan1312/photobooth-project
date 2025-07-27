const video = document.getElementById('camera');
const canvas = document.getElementById('snapshot');
const context = canvas.getContext('2d');
const container = document.getElementById('photo-container');

let count = 0;
const maxPhotos = parseInt(container.dataset.max, 10);

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
        canvas.width = 680;
        canvas.height = 460;

        context.save();
        context.scale(-1, 1);
        context.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
        context.restore();

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
