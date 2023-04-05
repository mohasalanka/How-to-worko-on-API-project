document.addEventListener('DOMContentLoaded', () => {
  const cardWrapper = document.getElementById('card-wrapper');

  document.querySelector('#search-container').addEventListener('submit', (e) => {
    e.preventDefault();
  });

  // Fetch data from API
  fetch('https://animechan.vercel.app/api/quotes')
    .then((res) => res.json())
    .then((data) => {
      data.forEach((quote) => {
        const cardContainer = document.createElement('div');
        cardContainer.className = 'card-container';

        const h4 = document.createElement('h4');
        h4.id = 'animeName';
        h4.textContent = quote.anime;

        const p = document.createElement('p');
        p.id = 'animeQuote';
        p.textContent = quote.quote;

        const blockquote = document.createElement('blockquote');
        blockquote.id = 'animeCharacter';
        blockquote.textContent = quote.character;

        const button = document.createElement('button');
        button.id = 'like-btn';
        button.textContent = 'like';

        const span = document.createElement('span');
        span.id = 'like-count';
        span.textContent = 0;

        cardContainer.append(h4);
        cardContainer.append(p);
        cardContainer.append(blockquote);
        cardContainer.append(button);
        cardContainer.append(span);

        cardWrapper.append(cardContainer);

        let count = 0;
        button.addEventListener('click', () => {
          count++;
          span.textContent = count;
          if (count < 5) {
            span.style.color = 'red';
          } else {
            span.style.color = 'green';
          }
        });
      });

      // Add event listener for search button and filter quotes
      const searchForm = document.querySelector('#search-container');
      searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        filterQuotes();
      });

      function filterQuotes() {
        const searchInput = document.querySelector('#search-input').value.toLowerCase();
        const quotes = document.querySelectorAll('.card-container');
        quotes.forEach((quote) => {
          const quoteText = quote.querySelector('#animeQuote').textContent.toLowerCase();
          if (quoteText.includes(searchInput)) {
            quote.style.display = 'block';
          } else {
            quote.style.display = 'none';
          }
        });
      }
    });
});
