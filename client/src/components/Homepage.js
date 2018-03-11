import React, { Component } from 'react';
import Post from './Post';
import NavigationBar from './NavigationBar';
import Axios from 'axios';

export default class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      avatar: this.props.avatar,
      images: this.props.images
    };

    this.defaultQuery = {
      queryString: 'people from california and florida'
    };
  }

  render() {
    return (
      <div>
        <NavigationBar
          name={this.state.name}
          avatar={this.state.avatar}
          onImageRequest={this.fetchImages} />
        <Post images={this.state.images} />
      </div>
    )
  }

  componentDidMount() {
    this.fetchImages(this.defaultQuery);
  }

  fetchImages = (query) => {
    Axios.post('/getImagesForTags', query)
    .then(res => {
      if (res.status === 200 && res.data && Object.keys(res.data).length > 0) {
        return res.data;
      } else {
        // returning object literal from arrow functions requires parenthesis,
        // wow
        return ({ name: "", avatar: "", images: [] })
      }
    })
    .then(({ name, avatar, images }) => {
      this.setState({
        name: name,
        avatar: avatar,
        images: images
      });
    });
  }
};
