import React from 'react';

export default class SearchBar extends React.Component {
  constructor(props) {
    super();
  };

  render() {
    const { value, onEdit } = this.props;

    return (
      <form className="navbar-form navbar-right">
        <div className="form-group has-feedback">
          <input
            type='text'
            onKeyPress={this.checkEnter}
            autoFocus={true}
            defaultValue={value}
            onBlur={this.finishEdit}
            className='form-control'
            placeholder='Search...'
          />
        </div>
        <button type='button' className='u-outlineNone u-borderNone btn btn-primary background-accent font-N7 text-uppercase'>
          <i className="glyphicon glyphicon-search"></i>
        </button>
      </form>
    )
  }

  checkEnter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.finishEdit(e);
    }
  }

  finishEdit = (e) => {
    if (e.target.value !== '') {
      const value = {
        queryString: e.target.value
      };

      if (this.props.onEdit) {
        this.props.onEdit(value);
      }
    }

  }
}