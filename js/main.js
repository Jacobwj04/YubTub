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
        this.yubtub = new Yubtub(this.app, data);
        this.cleaner = new Cleaner();
    }

    switch(link) {
        this.cleaner.clean("body");
        this.yubtub = new Yubtub(this.app, this.data[link]);
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

    constructor(app, data) {
        this.app = app;
        this.renderer = new Renderer();
        this.main = new Main(this, data);
        this.aside = new Aside(this, data);

    }

}

class Main {
    video;

    constructor(yubtub, data) {
        this.yubtub = yubtub;
        this.data = data;

        this.htmlElement = document.createElement("main");
        this.htmlElement.classList.add("main");

        this.yubtub.renderer.render(document.querySelector("body"), this.htmlElement);

        this.video = new Video();
    }
}

class Video {

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
            this.htmlElement.onclick = this.videoClicked;
            this.aside.yubtub.renderer.render(this.aside.htmlElement, this.htmlElement);
        }
    }

    videoClicked = () => {
        this.aside.yubtub.app.switcher.switch(this.data.link);
    }

}

const app = new App()
console.log(app); 