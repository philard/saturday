'use strict';

var sock = io();
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var w = canvas.width;
var h = canvas.height;


function onMessage(chatDTO) {

    var li= document.createElement('li');
    li.classList.add('comment')
    li.innerHTML = 
    '<section class="author">'+
    '  <img class="photo" src="http://www.gravatar.com/avatar/453cb640b1f272fb50086052e0c9e013.png">'+
    '  <span class="name">' + chatDTO.user_name + '</span>'+
    '</section>'+
    '<section class="content">'+
    '  <p>' + chatDTO.text + '</p>'+
    '</section>';
    var chatList = document.getElementById('chat');
    chatList.appendChild(li);
    chatList.scrollTop = chatList.scrollHeight;
}




function sendMessage(chatDTO) {
    sock.emit('chat', chatDTO);
}

canvas.addEventListener('mousedown', sendCircle);
function sendCircle(e) {
    if (event.button === 0) {
        sock.emit('circle', {x: e.layerX, y: e.layerY, color: randomColor() });
    } else if (event.button === 1) { //middle button
        sock.emit('triangle', {x: e.layerX, y: e.layerY, color: randomColor()});
    } else {    //right button
        sock.emit('circle', {x: e.layerX, y: e.layerY, color: 'black' });
    }

}

function onGetCircles(e) {
    sock.emit('circles', {});
}


// canvas.addEventListener('mousemove', sendCircleWhite);
// function sendCircleWhite(e) {sock.emit('circle', {x: e.layerX, y: e.layerY, color: 'white' }); }


function init() {
    var chatDTO = new ChatDTO('unnamed user', 'Hi i\'m unnamed user');

    sendMessage(chatDTO);

    var form = document.getElementById('say');
    form.addEventListener('submit', onUiMessageSubmit);

    sock.on('chat', onMessage);
    sock.on('circle', function(cord) {
        drawClickCircle(cord);
    });
    sock.on('triangle', function(cord) {
        drawClickTriangle(cord);
    });

    sock.on('circles', onCircles);
}

function onCircles(cords) {
    cords.forEach(function(element, index, array) {
        drawClickCircle(element)
    });
}





function onUiMessageSubmit(event) {
    event.preventDefault();

    var textField = document.querySelector('#say #text');
    var chatDTO = {
        user_name: document.querySelector('#say #user-name').value,
        text: textField.value
    };

    chatDTO = new ChatDTO(document.querySelector('#say #user-name').value
        , textField.value);
    
    sendMessage(chatDTO);
    textField.value = '';

}


function ChatDTO(user_name, text) {
    this.user_name = user_name;
    this.text = text;
}



init();





