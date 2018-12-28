import * as React from 'react';

import { observer, inject } from 'mobx-react';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import deepPurple from '@material-ui/core/colors/deepPurple';
import teal from '@material-ui/core/colors/teal';

import { Header, Content, UserDialog } from 'components';
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

@inject('appStore')
@observer
class App extends React.Component<any, any> {
  public render() {
    const { appStore } = this.props;
    const { userConnected, connect, disconnect, username } = appStore;

    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Header
          connected={userConnected}
          onDisconnect={disconnect}
          username={username}
        />
        {
          userConnected
            ?
            <Content>
              <MediaPlayer />
            </Content>
            : null
        }
        <UserDialog open={!userConnected} onConnect={connect} />
      </MuiThemeProvider>
    );
  }
}

export default App;
