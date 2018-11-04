import React, { Component } from 'react';
import './ParticipantsTable.css';

class ParticipantsTable extends Component {
  constructor(props) {
    super(props);

    this.compareBy.bind(this);
    this.sortBy.bind(this);
    this.deleteRow.bind(this);
  }

  // TODO: Add descending sort
  compareBy(key) {
    return function (a, b) {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    };
  }

  // Sort array by given key
  sortBy(key) {
    // Clone the current array of objects
    let arrayCopy = JSON.parse(JSON.stringify(this.props.data));

    // Sort cloned array by given key (the table header clicked)
    arrayCopy.sort(this.compareBy(key));

    this.props.passSortedDataBack(arrayCopy);
  }

  // Delete single row from table
  deleteRow(userId) {
    let arrayCopy = JSON.parse(JSON.stringify(this.props.data));

    let arrayIndex = arrayCopy.findIndex(function(rows) {
      return rows.user_id === userId;
    });

    // Delete row from array with given index
    arrayCopy.splice(arrayIndex, 1);

    // Pass array data back to parent without the row that was just deleted
    this.props.passSortedDataBack(arrayCopy);
  }

  render() {
    return (
      <table className="participants-table">
        <tbody>
          <tr className="controls">
            <th onClick={() => this.sortBy("full_name")} >Name</th>
            <th onClick={() => this.sortBy("email")}>E-mail address</th>
            <th onClick={() => this.sortBy("phone")}>Phone number</th>
            <th></th>
          </tr>

          {this.props.data.map(function (item, index) {
            return (
              <tr key={item.user_id}>
                <td className="full_name"><label className="mobile">Name</label>{item.full_name}</td>
                <td className="email"><label className="mobile">E-mail address</label>{item.email}</td>
                <td className="phone"><label className="mobile">Phone number</label>{item.phone}</td>
                <td className="options">
                  <label className="mobile">Options</label>
                  <span className="pencil"></span>
                  <span className="trashcan" onClick={() => this.deleteRow(item.user_id)}></span>
                </td>
              </tr>
            )
          }, this)}
        </tbody>
      </table>
    );
  }
}

export default ParticipantsTable;