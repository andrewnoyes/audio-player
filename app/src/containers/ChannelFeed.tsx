import * as React from 'react';

import { inject, observer } from 'mobx-react';

import {
    withStyles,
    Theme,
    Typography,
    Paper,
    Chip,
    Tooltip,
    Avatar,
} from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';

const styles: any = (theme: Theme) => ({
    root: {
        padding: theme.spacing.unit,
        minWidth: 300,
        maxWidth: 300,
        borderLeft: '1px solid #ddd',
        overflowY: 'auto',
        backgroundColor: theme.palette.background.paper,
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
        justifyContent: 'center',
    },
    feedItem: {
        margin: theme.spacing.unit * 2,
        display: 'flex',
        justifyContent: 'flex-start',
    },
    feedItemLabel: {
        textOverflow: 'clip',
        overflow: 'hidden',
    },
});

@inject('channelStore', 'songStore')
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
                    users.map((user: any, index: number) => {
                        console.log('user', user);
                        const song = user.song ? ` - ${user.song.name}` : '';
                        const title = `${user.username}${song}`;

                        return (
                            <Tooltip title={title} key={user.id}>
                                <Chip
                                    label={title}
                                    classes={{ label: classes.feedItemLabel }}
                                    variant="outlined"
                                    avatar={<Avatar><FaceIcon /></Avatar>}
                                    clickable={true}
                                    className={classes.feedItem}
                                    onClick={user.song && this.handleItemClick(user.song)}
                                />
                            </Tooltip>
                        )
                    })
                }
            </div>

        )
    }

    private handleItemClick = (song: any) => () => {
        this.props.songStore.selectSong(song);
    }
}

export default withStyles(styles)(ChannelFeed);