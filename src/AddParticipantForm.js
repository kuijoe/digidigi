import React, { Component } from 'react';
import './AddParticipantForm.css';

class AddParticipantForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fullname: "",
            email: "",
            phone: ""
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    // Update component's state every time an input changes
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    // Submit button pressed
    handleSubmit(event) {
        event.preventDefault();

        let formData = {
            userId: null,
            fullname: this.state.fullname,
            email: this.state.email,
            phone: this.state.phone
        };

        // Pass form data to parent
        this.props.submittedFormData(formData);

        // Reset form & display (an annoying) success message to user
        this.setState({
            fullname: "",
            email: "",
            phone: ""
        });

        alert("New participant added");
    }

    // Remove the focus from submit
    handleButtonClick(event) {
        this.buttonDOM.blur();
    }

    render() {
        return (
            <div className="add-participant-form">
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="Full name" name="fullname" required minLength="4" value={this.state.fullname} onChange={this.handleInputChange} />
                    <input type="email" placeholder="E-mail address" name="email" required value={this.state.email} onChange={this.handleInputChange} />
                    <input type="tel" placeholder="Phone number" name="phone" required pattern="[0-9]{5,10}" value={this.state.phone} onChange={this.handleInputChange} />
                    <input type="submit" value="Add new" onClick={this.handleButtonClick} ref={(buttonDOM) => { this.buttonDOM = buttonDOM; }} />
                </form>
            </div>
        );
    }
}

export default AddParticipantForm;