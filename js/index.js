const cardWrapper = document.getElementById('card-wrapper');
document.addEventListener('DOMContentLoaded', () => {
  //  Add event listener for search button and filter quotes
  const searchForm = document.querySelector('#search-container');
  searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let searchValue = document.querySelector('#search').value
  filterQuotes(searchValue);
  });
  
  fetchQuotes()
})

const fetchQuotes = () => {
  fetch('https://animechan.vercel.app/api/quotes')
  .then(res => res.json())
  .then(data => {
    renderQuotes(data)
  })
  .catch(error => console.error(error.message))
}

const renderQuotes = (quotes) => {

  quotes.forEach((quote) => {
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

}


function filterQuotes(searchValue) {
  const searchInput = searchValue.toLowerCase();
  const quotes = document.querySelectorAll('.card-container');
  
  quotes.forEach((quote) => {
    const animeName = quote.querySelector('#animeName');
    const animeNameText = animeName.textContent.toLowerCase();
    
    if (animeNameText.includes(searchInput)) {
      quote.style.display = 'block';
      quote.style = 'position: relative; margin-left: 5%;'
      let home = document.getElementById('card-wrapper')
      home.style = 'width: 30%'
    } else {
      quote.style.display = 'none';
    }
  });
}




  