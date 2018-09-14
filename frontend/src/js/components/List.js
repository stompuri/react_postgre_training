import React, { Component } from 'react';
import '../../css/list.css';
import ListStore from '../stores/ListStore';

class List extends Component {
  constructor() {
    super();
    this.state = {
      sample_list: ListStore.getAll(),
      loading: ListStore.getLoading(),
    }
  }

  componentDidMount() {
    console.log("componentDidMount");
    ListStore.on("change", () => {
      console.log("List.js - received change event");
      this.setState({
        sample_list: ListStore.getAll(),
        loading: ListStore.getLoading(),
      })
    })
  }

  render() {
    const { sample_list, loading } = this.state;
    console.log(loading);
    const list = sample_list.map((item) =>
      <li key={item.id}>{item.id} {item.name}</li>
    );

    return (
      <div>
        { loading &&
          <div className="loader">
            Loading...
          </div>
        }

        { !loading &&
          <div className="list">
            <ul>
              { list }
            </ul>
          </div>
        }
      </div>
    );
  }
}

export default List;
