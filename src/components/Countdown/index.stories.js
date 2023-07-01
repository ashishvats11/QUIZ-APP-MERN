// Button.stories.js | Button.stories.jsx
import React from 'react';
import { action } from '@storybook/addon-actions';

import Countdown from './index';

export default {
  component: Countdown,
  title: 'Components/Countdown',
};

export const CountdownTimer = () => (
  <Countdown
    countdownTime={60} // Set the countdown time to 60 seconds
    setTimeTaken={action('Time Taken')}
  />
);
