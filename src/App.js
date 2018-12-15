import React, { Component } from "react";
import Menu from "./pages/Menu";
import EditorTabs from "./pages/EditorTabs";
import "./App.css";

class App extends Component {
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
          <div className="freemarker-data" />
          <div className="freemarker-render-result" />
        </div>
      </div>
    );
  }
}

export default App;
