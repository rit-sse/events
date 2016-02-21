import React from 'react';
import AltContainer from 'alt/AltContainer';
import EventsApp from './components/app';
import SSEStore from './stores/sse';
import SelectActions from './actions/select';

window.onload = () =>  {
  gapi.load('auth2', () => {
    React.render(
      <AltContainer
        store={SSEStore}
        component={EventsApp}
        actions={SelectActions}
      />, document.getElementById('app'));
  });
};
