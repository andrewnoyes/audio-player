import * as React from 'react';

import { inject, observer } from 'mobx-react';

import {
    withStyles,
    Theme,
    Typography,
    Paper,
    Chip,
} from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

const styles: any = (theme: Theme) => ({
    root: {
        padding: theme.spacing.unit,
        minWidth: 300,
        maxWidth: 300,
        borderLeft: '1px solid #ddd',
        overflowY: 'auto',
    },
    header: {
        textAlign: 'center',
    },
    card: {
        padding: theme.spacing.unit * 2,
        margin: theme.spacing.unit * 2,
    },
    feed: {
        display: 'flex',
        flexDirection: 'column',
    },
    feedItem: {
        margin: theme.spacing.unit * 2,
    },
});

@inject('channelStore')
@observer
class ChannelFeed extends React.Component<any, any> {
    public render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Typography variant="h6" className={classes.header}>
                    Other Listeners
                </Typography>
                {this.renderFeed()}
            </div>
        )
    }

    private renderFeed = () => {
        const { channelStore, classes } = this.props;
        const { users, hasConnectedUsers } = channelStore;

        if (!hasConnectedUsers) {
            return (
                <Paper className={classes.card}>
                    <Typography>
                        🕵️‍♀️ Nobody else is listening! Open another tab to try it out.
                    </Typography>
                </Paper>
            )
        }

        return (
            <div className={classes.feed}>
                {
                    users.map((user: any, index: number) => (
                        <Chip
                            key={user.id}
                            label={user.username}
                            color="primary"
                            icon={<PlayArrowIcon />}
                            clickable={true}
                            className={classes.feedItem}
                            variant="outlined"
                        />
                    ))
                }
            </div>

        )
    }
}

export default withStyles(styles)(ChannelFeed);