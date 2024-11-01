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
        
        const designsContainer = document.getElementById('designs-container');
        designsContainer.innerHTML = '';  

        const categoryHeading = document.getElementById('category-heading');
        categoryHeading.textContent = category;  

        if (uiElements[category]) {
            uiElements[category].forEach(async (element, index) => {

                const cardDiv = document.createElement('div');
                cardDiv.classList.add('design-wrapper'); 

                const iframe = document.createElement('iframe');
                iframe.style.width = '150%';
                iframe.style.border = 'none';
                iframe.style.borderRadius = '16px';


                // Set the iframe's source to the design file path
                iframe.src = `ui-elements/${category}/${element.file}`;


                if (element.theme === 'dark') {
                    iframe.onload = function() {

                    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                    const body = iframeDoc.body;
                    body.style.backgroundColor = "#131111"; 
                    body.style.display = "flex";
                    body.style.flexDirection = "row"
                    body.style.justifyContent = "center";
                    body.style.alignContent = "center";
                    body.style.margin = '50';
                    iframe.style.width = iframeDoc.body.scrollWidth + "px";
                    iframe.style.height = iframeDoc.body.scrollHeight + "px";

                };

                    cardDiv.classList.add('cards-dark');

                } else{
                    iframe.onload = function() {

                        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                        const body = iframeDoc.body;
                        body.style.backgroundColor = "#f9f9f9";
                        body.style.display = "flex";
                        body.style.flexDirection = "row"
                        body.style.justifyContent = "center";
                        body.style.alignContent = "center";
                        body.style.margin = '50';
                        iframe.style.width = iframeDoc.body.scrollWidth + "px";
                        iframe.style.height = iframeDoc.body.scrollHeight + "px";

                    };
                    cardDiv.classList.add('cards-light');

                }
                // Append the iframe to the designs container
                cardDiv.appendChild(iframe);
                
                
                const bottomCard = document.createElement('div');
                bottomCard.classList.add('bottomCard','d-flex','flex-row','justify-content-between');
                const viewCodeBtn = document.createElement('button');
                viewCodeBtn.textContent = "</> Code";
                viewCodeBtn.classList.add('view-btn');
                viewCodeBtn.onclick = () => {
                    window.location.href = `editor.html?file=ui-elements/${category}/${element.file}&theme=${element.theme}`;
                };

                const userName = document.createElement('span');
                userName.textContent = "Designed by " + element.username;
                userName.classList.add('fw-bold','name');

                bottomCard.appendChild(userName);
                bottomCard.appendChild(viewCodeBtn);
                designsContainer.appendChild(bottomCard);
                cardDiv.appendChild(bottomCard);

                designsContainer.appendChild(cardDiv);

            });
        } else {

            const errorDiv = document.createElement('h2');
            errorDiv.textContent = "Design is not available right now";
            designsContainer.appendChild(errorDiv);
        }
    } catch (error) {
        console.error('Error loading UI elements:', error);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const category = getCategoryFromUrl();
    loadUIElements(category);
});


