import * as React from 'react';

import { withStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import HeadsetIcon from '@material-ui/icons/Headset';

const styles = (theme: Theme) => ({
    root: {
        flexGrow: 1,
    },
    logo: {
        marginRight: theme.spacing.unit,
    },
});

function Header(props: any) {
    const { classes } = props;

    return (
        <div className={classes.root}>
            <AppBar position="fixed" color="primary">
                <Toolbar>
                    <HeadsetIcon className={classes.logo} />
                    <Typography color="inherit" variant="h6">
                        Aula Audio
                    </Typography>
                </Toolbar>
            </AppBar>
        </div >
    );
}

export default withStyles(styles)(Header);