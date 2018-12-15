import React from 'react';
import MonacoEditor from 'react-monaco-editor';
import EventEmitter from '../utils/GlobalEvent';

let changeTimeout;

export default class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
    }
  }
  editorDidMount(editor, monaco) {
    editor.focus();
  }
  onChange(newValue, e) {
    if (changeTimeout) clearTimeout(changeTimeout);
    changeTimeout = setTimeout(() => {
      EventEmitter.emit('freemarker-data-changed', newValue);
    }, 300);
  }
  render() {
    const code = this.state.code;
    const options = {
      selectOnLineNumbers: true
    };
    return (
      <MonacoEditor
        width={this.props.width}
        height={this.props.height}
        language="json"
        theme="vs-light"
        value={code}
        options={options}
        onChange={this.onChange}
        editorDidMount={this.editorDidMount}
      />
    );
  }
}