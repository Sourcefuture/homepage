var bodyBgs = [];
bodyBgs[0] = "images/01.png";
bodyBgs[1] = "images/02.png";
// bodyBgs[2] = "images/03.png";

var randomBgIndex = Math.round(Math.random() * 1);

//输出随机的背景图
document.write('<style>body{background:url(' + bodyBgs[randomBgIndex] + ') no-repeat 50% 0}</style>');