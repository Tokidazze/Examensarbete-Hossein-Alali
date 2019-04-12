import React, { Component } from 'react';
import onClickOutside from 'react-onclickoutside';

import './Filterbar.css';

class Filterbar extends Component {
  constructor() {
    super();
    this.state = {
      showing: false
    };
  }

  handleClickOutside = evt => {
    this.setState({ showing: false });
  };

  render() {
    const { showing } = this.state;

    const content = (
      <div className='bar-content'>
        <p>Category:</p>
        <div className='form-check'>
          <input
            className='form-check-input'
            type='checkbox'
            value='Action'
            id='Action'
          />
          <label className='form-check-label' htmlFor='Action'>
            Action
          </label>
        </div>
        <div className='form-check'>
          <input
            className='form-check-input'
            type='checkbox'
            value='Adventure'
            id='Adventure'
          />
          <label className='form-check-label' htmlFor='Adventure'>
            Adventure
          </label>
        </div>
        <div className='form-check'>
          <input
            className='form-check-input'
            type='checkbox'
            value='Fantasy'
            id='Fantasy'
          />
          <label className='form-check-label' htmlFor='Fantasy'>
            Fantasy
          </label>
        </div>
        <div className='form-check'>
          <input
            className='form-check-input'
            type='checkbox'
            value='FPS'
            id='FPS'
          />
          <label className='form-check-label' htmlFor='FPS'>
            FPS
          </label>
        </div>
        <div className='form-check'>
          <input
            className='form-check-input'
            type='checkbox'
            value='Horror'
            id='Horror'
          />
          <label className='form-check-label' htmlFor='Horror'>
            Horror
          </label>
        </div>
        <div className='form-check'>
          <input
            className='form-check-input'
            type='checkbox'
            value='Multiplayer'
            id='Multiplayer'
          />
          <label className='form-check-label' htmlFor='Multiplayer'>
            Multiplayer
          </label>
        </div>
        <div className='form-check'>
          <input
            className='form-check-input'
            type='checkbox'
            value='OpenWorld'
            id='OpenWorld'
          />
          <label className='form-check-label' htmlFor='OpenWorld'>
            OpenWorld
          </label>
        </div>
        <div className='form-check'>
          <input
            className='form-check-input'
            type='checkbox'
            value='RPG'
            id='RPG'
          />
          <label className='form-check-label' htmlFor='RPG'>
            RPG
          </label>
        </div>
        <div className='form-check'>
          <input
            className='form-check-input'
            type='checkbox'
            value='Simulation'
            id='Simulation'
          />
          <label className='form-check-label' htmlFor='Simulation'>
            Simulation
          </label>
        </div>
        <div className='form-check'>
          <input
            className='form-check-input'
            type='checkbox'
            value='Singleplayer'
            id='Singleplayer'
          />
          <label className='form-check-label' htmlFor='Singleplayer'>
            Singleplayer
          </label>
        </div>
        <div className='form-check'>
          <input
            className='form-check-input'
            type='checkbox'
            value='Sports'
            id='Sports'
          />
          <label className='form-check-label' htmlFor='Sports'>
            Sports
          </label>
        </div>
        <div className='form-check'>
          <input
            className='form-check-input'
            type='checkbox'
            value='Story'
            id='Story'
          />
          <label className='form-check-label' htmlFor='Story'>
            Story
          </label>
        </div>
        <div className='form-check'>
          <input
            className='form-check-input'
            type='checkbox'
            value='Strategy'
            id='Strategy'
          />
          <label className='form-check-label' htmlFor='Strategy'>
            Strategy
          </label>
        </div>
        <div className='form-check'>
          <input
            className='form-check-input'
            type='checkbox'
            value='Survival'
            id='Survival'
          />
          <label className='form-check-label' htmlFor='Survival'>
            Survival
          </label>
        </div>
      </div>
    );

    return (
      <div className='filter-bar'>
        <button
          onClick={() => this.setState({ showing: !showing })}
          className='btn btn-primary'
        >
          <i className='fas fa-filter' />
        </button>
        {showing ? content : null}
      </div>
    );
  }
}

export default onClickOutside(Filterbar);
