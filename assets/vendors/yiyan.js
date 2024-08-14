var xhr = new XMLHttpRequest();
xhr.open("GET", "https://v1.jinrishici.com/all.json", true);
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        var data = JSON.parse(xhr.responseText);
        document.getElementById("content").textContent = data.content;
        document.getElementById("information").textContent = '《' + data.origin + '》 —— ' + data.author;
    } else {
        document.getElementById("content").textContent = "不积跬步，无以至千里。不积小流，无以成江海。";
        document.getElementById("information").textContent = "《劝学篇》 —— 荀子";
    }
};
xhr.send();