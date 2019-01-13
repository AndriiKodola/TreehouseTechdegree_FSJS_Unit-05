document.addEventListener('DOMContentLoaded', () => {

  const body = document.getElementsByTagName('body')[0];
  const gallery = document.getElementById('gallery');
  const board = new Board(12);//new object of the Board class with 12 contacts in it
  const contacts = board.contactsList;

  /**
  * Adds card nodes to the DOM only after all fetch requests proceed
  */
  const addNodeDelay = setInterval(() => {
    if (board.isLoaded) {
      for (let i = 0; i < contacts.length; i++) {
        gallery.appendChild(contacts[i].card);
      }

      clearInterval(addNodeDelay);
    }
  }, 500);

  /**
  * @param {node} {string} - class of a parent we want to find
  * @return {node} - given node or parent with target class
  */
  const parentNodeByClass = (node, targetClass) => {
    return node.className === targetClass ? node : parentNodeByClass(node.parentElement, targetClass);
  }

  gallery.addEventListener('click', event => {
    if (event.target !== event.currentTarget) {//if card, not empty space clicked

      const card = parentNodeByClass(event.target, 'card');
      const contact = contacts.find(contact => contact.info.id === card.id);//finds contact object with same id as clicked card
      const modal = contact.modal;

      gallery.insertAdjacentElement('afterend', modal);

      document.getElementById('modal-close-btn').addEventListener('click', event => {
        body.removeChild(document.getElementsByClassName('modal-container')[0]);
      }, {once: true});
    }
  });

});//end DOMLoaded

/*
Exceeds:
Search
Add a way to filter the directory by name. To do this, you’ll need to adjust your API request to retrieve a user nationality that will only return data in the English alphabet.
Example markup for this feature is included in the HTML comments.
Note: Your search feature should filters results that are already on the page. So don't request new info from the API for your search.

Modal toggle
Add a way to toggle back and forth between employees when the modal window is open.
There should be no errors once the end or beginning of the list is reached.
Example markup for this feature is included in the HTML comments.

Structure, style and CSS
Add or change at least one of the following:
color
background color
font
box or text shadows
Document your style changes in your readme file and the project submission notes.
Do not alter the layout or position of the important elements on the page.
*/
