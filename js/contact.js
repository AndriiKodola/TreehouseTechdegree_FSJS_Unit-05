class Contact {
  constructor (responseObject, id) {
    this.info = {//object of the Contact class properties taken from response object
      id: id,
      firstName: responseObject.results['0'].name.first,
      lastName: responseObject.results['0'].name.last,
      picture: responseObject.results['0'].picture.large,
      birthdate: new Date(responseObject.results['0'].dob.date),
      email: responseObject.results['0'].email,
      phone: responseObject.results['0'].phone,
      nat: responseObject.results['0'].nat,
      city: responseObject.results['0'].location.city,
      state: responseObject.results['0'].location.state,
      street: responseObject.results['0'].location.street,
      postCode: responseObject.results['0'].location.postcode
    };
    this.card = this.createCardElement();
    this.modalInfoHTML = this.createModalInfoHTML();
  }

  /**
  * @return {node} - Creates an HTML card node using Contact class object's properties
  */
  createCardElement () {
    const card = document.createElement('div');

    card.classList.add('card');
    card.id = `contact-${this.info.id}`;
    card.innerHTML = `
      <div class="card-img-container">
        <img class="card-img" src="${this.info.picture}" alt="profile picture">
      </div>
      <div class="card-info-container">
        <h3 id="name" class="card-name cap">${this.info.firstName} ${this.info.lastName}</h3>
        <p class="card-text">${this.info.email}</p>
        <p class="card-text cap">${this.info.city}, ${this.info.state}</p>
      </div>
    `;

    return card;
  }//end createCardElement()

  /**
  * @param {string}
  * Capitalizes first letter of every word in the passed string
  */
  wordsCapitalize (string) {
    const words = string.split(' ');
    return words.map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .reduce((curr, word) => curr += ` ${word}`);
  }//end wordsCapitalize()

  /**
  * @return {node} - Creates an HTML of modal info container using Contact class object's properties
  */
  createModalInfoHTML () {
    return `
      <img class="modal-img" src="${this.info.picture}" alt="profile picture">
      <h3 id="name" class="modal-name cap">${this.info.firstName} ${this.info.lastName}</h3>
      <p class="modal-text">${this.info.email}</p>
      <p class="modal-text cap">${this.info.city}</p>
      <hr>
      <p class="modal-text">${this.info.phone}</p>
      <p class="modal-text">${this.wordsCapitalize(this.info.street)}, ${this.wordsCapitalize(this.info.state)}, ${this.info.nat} ${this.info.postCode}</p>
      <p class="modal-text">Birthday: ${this.info.birthdate.getDate()}/${this.info.birthdate.getMonth()}/${this.info.birthdate.getFullYear()}</p>
      `;
  }//end createModalInfoHTML()
}
