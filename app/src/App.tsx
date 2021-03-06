import * as React from 'react';

import { observer, inject } from 'mobx-react';

import {
    MuiThemeProvider,
    createMuiTheme,
    CssBaseline,
} from '@material-ui/core';
import { deepPurple, teal } from '@material-ui/core/colors';

import {
    Header,
    Content,
    UserDialog,
    ProgressIndicator,
} from 'components';
import { MediaPlayer, ChannelFeed } from 'containers'

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
        const {
            userConnected,
            connect,
            disconnect,
            username,
            appConnected,
        } = appStore;

        return (
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <Header
                    connected={userConnected}
                    onDisconnect={disconnect}
                    username={username}
                />
                <Content>
                    {!appConnected ? <ProgressIndicator /> : userConnected ? this.renderAppContent() : null}
                </Content>
                <UserDialog open={appConnected && !userConnected} onConnect={connect} />
            </MuiThemeProvider>
        );
    }

    private renderAppContent = () => {
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    height: '100%',
                }}
            >
                <MediaPlayer />
                <ChannelFeed />
            </div>
        )
    }
}

export default App;
