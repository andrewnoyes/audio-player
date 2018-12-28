import * as React from 'react';

import {
    withStyles,
    Theme,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    TextField,
} from '@material-ui/core';

const styles: any = (theme: Theme) => ({
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
                <DialogTitle>🔌 Connect</DialogTitle>
                <DialogContent>
                    <DialogContentText>Enter a username to connect!</DialogContentText>
                    <form onSubmit={this.handleSubmit}>
                        <TextField
                            value={username}
                            onChange={this.handleUsernameChange}
                            fullWidth={true}
                            margin="normal"
                            label="Username"
                            required={true}
                            autoFocus={true}
                        />
                        <Button
                            disabled={!username}
                            variant="contained"
                            color="secondary"
                            type="submit"
                            fullWidth={true}
                            className={classes.connect}
                        >
                            Connect
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        )
    }

    private handleUsernameChange = (e: any) => this.setState({ username: e.target.value });

    private handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (this.state.username) {
            this.props.onConnect(this.state.username);
        }
    }
}

export default withStyles(styles)(UserDialog);