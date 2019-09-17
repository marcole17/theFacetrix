
//This works. It get's the attribute and displays the value
/*var x = document.getElementsByTagName("button")[0].getAttribute("value")
console.log(x);*/

const vidBorder = document.getElementById('vidborder');

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('file:///M:/Code/js/facerec/models/'),
  faceapi.nets.faceLandmark68Net.loadFromUri('file:///M:/Code/js/facerec/models/'),
  faceapi.nets.faceRecognitionNet.loadFromUri('file:///M:/Code/js/facerec/models/'),
  faceapi.nets.faceExpressionNet.loadFromUri('file:///M:/Code/js/facerec/models/'),
]).then(startVideo)

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => vidBorder.srcObject = stream,
    err => console.error(err)
  )
}

vidBorder.addEventListener('play', () => {
  console.log('hello');
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
