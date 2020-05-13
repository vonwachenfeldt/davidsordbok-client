const xhr = new XMLHttpRequest;

xhr.open("GET", "https://david.cloudno.de/ordbok/api/v1/words", true);
xhr.addEventListener("load", event => {
    const data = JSON.parse(xhr.responseText).data;
    window.data = data;
    data.forEach(word => addWord(word));
});

xhr.send();

const addWord = data => {
    const html =
        `<li class="word">
            <div class="row">
                <span class="title">${data.name}</span>
                <span class="type">${data.type}</span>
            </div>
            <hr>
            <p class="definition">${data.definition}</p>
            <p class="example-sentence">${data.exampleSentence || ""}</p>
            <p class="date">${new Date(data.createdAt).toISOString().slice(0,10)}</p>
            ${data.readMore ? `<a class="read-more" href="${data.readMore.replace(/"/g, '&quot;')}" target="_blank">Läs mer</a>` : ""}
        </li>`

    document.querySelector(".words").innerHTML += html;
}

function dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a, b) {
        /* next line works with strings and numbers,
         * and you may want to customize it to your needs
         */
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

function sort(value) {
    if (value == "name") {
        sortByName(true);
    } else if (value == "name-") {
        sortByName(false);
    } else if (value == "date-") {
        sortByDate(true);
    } else if (value == "date") {
        sortByDate(false);
    }
}

function sortByName(byOrder) {
    if (byOrder) {
        document.querySelector(".words").innerHTML = "";
        const infoName = data.sort(dynamicSort("name"));
        infoName.forEach(word => addWord(word));
    } else {
        document.querySelector(".words").innerHTML = "";
        const infoName = data.sort(dynamicSort("-name"));
        infoName.forEach(word => addWord(word));
    }
}

function sortByDate(byOrder) {
    if (byOrder) {
        document.querySelector(".words").innerHTML = "";
        const infoName = data.sort(dynamicSort("createdAt"));
        infoName.forEach(word => addWord(word));
    } else {
        document.querySelector(".words").innerHTML = "";
        const infoName = data.sort(dynamicSort("-createdAt"));
        infoName.forEach(word => addWord(word));
    }
}