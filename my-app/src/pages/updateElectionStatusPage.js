import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import constants from '../common/constants';
import { updateElectionStatus } from '../actions/electionActions';

const styles = {
    form: {
        textAlign: 'center'
    },
    Button: {
        marginTop: 20,
        position: 'relative'
    },
}

class UpdateElectionStatusPage extends React.Component {

    handleSubmit = (event) => {
        event.preventDefault();
        const electionValue = this.props.election.electionStatus.value;
        if (electionValue == 0) {
            this.props.updateElectionStatus(constants.electionStatus.STARTED.text, this.props);
        } else if (electionValue == 1) {
            this.props.updateElectionStatus(constants.electionStatus.COMPLETED.text, this.props);
        }

    }

    render() {
        const electionValue = this.props.election.electionStatus.value;
        const buttonText = electionValue == 0 ? "Start Election" : electionValue == 1 ? "Complete the election" : "Election Already Completed";
        const { classes } = this.props;
        return (
            <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
                <Button type="submit" disabled={electionValue == 2} variant="contained" color="primary" className={classes.Button}>
                    {buttonText}
                </Button>
            </form>)
    }
}

const mapStateToProps = (state) => ({
    election: state.election,
})

const mapActionsToProps = {
    updateElectionStatus
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(UpdateElectionStatusPage));