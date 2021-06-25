import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import { getCandidateByVoterId } from '../actions/candidateActions';
import CandidateTable from '../components/Candidate';

const styles = {
    candidateDetails: {
        display: "flex",
        boxSizing: "border-box",
        margin: "20px",
        padding: "10px",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    }
}

class CandidateDetailsPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            candidateVoterId: ''
        }
    }

    componentDidMount() {
        const candidateVoterId = this.props.match.params.candidateVoterId;
        console.log(candidateVoterId);
        this.props.getCandidateByVoterId(candidateVoterId, this.props);
    }

    render() {
        const { candidate, classes } = this.props;
        return (candidate.isDataLoaded &&
            <div className={classes.candidateDetails} >
                <CandidateTable candidate={candidate.candidate} />
            </div>);
    }
}

const mapStateToProps = (state) => ({
    candidate: state.candidate,
})

const mapActionsToProps = {
    getCandidateByVoterId
}

export default withRouter(connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(CandidateDetailsPage)));