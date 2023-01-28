
// How many cards will be displayed on each page
const cardsPerPage = 20;
// Initialize current page
let currentPage = 1;


// Fetch card database
fetch('https://raw.githubusercontent.com/MNprojects/DokkanAPI/main/data/DokkanCharacterData.json')

  // Check if database is responsive 
  .then(response => {
    if(!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })


  .then(data => {

    // Defines card container from HTML file
    const cardContainer = document.getElementById('card-container');

      // Initialize Data
      let currentData = data;

      // Creates selectedCards Array, OWNED CARDS, used in createCardElement()
    let selectedCards = JSON.parse(localStorage.getItem("selectedCards")) || [];


    function displayCards(data, page) {
        // Calculate range of cards to display
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
    displayCards(currentData, currentPage);


    //Reference objects that filter to give them event listeners 
      const typeSelector = document.getElementById('type-filter');
        typeSelector.addEventListener('change', filterCards);
      const searchBar = document.getElementById('search-bar');
        searchBar.addEventListener('input', filterCards);


        function filterCards(){

          //Get filter values 
          const selectedType = typeSelector.value;
          const searchInput = searchBar.value.toLowerCase(); //To lower case, title and name are also converted to lowercase


          //if selected type is all then all types are shown, all of the cards in data
          if(selectedType === 'All'){
            currentData = data;
          }

          //Display cards of selected type
          else{
            currentData = data.filter(card => card.type === selectedType);     
            }

            //Current data gets search conditions
            currentData = currentData.filter(card => {

                return  searchInput === '' || //empty search bar all cards 
                 card.name.toLowerCase().includes(searchInput)|| 
                 card.title.toLowerCase().includes(searchInput) //compares the search input to names and title 

            });
          
              //Initialize current page, results may be more or less than one page 
              currentPage = 1;
              currentPageElement.textContent = currentPage;

              //Display new data on  page
              displayCards(currentData, currentPage);
          }
                            
              
      // prevButton listener
    const prevButton = document.getElementById("prev");
    
    prevButton.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        displayCards(currentData,currentPage);

        currentPageElement.textContent = currentPage; // Current page
      }
    })
      //nextButton listener
    const nextButton = document.getElementById("next");
    nextButton.addEventListener('click', () => {
      if (currentPage < Math.ceil(currentData.length / cardsPerPage)) {
        currentPage++;
        displayCards(currentData,currentPage);

        currentPageElement.textContent = currentPage; // Current Page
      }
    })


    // currentPage text element between buttons - creates filteredData
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

      const aquiredButton = document.createElement("button");
      aquiredButton.textContent = "Aquired";
      aquiredButton.classList.add("aquired-button");
      cardElement.appendChild(aquiredButton);

              //Checks if the card is in the ownedCards array
              if (selectedCards.includes(card.id)) {
                cardElement.classList.add("owned");
              }


                    //Add a click event listener to the card 
              aquiredButton.addEventListener("click", function() {
                // Toggle the owned class on the card element
                cardElement.classList.toggle("owned");

                // Check if the card is in the selectedCards array
                if (selectedCards.includes(card.id)) {
                  // Remove the card from the selectedCards array
                  selectedCards.splice(selectedCards.indexOf(card.id), 1);
                } else {
                  // Add the card to the selectedCards array
                  selectedCards.push(card.id);
                }

                // Save the selectedCards array to local storage
                localStorage.setItem("selectedCards", JSON.stringify(selectedCards));
              });

      // Returns the created card element
      return cardElement;
    }

    
    
})




//Add class to classlist 'owned' to createcardeelement, store in array