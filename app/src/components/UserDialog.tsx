import * as React from 'react';

import {
    withStyles,
    Theme,
    Dialog,
    DialogContent,
    Button,
    TextField,
} from '@material-ui/core';

const styles: any = (theme: Theme) => ({
    content: {
        padding: theme.spacing.unit * 2,
    },
    connect: {
        marginTop: theme.spacing.unit,
        color: '#fff',
    },
});

export interface ISignInDialogProps {
    classes?: any;
    open: boolean;
    onConnect: (username: string) => void;
}

class UserDialog extends React.Component<ISignInDialogProps, any> {
    state = {
        username: '',
    };

    public render() {
        const { open, classes } = this.props;
        const { username } = this.state;

        return (
            <Dialog open={open}>
                <DialogContent className={classes.content}>
                    <TextField
                        value={username}
                        onChange={this.handleUsernameChange}
                        fullWidth={true}
                        margin="normal"
                        label="Username"
                    />
                    <Button
                        disabled={!username}
                        variant="contained"
                        color="secondary"
                        onClick={this.handleConnect}
                        fullWidth={true}
                        className={classes.connect}
                    >
                        Connect
                    </Button>
                </DialogContent>
            </Dialog>
        )
    }

    private handleUsernameChange = (e: any) => this.setState({ username: e.target.value });

    private handleConnect = () => {
        if (!this.state.username) {
            return;
        }

        this.props.onConnect(this.state.username);
    }
}

export default withStyles(styles)(UserDialog);