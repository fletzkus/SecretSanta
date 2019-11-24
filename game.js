var participants = [];
var human = "Human";
var santa = "Santa";

var santaToHuman = new Map();
var humanToSanta = new Map();

var blue = "#5997C9";
var lightBlue = "#BDD5E9";
var red = "#E34424";
var green = "#65C56C";

var isSearchingBySanta = true;
var isSearchingByHuman = false;
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
  if (participants) {
    participants.forEach(santa => {
        var item = document.createElement("option");
        item.innerHTML = santa;
        item.value = santa;
        menu.appendChild(item);
    });
  }
  else {
    participants = [];
  }
  //document.getElementById("wrapper").appendChild(menu);
};

document.addEventListener("DOMContentLoaded", function() {
  init();
  generateNewSolution();
  document.getElementById("reveal-content").innerHTML = santaToHuman.get(participants[0]);
  // console.log("undefines? : " + document.getElementById("reveal-content").innerHTML );
  // console.log(santaToHuman.get(participants[0]));
});


function generateSantaSolution() {
  // santaToHuman.set("emily", "justin");
  // console.log(santaToHuman.has("emily"));
  // console.log(santaToHuman.has("justin"));
    participants.forEach(s => {
        var h = "";
        let santaIndex = participants.indexOf(s);
        console.log("santa: " + s + " santaIndex: " + santaIndex);
        var count = 0;
        while (count < 50*participants.length) {
            let randomIndex = parseInt(Math.random() * participants.length);
            console.log("randomIndex: " + randomIndex);
            h = participants[randomIndex];

            console.log("SantaToHuman has santa: " + s + "? " + santaToHuman.has(s));
            console.log("humanToSanta has human: " + h + "? " + humanToSanta.has(h));
            // console.log("santaToHuman: " + santaToHuman);
            if (randomIndex !== santaIndex && !humanToSanta.has(h)) {
              console.log("BREAK");
                break;
            }
            if (randomIndex == santaIndex) {
              console.log("same index");
            }
            count = count + 1;
        }
        console.log("santa: " + s + " human: " + h);
        santaToHuman.set(s, h);
        humanToSanta.set(h, s);
        if (count == 50*participants.length) {
          console.log("had to generateNewSolution");
          generateNewSolution();
        }
    });
};


function generateNewSolution() {
  santaToHuman.clear();
  humanToSanta.clear();
  generateSantaSolution();
  fill();
};
//
// function getMySanta(human) {
//   console.log("Your human is " + humantToSanta.get(human));
//   var yourSanta = humantToSanta.get(human);
// };
//
// function getMyHuman(santa) {
//   console.log("Your human is " + santaToHuman.get(santa));
//   var yourHuman = santaToHuman.get(santa);
// };
// function unfill() {
//   document.getElementById("menu").remove();
//    var menu = document.createElement("select");
//    menu.classList.add("Santas");
//    menu.id = "menu";
//    menu.addEventListener("onclick", fill());
// };



function fill() {
  if (isSearchingBySanta) {
    human = santaToHuman.get(document.getElementById("menu").value);
    document.getElementById("reveal-content").innerHTML = human;
  }
  if (isSearchingByHuman) {
    santa = humanToSanta.get(document.getElementById("menu").value);
    document.getElementById("reveal-content").innerHTML = santa;
  }
};

function searchBySanta() {
  isSearchingBySanta = true;
  isSearchingByHuman = false;
  console.log("searchBySanta");
  var btn = document.getElementById("search-by-santa");
  btn.style.backgroundColor = red;
  var otherBtn = document.getElementById("search-by-human");
  otherBtn.style.transition = "0.3s";
  otherBtn.style.backgroundColor = "transparent";
  var chosenOne = document.getElementById("reveal-content");
  chosenOne.style.backgroundColor = green;
  document.getElementById("caption").innerHTML = "Hover to Reveal Human";
  document.getElementById("caption").style.color = blue;
  document.getElementById("for").innerHTML = "Human for ";
  fill();
};

// function fillInCorrectValue() {
//
// }



function hoverSanta() {
  var otherBtn = document.getElementById("search-by-santa");
  otherBtn.style.transition = "0.3s";
  otherBtn.style.backgroundColor = red;
};
function unhoverSanta() {
  if (!isSearchingBySanta) {
    var otherBtn = document.getElementById("search-by-santa");
    otherBtn.style.transition = "0.3s";
    otherBtn.style.backgroundColor = "transparent";
  }
};
function hoverHuman() {
  var otherBtn = document.getElementById("search-by-human");
  otherBtn.style.transition = "0.3s";
  otherBtn.style.backgroundColor = green;
};
function unhoverHuman() {
  if( !isSearchingByHuman) {
    var otherBtn = document.getElementById("search-by-human");
    otherBtn.style.transition = "0.3s";
    otherBtn.style.backgroundColor = "transparent";
  }
};
function searchByHuman() {
  isSearchingByHuman = true;
  isSearchingBySanta = false;
  console.log("searchByHuman");
  var btn = document.getElementById("search-by-human");
  btn.style.backgroundColor = green;
  var otherBtn = document.getElementById("search-by-santa");
  otherBtn.style.transition = "0.3s";
  otherBtn.style.backgroundColor = "transparent";
  var chosenOne = document.getElementById("reveal-content");
  chosenOne.style.backgroundColor = red;
  document.getElementById("caption").innerHTML = "Hover to Reveal Santa";
  document.getElementById("for").innerHTML = "Santa for ";
  document.getElementById("caption").style.color = blue;
  fill();
 };


function edit() {
  localStorage.setItem("participants", JSON.stringify(participants));
  window.location.href = "index.html";
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
//
// function setName(name) {
//   document.getElementById("dropbtn").innerHTML = name;
// };
