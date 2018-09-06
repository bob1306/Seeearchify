import React, { Component } from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends Component {
  constructor(props) {
    super(props);
/*    const track1 = {
      name: 'name',
      artist: 'artist',
      album: 'album',
      id: 'id'
    }
    const track2 = {
      name: 'name2',
      artist: 'artist2',
      album: 'album2',
      id: 'id2'
    }*/
    this.state = {
      searchResults: [
        //track1,
        //track1,
        //track1
      ],
      playlistName: 'New Playlist',
      playlistTracks: [
        //track2
      ]
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlayerlistName = this.updatePlayerlistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(saveTrack => saveTrack.id === track.id)) {
      return;
    } else {
      const newList = this.state.playlistTracks.slice();
      newList.push(track);
      this.setState({playlistTracks: newList});
    }
  }

  removeTrack(track) {
    const removedTrack = this.state.playlistTracks.filter(saveTrack => saveTrack.id !== track.id);
    this.setState({playlistTracks: removedTrack});
  }

  updatePlayerlistName(name) {
    this.setState({playerlistName: name});
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playerlistName, trackURIs).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      });
    });
  }

  search(term) {
    console.log(term);
    Spotify.search(term).then(searchResult => {this.setState({searchResults: searchResult})});
  }

  componentWillMount(term) {
    const access = localStorage.getItem('accessPrevious');
    if(access) {
      Spotify.search(term);
    }
  }

  render() {
    return (
      <div>
        <h1>See<span className="highlight">ear</span>chify</h1>
        <div className="App" >
          <SearchBar onSearch={this.search}  />
          <div className="App-playlist">
          <SearchResults
            searchResults={this.state.searchResults}
            onAdd={this.addTrack} />
          <Playlist
            playlistName={this.state.playlistName}
            playlistTracks={this.state.playlistTracks}
            onRemove={this.removeTrack}
            onNameChange={this.updatePlayerlistName}
            onSave={this.savePlaylist} />
          </div>
        </div>
      </div>)
  }
}

export default App;
