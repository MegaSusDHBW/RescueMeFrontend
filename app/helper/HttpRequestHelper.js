import React, {useState} from 'react';
import { StyleSheet,TextInput,View, SafeAreaView,Button,Text} from 'react-native';


export async function Post (url, content){
    console.log(JSON.stringify(content));
    const requestOptions = 
    {
    
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(content)
    };
    console.log("POST")
    try{
            console.log(requestOptions.body);
            await fetch(
               url,
                requestOptions,
              ).then(response => {
              if(response.ok){
                return response.json()
              }
              else{
                return console.error("error");
              }
              });
    } catch (error) {
              console.error(error);
            }
};

export async function GET (uri){
  const requestOptions = 
    {
    
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        
    };
    console.log("GET")
    try{
            console.log(requestOptions.body);
            await fetch(
               url,
                requestOptions,
              ).then(response => {
               return response.json()
              });
    } catch (error) {
              console.error(error);
            }
}

export async function Put (url, content){
  console.log(JSON.stringify(content));
  const requestOptions = 
  {
  
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(content)
  };
  console.log("PUT")
  try{
          console.log(requestOptions.body);
          await fetch(
             url,
              requestOptions,
            ).then(console.log(response)).then(response => { 
             return response.json()
            });
  } catch (error) {
            console.error(error);
          }
};