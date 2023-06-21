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
        this.api.getData().then(result => {
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

    constructor(yubtub, dataOnload) {
        this.yubtub = yubtub;
        this.dataOnload = dataOnload;

        this.htmlElement = document.createElement("main");
        this.htmlElement.classList.add("main");

        this.yubtub.renderer.render(document.querySelector("body"), this.htmlElement);

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
        this.title.innerText = "hoi"

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

        this.video = new Video(dataOnload);

        this.yubtub.renderer.render(this.videoSection, this.video.htmlElement);
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

}

class Comment {

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

        this.yubtub.renderer.render(document.querySelector("body"), this.htmlElement);
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