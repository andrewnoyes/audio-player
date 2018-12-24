import * as React from 'react';

import { withStyles, Theme } from '@material-ui/core/styles';

const styles: any = (theme: Theme) =>({
    root: {
        top: 56,
        bottom: 0,
        width: '100%',
        position: 'absolute',
        [theme.breakpoints.up("sm")]: {
            top: 64,
        },
    },
});

function Content(props: any) {
    const { classes, children } = props;
    return (
        <div className={classes.root}>
            {children}
        </div>
    )
}

export default withStyles(styles)(Content);