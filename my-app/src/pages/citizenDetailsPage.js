import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import { getCitizenByVoterId, castVote } from '../actions/citizenActions';
import CitizenTable from '../components/Citizen';
import CandidateTable from '../components/Candidate';
import constants from '../common/constants';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';

const styles = {
    citizenDetails: {
        display: "flex",
        boxSizing: "border-box",
        margin: "20px",
        padding: "10px",
        flexDirection: "row",
        justifyContent: "space-around",
        flexWrap: "wrap",
        alignItems: "center",
    },
    candidatesList: {
        display: "flex",
        boxSizing: "border-box",
        margin: "20px",
        padding: "10px",
        flexDirection: "row",
        justifyContent: "space-around",
        flexWrap: "wrap",
        alignItems: "center",
    },
    candidateBox: {
        display: "flex",
        boxSizing: "border-box",
        margin: "20px",
        padding: "10px",
        flexDirection: "column",
        justifyContent: "space-around",
        flexWrap: "wrap",
        alignItems: "center",
    }
}

class CitizenDetailsPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            voterId: ''
        }
    }

    componentDidMount() {
        const voterId = this.props.match.params.voterId;
        this.props.getCitizenByVoterId(voterId, this.props);
    }

    castVote = () => {
        this.props.castVote()
    }

    getPresentableCandidate = (candidate) => {
        return (
            <Card className={this.props.classes.candidateBox}>
                <div>
                    <CandidateTable candidate={candidate} />
                </div>

                {this.props.electionStatus.text == constants.electionStatus.STARTED.text &&
                    !this.props.citizen.citizen.hasVoted &&
                    <div>
                        <Button size="large" variant="contained" color="primary"
                            onClick={() => this.props.castVote(candidate.voterId, this.props.citizen.citizen.voterId, this.props)}>
                            Vote For Candidate
                        </Button>
                    </div>}
            </Card>
        )
    }

    render() {
        const { classes, citizen } = this.props;
        return (citizen.isDataLoaded && <div className={classes.citizenDetails}>
            <div>
                <CitizenTable citizen={citizen.citizen} />
            </div>
            <div className={classes.candidatesList}>
                {citizen.citizen.constituency.candidates.map(candidate => this.getPresentableCandidate(candidate))}
            </div>
        </div>);
    }
}

const mapStateToProps = (state) => ({
    citizen: state.citizen,
    electionStatus: state.election.electionStatus
})

const mapActionsToProps = {
    getCitizenByVoterId,
    castVote
}

export default withRouter(connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(CitizenDetailsPage)));