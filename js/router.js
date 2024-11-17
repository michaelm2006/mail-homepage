const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleLocation();
};

const routes = {
    404: "/pages/404.html",
    "/": "/pages/info.html",
    "/contact": "/pages/contact.html",
};

const handleLocation = async () => {
    const path = window.location.pathname;
    const route = routes[path] || routes[404];
    const html = await fetch(route).then((data) => data.text());
    const name = document.title
    document.getElementById("info").innerHTML = html;

    if (window.location.pathname.endsWith("/")) {
        document.getElementById("loc").innerHTML = name + " / " + "info" ;
    }
    else {
        document.getElementById("loc").innerHTML =  name + " / " + path.replace("/", "");
    }
};

window.onpopstate = handleLocation;
window.route = route;

handleLocation();
