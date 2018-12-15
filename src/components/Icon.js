import React , { Component } from 'react';
import { NT_AI_ICONFONT }  from '../config/assets';
import '../assets/fonts/iconfont.css';

export default class Icon extends Component{

  render(){
    const { name } = this.props;
    const value = NT_AI_ICONFONT[name];
   
    return (
    <i
      key={name}
      className={`iconfont nt-ai-iconfont nt-ai-icon nt-ui-${name}-icon ${this.props.className}`}
      style={this.props.style}
      dangerouslySetInnerHTML={{__html: value}}
      onClick={this.props.onClick}
    >
    </i>
   )
  }
}