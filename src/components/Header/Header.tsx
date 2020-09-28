import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export class Header extends React.Component<any, any, { LogOut }> {
  render() {
    return (
      <header className="header">
        <div className="link">
          {this.props.routes.map((route: any, i: number) =>
            route.isHidden ? null : (
              <Link key={i} to={route.path}>
                {route.title}
              </Link>
            )
          )}
        </div>
        <div className="name">Trello</div>
        <button>Log Out</button>
      </header>
    );
  }
}
