document.getElementById('start').addEventListener('click', () => {
    const interval = parseInt(document.getElementById('interval').value); // Get the interval from input
    if (isNaN(interval) || interval < 1) { // Validate the interval
        alert('Please enter a valid number of minutes.'); // Show alert if invalid
        return;
    }
    
    // Save the interval in Chrome's storage
    chrome.storage.local.set({ 'refreshInterval': interval }, () => {
        // Send a message to the background script to start auto-refresh
        chrome.runtime.sendMessage({ type: 'start', interval });
    });
});

document.getElementById('stop').addEventListener('click', () => {
    // Send a message to the background script to stop auto-refresh
    chrome.runtime.sendMessage({ type: 'stop' });
});
