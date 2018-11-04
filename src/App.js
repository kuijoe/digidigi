import React, { Component } from 'react';
import ParticipantsTable from './ParticipantsTable';
import AddParticipantForm from './AddParticipantForm';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    // Bind
    this.addParticipant = this.addParticipant.bind(this);
    this.generateRandomRows = this.generateRandomRows.bind(this);
    this.getFormData = this.getFormData.bind(this);
    this.doThings = this.doThings.bind(this);


    let randomRows = this.generateRandomRows(20);

    this.state = {
      randomRows: randomRows
    };
  }

// Generate dummy email addresses
generate_half_random_email(firstname, lastname) {
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

  let number_suffix = "";

  for (var i = 0; i < 7; i++) {
    number_suffix += digits.charAt(Math.floor(Math.random() * digits.length));
  }

  let random_prefix = prefixes[Math.floor(Math.random() * prefixes.length)];

  return random_prefix + number_suffix;
}

// Generate twenty rows that each have an id, name, email and mobile phone number
generateRandomRows(amount) {
  let generated_ids = [];

  // Generate an array of numbers between 1-100
  for (let i = 1; i < 101; i++) {
    generated_ids.push(i);
  }

  // Sort id array in a "random" order
  generated_ids.sort(function (a, b) { return 0.5 - Math.random() });

  let randomRows = [];

  for (let i = 0; i < amount; i++) {
    const firstnames = ["Matti", "Teppo", "Seppo", "Antti", "Pekka", "Jussi", "Pentti", "Jorma", "Kalevi", "Valdemar", "Bruno", "Pentti", "Sepeteus", "Aslak", "Niilo"];
    const lastnames = ["Korhonen", "Virtanen", "Mattila", "Ruohonen", "Jormanainen", "Rintala", "Pekkala", "Haapala", "Reijola", "Viinanen", "Ruukkula", "Korhonen", "Liimatainen"];

    let randomizedFirstName = firstnames[Math.floor(Math.random() * firstnames.length)];
    let randomizedLastName = lastnames[Math.floor(Math.random() * lastnames.length)];

    randomRows.push({
      user_id: generated_ids[i],
      full_name: randomizedFirstName + " " + randomizedLastName,
      email: this.generate_half_random_email(randomizedFirstName, randomizedLastName),
      phone: this.generate_mobile()
    });
  }

  return randomRows;
}

// 
addParticipant(form_data) {
  console.log(form_data);

  // TODO: Find out the largest id & increment that

  let currentRows = [...this.state.randomRows];
  currentRows.push(form_data);

  this.setState({ randomRows: currentRows });

  console.log(this.state);
}

// Get form data from AddParticipationForm
getFormData(form_data) {
  this.addParticipant(form_data);
}

doThings(sortedRowData) {
  this.setState({ randomRows: sortedRowData });
}

render() {
  return (
    <div id="app-wrapper">
      <AddParticipantForm submittedFormData={this.getFormData} />
      <ParticipantsTable data={this.state.randomRows} passSortedDataBack={this.doThings} />
    </div>
  )
}
}

export default App;
