let toggle = document.querySelector("#header .toggle-button");
let collapse = document.querySelectorAll("#header .collapse");

toggle.addEventListener('click', function () {
    collapse.forEach(col => col.classList.toggle("collapse-toggle"));
})


const blogSection = document.querySelector(".blogs-section");

var xhr = new XMLHttpRequest();
xhr.open("GET", `http://localhost:8080/buscar`, false);
xhr.setRequestHeader("Content-Type", "application/json");
xhr.addEventListener("load", function () {

    if (xhr.status != 200) {
        console.log("erro na requisição");
        
    }
    const articleResponseList = JSON.parse(xhr.responseText);

    console.log(articleResponseList);
    articleResponseList.forEach(blog => {
        if (blog.title != decodeURI(location.pathname.split("/").pop())) {
            createBlog(blog);
        }
    })

    
   
})

const createBlog = (blog) => {
    blogSection.innerHTML += `
<div class="blog-card">
  <img src="${blog.bannerImage}" class="blog-image" alt="">
  <h1 class="blog-title">${blog.title.substring(0, 100) + '...'}</h1>
  <p class="blog-overview">${blog.article.substring(0, 200) + '...'}</p>
  <a href="/${blog.titleWithKey}" class="btn dark">read</a>
</div>
`;
}
xhr.send();