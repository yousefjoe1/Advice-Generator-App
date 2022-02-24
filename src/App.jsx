import React, { Component } from "react";

import "./style.scss";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 1,
      advice: "",
    };
  }

  advDiv = React.createRef(null);

  fething = async () => {
    let ida = this.state.id;
    let fetching = await fetch(`https://api.adviceslip.com/advice/${ida}`);
    let { slip } = await fetching.json();
    this.setState({
      advice: slip.advice,
    });
  };

  async componentDidMount() {
    this.fething();
  }

  nextAdvice = async () => {
    this.advDiv.current.classList.add("resize-advice");
    this.setState({ id: (this.state.id += 1) });
    this.fething();
    setTimeout(() => {
      this.advDiv.current.classList.remove("resize-advice");
    }, 500);
  };

  render() {
    return (
      <div className="container">
        <div ref={this.advDiv} className="advice-div">
          <h3 className="advice-number">Advice #{this.state.id}</h3>
          <p className="advice">" {this.state.advice} "</p>
          <hr className="hr-1" />
          <hr className="hr-2" />
          <hr className="hr-3" />
          <button onClick={this.nextAdvice}>Next Advice</button>
        </div>
      </div>
    );
  }
}

export default App;
