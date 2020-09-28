import * as React from "react";
import { RouteChildrenProps } from "react-router-dom";
import { BoardIcon } from "./BoartdIcon";
import "./DashBoard.css";
import { connect } from "react-redux";
import { AppState } from "../../store/counter";
import { increaseCount, decreaseCount } from "../../store/counter/actions";
const { REACT_APP_API_KEY } = process.env;
interface DashBoardProps extends RouteChildrenProps {
  hello?: string;
  token?: string;
  myCount?: number;
  onIncrease?: () => void;
  history?: string;
  goBack?: () => void;
}

interface State {
  boards: Array<any> | undefined;
}
class DashBoard extends React.Component<DashBoardProps, State> {
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
  increase = () => {
    this.props.onIncrease!();
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
        <div>{this.props.myCount}</div>
        <button onClick={this.increase}>+</button>
      </div>
    );
  }
}
const mapStateToProps = (state: AppState) => {
  return {
    myCount: state.count,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    onIncrease: () => dispatch(increaseCount()),
    onDecrease: () => dispatch(decreaseCount()),
  };
};
const ConnectedDashBoard = connect(
  mapStateToProps,
  mapDispatchToProps
)(DashBoard);

export { ConnectedDashBoard as DashBoard };
