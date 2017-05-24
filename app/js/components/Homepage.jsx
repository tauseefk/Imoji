import React from 'react';
import PostContent from './PostContent.jsx';
import NavigationBar from './NavigationBar.jsx';
import Axios from 'axios';

export default class Homepage extends React.Component {
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

    this.fetchImages = this.fetchImages.bind(this);
  }

  render() {
    return (
      <div>
        <NavigationBar
          name={this.state.name}
          avatar={this.state.avatar}
          onImageRequest={this.fetchImages}/>
        <PostContent images={this.state.images}/>
      </div>
    )
  }

  fetchImages(query) {
    Axios.post('http://localhost:3000/getImagesForTags', query)
    .then((res) => {
      this.setState({
        name: res.data.name,
        avatar: res.data.avatar,
        images: res.data.images
      });
    });
  }

  componentDidMount() {
    this.fetchImages(this.defaultQuery);
  }
};
