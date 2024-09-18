// Function to get the category from URL query parameters
function getCategoryFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('category');
}

// Function to load UI elements based on the category
async function loadUIElements(category) {
    try {
        const response = await fetch('ui-elements.json');  // Fetch JSON data
        const uiElements = await response.json();
        
        const designsContainer = document.querySelector('.designs .cards');
        designsContainer.innerHTML = '';  // Clear previous content

        if (uiElements[category]) {
            uiElements[category].forEach(async (element) => {
                // Fetch the HTML content of the design
                const htmlResponse = await fetch(`ui-elements/${category}/${element.htmlFile}`);
                const htmlContent = await htmlResponse.text();
                
                // Fetch the CSS content of the design
                const cssResponse = await fetch(`ui-elements/${category}/${element.cssFile}`);
                const cssContent = await cssResponse.text();

                // Create a div to hold each design
                const designDiv = document.createElement('div');
                const shadow = designDiv.attachShadow({ mode: 'open' });  // Create shadow DOM

                // Create a button to view the code and add it inside shadow DOM
                const viewCodeBtn = document.createElement('button');
                viewCodeBtn.textContent = "View Code";
                viewCodeBtn.classList.add('btn', 'btn-secondary');
                viewCodeBtn.onclick = () => {
                    window.location.href = `editor.html?htmlFile=${category}/${element.htmlFile}&cssFile=${category}/${element.cssFile}`;
                };

                // Inject the HTML, CSS, and button into the shadow DOM
                shadow.innerHTML = `
                    <style>${cssContent}</style>
                    ${htmlContent}
                    <br>
                `;
                // shadow.appendChild(viewCodeBtn);  // Append the button inside the shadow DOM

                // Append the design div to the container
                designsContainer.appendChild(designDiv);
                designsContainer.appendChild(viewCodeBtn);
            });
        } else {
            console.error("Category not found in JSON");
        }
    } catch (error) {
        console.error('Error loading UI elements:', error);
    }
}

// Call the load function after extracting category from the URL
document.addEventListener('DOMContentLoaded', () => {
    const category = getCategoryFromUrl();
    loadUIElements(category);
});






document.addEventListener('DOMContentLoaded', async function () {
    // Get the file names from the URL query parameters
    const params = new URLSearchParams(window.location.search);
    const htmlFile = params.get('htmlFile');
    const cssFile = params.get('cssFile');

    const htmlEditor = document.getElementById('html-editor');
    const cssEditor = document.getElementById('css-editor');
    const previewFrame = document.getElementById('preview');

    // Fetch and load the HTML code into the editor
    const htmlResponse = await fetch(`ui-elements/${category}/${htmlFile}`);
    const htmlContent = await htmlResponse.text();
    htmlEditor.value = htmlContent;

    // Fetch and load the CSS code into the editor
    const cssResponse = await fetch(`ui-elements/${category}/${cssFile}`);
    const cssContent = await cssResponse.text();
    cssEditor.value = cssContent;

    // Function to update the live preview
    function updatePreview() {
        const previewDoc = previewFrame.contentDocument || previewFrame.contentWindow.document;
        previewDoc.open();
        previewDoc.write(`
            <style>${cssEditor.value}</style>
            ${htmlEditor.value}
        `);
        previewDoc.close();
    }

    // Event listeners to update the preview on code changes
    htmlEditor.addEventListener('input', updatePreview);
    cssEditor.addEventListener('input', updatePreview);

    // Initialize the preview on page load
    updatePreview();

    // Function to toggle between HTML and CSS editor
    window.showEditor = function (type) {
        document.getElementById('html-tab').classList.remove('active');
        document.getElementById('css-tab').classList.remove('active');
        document.getElementById('html-editor-container').classList.remove('active');
        document.getElementById('css-editor-container').classList.remove('active');

        if (type === 'html') {
            document.getElementById('html-tab').classList.add('active');
            document.getElementById('html-editor-container').classList.add('active');
        } else {
            document.getElementById('css-tab').classList.add('active');
            document.getElementById('css-editor-container').classList.add('active');
        }
    };
});
