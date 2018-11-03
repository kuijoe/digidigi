import React, { Component } from 'react';
import './ParticipantsTable.css';

class ParticipantsTable extends Component {
    render() {
      return (
        <table className="participants-table">
        <tbody>
        <tr className="controls">
            <th>Name</th>
            <th>E-mail address</th>
            <th>Phone number</th>
            <th></th>
        </tr>

        {this.props.data.map(function(item, index) {
          return (
            <tr key={item.user_id}>
              <td className="full_name"><label className="mobile">Name</label>{item.full_name}</td>
              <td className="email"><label className="mobile">E-mail address</label>{item.email}</td>
              <td className="phone"><label className="mobile">Phone number</label>{item.phone}</td>
              <td className="options"><span className="pencil"></span><span className="trashcan"></span></td>
            </tr>
          )
        })}
        </tbody>
        </table>
      );
    }
  }
  
  export default ParticipantsTable;