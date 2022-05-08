import React, {useEffect, useState} from 'react';

import { ApolloClient, InMemoryCache, useMutation, useSubscription, gql} from '@apollo/client';
import {Container, Chip, Grid, TextField, Button} from '@material-ui/core';
import * as AbsintheSocket from "@absinthe/socket";
import { createAbsintheSocketLink } from "@absinthe/socket-apollo-link";
import { Socket as PhoenixSocket } from "phoenix";

const mm = []


const phoenixSocket = new PhoenixSocket("ws://localhost:4000/socket", {
  params: () => {
    if (true) {
      return { token: "token" };
    } else {
      return {};
    }
  }
});

// Wrap the Phoenix socket in an AbsintheSocket.
const absintheSocket = AbsintheSocket.create(phoenixSocket);

// Create an Apollo link from the AbsintheSocket instance.
const link = createAbsintheSocketLink(absintheSocket);

// Apollo also requires you to provide a cache implementation
// for caching query results. The InMemoryCache is suitable
// for most use cases.
const cache = new InMemoryCache();

// Create the client.
export const client = new ApolloClient({
  link,
  cache
});

const GET_MESSAGES = gql`
  subscription {
    getMessages(room_name : "room") {
      user
      text
    }
  }
`;

const POST_MESSAGE = gql`
  mutation($user:String!, $text:String!){
    send_message(user:$user,text:$text ,roomName:"fefe19<3"){
    text
    user}
  }
`;



const Messages = (props) =>{
    const {data} = useSubscription(GET_MESSAGES)

    useEffect(() => {
        console.log("use effect here")
        if(data) {
            console.log("book",data && props.datamessage == "" )
            props.setdatamessage(prevstate => {
                console.log("prev state",prevstate.length)
                if (prevstate.length == 0) {
                    console.log("fo9 1")
                    const newState = [ ...prevstate,{
                        "id": 1,
                        "text": data["getMessages"]["text"],
                        "user": data["getMessages"]["user"]
                    }];
                    console.log("data",props.datamessage)
                    return newState;
                }
                if (prevstate.length == 1) {
                    console.log("fo9 1")
                    const newState = [...prevstate, {
                        "id": 1,
                        "text": data["getMessages"]["text"],
                        "user": data["getMessages"]["user"]
                    }];
                    console.log("data",props.datamessage)
                    return newState;
                }
                if (prevstate.length > 1) {
                    console.log("fo9 1")
                    const newState = [...prevstate, {
                        "id": 1,
                        "text": data["getMessages"]["text"],
                        "user": data["getMessages"]["user"]
                    }];
                    console.log("data",props.datamessage)
                    return newState;
                }
                console.log("data",props.datamessage)

                mm.push({"id": 1, "text": data["getMessages"]["text"], "user": data["getMessages"]["user"]})

                return props.setdatamessage(mm)

            })
        }

    },[data]);
    if(!data){
      return null
    }
    return (
        <div style={{marginBottom:"5rem"}}>
            {data && props.datamessage == ""  ? ([data["getMessages"]].map(({id, user:messageUser, text})=>{
                return(
                    <div key={id} style={{textAlign: props.user===messageUser?"right":"left"}}>
                        <p style={{marginBottom:"0.3rem"}}>{messageUser}</p>
                        <Chip style={{fontSize:"0.9rem"}} color={props.user===messageUser?"primary": "secondary"} label={text}/>
                    </div>
                )
            })) : ([...props.datamessage].map(({id, user:messageUser, text})=>{
                return(
                <div key={id} style={{textAlign: props.user===messageUser?"right":"left"}}>
                <p style={{marginBottom:"0.3rem"}}>{messageUser}</p>
                <Chip style={{fontSize:"0.9rem"}} color={props.user===messageUser?"primary": "secondary"} label={text}/>
                </div>
                )}))}
        </div>
    )


     }



export const Chat = (props) =>{
    const [user, setUser] = useState("Victoria");
    const [text, setText] = useState("");
    const [postMessage] = useMutation(POST_MESSAGE)




    const sendMessage=()=>{
      if(text.length>0 && user.length >0){
        postMessage({
          variables:{
            user: user,
            text: text,
            room_name : "fefe19<3"
            
          }

        })

          setText("");
      }else{
        alert("Missing fields!")
      }
      
    }
    
    return(
        <Container>
          <h3>Welcome to LoveThoughts! Chat With Whom You Love  </h3>
          <Messages datamessage={props.data} setdatamessage={props.setdata} user={user} />
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <TextField onChange={(e)=>{
                setUser(e.target.value)}} value={user} size="small" fullWidth variant="outlined" required label="Required" label="Enter name" />
            </Grid>
            <Grid item xs={8}>
              <TextField onChange={(e)=>{
                setText(e.target.value)}} value={text} size="small" fullWidth variant="outlined" required label="Required" label="Enter message here" />
            </Grid>
            <Grid item xs={1}>
              <Button onClick={sendMessage} fullWidth  variant="contained" style={{backgroundColor:"#60a820", color:"white"}}>Send</Button>
            </Grid>
          </Grid>
        </Container>
    )
}
