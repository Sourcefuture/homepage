window.addEventListener('load', function() {
    var savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'light') {
        Checkbox.checked = true;
    } else {
        Checkbox.checked = false;
    }
    document.getElementById('theme-stylesheet').setAttribute('href', "./assets/css/" + savedTheme + '-theme.css');
});

var Checkbox = document.getElementById('myonoffswitch')
Checkbox.addEventListener('change', function () {
    var themeStylesheet = document.getElementById('theme-stylesheet');
    var currentTheme = themeStylesheet.getAttribute('href');
    
    if (currentTheme === './assets/css/light-theme.css') {
        themeStylesheet.setAttribute('href', './assets/css/dark-theme.css');
        localStorage.setItem('theme', 'dark');
        Checkbox.checked = false;
    } else {
        themeStylesheet.setAttribute('href', './assets/css/light-theme.css');
        localStorage.setItem('theme', 'light');
        Checkbox.checked = true;
    }
});

