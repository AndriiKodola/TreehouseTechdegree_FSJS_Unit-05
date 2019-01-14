document.addEventListener('DOMContentLoaded', () => {

  const body = document.getElementsByTagName('body')[0];
  const gallery = document.getElementById('gallery');
  const board = new Board(12);//new object of the Board class with 12 contacts in it
  const contacts = board.contactsList;


  /*------------------------------------
  * Building DOM structure -------------
  ------------------------------------*/

  //Building an invisible container for modal card
  const container = document.createElement('div');

  container.classList.add('modal-container');
  container.innerHTML = `
    <div class="modal">
      <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
      <div class="modal-info-container">
      </div>
    </div>
    <div class="modal-btn-container">
        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
        <button type="button" id="modal-next" class="modal-next btn">Next</button>
    </div>
    `;
  container.style.display = 'none';

  gallery.insertAdjacentElement('afterend', container);

  /**
  * Adds card nodes to the DOM only after all fetch requests proceed
  */
  const addNodeDelay = setInterval(() => {
    if (board.isLoaded) {
      for (let i = 0; i < contacts.length; i++) {
        console.log(contacts[i]);
        gallery.appendChild(contacts[i].card);
      }

      clearInterval(addNodeDelay);
    }
  }, 500);


  /*------------------------------------
  * Event listeners --------------------
  ------------------------------------*/

  const modalContainer = document.getElementsByClassName('modal-container')[0];
  const modalInfo = document.getElementsByClassName('modal-info-container')[0];
  let currModalId;//Will hold an id of a current modal card contact

  /**
  * @param {node} {string} - class of a parent we want to find
  * @return {node} - given node or parent with target class
  */
  const parentNodeByClass = (node, targetClass) => {
    return node.className === targetClass ? node : parentNodeByClass(node.parentElement, targetClass);
  }

  // Listens to clicks on any of cards, if clicked -> modal container visible, appropriate content attached
  gallery.addEventListener('click', event => {
    if (event.target !== event.currentTarget) {//if card, not empty space clicked
      const card = parentNodeByClass(event.target, 'card');
      let contact = contacts.find(contact => `contact-${contact.info.id}` === card.id);//finds contact object with same id as clicked card

      currModalId = contact.info.id;

      modalContainer.style.display = 'initial';

      modalInfo.innerHTML = contact.modalInfoHTML;
    }
  });

  // Listens to clicks on close button, if clicked -> modal container invisible
  document.getElementById('modal-close-btn').addEventListener('click', event => {
    modalContainer.style.display = 'none';
  });

  // Listens to clicks on previous button, if clicked -> changes an id of a current modal card contact, appropriate content attached
  document.getElementById('modal-prev').addEventListener('click', event => {
    if (currModalId > 0) {
      currModalId -= 1;
    }
    contact = contacts[currModalId];

    modalInfo.innerHTML = contact.modalInfoHTML;
  });

  // Listens to clicks on previous button, if clicked -> changes an id of a current modal card contact, appropriate content attached
  document.getElementById('modal-next').addEventListener('click', event => {
    if (currModalId < contacts.length - 1) {
      currModalId += 1;
    }
    contact = contacts[currModalId];

    modalInfo.innerHTML = contact.modalInfoHTML;
  });


  /*------------------------------------
  * Search functionality ---------------
  ------------------------------------*/

  const searchContainer = document.getElementsByClassName('search-container')[0];

  searchContainer.innerHTML = `
    <form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
    </form>
  `;

  // Listens to the input in the search input field and leaves only appropriate cards
  document.getElementById('search-input').addEventListener('input', event => {
    const input = document.getElementById('search-input').value.toLowerCase();
    const cards = document.getElementsByClassName('card');

    for (let i = 0; i<cards.length; i++) {
      const currCard = cards[i];
      const currContact = contacts[i];
      const firstName = currContact.info.firstName;
      const lastName = currContact.info.lastName;

      if (firstName.includes(input) || lastName.includes(input)) {
        currCard.style.display = 'flex';
      } else {
        currCard.style.display = 'none';
      }
    }
  });

});//end DOMLoaded

/*
Exceeds:

Structure, style and CSS
Add or change at least one of the following:
color
background color
font
box or text shadows
Document your style changes in your readme file and the project submission notes.
Do not alter the layout or position of the important elements on the page.
*/
