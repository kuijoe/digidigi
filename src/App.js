import React, { Component } from 'react';
import ParticipantsTable from './ParticipantsTable';
import AddParticipantForm from './AddParticipantForm';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    let all_ids = [];
    let random_rows = [];

    // Gererate an array of numbers between 1-100
    for (let i = 1; i < 101; i++) {
      all_ids.push(i);
    }

    // Sort id array in a "random" order
    all_ids.sort(function (a, b) { return 0.5 - Math.random() });

    // Generate twenty rows that each have an id, name, email and mobile phone number
    for (let i = 0; i < 20; i++) {
      const firstnames = ["Matti", "Teppo", "Seppo", "Antti", "Pekka", "Jussi", "Pentti", "Jorma", "Kalevi", "Valdemar", "Bruno", "Pentti", "Sepeteus", "Aslak", "Niilo"];
      const lastnames = ["Korhonen", "Virtanen", "Mattila", "Ruohonen", "Jormanainen", "Rintala", "Pekkala", "Haapala", "Reijola", "Viinanen", "Ruukkula", "Korhonen", "Liimatainen"];

      let randomized_first_name = firstnames[Math.floor(Math.random() * firstnames.length)];
      let randomized_last_name = lastnames[Math.floor(Math.random() * lastnames.length)];

      random_rows.push({
        user_id: all_ids[i],
        full_name: randomized_first_name + " " + randomized_last_name,
        email: this.generate_half_random_email(randomized_first_name, randomized_last_name),
        phone: this.generate_mobile()
      });
    }

    this.state = {
      random_rows: random_rows
    };

    // Bind
    this.getFormData = this.getFormData.bind(this);

    this.addParticipant = this.addParticipant.bind(this);
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

  // Get form data from AddParticipationForm
  getFormData(form_data) {
    this.addParticipant(form_data);
  }

  // 
  addParticipant(form_data) {
    console.log(form_data);

    let currentRows = [...this.state.random_rows];
    currentRows.push(form_data);

    this.setState({ random_rows: currentRows });

    console.log(this.state);
  }

  render() {
    return (
      <div id="app-wrapper">
        <AddParticipantForm submittedFormData={this.getFormData} />
        <ParticipantsTable data={this.state.random_rows} />
      </div>
    )
  }
}

export default App;
