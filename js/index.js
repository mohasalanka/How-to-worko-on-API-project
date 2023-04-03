// Define a function to fetch data from the API
async function fetchData() {
    // Use fetch to make an asynchronous request to the API
    const response = await fetch('https://animechan.vercel.app/api/quotes');
  
    // Use response.json() to extract the JSON data from the response
    const data = await response.json();
  
    // Return the data as a JavaScript object
    return data;
  }
  
  // Define a function to render the data on the page
  function renderData(data) {
    // Get the container element where we will render the data
    const container = document.querySelector('#data-container');
  
    // Clear any existing data from the container
    container.innerHTML = '';
  
    // Loop through the data and create HTML elements for each item
    data.forEach(item => {
      const element = document.createElement('div');
      element.classList.add('data-item');
      element.innerHTML = `
        <h2>${item.anime}</h2>
        <p>${item.character}: ${item.quote}</p>
        <button class="like-button">Like</button>
      `;
  
      // Append the new element to the container
      container.appendChild(element);
    });
  }
  
  // Define event listeners
  document.addEventListener('DOMContentLoaded', async () => {
    // When the page loads, fetch the data and render it on the page
    const data = await fetchData();
    renderData(data);
  });
  
  document.addEventListener('click', event => {
    // When a click event occurs, check if the target element is a "like" button
    if (event.target.classList.contains('like-button')) {
      // If it is, toggle the "liked" class on the parent element
      const parent = event.target.closest('.data-item');
      parent.classList.toggle('liked');
    }
  });
  
  document.addEventListener('submit', event => {
    // When a submit event occurs (e.g. the search form is submitted), prevent the default form behavior
    event.preventDefault();
  
    // Get the value of the search input and convert it to lowercase
    const input = document.querySelector('#search-input');
    const searchTerm = input.value.toLowerCase();
  
    // Loop through each data item and check if it matches the search term
    const items = document.querySelectorAll('.data-item');
    items.forEach(item => {
      const title = item.querySelector('h2').textContent.toLowerCase();
      const description = item.querySelector('p').textContent.toLowerCase();
  
      // If the item contains the search term, remove the "hidden" class (to make it visible)
      if (title.includes(searchTerm) || description.includes(searchTerm)) {
        item.classList.remove('hidden');
      }
      // If it doesn't contain the search term, add the "hidden" class (to hide it)
      else {
        item.classList.add('hidden');
      }
    });
  });
  