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
    onConnect: () => void;
}

function Header(props: IHeaderProps) {
    const { classes, onConnect } = props;

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
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.connect}
                        onClick={onConnect}
                    >
                        Connect
                    </Button>
                </Toolbar>
            </AppBar>
        </div >
    );
}

export default withStyles(styles)(Header);