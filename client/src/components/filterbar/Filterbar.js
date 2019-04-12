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

  closeMenu() {
    this.setState({ menuOpen: false });
  }

  handleClickOutside = evt => {
    this.closeMenu();
  };

  render() {
    const { showing } = this.state;

    const content = (
      <div className='bar-content'>
        <p>Category:</p>
        <div class='form-check'>
          <input
            class='form-check-input'
            type='checkbox'
            value='Action'
            id='Action'
          />
          <label class='form-check-label' for='Action'>
            Action
          </label>
        </div>
        <div class='form-check'>
          <input
            class='form-check-input'
            type='checkbox'
            value='Adventure'
            id='Adventure'
          />
          <label class='form-check-label' for='Adventure'>
            Adventure
          </label>
        </div>
        <div class='form-check'>
          <input
            class='form-check-input'
            type='checkbox'
            value='Fantasy'
            id='Fantasy'
          />
          <label class='form-check-label' for='Fantasy'>
            Fantasy
          </label>
        </div>
        <div class='form-check'>
          <input
            class='form-check-input'
            type='checkbox'
            value='FPS'
            id='FPS'
          />
          <label class='form-check-label' for='FPS'>
            FPS
          </label>
        </div>
        <div class='form-check'>
          <input
            class='form-check-input'
            type='checkbox'
            value='Horror'
            id='Horror'
          />
          <label class='form-check-label' for='Horror'>
            Horror
          </label>
        </div>
        <div class='form-check'>
          <input
            class='form-check-input'
            type='checkbox'
            value='Multiplayer'
            id='Multiplayer'
          />
          <label class='form-check-label' for='Multiplayer'>
            Multiplayer
          </label>
        </div>
        <div class='form-check'>
          <input
            class='form-check-input'
            type='checkbox'
            value='OpenWorld'
            id='OpenWorld'
          />
          <label class='form-check-label' for='OpenWorld'>
            OpenWorld
          </label>
        </div>
        <div class='form-check'>
          <input
            class='form-check-input'
            type='checkbox'
            value='RPG'
            id='RPG'
          />
          <label class='form-check-label' for='RPG'>
            RPG
          </label>
        </div>
        <div class='form-check'>
          <input
            class='form-check-input'
            type='checkbox'
            value='Simulation'
            id='Simulation'
          />
          <label class='form-check-label' for='Simulation'>
            Simulation
          </label>
        </div>
        <div class='form-check'>
          <input
            class='form-check-input'
            type='checkbox'
            value='Singleplayer'
            id='Singleplayer'
          />
          <label class='form-check-label' for='Singleplayer'>
            Singleplayer
          </label>
        </div>
        <div class='form-check'>
          <input
            class='form-check-input'
            type='checkbox'
            value='Sports'
            id='Sports'
          />
          <label class='form-check-label' for='Sports'>
            Sports
          </label>
        </div>
        <div class='form-check'>
          <input
            class='form-check-input'
            type='checkbox'
            value='Story'
            id='Story'
          />
          <label class='form-check-label' for='Story'>
            Story
          </label>
        </div>
        <div class='form-check'>
          <input
            class='form-check-input'
            type='checkbox'
            value='Strategy'
            id='Strategy'
          />
          <label class='form-check-label' for='Strategy'>
            Strategy
          </label>
        </div>
        <div class='form-check'>
          <input
            class='form-check-input'
            type='checkbox'
            value='Survival'
            id='Survival'
          />
          <label class='form-check-label' for='Survival'>
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
