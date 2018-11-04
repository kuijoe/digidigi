import React, { Component } from 'react';
import ParticipantsTable from './ParticipantsTable';
import AddParticipantForm from './AddParticipantForm';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    // Bind functions
    this.addParticipant = this.addParticipant.bind(this);
    this.generateRandomRows = this.generateRandomRows.bind(this);
    this.getFormData = this.getFormData.bind(this);
    this.changeState = this.changeState.bind(this);

    let randomRows = this.generateRandomRows(20);

    this.state = {
      randomRows: randomRows
    };
  }

  // Generate dummy email addresses
  generateHalfRandomEmail(firstname, lastname) {
    firstname = firstname.toLowerCase();
    lastname = lastname.toLowerCase();

    let domain = "";
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 7; i++) {
      domain += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    let email = firstname + "." + lastname + "@" + domain + ".com";

    return email;
  }

  // Generate non-unique Finnish mobile phone number
  generate_mobile() {
    const digits = "0123456789";
    const prefixes = ["045", "050", "040"];

    let numberSuffix = "";

    for (var i = 0; i < 7; i++) {
      numberSuffix += digits.charAt(Math.floor(Math.random() * digits.length));
    }

    let randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];

    return randomPrefix + numberSuffix;
  }

  // Generate twenty rows that each have an id, name, email and mobile phone number
  generateRandomRows(amount) {
    let generatedIds = [];

    // Generate an array of numbers between 1-100
    for (let i = 1; i < 101; i++) {
      generatedIds.push(i);
    }

    // Sort id array in a "random" order
    generatedIds.sort(function (a, b) { return 0.5 - Math.random() });

    let randomRows = [];

    for (let i = 0; i < amount; i++) {
      const firstnames = ["Matti", "Teppo", "Seppo", "Antti", "Pekka", "Jussi", "Pentti", "Jorma", "Kalevi", "Valdemar", "Bruno", "Pentti", "Sepeteus", "Aslak", "Niilo"];
      const lastnames = ["Korhonen", "Virtanen", "Mattila", "Ruohonen", "Jormanainen", "Rintala", "Pekkala", "Haapala", "Reijola", "Viinanen", "Ruukkula", "Korhonen", "Liimatainen"];

      let randomizedFirstName = firstnames[Math.floor(Math.random() * firstnames.length)];
      let randomizedLastName = lastnames[Math.floor(Math.random() * lastnames.length)];

      randomRows.push({
        user_id: generatedIds[i],
        full_name: randomizedFirstName + " " + randomizedLastName,
        email: this.generateHalfRandomEmail(randomizedFirstName, randomizedLastName),
        phone: this.generate_mobile()
      });
    }

    return randomRows;
  }

  // Add new participant row to the existing array
  addParticipant(formData) {
    // Capture the state before we try to add new
    let currentRows = [...this.state.randomRows];

    // Find out the largest id & increment that by one
    // https://codeburst.io/javascript-finding-minimum-and-maximum-values-in-an-array-of-objects-329c5c7e22a2
    function getMaxY() {
      return currentRows.reduce((max, p) => p.user_id > max ? p.user_id : max, currentRows[0].user_id);
    }

    let biggestUserId = getMaxY();

    formData.user_id = biggestUserId + 1;
    
    currentRows.push(formData);

    this.setState({ randomRows: currentRows });

    console.log(this.state);
  }

  // Get form data from AddParticipationForm
  getFormData(formData) {
    this.addParticipant(formData);
  }

  // FIXME: Find a better way to do this without a separate function
  changeState(sortedRowData) {
    this.setState({ randomRows: sortedRowData });
  }

  render() {
    return (
      <div id="app-wrapper">
        <AddParticipantForm submittedFormData={this.getFormData} />
        <ParticipantsTable data={this.state.randomRows} passSortedDataBack={this.changeState} />
      </div>
    )
  }
}

export default App;
