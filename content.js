const POLL_SELECTORS = [
    "yt-live-chat-poll-renderer",
    "yt-live-chat-action-panel-renderer",
    "yt-live-chat-poll-choice",
    "yt-live-chat-poll-header-renderer",
    "div#contents.style-scope.yt-live-chat-action-panel-renderer",
    "div#action-panel.style-scope.yt-live-chat-renderer"
];

function tryRemove(el) {
    if (!el) return false;
    try {
        if (el.parentNode) {
            el.parentNode.removeChild(el);
            return true;
        }
    } catch (e) {}
    return false;
}

function deepQuerySelectorAll(selectors, root = document) {
    let results = [];
    try {
        selectors.forEach(selector => {
            const elements = root.querySelectorAll(selector);
            if (elements.length > 0) results.push(...Array.from(elements));
        });
    } catch (e) {}
    if (root.shadowRoot) results = results.concat(deepQuerySelectorAll(selectors, root.shadowRoot));
    if (root.tagName === 'IFRAME' && root.contentDocument) {
        try {
            results = results.concat(deepQuerySelectorAll(selectors, root.contentDocument));
        } catch (e) {}
    }
    for (let i = 0; i < root.children.length; i++) {
        results = results.concat(deepQuerySelectorAll(selectors, root.children[i]));
    }
    return results;
}

function findAndRemovePolls() {
    chrome.storage.sync.get("enabled", data => {
        if (data.enabled === false) return;

        const pollElements = deepQuerySelectorAll(POLL_SELECTORS);
        pollElements.forEach(el => tryRemove(el));

        const allElements = document.querySelectorAll('*');
        allElements.forEach(el => {
            if (
                (el.tagName && el.tagName.toLowerCase().includes('poll')) ||
                (el.id && el.id.toLowerCase().includes('poll')) ||
                (el.className && typeof el.className === 'string' && el.className.toLowerCase().includes('poll'))
            ) {
                tryRemove(el);
            }
        });

        const actionPanels = document.querySelectorAll('yt-live-chat-action-panel-renderer');
        actionPanels.forEach(panel => {
            if (panel.querySelector && panel.querySelector('yt-live-chat-poll-renderer')) {
                tryRemove(panel);
            }
        });
    });
}

const observer = new MutationObserver(mutations => {
    let shouldCheck = false;
    mutations.forEach(mutation => {
        if (mutation.addedNodes.length > 0) shouldCheck = true;
    });
    if (shouldCheck) findAndRemovePolls();
});

observer.observe(document.body, { childList: true, subtree: true });
setInterval(findAndRemovePolls, 1000);
findAndRemovePolls();