let blogId = decodeURI(location.pathname.split("/").pop());

var xhr = new XMLHttpRequest();
xhr.open("GET", `http://localhost:8080/buscar/${blogId}`, true);
xhr.setRequestHeader("Content-Type", "application/json");
xhr.addEventListener("load", function () {

  if (xhr.status != 200) {
    console.log("erro na requisição com id");
  }
  const articleResponse = JSON.parse(xhr.responseText);
  const banner = document.querySelector(".banner");
  const blogTitle = document.querySelector(".title");
  const titleTag = document.querySelector(".title");
  const publish = document.querySelector(".published");

  banner.style.backgroundImage = `url(${articleResponse.bannerImage})`;
  titleTag.innerHTML += blogTitle.innerHTML = articleResponse.title;
  publish.innerHTML += articleResponse.createAt;

  const article = document.querySelector('.article');
  let lines = articleResponse.article.split("\n").filter(item => item.length);
  lines.forEach(item => {
    if (item[0] == '#') {
      let hCount = 0;
      let i = 0;
      while (item[i] == '#') {
        hCount++;
        i++;
      }
      let tag = `h${hCount}`;
      article.innerHTML += `<${tag}>${item.slice(hCount, item.length)}</${tag}>`
    }
    //checking for image format
    else if (item[0] == "!" && item[1] == "[") {
      let seperator;

      for (let i = 0; i <= item.length; i++) {
        if (item[i] == "]" && item[i + 1] == "(" && item[item.length - 1] == ")") {
          seperator = i;
        }
      }

      let alt = item.slice(2, seperator);
      let src = item.slice(seperator + 2, item.length - 1);
      article.innerHTML += `
      <img src="${src}" alt="${alt}" class="article-image">
      `;
    }

    else {
      article.innerHTML += `<p>${item}</p>`;
    }
  });

});

xhr.send();

const setup = (articleResponse) => {
  const banner = document.querySelector(".banner");
  const blogTitle = document.querySelector(".title");
  const titleTag = document.querySelector(".title");
  const publish = document.querySelector(".published");

  banner.style.backgroundImage = ` url(${articleResponse.bannerImage})`

};