let blogId = decodeURI(location.pathname.split("/").pop());

var xhr = new XMLHttpRequest();
xhr.open("GET", `http://localhost:8080/buscar/${blogId}`,true);
xhr.setRequestHeader("Content-Type", "application/json");
xhr.addEventListener("load", function () {

    if(xhr.status != 200){
      console.log("erro na requisição");
     }
     const articleResponse = JSON.parse(xhr.responseText);
    console.log(articleResponse);
    const banner = document.querySelector(".banner");
    const blogTitle = document.querySelector(".title");
    const titleTag = document.querySelector(".title");
    const publish = document.querySelector(".published");

    banner.style.backgroundImage =  `url(${articleResponse.bannerImage})`;
    titleTag.innerHTML += blogTitle.innerHTML = articleResponse.title.split("/").pop();
    publish.innerHTML += new Date();
   
  });

xhr.send();

const setup = (articleResponse) =>{
    const banner = document.querySelector(".banner");
    const blogTitle = document.querySelector(".title");
    const titleTag = document.querySelector(".title");
    const publish = document.querySelector(".published");

    banner.style.backgroundImage =  ` url(${articleResponse.bannerImage})`

};