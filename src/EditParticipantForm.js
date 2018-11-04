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

    // Yo dawg. Place a table inside td so that you can use form
    render() {
        return (
            <tr key={this.props.data.userId} className="inline-editable-table-row">
                <td colSpan="4">
                    <form onSubmit={this.handleSubmit}>
                        <table className="inner-table">
                            <tbody>
                                <tr>
                                    <td className="fullname"><label className="mobile">Name</label>
                                        <input type="text" name="fullname" className="inline-full-name" required minLength="4"
                                            defaultValue={this.props.data.fullname} 
                                            onChange={this.handleInputChange}
                                            ref={this.fullname} />
                                    </td>
                                    <td className="email"><label className="mobile">E-mail address</label>
                                        <input type="email" placeholder="E-mail address" name="email" className="inline-email" required
                                            defaultValue={this.props.data.email} 
                                            onChange={this.handleInputChange}
                                            ref={this.email} />
                                    </td>
                                    <td className="phone"><label className="mobile">Phone number</label>
                                        <input type="tel" placeholder="Phone number" name="phone" className="inline-phone" required pattern="[0-9]{5,10}"
                                            defaultValue={this.props.data.phone} 
                                            onChange={this.handleInputChange}
                                            ref={this.phone} />
                                    </td>
                                    <td className="options">
                                        <label className="mobile">Options</label>
                                        <input type="button" className="cancel" value="Cancel" onClick={this.handleCancelButtonClick} />
                                        <input type="submit" value="Save" />
                                    </td>
                                </tr>
                            </tbody>

                        </table>
                    </form>
                </td>
            </tr >

        );
    }
}

export default EditParticipantForm;