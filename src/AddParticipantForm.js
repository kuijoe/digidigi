import React, { Component } from 'react';
import './AddParticipantForm.css';

class AddParticipantForm extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        console.log(event.target.value);
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <div className="add-participant-form">
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="Full name" value={this.state.value.full_name} onChange={this.handleChange} />
                    <input type="text" placeholder="E-mail address" value={this.state.value.email} onChange={this.handleChange} />
                    <input type="text" placeholder="Phone number" value={this.state.value.phone} onChange={this.handleChange} />
                    <input type="submit" value="Add new" />
                </form>
            </div>
        );
    }
}
  
export default AddParticipantForm;