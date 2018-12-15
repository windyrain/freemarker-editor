import React, { Component } from 'react';
import { Tree } from 'antd';
import axios from 'axios';
import API from '../config/api';

const DirectoryTree = Tree.DirectoryTree;
const { TreeNode } = Tree;

export default class Menu extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      treeData: []
    };
  }

  loop(data){
    return data.map( d => {
        if(d.children && d.children.length){
            return <TreeNode key={d.key} title={d.name}>{this.loop(d.children)}</TreeNode>
        } else {
            return <TreeNode key={d.key} title={d.name} isLeaf></TreeNode>
        }
    })
  }

  onSelect = () => {
    console.log('Trigger Select');
  };

  onExpand = () => {
    console.log('Trigger Expand');
  };

  componentDidMount() {
    axios.get(API.get('directoryList')).then((response) => {
      const { data } = response;
      this.setState({
        treeData: [data]
      });
      console.log(data);
    })
  }

  render() {

    return (
      <DirectoryTree
        multiple
        defaultExpandAll
        onSelect={this.onSelect}
        onExpand={this.onExpand}
      >
        {this.loop(this.state.treeData)}
      </DirectoryTree>
    );
  }
}