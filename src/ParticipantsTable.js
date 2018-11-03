import React, { Component } from 'react';
import './ParticipantsTable.css';

class ParticipantsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data
    };

    this.compareBy.bind(this);
    this.sortBy.bind(this);
  }

  compareBy(key) {
    return function (a, b) {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    };
  }
 
  sortBy(key) {
    let arrayCopy = [...this.state.data];
    arrayCopy.sort(this.compareBy(key));
    this.setState({data: arrayCopy});
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

          {this.state.data.map(function (item, index) {
            return (
              <tr key={item.user_id}>
                <td className="full_name"><label className="mobile">Name</label>{item.full_name}</td>
                <td className="email"><label className="mobile">E-mail address</label>{item.email}</td>
                <td className="phone"><label className="mobile">Phone number</label>{item.phone}</td>
                <td className="options"><label className="mobile">Options</label><span className="pencil"></span><span className="trashcan"></span></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    );
  }
}

export default ParticipantsTable;