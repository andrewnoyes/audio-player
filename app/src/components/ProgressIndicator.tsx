import * as React from 'react';

import {
    withStyles,
    CircularProgress,
} from '@material-ui/core';

const styles: any = () => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
});

function ProgressIndicator(props: any) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <CircularProgress />
        </div>
    )
}

export default withStyles(styles)(ProgressIndicator);