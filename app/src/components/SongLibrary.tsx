import * as React from 'react';

import { observer } from 'mobx-react';

import {
    withStyles,
    Theme,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    Typography,
    CircularProgress,
} from '@material-ui/core';

const styles: any = (theme: Theme) => ({
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    placeholder: {
        padding: theme.spacing.unit * 4,
        textAlign: 'center',
        display: 'flex',
        alignSelf: 'center',
    },
    table: {
        minWidth: 700,
    },
});

export interface ISongLibraryProps {
    classes?: any;
    songs?: any[];
    loading: boolean;
    onSelectSong: (song: any) => void;
    selectedSong?: any;
}

@observer
class SongLibrary extends React.Component<ISongLibraryProps, {}> {
    public render() {
        const {
            classes,
            songs,
            loading,
            onSelectSong,
            selectedSong,
        } = this.props;

        if (loading) {
            return (
                <div className={classes.placeholder}>
                    <CircularProgress />
                </div>
            )
        }

        if (!songs) {
            return (
                <Paper className={classes.placeholder}>
                    <Typography variant="h6">
                        No songs yet!
                    </Typography>
                </Paper>
            )
        }

        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Artist</TableCell>
                            <TableCell>Album</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            songs.map(song => {
                                const handleSelect = () => onSelectSong(song);
                                const isSelected = selectedSong && song.id === selectedSong.id;

                                return (
                                    <TableRow
                                        key={song.id}
                                        selected={isSelected}
                                        onClick={handleSelect}
                                        hover={true}
                                        role="checkbox"
                                    >
                                        <TableCell component="th" scope="row">
                                            {song.name}
                                        </TableCell>
                                        <TableCell>{song.artist}</TableCell>
                                        <TableCell>{song.album}</TableCell>
                                    </TableRow>
                                );
                            })
                        }
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

export default withStyles(styles)(SongLibrary);