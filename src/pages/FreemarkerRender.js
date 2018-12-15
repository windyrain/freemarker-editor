import React, { Component } from 'react';
import axios from 'axios';
import API from '../config/api';
import EventEmitter from '../utils/GlobalEvent';

export default class FreemarkerRender extends Component {

  constructor(props) {
    super(props);

    this.state = {
      content: '',
      data: '',
      result: ''
    };

    this.onContentChanged = this.onContentChanged.bind(this);
    this.onDataChanged = this.onDataChanged.bind(this);
    EventEmitter.on('freemarker-content-changed', this.onContentChanged);
    EventEmitter.on('freemarker-data-changed', this.onDataChanged);
  }

  onContentChanged(content) {
    this.setState({
      content
    }, () => {
      this.renderFreeMarker()
    });
  }

  onDataChanged(data) {
    try {
      data = JSON.parse(data);
      this.setState({
        data
      }, () => {
        this.renderFreeMarker()
      });
    } catch (e) {

    }
  }

  componentDidMount() {
    this.renderFreeMarker();
  }

  renderFreeMarker() {
    axios.post(API.get('render'), {
      "content": this.state.content,
      "data": JSON.stringify(this.state.data)
    }).then((response) => {
      const { data } = response;
      this.setState({
        result: data
      });
    })
  }

  render() {
    return (
      <iframe 
        className="freemarker-render-container"
        frameBorder={0}
        style={{width: "100%", height: "100%", border: "0 none"}}
        allowTransparency={true}
        srcdoc={this.state.result}>
      </iframe>
    );
  }

}