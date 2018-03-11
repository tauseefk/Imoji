import React from 'react';

const Post = ({ images }) => {
  var Images = images.map(function (image, idx) {
    return (
      <div key={idx} className="postContent--image">
        <img src={image} />
      </div>
    )
  });
  return (
    <article className="">
      <div className="layoutSingleColumn u-margin-header">
        {/* <h1 className="postContent--h1 font-N7 font--sans">{name}</h1> */}
        {/* <p className="postContent--p">{desc}</p> */}
        {Images}
      </div>
    </article>
  )
};

export default Post;
