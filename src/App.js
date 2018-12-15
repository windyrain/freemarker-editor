import React, { Component } from "react";
import Menu from "./pages/Menu";
import EditorTabs from "./pages/EditorTabs";
import JSONEditor from './pages/JSONEditor';
import FreemarkerRender from "./pages/FreemarkerRender";
import "./App.css";

class App extends Component {

  componentDidMount() {
    this.setState({
      width: this.jsonWrapper.clientWidth - 300,
      height: this.jsonWrapper.clientHeight
    });
  }

  render() {
    return (
      <div className="freemarker-container">
        <div className="freemarker-menu">
          <div className="freemarker-menu-toolbar" />
          <Menu />
        </div>
        <div className="freemarker-editor">
          <EditorTabs /> 
        </div>
        <div className="freemarker-right-label">
          <div className="freemarker-data" ref={ref => this.jsonWrapper = ref}>
            <JSONEditor />
          </div>
          <div className="freemarker-render-result">
            <FreemarkerRender />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
