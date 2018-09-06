import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    };
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  search() {
    this.props.onSearch(this.state.term);
  }

  handleTermChange(e) {
    e.preventDefault();
    const searchTerm = e.target.value;
    localStorage.setItem('term', searchTerm);

    this.setState({term: searchTerm});
    //console.log(refreshTerm);
  }

  componentWillUnmount() {
    const refreshTerm = localStorage.getItem('term');
    if(refreshTerm) {
      this.setState({term: refreshTerm});
    }
  }

  handleKeyPress(e) {
    if (this.state.term && e.key === 'Enter') {
      this.search(this.state.term);
      //console.log(e.key);
    }
  }

  render() {
    return (
      <div className="SearchBar">
        <input onChange={this.handleTermChange} onKeyPress={this.handleKeyPress} value={this.state.term} placeholder="Enter A Song, Album, or Artist" />
        <a onClick={this.search}>SEARCH</a>
      </div>
    )
  };
}

export default SearchBar;
