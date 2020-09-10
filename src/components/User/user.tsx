import * as React from "react";

interface MacUser {
  token?: string;
  user?: string;
}

export class User extends React.Component<MacUser> {
  render() {
    return (
      <div>
        <h1>USER</h1>
      </div>
    );
  }
}
