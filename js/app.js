'use strict';

const state = [];
let roundsOfVoting = 25;

function Image(name, source) {
  this.name = name;
  this.source = source;
  this.timesClicked = 0;
  this.timesShown = 0;
}

state.push(new Image('bag', 'img/bag.jpg'));
state.push(new Image('banana', 'img/banana.jpg'));
state.push(new Image('bathroom', 'img/bathroom.jpg'));
state.push(new Image('boots', 'img/boots.jpg'));
state.push(new Image('breakfast', 'img/breakfast.jpg'));
state.push(new Image('bubblegum', 'img/bubblegum.jpg'));
state.push(new Image('chair', 'img/chair.jpg'));
state.push(new Image('cthulhu', 'img/cthulhu.jpg'));
state.push(new Image('dog duck', 'img/dog-duck.jpg'));
state.push(new Image('dragon', 'img/dragon.jpg'));
state.push(new Image('pen', 'img/pen.jpg'));
state.push(new Image('pet sweep', 'img/pet-sweep.jpg'));
state.push(new Image('scissors', 'img/scissors.jpg'));
state.push(new Image('shark', 'img/shark.jpg'));
state.push(new Image('sweep', 'img/sweep.png'));
state.push(new Image('tauntaun', 'img/tauntaun.jpg'));
state.push(new Image('unicorn', 'img/unicorn.jpg'));
state.push(new Image('water can', 'img/water-can.jpg'));
state.push(new Image('wine glass', 'img/wine-glass.jpg'));

let imgEls = document.querySelectorAll('img');
let voteTrackerEl = document.getElementById('vote-tracker');

console.log('CURRENTLY RENDERED IMAGES', imgEls);
console.log('CURRENT STATE', state);

// Render images
// imgEls[0].src = state[0].source;
// imgEls[0].id = state[0].name;
// imgEls[1].src = state[1].source;
// imgEls[1].id = state[1].name;
// imgEls[2].src = state[2].source;
// imgEls[2].id = state[2].name;
renderImgs();

function generateRandomImage() {
    let randomIndex = Math.floor(Math.random() * state.length);
    let randomImage = state[randomIndex];

    while (randomImage.name === imgEls[0].id || randomImage.name === imgEls[1].id || randomImage.name === imgEls[2].id) {
        randomIndex = Math.floor(Math.random() * state.length);
        randomImage = state[randomIndex];
    }

    return randomImage;

}



function renderImgs() {
  let img1 = generateRandomImage();
  let img2 = generateRandomImage();
  let img3 = generateRandomImage();
  while (img1.name === img2.name || img1.name === img3.name || img2.name === img3.name) {
        img1 = generateRandomImage();
        img2 = generateRandomImage();
        img3 = generateRandomImage();
    
  }

  imgEls[0].src = img1.source;
  imgEls[0].id = img1.name;
  img1.timesShown += 1;

  imgEls[1].src = img2.source;
  imgEls[1].id = img2.name;
  img2.timesShown += 1;

  imgEls[2].src = img3.source;
  imgEls[2].id = img3.name;
  img3.timesShown += 1;

}

function handleImgClick(event) {
  console.log(event.target);

  let imgThatWasClicked = event.target.id;
  state.forEach(image => {
    if (image.name === imgThatWasClicked) {
      image.timesClicked += 1;
    }
  });
  console.log('UPDATED STATE', state);

  if (roundsOfVoting) {
    renderImgs();
    roundsOfVoting--;
  } else {
    voteTrackerEl.removeEventListener('click', handleImgClick);
  }

};

voteTrackerEl.addEventListener('click', handleImgClick);



function showResults() {
    let resultsEl = document.getElementById('results');
    resultsEl.innerHTML = '';

    for (let i = 0; i < state.length; i++) {
        let liEl = document.createElement('li');
        liEl.textContent = `${state[i].name} had ${state[i].timesClicked} votes, and was seen ${state[i].timesShown} times.`;
        resultsEl.appendChild(liEl);
        
    }
    renderChart();
}

let resultsButton = document.getElementById('show-results');
resultsButton.addEventListener('click', showResults);






// Chart



let canvasElem = document.getElementById('myChart').getContext('2d');


function renderChart(){

  let imgName = [];
  let imgShown = [];
  let imgVotes = [];

  for(let i = 0; i < state.length; i++){
    imgName.push(state[i].name);
    imgShown.push(state[i].timesShown);
    imgVotes.push(state[i].timesClicked);
  }

  let myObj = {
    type: 'bar',
    data: {
      labels: imgName,
      datasets: [{
        label: '# of Views',
        data: imgShown,
        backgroundColor: [
          'blue'
        ],
        borderColor: [
          'blue'
        ],
        borderWidth: 1
        // backgroundColor: 'rgba(34, 166, 179, 3)',
        // borderColor: 'rgba(34, 166, 179, 10)',
      },
      {
        label: '# of Votes',
        data: imgVotes,
        backgroundColor: [
          'red'
        ],
        borderColor: [
          'red'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };

new Chart(canvasElem, myObj);

}
