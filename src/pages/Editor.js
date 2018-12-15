import React from 'react';
import axios from 'axios';
import API from '../config/api';
import MonacoEditor from 'react-monaco-editor';
import EventEmitter from '../utils/GlobalEvent';

let changeTimeout;

export default class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
    }
    this.onChange = this.onChange.bind(this);
  }

  editorDidMount(editor, monaco) {
    console.log('editorDidMount=', editor);
    editor.focus();
  }

  onChange(newValue, e) {
    if (changeTimeout) clearTimeout(changeTimeout);
    changeTimeout = setTimeout(() => {
      EventEmitter.emit('freemarker-content-changed', newValue);
      axios.post(API.get('saveDirectory'), {
        "path": this.props.path,
        "data": newValue
      }).then((response) => {
        // const { data } = response;
        // this.setState({
        //   result: data
        // });
      })
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
        language="html"
        theme="vs-light"
        value={this.props.data}
        options={options}
        onChange={this.onChange}
        editorDidMount={this.editorDidMount}
      />
    );
  }
}