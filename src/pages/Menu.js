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
            return <TreeNode key={d.path} title={d.name} value={d.path}>{this.loop(d.children)}</TreeNode>
        } else {
            return <TreeNode key={d.path} title={d.name} isLeaf value={d.path}></TreeNode>
        }
    })
  }

  onSelect = (selectedKeys, info) => {
     const { node } = info;
     if(node.props && node.props.isLeaf) {
      axios.get(API.get('setDirectory') + '?path=' + node.props.value).then((res)=>{
        this.props.setData(res.data, node.props.value)
      }).catch(()=>{})
     }else{ /**非叶子节点处理,不需要展示文件内容 */
        
     }
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