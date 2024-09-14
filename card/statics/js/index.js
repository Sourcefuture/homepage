var website1 = 'https://github.com/Sourcefuture';
var website2 = 'https://steamcommunity.com/profiles/76561199500903052/';
var website3 = 'https://space.bilibili.com/670855292';
var website4 = 'https://tool.lcbmasters.com/';
var website5 = 'http://home.lcbmasters.com/';
var website6 = 'http://blog.lcbmasters.com/';

function clear() {
    $('#div_pop1').removeClass('visible');
    $('#div_pop2').removeClass('visible');
    $('#div_pop3').removeClass('visible');
}

function copy(textToCopy) {
    navigator.clipboard.writeText(textToCopy)
}

document.getElementById('showMessageButton1').addEventListener('click', function () {
    clear();
    $('#div_pop1').addClass('visible');
    copy('DreamStarSource');
    setTimeout(function () {
        $('#div_pop1').removeClass('visible');
    }, 1000);
});

document.getElementById('showMessageButton2').addEventListener('click', function () {
    clear();
    $('#div_pop2').addClass('visible');
    copy('hi@lcbmasters.com');
    setTimeout(function () {
        $('#div_pop2').removeClass('visible');
    }, 1000);
});

document.getElementById('showMessageButton3').addEventListener('click', function () {
    clear();
    $('#div_pop3').addClass('visible');
    copy('1298589189');
    setTimeout(function () {
        $('#div_pop3').removeClass('visible');
    }, 1000);
});

document.getElementById('github').addEventListener('click', function () {
    window.open(website1);
});
document.getElementById('steam').addEventListener('click', function () {
    window.open(website2);
});
document.getElementById('bilibili').addEventListener('click', function () {
    window.open(website3);
});
document.getElementById('toolkit').addEventListener('click', function () {
    window.open(website4);
});
document.getElementById('homepage').addEventListener('click', function () {
    window.open(website5);
});
document.getElementById('blog').addEventListener('click', function () {
    window.open(website6);
});