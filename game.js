var participants = [];
var human = "Human";
var santa = "Santa";

var santaToHuman = new Map();
var humanToSanta = new Map();

var blue = "#5A96C9";
var red = "#E34424";
var green = "#65C56C";

var isSearchingBySanta = true;
var isSearchingByHuman = false;

/*
 *This funciton inititalizes the dropdown feature (HTML select element)
 *with all the names in the participants list
*/
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

/*
 *When the screen loads,
    *init() is called to set up teh drop down (HTML Select element)
    *generate new solution is called to generate the Santa Solution
    *And the correct name is set under hover
*/
document.addEventListener("DOMContentLoaded", function() {
  init();
  generateNewSolution();
  document.getElementById("reveal-content").innerHTML = santaToHuman.get(participants[0]);
});

/*
 * Randomly generate a santa-human pairs for the participants given.
 * Save the pairs to the santaToHuman map and humanToSanta map.
 *
 * Note: My solution allows for solutions such as
 * Participants = [a, b, c, d]
 * SantaToHuman = {a=b, b=a, c=d, d=c}
 * This solution is comprised of two subgroups where the first person is the Santa of the second and the second is the Santa first.
 * I allow this to happen because it closer to a truly random solution.
 * However, it causes a problem if there are an odd number because the last person cannot have themself.
 * I solve for this with the remainingHumans list,
 * generating a new solution over again if the last humanRemaining is also the last Santa without a human.
*/
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

/*
 * Erase the existing solution by clearing the santaToHuman and humanToSanta maps.
 * Then, generate a new santa solution by calling generateSantaSolution().
*/
function generateNewSolution() {
  santaToHuman.clear();
  humanToSanta.clear();
  generateSantaSolution();
  fill();
};

/*
 *For whatever name is selected by the dropdown,
 *puts the corresponding name beneath the hover panel
*/
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

/*
 *When searchBySanta is selected, this does all of the html and css changes on the screen
 additionally, it calls fill()
*/
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

/*
 *When searchByHuman is selected, this does all of the html and css changes on the screen
 additionally, it calls fill()
*/
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

/*
 *backgroundColor when hovering got messed up after I overrode the main backgroundColor,
 *solution was to do it all in javascript instead of css
*/
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

/*
If user clicks Edit Participants List, this is called, and the user is taken back to the home page
*/
function edit() {
  localStorage.setItem("participants", JSON.stringify(participants));
  window.location.href = "index.html";
};
