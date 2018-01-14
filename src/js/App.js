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
      console.log(res);
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
      <div className='container'>
      
      <div className="App">
      <div className='jumbotron mt-5' >
        <div className="App-header">
          <h1 className='text-center'>Tweets</h1> </div>
        </div>
        <div className="col">
                <div className="card  border-info">
                    <div className="card-header text-white bg-danger text-center">
                        Search History
  </div>
                    <div className="card-body pb-2 ">

                       
                    <p className="App-intro text-center">
          <input type="text" className='mt-3' onChange={this.setSearch}/>
          <button onClick={this.getTweets}>Get Tweets</button>
        </p>
        <table className='table table-striped'>
        <tbody>
          <tr>
          { this.state.tweets && 
            this.state.tweets.map((tweet, i ) => {
              return <Tweet key={i} tweet={tweet}/>
            })
          }
          </tr>
          </tbody>
        </table>
                    </div>
                </div>

            </div>

      </div>
      </div>
    );
  }
}
export default App;