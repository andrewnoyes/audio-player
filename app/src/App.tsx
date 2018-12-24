import * as React from 'react';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import deepPurple from '@material-ui/core/colors/deepPurple';
import teal from '@material-ui/core/colors/teal';

import { Header, Content } from 'components';
import { MediaPlayer } from 'containers'

const theme = createMuiTheme({
  palette: {
    primary: deepPurple,
    secondary: teal,
  },
  typography: {
    useNextVariants: true,
  },
});

class App extends React.Component {
  public render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Content>
          <MediaPlayer />
        </Content>
      </MuiThemeProvider>
    );
  }
}

export default App;
