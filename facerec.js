
//This works. It get's the attribute and displays the value
/*var x = document.getElementsByTagName("button")[0].getAttribute("value")
console.log(x);*/

const video = document.getElementById('video');

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
  faceapi.nets.faceExpressionNet.loadFromUri('./models'),
])

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}

video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video);
  const vidBorder = document.getElementById("vidborder");
  vidBorder.insertBefore(canvas, vidBorder.childNodes[0]);
  //document.getElementById("vidborder").appendChild(canvas);
  const displaySize = { width: video.width, height: video.height};
  faceapi.matchDimensions(canvas, displaySize);
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video,
    new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    faceapi.draw.drawDetections(canvas, resizedDetections)
  }, 100)
})

document.getElementById("camera").onclick = function() {
  if (this.value == "cam-on") {
    document.getElementById("camera").value = "cam-off";
    this.style.backgroundColor = "red";
    this.innerHTML = "Stop Camera";
    startVideo();
  } else {
    document.getElementById("camera").value = "cam-on";
    this.style.backgroundColor = "green";
    this.innerHTML = "Start Camera";
    }
  }

//startVideo()

document.getElementById("findFace").onclick = function() {
  if (this.value == "off") {
    //this.value = "on";
    document.getElementById("findFace").value = "on";
    this.style.backgroundColor = 'red';
    this.innerHTML = 'Click for off';
  } else {
    document.getElementById("findFace").value = "off";
    this.style.backgroundColor = 'green';
    this.innerHTML = 'Find Face'
  }
}
