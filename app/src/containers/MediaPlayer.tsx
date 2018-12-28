import * as React from 'react';

import { observer, inject } from 'mobx-react';

import { withStyles, Theme } from '@material-ui/core/styles';

import { SongLibrary, SongControls } from 'components';

const styles: any = (theme: Theme) => ({
    root: {
        padding: theme.spacing.unit * 4,
        maxHeight: 'calc(100% - 86px)',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
});

@inject('appStore', 'songStore')
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
                    onSongStarted={this.handleSongStarted}
                    onSongStopped={this.handleSongStopped}
                />
            </div>
        )
    }

    private handleSongStarted = async () => {
        const { appStore, songStore } = this.props;
        const { selectedSong } = songStore;
        await appStore.updateUserStatus(`${selectedSong.name}`);
    }

    private handleSongStopped = async () => {
        const { appStore } = this.props;
        await appStore.updateUserStatus('');
    }
}

export default withStyles(styles)(MediaPlayer);