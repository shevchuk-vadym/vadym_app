import React, { Component } from "react";

export class LogIn extends Component {
  render() {
    const {
      REACT_APP_API_KEY,
      REACT_APP_API_NAME,
      REACT_APP_API_URL,
      REACT_APP_API_SCOPE,
    } = process.env;
    const TOKEN_STORAGE_KEY = "TOKEN";
    const requestUrl = `https://trello.com/1/authorize?return_url=${REACT_APP_API_URL}&expiration=1day&name=${REACT_APP_API_NAME}&scope=${REACT_APP_API_SCOPE}&response_type=token&key=${REACT_APP_API_KEY}`;

    return (
      <div>
        {" "}
        <a href={requestUrl}>login with trello account</a>
        <h2>Please Log In</h2>
      </div>
    );
  }
}
