'use strict';

// --- STATE ---
// This is where we will store the application's data, like the list of all games
// and the current state of pagination and filters.
let allProducts = [];

// --- DOM ELEMENTS ---
// This is where we will select the elements from the HTML that we need to
// interact with, like containers and buttons.
const resultsContainer = document.querySelector('#resultsContainer');

// --- FUNCTIONS ---
// This is where we will write all our functions: for fetching data,
// rendering games, handling search, pagination, etc.
async function fetchProducts() {
  const url = 'https://v2.api.noroff.dev/rainy-days';

  try {
    const response = await fetch(url);
    if (!response.ok) {
      // Throw an error if the network response is not successful (e.g., 404, 500)
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    const result = await response.json();

    // The data we want is in the 'data' property of the result.
    allProducts = result.data;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    // If an error occurs, update the UI to inform the user.
    resultsContainer.innerHTML =
      '<p class="error-message">Could not load products. Please try refreshing the page.</p>';
  }
}

function renderProducts(productsToRender) {
    resultsContainer.innerHTML = '';

    if (productsToRender.length === 0) {
        resultsContainer.innerHTML =
            '<p>No products found. Try a different search!</p>';
        return;
    }

    // Loop through the array of products
    productsToRender.forEach((product) => {
        // 1. Create the card container
        const card = document.createElement('div');
        card.classList.add('product-card'); // Use the class from our CSS

        // 2. Create the image element
        const image = document.createElement('img');
        image.src = product.image.url;
        image.alt = product.image.alt;

        // 3. Create the heading element
        const title = document.createElement('h3');
        title.textContent = product.title;

        // 4. Create the genre paragraph
        const sizes = document.createElement('p');
        // The `genre` property is an array, so we join it into a comma-separated string
        sizes.textContent = `Sizes: ${product.sizes.join(', ')}`;

        // 5. Append all the inner elements to the card
        card.appendChild(image);
        card.appendChild(title);
        card.appendChild(sizes);

        // 6. Append the finished card to the main results container
        resultsContainer.appendChild(card);
    });
   } 

// --- EVENT LISTENERS ---
// This is where we will add our event listeners, for example, for the
// search input or pagination buttons.

// --- INITIAL LOAD ---
// This is where we will call the initial function to fetch the data
// and render the page for the first time.
async function startApp() {
  // First, wait for the data to be fetched and stored.
  await fetchProducts();

  // Now that `allGames` is populated, we can check if it worked.
  console.log('All products fetched successfully:', allProducts);

  // In the next section, we will call our rendering function from here.
  // For example: renderAllGames();
  renderProducts(allProducts);
}

// Call the main function to start the application
startApp();