import './App.css';
import { ApolloProvider } from '@apollo/client';
import {client, Chat} from './Chat'
import React from "react";

function App() {

    const [state,
        setState ] = React.useState("")
  return ( 
    <ApolloProvider client={client}>
      <div className = "App">
        <h2>Love Thoughts 💭</h2>
        <Chat data={state} setdata={setState}/>
      </div>
    </ApolloProvider>
  );
}

export default App;
