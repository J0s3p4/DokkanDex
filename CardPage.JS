
// How many cards will be displayed on each page
const cardsPerPage = 20;
// Initialize current page
let currentPage = 1;



fetch('https://raw.githubusercontent.com/MNprojects/DokkanAPI/main/data/DokkanCharacterData.json')

  .then(response => {
    if(!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })




  
  .then(data => {

   // console.log(data);
   // console.log(Array.isArray(data));
   // console.log(data.length);

    // Defines card container
    const cardContainer = document.getElementById('card-container');

    //ONLY DISPLAY 50 FOR TESTING PURPOSES
    const cardsToDisplay = data.slice(0, 50);



    
    // Populates HTML cardContainer with Cards
    function createCardElements(card) {

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

      // data is the JSON object containing the cards information
      // iterates over the cards and display them on the page
    }

    
      cardsToDisplay.forEach(card => {
        createCardElements(card);
      });
      

    

    
})






/*
 // data.forEach(card => {

 cardsToDisplay.forEach(card => {
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

  // data is the JSON object containing the cards information
  // iterates over the cards and display them on the page
});

*/