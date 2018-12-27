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

@inject('userStore')
@observer
class App extends React.Component<any, any> {
  public render() {
    const { userStore } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Header onConnect={userStore.toggleDisplayConnect} />
        <Content>
          <MediaPlayer />
        </Content>
        <UserDialog open={userStore.displayConnect} onConnect={this.handleConnect} />
      </MuiThemeProvider>
    );
  }

  private handleConnect = (username: string) => {
    // TODO!
    this.props.userStore.toggleDisplayConnect();
  }
}

export default App;
