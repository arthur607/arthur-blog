
const blogTitleField = document.querySelector('.title');
const articleFeild = document.querySelector('.article');

// banner
const bannerImage = document.querySelector('#banner-upload');
const banner = document.querySelector(".banner");
let bannerPath;


const uploadInput = document.querySelector('#image-upload');

bannerImage.addEventListener('change', () => {
    uploadImage(bannerImage, "banner");
})

uploadInput.addEventListener('change', () => {
    uploadImage(uploadInput, "image");
})


const uploadImage = (uploadFile, uploadType) => {
    const [file] = uploadFile.files;
    if (file && file.type.includes("image")) {
        const formdata = new FormData();
        formdata.append('image', file);

        fetch('http://localhost:8080/upload', {
            method: 'post',
            body: formdata
        }).then(res => res.json())
            .then(data => {
                console.log(data);
                if (uploadType == "image") {
                    addImage(data, file.name);
                } else {
                    bannerPath = `${location.origin}/${data.path}`;
                    console.log(bannerPath);
                    banner.style.backgroundImage = `url("${bannerPath}")`;
                }
            })
    } else {
        alert("upload Image only");
    }
}

const addImage = (imagepath, alt) => {
    let curPos = articleFeild.selectionStart;
    let textToInsert = `\r![${alt}](${imagepath.path})\r`;
    articleFeild.value = articleFeild.value.slice(0, curPos) + textToInsert + articleFeild.value.slice(curPos);
}

const publishBtn = document.querySelector('.publish-btn');

publishBtn.addEventListener('click', () => {
    if(articleFeild.value.length && blogTitleField.value.length){
        console.log("clicado");
        // generating id
        let letters = 'abcdefghijklmnopqrstuvwxyz';
        let blogTitle = blogTitleField.value.split(" ").join("-");
        let id = '';
        for (let i = 0; i < 4; i++) {
            id += letters[Math.floor(Math.random() * letters.length)];
        }

        let docName = `${blogTitle}_${id}`;
        let date = new Date();
        let request = {
            title: docName,
            article: articleFeild.value,
            bannerImage: bannerPath
        }
        console.log(request);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        fetch('http://localhost:8080/save-post', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(request)
        }).then(() => {
            console.log(request);
            location.href = `/${docName}`;
        }) .catch((err) => {
            console.error(err);
        })
    }
}
)