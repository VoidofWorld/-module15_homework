const wsUri = "wss://echo-ws-service.herokuapp.com";


const input = document.querySelector('.inp');
const btnSend = document.querySelector('.btn.send');
const btnGeo = document.querySelector('.btn.geo');
const boxMess = document.querySelector('.box');
let value = input.value;

let websocket;
websocket = new WebSocket(wsUri);

websocket.onmessage = function(evt) {
  let mess = document.createElement('div');
  mess.className = 'messServ';
  mess.textContent = evt.data;
  boxMess.appendChild(mess);
  };

btnSend.addEventListener('click', () => {
  const message = input.value;
  if (message) {
    let mess = document.createElement('div');
    mess.className = 'mess';
    mess.textContent = message;
    boxMess.appendChild(mess);
      websocket.send(message);
      input.value = ''
  }
});

const error = () =>{
  let mess = document.createElement('div');
  mess.className = 'mess';
  mess.textContent = 'Невозможно получить ваше местоположение';
  boxMess.appendChild(mess);
}
const success = (position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  let link = document.createElement('a');
  link.className = 'mess';
  link.setAttribute('href', `https://www.openstreetmap.org/#map=17/${latitude}/${longitude}`);
  link.setAttribute('target', '_blank');
  link.textContent = 'Гео-локация';
  boxMess.appendChild(link);
}

btnGeo.addEventListener('click', () => {
  navigator.geolocation.getCurrentPosition(success, error);
})