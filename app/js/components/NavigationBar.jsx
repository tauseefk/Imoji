import React from 'react';

export default class NavigationBar extends React.Component {
  constructor(props) {
    super();
    this.state = {
      scrollTop: 0,
      scrollDirection: 'up',
      query: ''
    }
    this.scrollThreshold = 10;
    this.handleScroll = this.handleScroll.bind(this);
  }

  render() {
    return (
      <nav className='font--sans'>
        <div className={this.state.scrollTop ? this.state.scrollDirection === 'up' ? 'header header-fixed--top is-inView header--affixed' : 'header header-fixed--top is-hidden header--affixed' : 'header header-fixed--top'}>
          <div className='u-floatLeft'>
            <div className='user-avatar'>
              <img src={this.props.avatar} className='avatar-img hidden-sm hidden-xs is-evolved'/>
            </div>
            <div className='user-details'>
              <span className='content-accent'>{this.props.name}</span>
              <span className='user-type'></span>
            </div>
          </div>
          <div className='collapse navbar-collapse'>
            <Search onEdit={this.props.onImageRequest} />
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

  handleScroll(e) {
    e.stopPropagation();
    var scrollPosition = e.target.querySelector('body').scrollTop;
    if ((scrollPosition > this.state.scrollTop + this.scrollThreshold) && (this.state.scrollDirection !== 'down')) {
      this.setState({scrollDirection: 'down'});
    } else if (scrollPosition < this.state.scrollTop && this.state.scrollDirection !== 'up') {
      this.setState({scrollDirection: 'up'});
    }
    this.setState({scrollTop: scrollPosition});
  }
};

class Search extends React.Component {
  constructor(props) {
    super();
    this.checkEnter = this.checkEnter.bind(this);
    this.finishEdit = this.finishEdit.bind(this);
  };

  render () {
    const {value, onEdit} = this.props;

    return (
      <form className="navbar-form navbar-right">
        <div className="form-group">
          <input
            type='text'
            onKeyPress={this.checkEnter}
            autoFocus = {true}
            defaultValue = {value}
            onBlur = {this.finishEdit}
            className='form-control'
            placeholder='Search...'
          />
        </div>
        <button type='button' className='u-borderNone btn btn-primary background-accent font-N7 text-uppercase'>Search</button>
      </form>
    )
  }

  checkEnter(e) {
    if(e.key === 'Enter') {
      e.preventDefault();
      this.finishEdit(e);
    }
  }

  finishEdit(e) {
    if(e.target.value != '') {
      const value = {
        queryString: e.target.value
      };

      if(this.props.onEdit) {
        this.props.onEdit(value);
      }
    }

  }
}
