import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import recognizeMic from 'watson-speech/speech-to-text/recognize-microphone';

const App = () => {
  const [text, setText] = useState("");

  const handleClick = () => {
    axios({
      method: 'get',
      url: 'https://my-voice-app.mybluemix.net/api/speech-to-text/token'
      // url: 'http://localhost:3002/api/speech-to-text/token'
    })
      .then(token => {
        const stream = recognizeMic({
          // url: 'wss://gateway-syd.watsonplatform.net/speech-to-text/api', //overwrite URL to match region
          url: 'https://gateway-syd.watsonplatform.net/speech-to-text/api',
          access_token: token.data, // use `access_token` as the parameter name if using an RC service
          Object_Mode: true,
          interim_results: true,
          extractResults: true
        });
        stream.on('data', data => {
          console.log(data);
          setText(data.alternatives[0].transcript)
          console.log(text);
        });
        stream.on('error', err => {
          console.log(err);
          alert(err);
        });
        // document.querySelector('#stop').onclick = stream.stop.bind(stream);
      }).catch(err => {
        console.log(err);
        alert(err);
      });
  }

  return (
    <div className="App">
      <button className="btn" onClick={() => handleClick()}>Speech-to-Text, Click me and say something!</button>
      <div className='txt'>{text}</div>
    </div >
  )
}

export default App;
