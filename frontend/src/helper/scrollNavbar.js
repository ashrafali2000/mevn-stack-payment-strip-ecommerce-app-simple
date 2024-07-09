window.onscroll = function() {scrollNavbar()};

export function scrollNavbar() {
    const content = document.getElementById("content")
    //const header = document.getElementById("header")
    const headerNav = document.getElementById("navbar")
    if (content) {
        if (document.body.scrollTop > (content.offsetHeight) || document.documentElement.scrollTop > (content.offsetHeight)) {
            headerNav.style.background = "rgb(133 136 140)";
            headerNav.style.zIndex = "2";

        } else {
            headerNav.style.background = "unset";
        }
    }
}