import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';

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
        console.log(this.props.match.params.candidateVoterId)
    }

    render() {
        const { classses } = this.props;
        return "CandidateDetailsPage";
    }
}

const mapStateToProps = (state) => ({
})

const mapActionsToProps = {
}

export default withRouter(connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(CandidateDetailsPage)));