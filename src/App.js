import React, { useState, useEffect } from 'react';
import axios from 'axios';
import recognizeMic from 'watson-speech/speech-to-text/recognize-microphone';
import Container from 'react-bootstrap/Container';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import './App.css';

const App = () => {
  const [text, setText] = useState("");
  const [listening, setIsListening] = useState(false);

  const handleClick = () => {
    setIsListening(true);
    axios({
      method: 'get',
      url: 'https://dry-bastion-82378.herokuapp.com/api/speech-to-text/token'
    })
      .then(token => {
        const stream = recognizeMic({
          url: 'https://gateway-syd.watsonplatform.net/speech-to-text/api',
          access_token: token.data,
          Object_Mode: true,
          interim_results: true,
          extractResults: true
        });
        stream.on('data', data => {
          setText(data.alternatives[0].transcript)
        });
        stream.on('error', err => {
          console.log(err);
          alert(err);
        });
        document.querySelector('#stop').onclick = stream.stop.bind(stream);
      }).catch(err => {
        console.log(err);
        alert(err);
      });
  }

  useEffect(() => {
    if (!listening) {
      setText(" ");
    }
  })

  return (
    <Container fluid className="App">
      <div className="clouds"></div>
      <Container fluid className="github">
      <h1>Website by mikesinc</h1>
        <a href="https://github.com/mikesinc" target='_blank' rel='noopener noreferrer' >
          <img src='https://avatars2.githubusercontent.com/u/28840236?s=460&v=4' height="40vw" weight="40vw" alt='git'></img>
        </a>
      </Container>
      <Container fluid className="credits">
        <h1>Powered by IBM Watson&#8482;</h1>
        <a href="https://www.ibm.com/cloud" target='_blank' rel='noopener noreferrer'>
          <img src={`${require('./assets/images/IBM.png')}`} height="40vw" weight="40vw" alt='git'></img>
        </a>
      </Container>
      <Container className="text">{text}</Container>
      <ButtonGroup size="lg" vertical>
        {
          !listening
            ? <Button variant="dark" onClick={() => handleClick()}>Start Listening</Button>
            : <Button variant="dark" id="stop" onClick={() => setIsListening(false)}>Stop listening</Button>
        }
      </ButtonGroup>
    </Container>
  )
}

export default App;
