function saveValue() {
    console.log("Getting there");
    // Get the current bookmarks
    chrome.tabs.query({
        "currentWindow": true
    }, function(tabs) {
        // Save it using the Chrome extension storage API.
        var onlyUrls = getTabUrls(tabs);
        chrome.storage.sync.set({
            'value': onlyUrls
        }, function() {
            // Notify that we saved.
            printMessage('Settings saved');
        });
    });
}

function getTabUrls(arrayOfTabs) {
    return arrayOfTabs.map(function(urlObj) {
        return urlObj.url;
    });
}

function loadValue() {
    chrome.storage.sync.get('value', function(tabs) {
        printMessage("Result is: " + tabs.value[0] + "<br />There are " + tabs.value.length + " links");
        console.log(tabs);
        var urls = tabs.value;
        for (var i = 0; i < urls.length; i++) {
            chrome.tabs.create({
                url: urls[i]
            });
        }
    });
}

function printMessage(msg) {
    document.getElementById('results').innerHTML = msg;
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('save-me').addEventListener('click', saveValue);
    document.getElementById('load-me').addEventListener('click', loadValue);
});