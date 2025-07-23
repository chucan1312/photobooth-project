const video = document.getElementById('camera');
const canvas = document.getElementById('snapshot');
const context = canvas.getContext('2d');

let count = 0;
const container = document.getElementById('photo-container');
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
    if (count >= maxPhotos) window.location.href = "/deco";
    
    setTimeout(() => {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        console.log("Photo taken for debug");
        
        const imageData = canvas.toDataURL("image/png");
        console.log(imageData);

        count++;
        takePhoto();
    }, 8000);    
}
