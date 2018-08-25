import React from 'react';

import {Route, Switch, Link} from 'react-router-dom';
import '../styles/App.css';

const SignupModal = ({ match, history }) => {
  /*const image = IMAGES[parseInt(match.params.id, 10)]
  if (!image) {
    return null
  }
  */
  console.log('eiaieeeey..')
  const back = (e) => {
    e.stopPropagation()
    history.goBack()
  }
  return (
    <div onClick={back}   
      style={{     
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        background: 'rgba(0, 0, 0, 0.15)'
      }}
    >
      <div
       style={{      
        position: 'absolute',
        background: '#fff',
        top: 25,
        left: '10%',
        right: '10%',
        padding: 15,
        border: '2px solid #444'
      }}>
        <h1>Signup dialog</h1>
        
      </div>
    </div>
  )
}

export default SignupModal;