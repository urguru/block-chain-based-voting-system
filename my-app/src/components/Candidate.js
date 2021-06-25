import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import constants from '../common/constants';

const styles = {
}

class CandidateCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    getTableItems = () => {
        const tableList = [];
        if (electionStatus.text == constants.electionStatus.COMPLETED.text) {
            }
        return tableList;
    }    
    render() {
        console.log(this.props);
        const { classes, candidate, electionStatus, needVoteButton } = this.props;
        return (
            <Card className={classes.candidateCard}>
                <div className={classes.text}>
                    <Typography variant="h5">{candidate.citizen.name}</Typography>
                    <Typography variant="subtitle1">Voter ID : {candidate.voterId}</Typography>
                    <Typography variant="subtitle1">Voter Gender : {candidate.citizen.gender}</Typography>
                    <Typography variant="subtitle1">Home Constituency : {candidate.citizen.constituency.name}</Typography>
                    {electionStatus.value === constants.electionStatus.COMPLETED.value &&
                        <Typography variant="subtitle1">Male Vote Count:{candidate.maleVoteCount}</Typography>}
                    {electionStatus.value === constants.electionStatus.COMPLETED.value &&
                        <Typography variant="subtitle1">Female Vote Count:{candidate.femaleVoteCount}</Typography>}
                    {electionStatus.value === constants.electionStatus.COMPLETED.value &&
                        <Typography variant="subtitle1">Other Vote Count:{candidate.otherVoteCount}</Typography>}
                    {electionStatus.value === constants.electionStatus.COMPLETED.value &&
                        <Typography variant="subtitle1">Database Total Vote Count:{candidate.otherVoteCount + candidate.femaleVoteCount + candidate.maleVoteCount}</Typography>}
                    {electionStatus.value === constants.electionStatus.COMPLETED.value &&
                        <Typography variant="subtitle1">Smart Contract Total Vote Count:{candidate.otherVoteCount}</Typography>}
                </div>
                <div className={classes.buttons}>
                    <Button variant="contained" color="primary">
                        View Candidate
                    </Button>
                    {electionStatus.value != constants.electionStatus.COMPLETED.value && needVoteButton &&
                        <Button onClick={this.voteForCandidate} variant="contained" color="primary">
                            Vote for candidate
                        </Button>}
                </div>
            </Card>
        )
    }
}

const mapStateToProps = (state) => ({
    electionStatus: state.election.electionStatus
})

const mapActionsToProps = {
}

export default withRouter(connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(CandidateCard)));