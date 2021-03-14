let init = ()=> {
    getPageName();
    let a = document.querySelectorAll('a');
    for(let i = 0; i < a.length; i++) {
        // a[i].addEventListener('click', getPageName, false);
        // a[i].addEventListener('click', getHistory, false);
        a[i].addEventListener('click', addTo, false);
    }
    document.querySelector('[name="urlBar"]').addEventListener('focusout', goTo, false);
    document.querySelector('[name="history"]').addEventListener('change', selectFrom, false);
}
let getPageName = ()=> {
    console.log('hiBar');
    var path = window.location.pathname;
    var hash = location.hash;
    console.log(path);
    console.log(hash);
}
let getHistory = ()=> {
    console.log(history.length);
}
const mainTitle = document.querySelector('title').textContent;
let barHistory = [];
let updPageTitle = (value)=> {
    document.querySelector('title').textContent = mainTitle + ' #' + value;
}
let addTo = (e)=> {
    e.preventDefault(); // wyłączenie obsługi adresacji wewnętrznej
    console.log(e.target.href);

    let hash = null;

    if (e.type == 'click') {
        hash = e.target.href.split('#')[1];
    } else {    // popstate
        hash = location.hash.replace('#', '');
    }
    let label = document.querySelector('a[href="#'+ hash +'"]');
        label = (label == null) ? 'Home' : label.textContent; // label.replace('.html', '');
    console.log(label + ' #' + hash);
    let len = barHistory.length;

    updPageTitle(label);

    history.pushState(hash, label, '#'+hash);
    barHistory[len] = {hashKey: hash, value: label};
    (e.type == 'click') ? location.hash = hash : null;
    console.log(barHistory);
}
let inp = document.querySelector('[name="urlBar"]');
let goTo = ()=> {
    if (inp.value.length > 0) {
        location.hash = '#' + inp.value;
    }
}
let selectFrom = () => {
    let select = document.querySelector('[name="history"]');
    inp.value = select.value;
    goTo();
}
window.addEventListener('load', init, false);
// window.addEventListener('popstate', addTo, false);