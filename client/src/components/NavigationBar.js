import React from 'react';
import SearchBar from './SearchBar';

export default class NavigationBar extends React.Component {
  constructor(props) {
    super();
    this.state = {
      scrollTop: 0,
      scrollDirection: 'up',
      query: ''
    }
    this.scrollThreshold = 10;
  }

  render() {
    return (
      <nav className='font--sans'>
        <div className={this.state.scrollTop ? this.state.scrollDirection === 'up' ? 'header header-fixed--top is-inView header--affixed' : 'header header-fixed--top is-hidden header--affixed' : 'header header-fixed--top'}>
          <div className='u-floatLeft'>
            <div className='user-avatar'>
              <img src={this.props.avatar} className='avatar-img hidden-sm hidden-xs is-evolved' />
            </div>
            <div className='user-details'>
              <span className='content-accent'>{this.props.name}</span>
              <span className='user-type'></span>
            </div>
          </div>
          <div className='navbar override-minHeight'>
            <SearchBar onEdit={this.props.onImageRequest} />
          </div>
        </div>
      </nav>
    )
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = (e) => {
    e.stopPropagation();
    var scrollPosition = e.target.querySelector('body').scrollTop;
    if ((scrollPosition > this.state.scrollTop + this.scrollThreshold) && (this.state.scrollDirection !== 'down')) {
      this.setState({ scrollDirection: 'down' });
    } else if (scrollPosition < this.state.scrollTop && this.state.scrollDirection !== 'up') {
      this.setState({ scrollDirection: 'up' });
    }
    this.setState({ scrollTop: scrollPosition });
  }
};
