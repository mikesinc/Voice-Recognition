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
          // url: 'wss://gateway-syd.watsonplatform.net/speech-to-text/api', //overwrite URL to match region
          url: 'https://gateway-syd.watsonplatform.net/speech-to-text/api',
          access_token: token.data, // use `access_token` as the parameter name if using an RC service
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
      setText("");
    }
  })

  return (
    <Container fluid className="App">
      <Container fluid className="icons">
        <a href="https://github.com/mikesinc" target='_blank' rel='noopener noreferrer'>
          <img className='shortIcon' src='https://avatars2.githubusercontent.com/u/28840236?s=460&v=4' height="40vw" weight="40vw" alt='git'></img>
        </a>
        <a href="https://www.ibm.com/cloud" target='_blank' rel='noopener noreferrer'>
          <img className='shortIcon' src={`${require('./assets/images/IBM.png')}`} height="40vw" weight="40vw" alt='git'></img>
        </a>
      </Container>
      <Container fluid className="credits">
        <h1>Powered by IBM Watson&#8482;</h1>
        <h1>Website created by Michael Sinclair</h1>
      </Container>
      <Container className="text">{text}</Container>
      <ButtonGroup className="buttons" size="lg" vertical>
        {
          !listening
            ? <Button variant="dark" onClick={() => handleClick()}>Start Listening</Button>
            : <Button variant="dark" id="stop" onClick={() => setIsListening(false)}>Stop listening</Button>
        }
      </ButtonGroup>
      <Container fluid className="clouds"></Container>
    </Container>
  )
}

export default App;
