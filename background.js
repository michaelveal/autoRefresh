let refreshInterval; // Variable to store the refresh interval
let refreshTimer; // Variable to store the timer ID

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'start') { // If the message is to start auto-refresh
        refreshInterval = message.interval; // Set the refresh interval
        setRefreshTimer(); // Set the timer to refresh the page
    } else if (message.type === 'stop') { // If the message is to stop auto-refresh
        clearInterval(refreshTimer); // Clear the timer
    }
});

function setRefreshTimer() {
    clearInterval(refreshTimer); // Clear any existing timer
    refreshTimer = setInterval(() => { // Set a new timer
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]) {
                chrome.tabs.reload(tabs[0].id); // Reload the active tab
            }
        });
    }, refreshInterval * 60000); // Convert minutes to milliseconds
}
