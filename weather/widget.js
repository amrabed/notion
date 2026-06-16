/**
 * Initializes and displays a weather widget for a given city.
 * This function creates the weather widget anchor tag and appends it to a specified target element.
 * It also ensures that the weatherwidget.io external script is loaded into the document only once.
 *
 * @param {string} name - The name of the city (e.g., "Orlando"), read from `data-name`.
 * @param {string} code - The location code for the widget (e.g., "28d54n81d38"), read from `data-code`.
 */
function buildWidget(name, code) {
    // Create body element if it doesn't exist yet to prevent 'appendChild' errors
    if (!document.body) {
        document.documentElement.appendChild(document.createElement('body'));
    }

    const href = `https://forecast7.com/en/${code}/${name.toLowerCase().replace(/\s+/g, '-')}/`;
    const label1 = name.toUpperCase();
    const label2 = "WEATHER";
    const theme = "original";

    // Create the container div for the widget
    const containerId = `${name.toLowerCase().replace(/\s+/g, '-')}-weather-widget-container`;
    const containerDiv = document.createElement('div');
    containerDiv.id = containerId;
    document.body.appendChild(containerDiv);

    // Create the anchor tag for the widget
    const widgetAnchor = document.createElement('a');
    widgetAnchor.className = 'weatherwidget-io';
    widgetAnchor.href = href;
    widgetAnchor.setAttribute('data-label_1', label1);
    widgetAnchor.setAttribute('data-label_2', label2);
    widgetAnchor.setAttribute('data-theme', theme);
    widgetAnchor.textContent = `${label1} ${label2}`;

    // Append the widget to its container
    containerDiv.appendChild(widgetAnchor);

    // Inject the weatherwidget.io script if it hasn't been injected yet
    // This script will scan the DOM for elements with class 'weatherwidget-io' and initialize them.
    const scriptId = 'weatherwidget-io-js';
    if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.src = 'https://weatherwidget.io/js/widget.min.js';
        const firstScript = document.getElementsByTagName('script')[0];
        if (firstScript) {
            firstScript.parentNode.insertBefore(script, firstScript);
        } else {
            document.head.appendChild(script); // Fallback if no other scripts are present
        }
    }
}

// Auto-initialize if attributes are present on the script tag
(function () {
    const script = document.currentScript;
    if (script) {
        const name = script.dataset.name;
        const code = script.dataset.code;
        if (name && code) {
            buildWidget(name, code);
        }
    }
})();
