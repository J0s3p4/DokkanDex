
// How many cards will be displayed on each page
const cardsPerPage = 20;
// Initialize current page
let currentPage = 1;


// Fetch card database
fetch('https://raw.githubusercontent.com/MNprojects/DokkanAPI/main/data/DokkanCharacterData.json')

  .then(response => {
    if(!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })


  .then(data => {

    // Defines card container
    const cardContainer = document.getElementById('card-container');


    function displayCards(data, page) {
        //Calculate range of cards to display
      const startIndex = (page - 1) * cardsPerPage;
      const cardsToDisplay = data.slice(startIndex, startIndex + cardsPerPage);

          // Clear the container of any existing card elements
      while (cardContainer.firstChild) {
      cardContainer.removeChild(cardContainer.firstChild);
        }

        // Loop through cards to display and add them to container
        cardsToDisplay.forEach(card => {
        // Create card element and add it to the container
        const cardElement = createCardElement(card);
        cardContainer.appendChild(cardElement);
         });
  }

    // displayCards function
    displayCards(data, currentPage);


      // prevButton listener
    const prevButton = document.getElementById("prev");
    prevButton.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        displayCards(data,currentPage);

        currentPageElement.textContent = currentPage; // Current page
      }
    })
      //nextButton listener
    const nextButton = document.getElementById("next");
    nextButton.addEventListener('click', () => {
      if (currentPage < Math.ceil(data.length / cardsPerPage)) {
        currentPage++;
        displayCards(data,currentPage);

        currentPageElement.textContent = currentPage; // Current Page
      }
    })


    // currentPage text element between buttons
    const currentPageElement = document.getElementById('current-page');
    currentPageElement.textContent = currentPage; 



    // Creates a card element, with selected card data
    function createCardElement(card) {

      // Creates a div for each "card"
      const cardElement = document.createElement('div');
      cardElement.classList.add("card");

      // Create an image element and set its src to the cards image URL
      const imageElement = document.createElement('img');
      imageElement.src = card.imageURL;
      imageElement.classList.add("card-image");
      imageElement.alt = `Image of ${card.name} card`;
      cardElement.appendChild(imageElement);

      // Create a text element to display the cards name
      const nameElement = document.createElement('h2');
      nameElement.textContent = card.name;
      nameElement.classList.add("card-name");
      cardElement.appendChild(nameElement);

      // Creates a text element to display the cards title
      const titleElement = document.createElement('p');
      titleElement.textContent = card.title;
      titleElement.classList.add("card-title");
      cardElement.appendChild(titleElement);

      // Appends the card element to the card container
      cardContainer.appendChild(cardElement);

      // Returns the created card element
      return cardElement;
    }
    
})





