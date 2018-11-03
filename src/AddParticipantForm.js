import React, { Component } from 'react';
import './AddParticipantForm.css';

class AddParticipantForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            full_name: "",
            email: "",
            phone: ""
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
      }

    handleSubmit(event) {
        console.log(this.state);
        event.preventDefault();
    }

    render() {
        return (
            <div className="add-participant-form">
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="Full name" name="full_name" required minLength="4" value={this.state.full_name} onChange={this.handleInputChange} />
                    <input type="email" placeholder="E-mail address" name="email" required value={this.state.email} onChange={this.handleInputChange} />
                    <input type="tel" placeholder="Phone number" name="phone" required pattern="[0-9]{5,10}" value={this.state.phone} onChange={this.handleInputChange} />
                    <input type="submit" value="Add new" />
                </form>
            </div>
        );
    }
}
  
export default AddParticipantForm;