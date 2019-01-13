class Board {
  constructor (numberOfcontacts) {
    this.contactsList = this.createContactList(numberOfcontacts);
    this.isLoaded = false;//inticates if all contacts are properly loaded
  }

  /**
  * @param {number} - desired number of contacts
  * @return {array} - array of object of the Contact class
  */
  createContactList (numberOfcontacts) {
    const contacts = [];

    for (let i = 0; i < numberOfcontacts; i++) {
      fetch('https://randomuser.me/api/')
        .then(this.checkStatus)
        .then(data => data.json())
        .then(json => {
          const contact = new Contact(json, i);
          contacts.push(contact);
          if (i === numberOfcontacts - 1) {
            this.isLoaded = true;
          }
        })
        .catch(error => console.log(error));
    }

    return contacts;
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
