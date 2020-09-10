import * as React from "react";
import { RouteChildrenProps } from "react-router-dom";
import { BoardIcon } from "./BoartdIcon";
import "./DashBoard.css";
const { REACT_APP_API_KEY } = process.env;
interface DashBoardProps extends RouteChildrenProps {
  hello?: string;
  token?: string;
}

interface State {
  boards: Array<any> | undefined;
}
export class DashBoard extends React.Component<DashBoardProps, State> {
  state = {
    boards: [],
  };

  async componentDidMount() {
    const url = `https://api.trello.com/1/members/me/boards?key=${REACT_APP_API_KEY}&token=${this.props.token}`;
    const response = await fetch(url);

    if (response.ok === true && response.status === 200) {
      console.log(response);
      const data = await response.json();
      console.log(data);
      this.setState({ boards: data });
    }
  }
  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    console.log(this.state.boards);
    if (this.state.boards.length === 0) {
      return <h2>Loading...</h2>;
    }
    return (
      <div>
        <div>
          <h2 onClick={this.goBack}>Hello from DashBoard</h2>
        </div>
        <div>
          <div className="boards">
            {this.state.boards.map((boardData) => {
              console.log(">>>>", boardData);
              return (
                <BoardIcon
                  background={boardData.prefs.background}
                  backgroundImage={"url" + "{boardData.prefs.backgroundimage}"}
                  name={boardData.name}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
