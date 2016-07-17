function saveValue() {
    console.log("Getting there");
    // Get a value saved in a form.
    var theValue = document.getElementById('mark').value;
    // Check that there's some code there.
    if (!theValue) {
        printMessage('Error: No value specified');
        return;
    }
    // Save it using the Chrome extension storage API.
    chrome.storage.sync.set({
        'value': theValue
    }, function() {
        // Notify that we saved.
        printMessage('Settings saved');
    });
}

function loadValue() {
    chrome.storage.sync.get('value', function(theValue) {
        printMessage("Result is: " + theValue.value);
        console.log(theValue.value);
    });
}

function printMessage(msg) {
    document.getElementById('results').innerHTML = msg;
}
document.addEventListener('DOMContentLoaded', function() {
    console.log("We're loaded");
    document.getElementById('save-me').addEventListener('click', saveValue);
    document.getElementById('load-me').addEventListener('click', loadValue);
});