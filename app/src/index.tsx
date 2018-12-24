import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Provider } from 'mobx-react';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { songStore } from 'stores';

ReactDOM.render(
  <Provider songStore={songStore}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
