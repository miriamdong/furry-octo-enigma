$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for (user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;


  const socket = io('http://localhost:8080');

  socket.on('chat-message', data => {
    console.log(data);
  });


  const messageContainer = document.getElementById('message-container');
  const messageForm = document.getElementById('send-container');
  const messageInput = document.getElementById('message-input');

  const name = prompt('What is your name?');
  appendMessage('You joined');
  socket.emit('new-user', name);

  socket.on('chat-message', data => {
    appendMessage(`${ data.name }: ${ data.message }`);
  });

  socket.on('connect', data => {
    console.log(data);
  });

  socket.on('user-connected', name => {
    appendMessage(`${ name } connected`);
  });

  socket.on('user-disconnected', name => {
    appendMessage(`${ name } disconnected`);
  });

  messageForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = messageInput.value;
    appendMessage(`You: ${ message }`);
    socket.emit('send-chat-message', message);
    messageInput.value = '';
  });

  function appendMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
  }

  // $('.faveButton').click(function(e) {
  //   e.preventDefault();
  //   $.ajax({
  //       url: '/listings/',
  //       type: 'POST',
  //       data: {
  //         'submit': true
  //       }
  //     })
  //     .done((user_id) => {
  //       $(this).toggleClass('fave');
  //     })
  //     .catch((error) => {
  //       console.log("error", error);
  //     });
  //   }

  $(".faveButton").click(function() {
    $(this).css("color", "red");
  });
});
