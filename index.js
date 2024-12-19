const imageContainerEl = document.querySelector(".image-container");
// let limit = 0;
// if (localStorage.limit) {
//   limit = Number(localStorage.limit);
// } else {
//   const limitPrompt = prompt('Set image limit');
//   localStorage.limit = limitPrompt;
//   limit = limitPrompt;
// }

let limit = localStorage.limit ? Number(localStorage.limit) : 10; // Default to 10
let imagesPerLoad = localStorage.imagesPerLoad ? Number(localStorage.imagesPerLoad) : 2; // Default to 2
let count = 0;
const btnEl = document.querySelector("#showMore");
const applyBtnEl = document.querySelector(".btn.orange.darken-4");

loadOldImages();

// Apply settings when the Apply button is clicked
applyBtnEl.addEventListener("click", () => {
  const blurRateInput = document.getElementById("blurRate").value;
  const blurRate = blurRateInput >= 1 && blurRateInput <= 10 ? blurRateInput : 1; // Short-hand if. Default to 1 if out of range
  localStorage.blurRate = blurRate; // Save blur rate to local storage

  const grayScaleChecked = document.getElementById("grayScale").checked;
  localStorage.grayScale = grayScaleChecked; // Save grayscale setting to local storage

  const limitInput = document.getElementById("imageLimit").value;
  const perLoadInput = document.getElementById("imagesPerLoad").value;

  limit = limitInput > 0 ? Number(limitInput) : 10; // Default to 10 if input is invalid
  imagesPerLoad = perLoadInput > 0 ? Number(perLoadInput) : 2; // Default to 2 if input is invalid

  localStorage.limit = limit; // Save the limit to local storage
  localStorage.imagesPerLoad = imagesPerLoad; // Save the per-load value to local storage
});

// Load more images when the "Show More" button is clicked
btnEl.addEventListener("click", () => {
  if (count < limit) {
    addNewImages(imagesPerLoad);
  } else {
    imageContainerEl.innerHTML = '';
    count = 1;
    localStorage.imageList = '';
    addNewImages(imagesPerLoad);
  }
});


function loadOldImages() {
  if (localStorage.imageList) {
    const imageList = localStorage.imageList.split(',');
    imageList.forEach(function (url) {
      createAndInsertImage(url, false);
    });
  }
}


// function setSize(checked){
//   const width = document.getElementById('imageWidth')
//   const height = document.getElementById('imageHeight')
//   if(checked){
//     width.disabled = false;
//     height.disabled = false;
//   }else{
//     width.disabled = true;
//     width.value = 300;
//     height.disabled = true;
//     height.disabled = 300;
//   }
// }


function addNewImages(imageNum) {
  const blurRate = localStorage.blurRate || 1; // Default to 1 if no blur rate is set
  const grayScale = localStorage.grayScale === 'true' ? '&grayscale' : ''; // Add grayscale parameter if enabled

  for (let index = 0; index < imageNum; index++) {
    if (count >= limit) break; // Ensure we don't exceed the limit
    const randomNumber = Math.floor(Math.random() * 2000);
    createAndInsertImage(`https://picsum.photos/300?random=${randomNumber}&blur=${blurRate}${grayScale}`, true);
  }
}

function saveImages(src) {
  if (localStorage.imageList) {
    localStorage.imageList = localStorage.imageList + ',' + src;
  } else {
    localStorage.imageList = src;
  }
}

function createAndInsertImage(imageUrl, isSaveAllow) {
  const newImgEl = document.createElement("img");
  newImgEl.src = imageUrl;
  imageContainerEl.appendChild(newImgEl);
  if (isSaveAllow) {
    saveImages(newImgEl.src);
  }
  count++;
  localStorage.count = count;
}
