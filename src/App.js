import React, { Component } from 'react';
import './App.css';

import recognizeMic from 'watson-speech/speech-to-text/recognize-microphone';
class App extends Component {
  constructor() {
    super();
    this.state = {}
  }

    onClick() {    
    fetch("https://my-voice-app.mybluemix.net/api/speech-to-text/token")
    .then(response => {
      return response.text();
    }).then(token => {      
    var stream = recognizeMic({
      url: 'wss://gateway-syd.watsonplatform.net/speech-to-text/api', //overwrite URL to match region
      access_token: token, // use `access_token` as the parameter name if using an RC service
      Object_Mode: true,
      interim_results: true,
      extractResults: true
    });
    stream.on('data', data => {
        this.setState({
          text: data.alternatives[0].transcript
        })
    });
    stream.on('error', err => {
        console.log(err);
    });
    document.querySelector('#stop').onclick = stream.stop.bind(stream);
  }).catch(error => {
      console.log(error);
  });
  }

  render() {
    return (
      <div className="App">
          <button className="btn" onClick={this.onClick.bind(this)}>Speech-to-Text, Click me and say something!</button>  
          <div className='txt'>{this.state.text}</div>
      </div>
    );
  }
}

export default App;
