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
    console.log(data);
  });


  const messageContainer = $('#message-container');
  const messageForm = $('#send-container');
  const messageInput = $('#message-input');

  console.log('here!!!');
  const name = prompt('What is your name?');
  appendMessage('You joined');
  socket.emit('new-user', name);


  socket.on('chat-message', data => {
    console.log(data);
    appendMessage(`${ data.name }: ${ data.message }`);
  });

  socket.on('connect', data => {
    console.log('connected');
  });



  socket.on('user-connected', name => {
    appendMessage(`${ name } connected`);
  });

  socket.on('user-disconnected', name => {
    appendMessage(`${ name } disconnected`);
  });

  messageForm.on('submit', e => {
    e.preventDefault();
    const message = messageInput.val();
    appendMessage(`You: ${ message }`);
    socket.emit('send-chat-message', message);
    messageInput.value = '';
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
    $("button").css("color", "red");
  });

<<<<<<< HEAD
  function appendMessage(message) {
    const messageElement = document.createElement('div');
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
  //   $('.fave').css("color", "red");
  // });


  $(".fave").click(function(e) {
    console.log('here');
    $(this).toggleClass("active");
  });

=======
//   $('#Button').click(function(){
//     $(this).addClass("active");
// });
>>>>>>> 33802b18c021af4493bf2cdda5346822bd2fd4ca
});
