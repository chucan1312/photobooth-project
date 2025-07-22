const video = document.getElementById('camera');

navigator.mediaDevices.getUserMedia({ video:true })
    .then(stream=> {video.srcObject = stream; })
    .catch(error => {console.error("Camera access failed:", error);         
    });