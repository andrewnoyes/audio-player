import * as React from 'react';

import { observer } from 'mobx-react';

import {
    withStyles,
    Theme,
    Fab,
    Paper,
    CircularProgress,
    Tooltip,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ReactAudioPlayer from 'react-audio-player';

import { FilePicker } from 'components';

const styles: any = (theme: Theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        bottom: theme.spacing.unit * 4,
        position: 'absolute',
        alignItems: 'center',
    },
    controls: {
        borderRadius: 50,
        marginRight: theme.spacing.unit * 2,
        display: 'flex',
    },
    upload: {
        color: '#fff',
    },
    loading: {
        position: 'absolute',
        top: -6,
        right: -6,
        zIndex: 1,
    },
});

export interface ISongControlsProps {
    uploadSong: (song: any) => void;
    loading: boolean;
    classes?: any;
    selectedSong?: any;
    onSongStarted: () => void;
    onSongStopped: () => void;
}

@observer
class SongControls extends React.Component<ISongControlsProps, {}> {
    public render() {
        const {
            classes,
            loading,
            selectedSong,
            onSongStarted,
            onSongStopped,
        } = this.props;

        const audioSrc = selectedSong && selectedSong.url;

        return (
            <div className={classes.root}>
                <Paper className={classes.controls} elevation={4}>
                    <ReactAudioPlayer
                        src={audioSrc}
                        controls={true}
                        autoPlay={true}
                        onPlay={onSongStarted}
                        onEnded={onSongStopped}
                        onPause={onSongStopped}
                        onLoadedMetadata={this.handleMetadata}
                    />
                </Paper>
                <FilePicker accept="audio/*" onFilePicked={this.handleFilePicked}>
                    <Tooltip title="Upload a Song">
                        <Fab
                            className={classes.upload}
                            color="secondary"
                            component="span"
                            disabled={loading}
                        >
                            <AddIcon />
                        </Fab>
                    </Tooltip>
                    {loading && <CircularProgress size={68} className={classes.loading} />}
                </FilePicker>
            </div>
        )
    }

    private handleFilePicked = (
        _name: string,
        _type: string,
        file: any,
    ) => {
        this.props.uploadSong(file);
    }

    private handleMetadata = (meta: any) => {
        console.log('loaded metadata', meta);
    }
}

export default withStyles(styles)(SongControls);