import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import { getCitizenByVoterId } from '../actions/citizenActions';

const styles = {
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
        console.log(voterId);
        this.props.getCitizenByVoterId(voterId, this.props);
    }

    render() {
        const { classses } = this.props;
        return "CitizenDetailsPage";
    }
}

const mapStateToProps = (state) => ({
})

const mapActionsToProps = {
    getCitizenByVoterId
}

export default withRouter(connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(CitizenDetailsPage)));