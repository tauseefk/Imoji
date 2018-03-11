import React, { Component } from 'react';
import Post from './Post';
import NavigationBar from './NavigationBar';
import Axios from 'axios';
import Authorization from './Authorization'

export default class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      avatar: this.props.avatar,
      images: this.props.images,
      authorized: false
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
        {!this.state.authorized ? <Authorization /> : null}
      </div>
    )
  }

  componentDidMount() {
    this.fetchImages(this.defaultQuery);
  }

  fetchImages = (query) => {
    Axios.post('/getImagesForTags', query)
      .then(response => {
        let data = response.data;
        if (response.status === 200 && data
          && data.name && data.avatar && data.images) {
          this.setState({
            name: data.name,
            avatar: data.avatar,
            images: data.images,
            authorized: true
          });
        } else {
          this.setState({
            name: this.state.name,
            avatar: this.state.avatar,
            images: this.state.images,
            authorized: false
          })
        }
      });
  }
};
