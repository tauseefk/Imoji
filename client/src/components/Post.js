import React from 'react';

const Post = ({ images }) => {
  var Images = images.map(function (image, idx) {
    return (
      <div key={idx} className="col-sm-3">
        <img src={image} className="postContent--image" />
      </div>
    )
  });
  return (
    <article className="container">
      <div className="layoutSingleColumn u-margin-header row">
        {/* <h1 className="postContent--h1 font-N7 font--sans">{name}</h1> */}
        {/* <p className="postContent--p">{desc}</p> */}
        {Images}
      </div>
    </article>
  )
};

export default Post;
