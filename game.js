var participants = [];
var human = "Human";
var santa = "Santa";

var santaToHuman = new Map();
var humanToSanta = new Map();

var darkBlue = "#5997C9";
var lightBlue = "#BDD5E9";
var red = "#E34424";
var green = "#65C56C";
//var participants = ["Faith", "Blub", "Ilana"];

const init = function(e) {
  participants = JSON.parse(localStorage.getItem("participants"));
//  var menu = document.getElementById("menu");

  // var child = menu.lastElementChild;
  // while (child) {
  //     menu.removeChild(child);
  //     child = menu.lastElementChild;
  // }

  var menu = document.getElementById("menu");

  participants.forEach(santa => {
      var item = document.createElement("option");
      item.innerHTML = santa;
      item.value = santa;
      menu.appendChild(item);
  });
  //document.getElementById("wrapper").appendChild(menu);
  console.log(participants);
};

document.addEventListener("DOMContentLoaded", function() {
  init();
  generateNewSolution();
});




function generateSantaSolution() {
    participants.forEach(s => {
        var h = "";
        let santaIndex = participants.indexOf(s);
        console.log("santa: + " + s + " santaIndex: " + santaIndex);
        var count = 0;
        while (count < 20) {
            let randomIndex = parseInt(Math.random() * participants.length);
            console.log("randomIndex: " + randomIndex);
            h = participants[randomIndex];
            if (randomIndex !== santaIndex && !santaToHuman.has(h)) {
              console.log("BREAK");
                break;
            }
            coutn = count + 1;
        }
        console.log("santa: + " + s + " human: " + h);
        santaToHuman.set(s, h);
        humanToSanta.set(s, h);
    });
};


function generateNewSolution() {
  santaToHuman.clear();
  humanToSanta.clear();
  generateSantaSolution();
};

function getMySanta(human) {
  console.log("Your human is " + humantToSanta.get(human));
  var yourSanta = humantToSanta.get(human);
};

function getMyHuman(santa) {
  console.log("Your human is " + santaToHuman.get(santa));
  var yourHuman = santaToHuman.get(santa);
};







// function unfill() {
//   document.getElementById("menu").remove();
//    var menu = document.createElement("select");
//    menu.classList.add("Santas");
//    menu.id = "menu";
//    menu.addEventListener("onclick", fill());
// };

function fill() {
  //console.log("in fill()");
  console.log("Value: " + document.getElementById("menu").value);
  human = document.getElementById("menu").value;
  //console.log(document.getElementById("chosen-one").innerHTML);
  document.getElementById("chosen-one").innerHTML = human;
};


// function fillDropdown() {
//     document.getElementById("dropdown-content").remove();
//     //let array = JSON.parse(localStorage.getItem("participants"));
//     console.log("hey now " + participants);
//   var theDropdown = document.createElement("select");
//   theDropdown.classList.add("dropdown-content");
//   theDropdown.id = "dropdown-content";
//   theDropdown.addEventListener("onclick", fillDropdown());
//
// 		participants.forEach(santa => {
//         var item = document.createElement("option");
//         item.innerHTML = santa;
//         item.value = santa;
//       myDiv.appendChild(item);
//     });
//   document.getElementById("dropdown").appendChild(myDiv);
// };



// function unfillDropdown() {
//   console.log("gone");
//   document.getElementById("dropdown-content").remove();
// };
//
// function fillDropdown() {
//     //let array = JSON.parse(localStorage.getItem("participants"));
//     console.log("hey now " + participants);
//   var myDiv = document.createElement("div");
//   myDiv.classList.add("dropdown-content");
//   myDiv.id = "dropdown-content";
// 		participants.forEach(santa => {
//         var item = document.createElement("p");
//
//
//         item.addEventListener("onclick", setName(this.innerHTML));
//         //   alert("Hello World!");
//         //   console.log("in the function " + santa);
//         //   document.getElementById("dropbtn").innerHTML = santa;
//         // });
//         //setName(santa));
//         //   console.log("in the function")
//         //   document.getElementById("dropbtn").innerHTML = santa;
//         // });
//         item.innerHTML = santa;
//       myDiv.appendChild(item);
//     });
//   document.getElementById("dropdown").appendChild(myDiv);
// };

function setName(name) {
  document.getElementById("dropbtn").innerHTML = name;
};


function searchBySanta(btn) {
  console.log("searchBySanta");
  btn.style.backgroundColor = red;
  btn.style.color = "white";
  btn.style.width = "76%";
  var otherBtn = document.getElementById("search-by-human");
  otherBtn.style.transition = "0.3s";
  otherBtn.style.backgroundColor = "white";
  otherBtn.style.color = darkBlue;
  var chosenOne = document.getElementById("chosen-one");
  chosenOne.style.backgroundColor = green;
  chosenOne.style.transition = "0.3s";
  otherBtn.style.width = "68%";
  // otherBtn.style.hover.width = "68%";
};


function searchByHuman(btn) {
  console.log("searchByHuman");
  btn.style.backgroundColor = green;
  btn.style.color = "white";
  btn.style.width = "76%";
  var otherBtn = document.getElementById("search-by-santa");
  otherBtn.style.transition = "0.3s";
  otherBtn.style.backgroundColor = "white";
  otherBtn.style.color = darkBlue;
  var chosenOne = document.getElementById("chosen-one");
  chosenOne.style.backgroundColor = red;
  chosenOne.style.transition = "0.3s";
  otherBtn.style.width = "68%";
};


function edit() {
  localStorage.setItem("participants", JSON.stringify(participants));
  window.location.href = "index.html";
};
