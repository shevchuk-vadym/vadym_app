import * as React from "react";
import {
  setToLocalStorage,
  getFromLocalStorage,
} from "../../utils/storages.ts";
import { DashBoard } from "../DashBoard/DashBoard.tsx";
import { LogIn } from "../LogIn/LogIn.tsx";
import { Route, Link } from "react-router-dom";
import { routes } from "./Routes.tsx";

const TOKEN_STORAGE_KEY = "TOKEN";

interface Board {
  id: string;
  name: string;
  pinned: boolean;
  desc?: string;
}

interface AppState {
  token: string;
  boards: Array<Board>;
}

export class App extends React.Component<any, AppState> {
  public state: AppState = {
    token: "",
    boards: [],
  };
  private async setToken(token: string) {
    this.setState({ token });
    await setToLocalStorage(TOKEN_STORAGE_KEY, token);
  }
  private async getToken() {
    const token = await getFromLocalStorage(TOKEN_STORAGE_KEY);
    return token;
  }
  private getTokenFromUrl() {
    return window.location.hash.split("=")[1];
  }
  private isLoggedIn() {
    return !!this.state.token;
  }
  private renderHeader() {
    return (
      <header>
        {routes.map((route: any, i: number) => (
          <Link key={i} to={route.path}></Link>
        ))}
        ;
      </header>
    );
  }

  private renderContent() {
    return (
      <main>
        <Route path="/" exact component={LogIn} />
        <Route path="/dashBoard" component={DashBoard} />
        <h2>TesTed</h2>
      </main>
    );
  }
  public async componentDidMount() {
    // const savedToken = await this.getToken();
    const newToken = this.getTokenFromUrl();
    this.setToken(newToken);
  }
  public render() {
    return (
      <div>
        {this.renderHeader()}
        {this.renderContent()}
      </div>
    );
  }
}
