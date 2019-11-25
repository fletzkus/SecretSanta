var participants = [];

const init = function(e) {
  participants = JSON.parse(localStorage.getItem("participants"));
  if (participants) {
    participants.forEach(p => {
      update(p);
    });
  }
  else {
    participants = [];
  }
};

document.addEventListener("DOMContentLoaded", function() {
  init();
});

function update(p) {
  //create nameAndButton div
  var nameAndButton = document.createElement("div");
  nameAndButton.classList.add("name-and-button");

  //create participant input
  var participant = document.createElement("article");
  participant.classList.add("participant");

  //add participant text
  var participantText = document.createElement("p");
  participantText.innerText = p
  participant.appendChild(participantText);

  //create delete button
  var deleteButton = document.createElement("button");
  deleteButton.classList.add("delete");
  deleteButton.innerHTML = 'X';

  //add participant and button to page
  nameAndButton.appendChild(participant);
  nameAndButton.appendChild(deleteButton);
  document.getElementById("participants-container").appendChild(nameAndButton);

  // add event listener for delete button
  deleteButton.addEventListener("click", deleteParticipant);

  //clear input in form after sumbit
  document.getElementById("participant-input").value = '';

};

function deleteParticipant(event) {
  event.target.parentNode.remove();
  let nameString = event.target.parentNode.firstChild.firstChild.innerHTML;
  let index = participants.indexOf(nameString);
  participants.splice(index, 1);
  console.log(participants);
};

function appendParticipant() {
  participants.push(newTitle.text);
  console.log(newTitle.text);
};

function submit() {
  var form = document.getElementById("new-participant-form");
  var p = form.elements[0].value;
  if (p !== "") {
    participants.push(p);
    update(p);
    console.log(participants);
  }
};

document.getElementById("new-participant-form").addEventListener("submit", function(event) {
  event.preventDefault();
  submit();
});

function play() {
  console.log("play clicked!");
  console.log(JSON.stringify(participants));
  localStorage.setItem("participants", JSON.stringify(participants));
  if (isDupicateName()) {
    alert("There are duplicate names. Please make all participant's names unique.");
  }
  else if (participants.length > 2) {
    window.location.href = "game.html";
  }
  else {
    alert("Please add more participants. You need at least 3 to play. Right now you have " + participants.length);
  }

};

function isDupicateName() {
  for (var i = 0; i < participants.length; i++) {
    for (var j = 0; j < participants.length; j++) {
      if (participants[i] == participants[j] && i !== j) {
        return true;
      }
    }
  }
  return false;
};
