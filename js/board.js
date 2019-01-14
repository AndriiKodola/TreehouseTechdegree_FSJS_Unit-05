class Board {
  constructor (numberOfcontacts) {
    this.contactsList = this.createContactList(numberOfcontacts);//this.createContactList(numberOfcontacts);
    this.isLoaded = false;//inticates if all contacts are properly loaded
  }

  /**
  * @param {array} {number} - array to be filled with contact objects, desired number of contacts
  * @return {array} - array of contacts, or itself
  */
  fillContactsList (contactList, neededContacts) {
    const board = this;

    fetch('https://randomuser.me/api/')
      .then(this.checkStatus)
      .then(data => data.json())
      .then(json => {
          if (this.englishABC(json)) {
            const newIndex = contactList.length;//retrieving an index to pass to the contact object
            const contact = new Contact(json, newIndex);
            contactList.push(contact);
            neededContacts--;
          }
          if (neededContacts === 0) {//Check if desired number of contacts reached
            this.isLoaded = true;
            return contactList;
          } else {
            return board.fillContactsList (contactList, neededContacts)
          }
        })
      .catch(error => console.log(error));
  }

  /**
  * @param {number} - desired number of contacts
  * @return {array} - array of object of the Contact class
  */
  createContactList (numberOfcontacts) {
    const contacts = [];

    this.fillContactsList(contacts, numberOfcontacts);

    return contacts;
  }

  /**
  * @param {object} - object of the Contact class
  * @return {boolean} - true if only english alphabet used in contact's name
  */
  englishABC (json) {
    const regex = /^[a-z]+$/;
    const firstName = json.results['0'].name.first;
    const lastName = json.results['0'].name.last;

    return regex.test(firstName) && regex.test(lastName);
  }

  /**
  * Checks if repsonse is ok
  */
  checkStatus (response) {
    if (response.ok) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  }
}
