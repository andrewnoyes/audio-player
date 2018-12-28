import * as React from 'react';

import {
    withStyles,
    Theme,
    AppBar,
    Toolbar,
    Typography,
    Button,
} from '@material-ui/core';

const styles: any = (theme: Theme) => ({
    root: {
        flexGrow: 1,
    },
    logo: {
        marginRight: theme.spacing.unit,
        marginBottom: 10,
        fontSize: 24,
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    username: {
        marginRight: theme.spacing.unit * 2,
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    connect: {
        color: '#fff',
    }
});

export interface IHeaderProps {
    classes?: any;
    onDisconnect: () => void;
    connected: boolean;
    username?: string;
}

function Header(props: IHeaderProps) {
    const { classes, onDisconnect, connected, username } = props;

    return (
        <div className={classes.root}>
            <AppBar position="fixed" color="primary">
                <Toolbar className={classes.toolbar}>
                    <div className={classes.row}>
                        <div className={classes.logo}>📻</div>
                        <Typography color="inherit" variant="h6">
                            Aula Audio
                        </Typography>
                    </div>
                    {
                        connected
                            ?
                            <div className={classes.row}>
                                <Typography color="inherit" variant="h6" className={classes.username}>
                                    {username}
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    className={classes.connect}
                                    onClick={onDisconnect}
                                >
                                    Disconnect
                                </Button>
                            </div>
                            : null
                    }
                </Toolbar>
            </AppBar>
        </div >
    );
}

export default withStyles(styles)(Header);