import React, { Component } from 'react';
import './EditParticipantForm.css';

class EditParticipantForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: this.props.data.userId,
            fullname: "",
            email: "",
            phone: ""
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancelButtonClick = this.handleCancelButtonClick.bind(this);

        this.fullname = React.createRef();
        this.email = React.createRef();
        this.phone = React.createRef();
    }

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
            userId: this.state.userId,
            fullname: this.fullname.current.value,
            email: this.email.current.value,
            phone: this.phone.current.value
        };

        // Pass form data to parent (ParticipantsTable)
        this.props.inlineData(formData);
    }

    // Reset table
    handleCancelButtonClick() {
        this.props.cancelButtonPressed(false);
    }

    // Yo dawg. Place a div inside td so that you can use form. Forget the inner table
    render() {
        return (
            <tr key={this.props.data.userId} className="inline-editable-table-row">
                <td colSpan="4" className="a-col-too-wide">
                    <form onSubmit={this.handleSubmit}>
                        <div className="inside-job">
                            <input type="text" name="fullname" className="inline-full-name" required minLength="4"
                                defaultValue={this.props.data.fullname}
                                onChange={this.handleInputChange}
                                ref={this.fullname} />

                            
                            <input type="email" placeholder="E-mail address" name="email" className="inline-email" required
                                defaultValue={this.props.data.email}
                                onChange={this.handleInputChange}
                                ref={this.email} />

                            <input type="tel" placeholder="Phone number" name="phone" className="inline-phone" required pattern="[0-9]{5,10}"
                                defaultValue={this.props.data.phone}
                                onChange={this.handleInputChange}
                                ref={this.phone} />

                            <div className="options">
                                <input type="button" className="cancel" value="Cancel" onClick={this.handleCancelButtonClick} />
                                <input type="submit" value="Save" />
                            </div>

                        </div>

                    </form>
                </td>
            </tr >

        );
    }
}

export default EditParticipantForm;