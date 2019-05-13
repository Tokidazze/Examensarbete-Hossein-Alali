import React, { Component } from 'react';

import './Chat.css';

class SendMessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      text: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.text);
    this.setState({ text: '' });
  }

  render() {
    return (
      <div>
        <form className='form-group' onSubmit={this.onSubmit}>
          <div className='input-group'>
            <input
              type='text'
              className='form-control form-control'
              placeholder='Chat?'
              onChange={this.onChange}
              value={this.state.text}
            />
            <input type='submit' className='btn btn-primary' />
          </div>
        </form>
      </div>
    );
  }
}

export default SendMessageForm;
