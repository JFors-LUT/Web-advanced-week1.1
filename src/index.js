import "./styles.css";
var dogBreeds = ["hound", "shiba", "setter", "rottweiler", "greyhound"];

if (document.readyState !== "loading") {
  initializeCode();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    initializeCode();
  });
}

function initializeCode() {
  document.getElementById("app").innerHTML = "<h1>Hello!</h1>";
  create_containers();
  create_containers();
  create_containers();
  create_containers();
  create_containers();
  set_container_header(dogBreeds);
}

function fetch_img(dog_breed) {
  return fetch("https://dog.ceo/api/breed/" + dog_breed + "/images")
    .then((response) => response.json())
    .then((data) => {
      let rand = Math.random() * data.message.length;
      rand = Math.floor(rand);
      let img_URL = data.message[rand];
      //console.log(img_URL);
      return img_URL;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function set_container_image(dogBreed, imageUrl) {
  const containers = document.getElementsByClassName("container");

  for (let i = 0; i < containers.length; i++) {
    const container = containers[i];
    const wiki_header = container.querySelector(".wiki-header");

    if (wiki_header.innerHTML === dogBreed) {
      const wiki_img = container.querySelector(".wiki-img");
      //const imageUrl = "https://images.dog.ceo/breeds/shiba/shiba-2.jpg";
      wiki_img.src = imageUrl;
      break;
    }
  }
}

function set_container_header(dogBreeds) {
  //  all containers
  const containers = document.getElementsByClassName("container");

  for (let i = 0; i < containers.length; i++) {
    const container = containers[i];
    const wiki_header = container.querySelector(".wiki-header");

    if (wiki_header.innerHTML.trim() === "") {
      wiki_header.innerHTML = dogBreeds[i];

      fetch_img(dogBreeds[i])
        .then((data) => {
          console.log(data);
          set_container_image(dogBreeds[i], data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }
}

function create_containers() {
  // main container element
  var container = document.createElement("div");
  container.classList.add("container");

  // get document body
  var body = document.body;
  body.appendChild(container);

  var wikiItem = document.createElement("div");
  wikiItem.classList.add("wiki-item");

  var header = document.createElement("h1");
  header.classList.add("wiki-header");

  var wikiContent = document.createElement("div");
  wikiContent.classList.add("wiki-content");

  var paragraph = document.createElement("p");
  paragraph.classList.add("wiki-text");
  //paragraph.textContent = description;

  var imgContainer = document.createElement("div");
  imgContainer.classList.add("img-container");

  var image = document.createElement("img");
  image.classList.add("wiki-img");
  //image.src = imageUrl;

  // append elements in order
  imgContainer.appendChild(image);
  wikiContent.appendChild(paragraph);
  wikiContent.appendChild(imgContainer);
  wikiItem.appendChild(header);
  wikiItem.appendChild(wikiContent);

  // wiki-item to main container
  container.appendChild(wikiItem);
}
