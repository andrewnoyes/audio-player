import * as React from 'react';

import { observer, inject } from 'mobx-react';
import { withStyles, Theme } from '@material-ui/core/styles';

import { SongLibrary, SongControls } from 'components';

const styles: any = (theme: Theme) => ({
    root: {
        padding: theme.spacing.unit * 4,
        maxHeight: 'calc(100% - 86px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
});

@inject('songStore')
@observer
class MediaPlayer extends React.Component<any, any> {
    componentDidMount() {
        this.props.songStore.loadSongs();
    }

    public render() {
        const { classes, songStore } = this.props;
        const {
            uploadSong,
            songs,
            loading,
            uploading,
            selectSong,
            selectedSong,
        } = songStore;

        return (
            <div className={classes.root}>
                <SongLibrary
                    loading={loading}
                    songs={songs}
                    onSelectSong={selectSong}
                    selectedSong={selectedSong}
                />
                <SongControls
                    loading={uploading}
                    uploadSong={uploadSong}
                    selectedSong={selectedSong}
                />
            </div>
        )
    }
}

export default withStyles(styles)(MediaPlayer);