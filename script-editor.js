document.addEventListener('DOMContentLoaded', async function() {
    // Get the file name from the URL query parameters
    const params = new URLSearchParams(window.location.search);
    const singleFile = params.get('file'); // Get the single HTML file
    const theme = params.get('theme');

    // Get the HTML, CSS, and JS editor textareas
    const htmlEditor = document.getElementById('html-editor');
    const cssEditor = document.getElementById('css-editor');
    const jsEditor = document.getElementById('js-editor');
    const previewFrame = document.getElementById('preview');

    // Function to fetch file content
    async function fetchFileContent(filePath) {
        const response = await fetch(filePath);
        return response.text();
    }

    // Load content from the  HTML file
    if (singleFile) {
        const fileContent = await fetchFileContent(singleFile);
        const parser = new DOMParser();
        const doc = parser.parseFromString(fileContent, 'text/html');

        // Extract HTML, CSS, and JS
        const styleElement = doc.querySelector('style'); // Assuming CSS is in a <style> tag
        const scriptElement = doc.querySelector('script'); // Assuming JS is in a <script> tag
        const bodyContent = Array.from(doc.body.childNodes)
        .filter(node => node.nodeType === Node.ELEMENT_NODE && node.tagName !== 'STYLE' && node.tagName !== 'SCRIPT')
        .map(node => node.outerHTML)
        .join('');
        // Populate the editors
        htmlEditor.value = bodyContent;
        cssEditor.value = styleElement ? styleElement.innerHTML : "/* No CSS Available */";
        jsEditor.value = scriptElement ? scriptElement.innerHTML : "// No JavaScript for this design";
    } else {
        htmlEditor.value = "<h1>Hello World</h1>"; // Default HTML if no file is specified
        cssEditor.value = "body { background-color: lightblue; }"; // Default CSS
        jsEditor.value = "// JavaScript code"; // Default JS
    }

    // Function to update the live preview
    function updatePreview() {



        const iframe = document.createElement('iframe'); 
        iframe.style.width = '100%'; 
        iframe.style.height = '100%'; 
        iframe.style.border = 'none';
        previewFrame.innerHTML = ''; 
    
        iframe.onload = () => {
        // Get the iframe's document
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    
        // Write the HTML, CSS, and JS into the iframe
        iframeDoc.open();
        iframeDoc.write(`
            <html>
                <head>
                    <style>
                    ${cssEditor.value}
                    ${theme === 'dark' ? "body { background-color: #131111; color: white; }" : "body { background-color: #f9f9f9; color: black; }"}
                    body{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 95vh;
                    }
                    </style> <!-- Insert CSS -->
                </head>
                <body>
                    ${htmlEditor.value} <!-- Insert HTML -->
                    <script>${jsEditor.value}</script> <!-- Insert JS -->
                </body>
            </html>
        `);
        iframeDoc.close(); 
    };
    
    // Append the iframe to the preview div
    previewFrame.appendChild(iframe);

    }

    // Event listeners to update the preview on code changes
    htmlEditor.addEventListener('input', updatePreview);
    cssEditor.addEventListener('input', updatePreview);
    jsEditor.addEventListener('input', updatePreview);

    // Initialize the preview on page load
    updatePreview();

    // Function to toggle between HTML, CSS, and JS editor
    window.showEditor = function (type) {
        document.getElementById('html-tab').classList.remove('active');
        document.getElementById('css-tab').classList.remove('active');
        document.getElementById('js-tab').classList.remove('active');
        document.getElementById('html-editor-container').classList.remove('active');
        document.getElementById('css-editor-container').classList.remove('active');
        document.getElementById('js-editor-container').classList.remove('active');

        if (type === 'html') {
            document.getElementById('html-tab').classList.add('active');
            document.getElementById('html-editor-container').classList.add('active');
        } else if (type === 'css') {
            document.getElementById('css-tab').classList.add('active');
            document.getElementById('css-editor-container').classList.add('active');
        } else {
            document.getElementById('js-tab').classList.add('active');
            document.getElementById('js-editor-container').classList.add('active');
        }
    };

    // Function to copy content to clipboard
    window.copyToClipboard = async function(editorId) {
        const editor = document.getElementById(editorId);
        const content = editor.value;

        try {
            await navigator.clipboard.writeText(content);
        
            const toastBody = document.querySelector('#toast .toast-body');
            toastBody.textContent = `Code copied to clipboard!`;
        
            const toastElement = document.getElementById('toast');
            const toast = new bootstrap.Toast(toastElement);
            toast.show();
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };
});
