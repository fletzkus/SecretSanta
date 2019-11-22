// var participants = ["Faith", "Blub", "Ilana"];
 var participants = [];
 var santaToHuman = new Map();
 var humanToSanta = new Map();

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

}

function deleteParticipant(event) {
  event.target.parentNode.remove();
}

function appendParticipant() {
  participants.push(newTitle.text);
  console.log(newTitle.text);
}

function submit() {
  var form = document.getElementById("new-participant-form");
  var p = form.elements[0].value;
  if (p !== "") {
    participants.push(p);
    update(p);
    console.log(participants);
  }
}

document.getElementById("new-participant-form").addEventListener("submit", function(event) {
  event.preventDefault();
  submit();
});

function generateSantaSolution() {
    participants.forEach(santa => {
        var human = "";
        let santaIndex = participants.indexOf(santa);
        while (true) {
            let randomIndex = parseInt(Math.random() * participants.length);
            human = participants[randomIndex];
            if (randomIndex !== santaIndex && !santaToHuman.has(human)) {
                break;
            }
        }
        santaToHuman.set(santa, human);
        humanToSanta.set(human, santa);
    });
}

function play() {
  generateNewSolution();
  console.log("play clicked!");
  console.log(santaToHuman);
}

function generateNewSolution() {
  santaToHuman.clear();
  humanToSanta.clear();
  generateSantaSolution();
}

function getMySanta(human) {
  console.log("Your human is " + humantToSanta.get(human));
  var yourSanta = humantToSanta.get(human);
}

function getMyHuman(santa) {
  console.log("Your human is " + santaToHuman.get(santa));
  var yourHuman = santaToHuman.get(santa);
}
