
function theme(value) {
    if (value == "standard") {
        document.documentElement.style.setProperty('--main', "rgb(" + "255" + "," + "247" + "," + "218" + ")");
        document.documentElement.style.setProperty('--mainMatch', "rgb(" + "153" + "," + "102" + "," + "51" + ")");
        document.documentElement.style.setProperty('--contrastText', "rgb(" + "0" + "," + "0" + "," + "0" + ")");
        document.documentElement.style.setProperty('--lightText', "rgb(" + "97" + "," + "97" + "," + "97" + ")");
        document.documentElement.style.setProperty('--background', "rgb(" + "255" + "," + "211" + "," + "68" + ")");
        localStorage.setItem("prefTheme", "1");
    } else if (value == "light") {
        document.documentElement.style.setProperty('--main', "rgb(" + "236" + "," + "251" + "," + "255" + ")");
        document.documentElement.style.setProperty('--mainMatch', "rgb(" + "28" + "," + "118" + "," + "141" + ")");
        document.documentElement.style.setProperty('--contrastText', "rgb(" + "0" + "," + "0" + "," + "0" + ")");
        document.documentElement.style.setProperty('--lightText', "rgb(" + "97" + "," + "97" + "," + "97" + ")");
        document.documentElement.style.setProperty('--background', "rgb(" + "139" + "," + "228" + "," + "255" + ")");
        localStorage.setItem("prefTheme", "2");
    } else if (value == "dark") {
        document.documentElement.style.setProperty('--main', "rgb(" + "29" + "," + "37" + "," + "39" + ")");
        document.documentElement.style.setProperty('--mainMatch', "rgb(" + "174" + "," + "188" + "," + "192" + ")");
        document.documentElement.style.setProperty('--contrastText', "rgb(" + "179" + "," + "189" + "," + "196" + ")");
        document.documentElement.style.setProperty('--lightText', "rgb(" + "158" + "," + "158" + "," + "158" + ")");
        document.documentElement.style.setProperty('--background', "rgb(" + "25" + "," + "30" + "," + "32" + ")");
        localStorage.setItem("prefTheme", "3");
    } else if (value == "warm") {
        document.documentElement.style.setProperty('--main', "rgb(" + "247" + "," + "205" + "," + "158" + ")");
        document.documentElement.style.setProperty('--mainMatch', "rgb(" + "158" + "," + "56" + "," + "12" + ")");
        document.documentElement.style.setProperty('--contrastText', "rgb(" + "0" + "," + "0" + "," + "0" + ")");
        document.documentElement.style.setProperty('--lightText', "rgb(" + "97" + "," + "97" + "," + "97" + ")");
        document.documentElement.style.setProperty('--background', "rgb(" + "233" + "," + "111" + "," + "40" + ")");
        localStorage.setItem("prefTheme", "4");
    }

}

function setTheme() {

    if (localStorage.getItem("prefTheme") !== null) {
        var applyTheme = localStorage.getItem("prefTheme");

        switch (applyTheme) {
            case "1": theme("standard"); break;
            case "2": theme("light"); break;
            case "3": theme("dark"); break;
            case "4": theme("warm"); break;
        }

        document.querySelector("#selectTheme").value = getCorrespondingValue(applyTheme);
    }
}

function getCorrespondingValue(check) {
    var result;
    switch (check) {
        case "1": result = "standard"; break;
        case "2": result = "light"; break;
        case "3": result = "dark"; break;
        case "4": result = "warm"; break;
    }
    return result;
}

function getDate() {
    var date = new Date().toISOString().slice(0, 10);
    document.getElementById("dateHolder").textContent = date;
}

function publish() {

    var wordToSend = {
        "word": document.getElementById("getTitle").textContent,
        "type": document.getElementById("getType").textContent,
        "definition": document.getElementById("getDefinition").textContent,
        "exampleSentence": document.getElementById("getExampleSentence").textContent,
        "readMore": ""
    }

    if (isValidUrl(document.getElementById("getReadMore").textContent)) {
        wordToSend.readMore = document.getElementById("getReadMore").textContent;
    }

    console.log(wordToSend);

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "https://david.cloudno.de/ordbok/api/v1/words", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.addEventListener("load", event => {
        const data = JSON.parse(xhr.responseText).data;
        console.log(data);
    });
    xhr.send(JSON.stringify(wordToSend));
}

function isValidUrl(string) {
    try {
        new URL(string);
    } catch (_) {
        return false;
    }

    return true;
}