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

const init = function(e) {
  participants = JSON.parse(localStorage.getItem("participants"));
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
};

document.addEventListener("DOMContentLoaded", function() {
  init();
  generateNewSolution();
  document.getElementById("reveal-content").innerHTML = santaToHuman.get(participants[0]);
});

function generateSantaSolution() {
    var remainingHumans = [];
    remainingHumans = remainingHumans.concat(participants);
    participants.forEach(s => {
        var h = "";
        let santaIndex = participants.indexOf(s);
        if (remainingHumans.length == 1 && remainingHumans[0] == s) {
          generateNewSolution();
        }
        else {
          while (true) {
              let randomIndex = parseInt(Math.random() * participants.length);
              h = participants[randomIndex];
              if (randomIndex !== santaIndex && !humanToSanta.has(h)) {
                remainingHumans.splice(remainingHumans.indexOf(h), 1);
                break;
              }
          }
          santaToHuman.set(s, h);
          humanToSanta.set(h, s);
        }
    });
};


function generateNewSolution() {
  santaToHuman.clear();
  humanToSanta.clear();
  generateSantaSolution();
  fill();
};

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

//backgroundColor when hovering got messed up after I overrode the main backgroundColor,
//solution was to do it all in javascript instead of css
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

function edit() {
  localStorage.setItem("participants", JSON.stringify(participants));
  window.location.href = "index.html";
};
