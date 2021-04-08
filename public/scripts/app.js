$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for (user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });



  const socket = io('http://localhost:8080');
  console.log(socket);

  socket.on('chat-message', data => {
    // console.log(data);
  });


  const messageContainer = $('#message-container');
  const messageForm = $('#send-container');
  const messageInput = $('#message-input');


  const name = "admin";
  appendMessage('You joined');
  socket.emit('new-user', name);


  socket.on('chat-message', data => {
    appendMessage(`${ data.name }: ${ data.message }`);
  });

  socket.on('connect', data => {
    console.log('connected');
  });



  // socket.on('user-connected', name => {
  //   appendMessage(`${ name } connected`);
  // });

  // socket.on('user-disconnected', name => {
  //   appendMessage(`${ name } disconnected`);
  // });

  messageForm.on('submit', e => {
    e.preventDefault();
    const message = messageInput.val();

    appendMessage(`You: ${ message }`);
    socket.emit('send-chat-message', message);
    $("#message-input").val("");
  });


  // $('#faveButton').click(function(e) {
  //   e.preventDefault();
  // $.ajax({
  //     url: '/listings/',
  //     type: 'POST',
  //     data: {
  //       'submit': true
  //     }
  //   })
  //   .done((user_id) => {
  //     $(this).addClass('fave');
  //   })
  //   .catch((error) => {
  //     console.log("error", error);
  //   });
  // }



  $("#faveButton").click(function() {
    $(this.children).css("color", "red");
  });

  // eslint-disable-next-line func-style
  function appendMessage(message) {
    const messageElement = document.createElement('div');
    // const messageElement = $('<div/>');
    messageElement.innerText = message;
    messageContainer.append(messageElement);
  }


  // $('.faveB').click(function(e) {
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

  // });

  // $("form").click(function() {
  //   $('#faveButton').css("color", "red");
  // });


  // $("#fave").click(function() {
  //   console.log('here');
  //   $(this).toggleClass("active");
  // });

});
