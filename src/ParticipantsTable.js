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

  // FIXME: Should the array sorting be done in parent?
  sortBy(key) {
    let arrayCopy = JSON.parse(JSON.stringify(this.props.data));
    arrayCopy.sort(this.compareBy(key));

    this.props.passSortedDataBack(arrayCopy);
  }

  // TODO Delete single row from table
  deleteRow(e) {
    console.log("So you want to delete me, right?");
    console.log("index: " + e);
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