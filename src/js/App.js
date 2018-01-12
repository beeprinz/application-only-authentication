import React, { Component } from 'react';
import axios from 'axios';

// This is your tweet component. It should be pure!
const Tweet = (props) => {
  return (<li>{props.tweet.text} - {props.tweet.coordinates}</li>)
}

// This is your main application
class App extends Component {
  constructor(props) {
    super(props);
    
    // We need to keep track of user input, access token, and tweets
    this.state = {
      search: '',
      access: '',
      tweets: []
    }

    // These lines bind our functions to this class
    this.getTweets = this.getTweets.bind(this);
    this.setSearch = this.setSearch.bind(this);
  }

  // componentDidMount runs on page load when component is viewable
  componentDidMount() {
    axios.get('http://localhost:8080/api/').then(res => {
      this.setState({access: res.data.access_token})
    })
  }

  // This function will grab the response from our server
  getTweets() {
    axios.get(`http://localhost:8080/api/tweets/${this.state.search}`)
    .then(res => this.setState({ tweets: res.data.statuses}))
    .catch(err => console.log(err));
  }

  // This function will update our state with user's input
  setSearch(e) {
    this.setState({search: e.target.value})
  }


  // Our render function shows our content, and gets reloaded every time this.state changes
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Search tweets</h2>
        </div>
        <p className="App-intro">
          <input type="text" onChange={this.setSearch}/>
          <button onClick={this.getTweets}>Get Tweets</button>
        </p>
        <ul>
          { this.state.tweets && 
            this.state.tweets.map((tweet) => {
              return <Tweet tweet={tweet}/>
            })
          }
        </ul>
      </div>
    );
  }
}
export default App;
