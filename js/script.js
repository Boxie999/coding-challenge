const itemsPerPageInput = document.getElementById('items-per-page');
const pageNumberSelect = document.getElementById('page-number');
const dataContainer = document.getElementById('data-container');

let currentPage = 1;
let itemsPerPage = parseInt(itemsPerPageInput.value, 10);

// Function to fetch and display data based on current page and items per page
function fetchData() {
  const apiUrl = `https://jsonplaceholder.typicode.com/photos?_page=${currentPage}&_limit=${itemsPerPage}`;
  axios.get(apiUrl)
    .then(response => {
      const data = response.data;
      dataContainer.innerHTML = '';

      // Display the data on the webpage
data.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.classList.add('item-container');
  
    // Create an anchor element (<a>) to wrap the image
    const anchorElement = document.createElement('a');
    anchorElement.href = item.thumbnailUrl; // Set the href to the thumbnail URL
    anchorElement.target = '_blank'; // Open the link in a new tab
  
    // Create an image element (<img>) and set the source to the thumbnail URL
    const imageElement = document.createElement('img');
    imageElement.src = item.thumbnailUrl;
    imageElement.alt = item.title; // Provide an alt attribute for accessibility
  
    // Append the image element to the anchor element
    anchorElement.appendChild(imageElement);
  
    // Append the anchor element to the item container
    itemElement.appendChild(anchorElement);
  
    // Create a separate element for displaying the item title
    const titleElement = document.createElement('div');
    titleElement.textContent = `TITLE: ${item.title}`;
    itemElement.appendChild(titleElement);
  
    dataContainer.appendChild(itemElement);
  });
      // Update the page number selector based on the total number of pages
      const totalPages = Math.ceil(response.headers['x-total-count'] / itemsPerPage);
      pageNumberSelect.innerHTML = '';
      for (let i = 1; i <= totalPages; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        pageNumberSelect.appendChild(option);
      }
      pageNumberSelect.value = currentPage;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

// Event listener for items per page input change
itemsPerPageInput.addEventListener('change', () => {
  itemsPerPage = parseInt(itemsPerPageInput.value, 10);
  currentPage = 1;
  fetchData();
});

// Event listener for page number select change
pageNumberSelect.addEventListener('change', () => {
  currentPage = parseInt(pageNumberSelect.value, 10);
  fetchData();
});

// Initial fetch data
fetchData();







