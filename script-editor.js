document.addEventListener('DOMContentLoaded', async function() {
    // Get the file names from the URL query parameters
    const params = new URLSearchParams(window.location.search);
    const htmlFile = params.get('htmlFile');
    const cssFile = params.get('cssFile');

    // Get the HTML and CSS editor textareas
    const htmlEditor = document.getElementById('html-editor');
    const cssEditor = document.getElementById('css-editor');
    const previewFrame = document.getElementById('preview');

    // Function to fetch file content
    async function fetchFileContent(filePath) {
        const response = await fetch(`ui-elements/${filePath}`);
        return response.text();
    }

    // Load HTML content into the editor
    if (htmlFile) {
        const htmlContent = await fetchFileContent(htmlFile);
        htmlEditor.value = htmlContent;
    }

    // Load CSS content into the editor
    if (cssFile) {
        const cssContent = await fetchFileContent(cssFile);
        cssEditor.value = cssContent;
    }

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




    // Function to copy content to clipboard
      // Function to copy content to clipboard using Clipboard API
      window.copyToClipboard = async function(editorId) {
        const editor = document.getElementById(editorId);
        const content = editor.value;

        try {
            await navigator.clipboard.writeText(content);
        
            // Update the toast message based on the editor type (HTML or CSS)
            const toastBody = document.querySelector('#toast .toast-body');
            toastBody.textContent = `${editorId === 'html-editor' ? 'HTML' : 'CSS'} code copied to clipboard!`;
        
            // Trigger the Bootstrap toast
            const toastElement = document.getElementById('toast');
            const toast = new bootstrap.Toast(toastElement);
            toast.show();
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };
});
