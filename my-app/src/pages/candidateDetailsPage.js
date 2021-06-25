import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import { getCandidateByVoterId } from '../actions/candidateActions';

const styles = {
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
        this.props.getCandidateByVoterId(candidateVoterId);
    }

    render() {
        const { classses } = this.props;
    }
}

const mapStateToProps = (state) => ({
    candidate: state.candidate,
})

const mapActionsToProps = {
    getCandidateByVoterId
}

export default withRouter(connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(CandidateDetailsPage)));