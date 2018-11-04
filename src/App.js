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
    this.setEditableRowData = this.setEditableRowData.bind(this);
    this.getCurrentParticipantsTableData = this.getCurrentParticipantsTableData.bind(this);

    let randomRows = this.generateRandomRows(20);

    this.state = {
      randomRows: randomRows,
      editRow: null
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
  generateMobile() {
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
        userId: generatedIds[i],
        fullname: randomizedFirstName + " " + randomizedLastName,
        email: this.generateHalfRandomEmail(randomizedFirstName, randomizedLastName),
        phone: this.generateMobile()
      });
    }

    return randomRows;
  }

  // Add new participant row to the existing array
  addParticipant(formData) {
    // Capture the state before we try to add new
    let currentRows = [...this.state.randomRows];

    // Check whether there are existing records, otherwise the userId will be set as 1
    if (currentRows.length) {
      // Find out the largest id & increment that by one
      // https://codeburst.io/javascript-finding-minimum-and-maximum-values-in-an-array-of-objects-329c5c7e22a2
      function getMaxY() {
        return currentRows.reduce((max, p) => p.userId > max ? p.userId : max, currentRows[0].userId);
      }

      let biggestUserId = getMaxY();

      formData.userId = biggestUserId + 1;
    } else {
      formData.userId = 1;
    }

    currentRows.push(formData);

    this.setState({ randomRows: currentRows });
  }

  // Get form data from AddParticipationForm
  getFormData(formData) {
    this.addParticipant(formData);
  }

  // The general state changing function, used many times on different purposes
  changeState(data) {
    this.setState({
      randomRows: data, 
      editRow: null
    });
  }

  setEditableRowData(data) {
    this.setState({ editRow: data });
  }

  // Inline editing has been cancelled, render the table as it was before opening the inline editing
  getCurrentParticipantsTableData(data) {
    this.changeState(data);
  }

  render() {
    return (
      <div id="app-wrapper">
        <AddParticipantForm submittedFormData={this.getFormData} />
        <ParticipantsTable
          data={this.state.randomRows}
          passSortedDataBack={this.changeState}
          editableRowData={this.setEditableRowData}
          getEditableRowData={this.state.editRow}
          tableData={this.getCurrentParticipantsTableData} />
      </div>
    )
  }
}

export default App;
