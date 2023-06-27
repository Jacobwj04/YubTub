class Api {
    data;
    url;

    constructor(url) {
        this.url = url;
    }

    async getData() {
        await fetch(this.url)
            .then((response) => {
                return response.json();
            }).then((data) => {
                this.data = data.data;
                console.log(this.data)
            })
        return this.data;
    }
}

class App {
    api;
    switcher;

    constructor() {
        this.api = new Api("./data/data.json");
        this.api.getData().then(() => {
            this.switcher = new Switcher(this, this.api.data);
        });
    }

}

class Switcher {
    yubtub;
    cleaner;
    app;
    default = 0;

    constructor(app, data) {
        this.app = app; // Class app
        this.data = data;
        this.yubtub = new Yubtub(this.app, this.data, this.data[0]);
        this.cleaner = new Cleaner();
    }

    switch(id) {
        this.cleaner.clean("body");
        this.yubtub = new Yubtub(this.app, this.data, this.data[id]);
    }

}

class Cleaner {
    clean(whereToClean) {
        document.querySelector(whereToClean).innerHTML = "";
    }
}

class Renderer {
    render(whereTORender, whatToRender) {
        (whereTORender).appendChild(whatToRender);
    }
}

class Yubtub {
    main;
    aside;
    renderer;
    app;

    constructor(app, data, dataOnload) {
        this.app = app;
        this.renderer = new Renderer();
        this.main = new Main(this, dataOnload);
        this.aside = new Aside(this, data);

    }
}

class Main {
    video;
    comments;

    constructor(yubtub, dataOnload) {
        this.yubtub = yubtub;
        this.dataOnload = dataOnload;

        this.header = new Header();
        this.yubtub.renderer.render(document.querySelector("body"), this.header.htmlElement);
        this.yubtub.renderer.render(this.header.htmlElement, this.header.text);

        this.container = document.createElement("div");
        this.container.classList = "yubtub";

        this.yubtub.renderer.render(document.querySelector("body"), this.container);

        this.htmlElement = document.createElement("main");
        this.htmlElement.classList.add("main");

        this.yubtub.renderer.render(document.querySelector("div"), this.htmlElement);

        this.videoSection = document.createElement("section");
        this.videoSection.classList.add("video");

        this.yubtub.renderer.render(this.htmlElement, this.videoSection);

        this.topIcon = document.createElement("i");
        this.topIcon.classList = "fa-solid fa-star video__star video__star--top";

        this.yubtub.renderer.render(this.videoSection, this.topIcon);

        this.infobox = document.createElement("ul");
        this.infobox.classList.add("video__infoBoxs");

        this.yubtub.renderer.render(this.videoSection, this.infobox);

        this.infoboxFirst = document.createElement("li");
        this.infoboxFirst.classList = "video__infoBox video__infoBox--first";

        this.yubtub.renderer.render(this.infobox, this.infoboxFirst);

        this.profile = document.createElement("figure");
        this.profile.classList.add("video__profile");

        this.yubtub.renderer.render(this.infoboxFirst, this.profile);

        this.title = document.createElement("h2");
        this.title.classList.add("video__title");
        this.title.innerText = dataOnload.title;

        this.yubtub.renderer.render(this.infoboxFirst, this.title);

        this.infoboxSecond = document.createElement("li");
        this.infoboxSecond.classList = "video__infoBox video__infoBox--second";

        this.yubtub.renderer.render(this.infobox, this.infoboxSecond);

        this.star = document.createElement("i");
        this.star.classList = "fa-solid fa-star video__star";

        this.yubtub.renderer.render(this.infoboxSecond, this.star);

        this.arrow = document.createElement("i");
        this.arrow.classList = "fa-solid fa-arrow-right video__arrow";

        this.yubtub.renderer.render(this.infoboxSecond, this.arrow);

        this.video = new Video(this.dataOnload);
        this.yubtub.renderer.render(this.videoSection, this.video.htmlElement);

        this.comments = new Comments(this.dataOnload, this);
        this.yubtub.renderer.render(this.htmlElement, this.comments.htmlElement);
    }
}

class Header {
    htmlElement;

    constructor() {
        this.htmlElement = document.createElement("header");
        this.htmlElement.classList = "header";

        this.text = document.createElement("h1");
        this.text.classList = "header__text";
        this.text.innerText = "Jacob";
    }
}

class Video {
    dataOnload;

    constructor(dataOnload) {
        this.dataOnload = dataOnload;

        this.htmlElement = document.createElement("video");
        this.htmlElement.classList = "video__video";
        this.htmlElement.src = "./video/" + dataOnload["video"];
    }
}

class Comments {
    dataOnload;
    comment;
    main;

    constructor(dataOnload, main) {
        this.dataOnload = dataOnload;
        this.main = main;

        this.htmlElement = document.createElement("ul")
        this.htmlElement.classList = "comments";

        this.comment = new Comment(this.dataOnload, this.main, this);
    }
}

class Comment {
    dataOnload;
    main;
    comments

    constructor(dataOnload, main, comments) {
        this.dataOnload = dataOnload;
        this.main = main;
        this.comments = comments;
        this.commentArray = [];
        for (let i = 0; i < this.dataOnload.comment.length; i++) {
            this.commentArray.push(this.dataOnload.comment[i]);
        }
        console.log(this.commentArray);

        this.renderComments(this.commentArray);
        this.renderInput();
    }

    renderComments(data) {
        this.comments.htmlElement.innerHTML = "";
        for (let i = 0; i < data.length; i++) {
            this.htmlElement = document.createElement("li");
            this.htmlElement.classList = "comments__comment";

            this.figure = document.createElement("figure");
            this.figure.classList = "comments__figure";

            this.text = document.createElement("h3");
            this.text.classList = "comments__text";
            this.text.innerText = data[i];

            this.main.yubtub.renderer.render(this.comments.htmlElement, this.htmlElement);
            this.main.yubtub.renderer.render(this.htmlElement, this.figure);
            this.main.yubtub.renderer.render(this.htmlElement, this.text);
        }
    }

    renderInput() {
        this.comment = document.createElement("li");
        this.comment.classList = "comments__commentInput";

        this.textarea = document.createElement("textarea");
        this.textarea.classList = "comments__textarea";
        this.textarea.placeholder = "Jouw Comment";
        this.comment.addEventListener("keyup", (e) => {
            if (e.code === "Enter") {
                this.commentArray.push(this.textarea.value);
                this.renderComments(this.commentArray);
                this.renderInput();
            }
        })

        this.main.yubtub.renderer.render(this.comments.htmlElement, this.comment);
        this.main.yubtub.renderer.render(this.comment, this.textarea);
    }
}

class Aside {
    yubtub;
    nextVideo;
    htmlElement;

    constructor(yubtub, data) {
        this.yubtub = yubtub;
        this.data = data;

        this.htmlElement = document.createElement("aside");
        this.htmlElement.classList.add("featured");

        this.yubtub.renderer.render(document.querySelector("div"), this.htmlElement);
        this.nextVideo = new NextVideo(this, this.data);
    }
}

class NextVideo {
    aside;
    htmlElement;

    constructor(aside, data) {
        this.aside = aside;
        this.data = data;
        this.makeVideos(this.data)
    }

    makeVideos(data) {
        for (let i = 0; i < this.data.length; i++) {
            this.htmlElement = document.createElement("video");
            this.htmlElement.classList.add("featured__video");
            this.htmlElement.src = "./video/" + data[i].video;
            this.htmlElement.id = data[i].id;
            this.htmlElement.onclick = () => {
                this.videoClicked(data[i].id)
            };
            this.aside.yubtub.renderer.render(this.aside.htmlElement, this.htmlElement);
        }
    }

    videoClicked = (id) => {
        this.aside.yubtub.app.switcher.switch(id);
    }

}

const app = new App()
console.log(app); 