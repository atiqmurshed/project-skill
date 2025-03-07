
//Load the data from 

function loadAllData() {
  fetch(' https://openapi.programming-hero.com/api/peddy/categories')
    .then(res => res.json())
    .then(data => displayBtn(data.categories));
}

function loadVideos() {
  fetch('https://openapi.programming-hero.com/api/peddy/pets')
    .then((res) => res.json())
    .then((data) => displayVideos(data.pets))
    .catch((error) => console.log(error));
}



const LoadCategoryVideos = (id) => {
  // console.log(id)
  // alert(id);
  fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      // const activeBtn = document.getElementById(`btn-${id}`);
      // activeBtn.classList.add('active')
      // console.log(activeBtn)
      displayVideos(data.data)
    })
    .catch((error) => console.log(error));
}


const videoDetails = async (videoId) => {
  console.log(videoId);
  const uri = `https://openapi.programming-hero.com/api/peddy/pet/${videoId}`
  const res = await fetch(uri)
  const data = await res.json()
  displayDetails(data.petData);
}

const displayDetails = (video) => {
  console.log(video);
  const detailsContainer = document.getElementById('modal-content');
  detailsContainer.innerHTML = `
  <img class="rounded-md" src=${video.image}/>
  <div class="m-4 w-190px h-135px"> 
  <p class="text-xl font-bold">${video.pet_name}</p>
    <h2>${video.breed}</h2>
    <p>Date:${video.date_of_birth}</p>
    <p>Gender:${video.gender}</p>
    <p>Price:${video.price}</p>
  </div>
  <h1 class="font-bold text-xl">Detail Information</h1>
  <p>${video.pet_details}</p>
  `;
  // way-1
  // document.getElementById("showModalData").click()
  //way-2
  document.getElementById('customModal').showModal();

}


// const adoptpic = () => {

//   setTimeout(() => {
//     document.getElementById('')
//   }, 3000);
// }


const adoptPic = async (vi) => {
  console.log(vi);
  const uri = `https://openapi.programming-hero.com/api/peddy/pet/${vi}`
  const res = await fetch(uri)
  const data = await res.json()
  displayPic(data.petData);
}


const displayPic = (video) => {
  console.log(video);
  const detailsContaine = document.getElementById('content-btn');
  detailsContaine.innerHTML = `
  <img src=${video.image}/>
  `;
  // way-1
  // document.getElementById("showModalData").click()
  //way-2
  document.getElementById("custom").showModal();
}


const likePic = async (vd) => {
  console.log(vd);
  const uri = `https://openapi.programming-hero.com/api/peddy/pet/${vd}`
  const res = await fetch(uri)
  const data = await res.json()
  transferPic(data.petData);
}

const transferPic = (video) => {
  console.log(video);
  const detailsContain = document.getElementById('id');
  const tran = document.createElement('div');
  tran.innerHTML = `
  <img class="w-[120px] h-[120px] mt-0 p-2 rounded-md" src=${video.image}/>
  `;
  //append
  detailsContain.append(tran);
  
}



function displayVideos(videos) {
  const videoContainer = document.getElementById('dideos');
  videoContainer.innerHTML = "";

  if (videos.length == 0) {
    const iii = document.getElementById('id')
    iii.innerHTML = ""
    videoContainer.classList.remove("grid");
    videoContainer.innerHTML = `
    <div class="min-h-[500px] flex flex-col gap-5 items-center justify-center">
    <img class="w-100" src="images/error.webp" />
    <h2 class=" font-bold text-xl">No Information Available</h2>
    </div>
    `;

    return;
  } else {

    videoContainer.classList.add("grid");
  }
  // console.log(videos);

  videos.forEach(video => {
    // console.log(video)
    const card = document.createElement('div');
    // card.classList = "card  w-96 shadow-sm";
    card.innerHTML = `
  <div class="m-4 shadow-md rounded-md  h-400px w-312px">
    <img class="m-4 h-40 w-60 rounded-md"
      src=${video.image}
      alt="" />
  <div class="m-4 w-190px h-135px"> 
    <p class="font-bold">${video.pet_name}</p>
    <h2>${video.breed}</h2>
    <p>Date:${video.date_of_birth}</p>
    <p>Gender:${video.gender}</p>
    <p>Price:${video.price}</p>
  </div>
  <div class="divider"></div>
  <div class="m-4 flex w-270px h-40px gap-8">
   <button onclick="likePic('${video.petId}')"> <img src="images/icons8-like-50.png"/></button>
    <button onclick="adoptPic('${video.petId}')" style="color:blue">adopt</button>
    <button onclick="videoDetails('${video.petId}')" style="color:blue">details</button>
    </div>
  </div>
`;
    videoContainer.append(card);
  });
}



function displayBtn(button) {
  const catogory = document.getElementById('add-btn');
  button.forEach((item) => {
    console.log(item);
    //create button;
    const button = document.createElement('div');
    button.innerHTML = `
    <button id="btn-${item.category}" onclick="LoadCategoryVideos('${item.category}')" class="btn category-btn">
    <img class="w-10" src=${item.category_icon}/>
    ${item.category}
    </button>`
    //add button to category
    catogory.append(button);

  });
}


loadVideos()
loadAllData();