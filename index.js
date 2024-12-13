const imageContainerEl = document.querySelector(".image-container");
let limit = 0;
if(localStorage.limit){
  limit = Number(localStorage.limit)
}else{
  const limitPrompt = prompt('set image limit');
  localStorage.limit = limitPrompt
  limit = limitPrompt;
}
let count = 0;
const btnEl = document.querySelector("#showMore");
loadOldImages();


btnEl.addEventListener("click", () => {
  if(count < limit){
    addNewImages(2);
  }else{
    imageContainerEl.innerHTML = '';
    count = 1;
    localStorage.imageList = '';
    addNewImages(2);
  }
});

function loadOldImages(){
  if(localStorage.imageList){
    const imageList = localStorage.imageList.split(',');
    imageList.forEach(function(url){
      createAndInsertImage(url,false);
    })
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
  for (let index = 0; index < imageNum; index++) {
    const randomNumber = Math.floor(Math.random() * 2000);
    createAndInsertImage(`https://picsum.photos/300?random=${randomNumber}`,true);
  }
}

function saveImages(src){
  if(localStorage.imageList){
    localStorage.imageList = localStorage.imageList + ',' + src
  }else{
    localStorage.imageList = src;
  }
}

function createAndInsertImage(imageUrl,isSaveAllow){
  const newImgEl = document.createElement("img");
  newImgEl.src = imageUrl;
  imageContainerEl.appendChild(newImgEl);
  if(isSaveAllow){
    saveImages(newImgEl.src)
  }
  count++;
  localStorage.count = count;
}
