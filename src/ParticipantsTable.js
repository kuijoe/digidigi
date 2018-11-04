import React, { Component } from 'react';
import './ParticipantsTable.css';
import EditParticipantForm from './EditParticipantForm';

class ParticipantsTable extends Component {
  constructor(props) {
    super(props);

    this.compareBy.bind(this);
    this.sortBy.bind(this);
    this.deleteRow.bind(this);
    this.editRow.bind(this);
    this.passDataBack = this.passDataBack.bind(this);
    this.editRowData = this.editRowData.bind(this);
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

    let arrayIndex = arrayCopy.findIndex(function (rows) {
      return rows.userId === userId;
    });

    // Delete row from array with given index
    arrayCopy.splice(arrayIndex, 1);

    // Pass array data back to parent without the row that was just deleted
    this.props.passSortedDataBack(arrayCopy);
  }

  // TODO: Inline-edit selected row
  editRow(userId) {
    this.props.editableRowData(userId);
  }

  // Pass current table data back
  passDataBack() {
    this.props.tableData(this.props.data);
  }

  // Update single row data
  editRowData(data) {
    let arrayCopy = JSON.parse(JSON.stringify(this.props.data));

    let arrayIndex = arrayCopy.findIndex(function (rows) {
      return rows.userId === data.userId;
    });

    // Update row data
    arrayCopy[arrayIndex] = data;

    this.props.tableData(arrayCopy);
  }

  render() {
    return (
      <table className="participants-table">
        <tbody>
          <tr className="controls">
            <th onClick={() => this.sortBy("fullname")} >Name</th>
            <th onClick={() => this.sortBy("email")}>E-mail address</th>
            <th onClick={() => this.sortBy("phone")}>Phone number</th>
            <th></th>
          </tr>

          {this.props.data.map(function (item, index) {
            if (item.userId === this.props.getEditableRowData) {
              return (
                <EditParticipantForm key={item.userId} data={item} cancelButtonPressed={this.passDataBack} inlineData={this.editRowData} />
              )
            } else {
              return (
                <tr key={item.userId}>
                  <td className="fullname"><label className="mobile">Name</label>{item.fullname}</td>
                  <td className="email"><label className="mobile">E-mail address</label>{item.email}</td>
                  <td className="phone"><label className="mobile">Phone number</label>{item.phone}</td>
                  <td className="options">
                    <label className="mobile">Options</label>
                    <span className="pencil" onClick={() => this.editRow(item.userId)}></span>
                    <span className="trashcan" onClick={() => this.deleteRow(item.userId)}></span>
                  </td>
                </tr>
              )
            }
          }, this)}
        </tbody>
      </table>
    );
  }
}

export default ParticipantsTable;