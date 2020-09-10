import * as React from "react";
import { setToLocalStorage, getFromLocalStorage } from "../../utils/storages";
import { DashBoard } from "../DashBoard/DashBoard";
import { LogIn } from "../LogIn/LogIn";
import { Header } from "../Header";
import {
  Route,
  Link,
  RouteComponentProps,
  Switch,
  Redirect,
  RouteChildrenProps,
  withRouter,
} from "react-router-dom";
import { routes, AppRoute, ROUTES_URLS } from "./Routes";
import { OAuth } from "../OAuth";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";

const TOKEN_STORAGE_KEY = "TOKEN";
const { REACT_APP_API_KEY } = process.env;
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

class App extends React.Component<any, AppState> {
  public state: AppState = {
    token: "",
    boards: [],
  };

  componentDidMount() {
    console.log(this.props);
    this.getToken();
  }

  private async getToken() {
    if (this.state.token) {
      return;
    }

    const token = getFromLocalStorage(TOKEN_STORAGE_KEY) as any;

    if (!token) {
      return this.navigateToLogin();
    }

    const url = `https://api.trello.com/1/members/me?key=${REACT_APP_API_KEY}&token=${token}`;
    const response = await fetch(url);

    if (response.ok === true && response.status === 200) {
      this.setToken(token);
      return this.navigateToDashboard();
    }

    return this.navigateToLogin();
  }

  private navigateToDashboard() {
    this.props.history.push(ROUTES_URLS.DASHBOARD);
  }

  private navigateToLogin() {
    this.props.history.push(ROUTES_URLS.LOGIN);
  }

  private get isLoggedIn() {
    return !!this.state.token;
  }

  private setToken = async (token: string) => {
    console.log(this, token);
    this.setState({ token });
    await setToLocalStorage(TOKEN_STORAGE_KEY, token);
  };

  private renderHeader() {
    return <Header routes={routes} />;
  }

  private renderRoute = (route: AppRoute, i: number) => {
    if (route.isProtected) {
      return (
        <ProtectedRoute
          exact={route.exact}
          key={i}
          path={route.path}
          render={(props) =>
            route.render({ ...props, token: this.state.token })
          }
          isAuthenticated={this.isLoggedIn}
        />
      );
    } else {
      return (
        <Route
          exact={route.exact}
          key={i}
          path={route.path}
          render={(props) => route.render({ ...props })}
        />
      );
    }
  };

  private renderContent() {
    return (
      <main>
        <Switch>
          {routes.map(this.renderRoute)}
          <Route
            path={ROUTES_URLS.OAUTH}
            render={(props: RouteChildrenProps) => (
              <OAuth {...props} onSetToken={this.setToken} />
            )}
          />
          <Redirect to={ROUTES_URLS.NOT_FOUND} />
        </Switch>
      </main>
    );
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

const AppWithRouter = withRouter(App);

export { AppWithRouter as App };
