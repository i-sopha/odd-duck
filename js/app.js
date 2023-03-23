'use strict';

let state = [];
let roundsOfVoting = 25;

function Image(name, source, alt) {
  this.name = name;
  this.source = source;
  this.timesClicked = 0;
  this.timesShown = 0;
  this.altTxt = alt;
}

let retrieveState = localStorage.getItem('state');

if (retrieveState) {
  let parsedState = JSON.parse(retrieveState);
  state = parsedState;
} else {
  state.push(new Image('bag', 'img/bag.jpg', `bag`));
  state.push(new Image('banana', 'img/banana.jpg', `banana`));
  state.push(new Image('bathroom', 'img/bathroom.jpg', `bathroom`));
  state.push(new Image('boots', 'img/boots.jpg', `boots`));
  state.push(new Image('breakfast', 'img/breakfast.jpg', `breakfast`));
  state.push(new Image('bubblegum', 'img/bubblegum.jpg', `bubblegum`));
  state.push(new Image('chair', 'img/chair.jpg', `chair`));
  state.push(new Image('cthulhu', 'img/cthulhu.jpg', `cthulhu`));
  state.push(new Image('dog duck', 'img/dog-duck.jpg', `dog duck`));
  state.push(new Image('dragon', 'img/dragon.jpg', `dragon`));
  state.push(new Image('pen', 'img/pen.jpg', `pen`));
  state.push(new Image('pet sweep', 'img/pet-sweep.jpg', `pet sweep`));
  state.push(new Image('scissors', 'img/scissors.jpg', `scissors`));
  state.push(new Image('shark', 'img/shark.jpg', 'shark'));
  state.push(new Image('sweep', 'img/sweep.png', 'sweep'));
  state.push(new Image('tauntaun', 'img/tauntaun.jpg', 'tauntaun'));
  state.push(new Image('unicorn', 'img/unicorn.jpg', 'unicorn'));
  state.push(new Image('water can', 'img/water-can.jpg', 'water can'));
  state.push(new Image('wine glass', 'img/wine-glass.jpg', 'wine glass'));
}


// const products = [
//   new Image('bag', 'img/bag.jpg'),
//   new Image('banana', 'img/banana.jpg'),
//   new Image('bathroom', 'img/bathroom.jpg'),
//   new Image('boots', 'img/boots.jpg'),
//   new Image('breakfast', 'img/breakfast.jpg'),
//   new Image('bubblegum', 'img/bubblegum.jpg'),
//   new Image('chair', 'img/chair.jpg'),
//   new Image('cthulhu', 'img/cthulhu.jpg'),
//   new Image('dog duck', 'img/dog-duck.jpg'),
//   new Image('dragon', 'img/dragon.jpg'),
//   new Image('pen', 'img/pen.jpg'),
//   new Image('pet sweep', 'img/pet-sweep.jpg'),
//   new Image('scissors', 'img/scissors.jpg'),
//   new Image('shark', 'img/shark.jpg'),
//   new Image('sweep', 'img/sweep.png'),
//   new Image('tauntaun', 'img/tauntaun.jpg'),
//   new Image('unicorn', 'img/unicorn.jpg'),
//   new Image('water can', 'img/water-can.jpg'),
//   new Image('wine glass', 'img/wine-glass.jpg')
// ];

// const productsJson = localStorage.getItem('products');
// const parsedProducts = JSON.parse(productsJson);

// const productsFromStorage = parsedProducts.map(products => {
//   return new Image(products.id, products.name, products.price);
// });

// console.log(localStorage);





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

  let stringifiedState = JSON.stringify(state);
  localStorage.setItem('state', stringifiedState);

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
