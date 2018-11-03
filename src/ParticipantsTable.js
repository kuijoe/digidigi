import React, { Component } from 'react';

// TODO: pass data to table
class ParticipantsTable extends Component {
    render() {
      return (
        <table className="participants-table">
        <tbody>
        <tr>
            <th>Name</th>
            <th>E-mail address</th>
            <th>Phone number</th>
        </tr>

        {this.props.data.map(function(item, index) {
          return (
            <tr key={item.user_id}>
              <td>{item.full_name}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
            </tr>
          )
        })}
        </tbody>
        </table>
      );
    }
  }
  
  export default ParticipantsTable;