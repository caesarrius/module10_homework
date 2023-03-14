const wsUrl = "wss://echo-ws-service.herokuapp.com";

const output = document.querySelector('.output');
const btnSend = document.querySelector('.btnSend');
const btnGeo = document.querySelector('.btnGeo');

const websocket = new WebSocket(wsUrl);
websocket.onopen = function(evt) {
    console.log('CONNECTED');
};
websocket.onclose = function(evt) {
    console.log("DISCONNECTED");
};
websocket.onmessage = function(evt) {
    writeToScreen(
      '<div class="serverMessage">SERVER: ' + evt.data+'</div>'
    );
};
websocket.onerror = function(evt) {
    writeToScreen(
      '<span style="color: red;">ERROR:</span> ' + evt.data
    );
};

function writeToScreen(message) {
  let pre = document.createElement("p");
  pre.style.wordBreak = "break-word";
  pre.innerHTML = message;
  output.appendChild(pre);
}

btnSend.addEventListener('click', () => {
  const message = document.querySelector('.input').value;
  writeToScreen(
    '<div class="userMessage">YOU: ' + message+'</div>');
  websocket.send(message);
});


const error = () => {
  writeToScreen('Unable to get your location');
  websocket.send(message);
}
  
const success = (position) => {
    console.log('position', position);
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
  
    writeToScreen(
      `<div class="userMessage">
        <a href ='https://www.openstreetmap.org/#map=18/${latitude}/${longitude}' target='_blank'>Geolocation</a>
      </div>`);
}
  
btnGeo.addEventListener('click', () => {
    if (!navigator.geolocation) {
      writeToScreen('Geolocation is not supported by your browser');
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
});
