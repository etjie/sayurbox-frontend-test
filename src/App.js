import React, { Component } from 'react';
import List from './components/List'
import Modal from './components/Modal';
import Filter from './components/Filter';


class App extends Component {
  
  constructor(props) {
    super(props);
    this.fetchList = this.fetchList.bind(this);
    this.updateFilterTitle = this.updateFilterTitle.bind(this);
    this.updateFilterGenre = this.updateFilterGenre.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    
    this.state = {
      items: [],
      filteredItems: [],
      isLoaded: false,
      isOpen: false,
      isFilter: false,
      modalContent: null,
    }
  }
  
  componentDidMount() {
    
    this.fetchList()
    
  }
  
  fetchList() {
    fetch('https://andywiranata-42555.firebaseio.com/test-frontend/items.json')
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json,
          filteredItems: json
        })
      })
  }
  
  toggleModal = param => e => {
    this.setState({
      isOpen: !this.state.isOpen,
      modalContent: param,
    });
  }
  
  toggleFilter = () => {
    this.setState({
      isFilter: !this.state.isFilter
    })
  }
  
  updateFilterTitle(value) {
    let filteredItems = this.state.items.filter(
      (item) => {
        return item.title.toLowerCase().indexOf(value.toLowerCase()) !== -1;
      }
    );
    
    this.setState({
      filteredItems: filteredItems
    })
  }
  
  updateFilterGenre(value) {
    let filteredItems = this.state.items.filter(
      (item) => {
        return item.genre.toLowerCase().indexOf(value.toLowerCase()) !== -1;
      }
    );

    this.setState({
      filteredItems: filteredItems
    })
  }
  
  render() {
    
    let { isLoaded } = this.state;
    
    if (!isLoaded) {
      return <div>Please wait...</div>;
    }
    
    else {
      
      return (
        <div className="App">
          
          <button onClick={this.toggleFilter}>Filter</button>
          
          <table cellPadding="5" cellSpacing="0">
            <thead>
              <tr>
                <td>No</td>
                <td>Title</td>
                <td>View</td>
                <td>Genre</td>
                <td>Descriptions</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              <Filter show={this.state.isFilter}
                updateTitle={this.updateFilterTitle}
                updateGenre={this.updateFilterGenre}
              ></Filter>
              {this.state.filteredItems.map((item, index) => (
                <List item={item}
                      index={index}
                      key={index}
                      onToggleModal={this.toggleModal}
                      refresh={this.fetchList}
                ></List>
              ))}
            </tbody>
          </table>

          <Modal show={this.state.isOpen}
            content={this.state.modalContent}
            onClose={this.toggleModal(null)}>
          </Modal>
          
        </div>
      )
      
    }
  }
  
}

export default App;
