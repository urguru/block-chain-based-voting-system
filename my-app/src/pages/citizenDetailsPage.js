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
        const { classes } = this.props;
        return `${JSON.stringify(this.props.citizen)}`;
    }
}

const mapStateToProps = (state) => ({
    citizen: state.citizen
})

const mapActionsToProps = {
    getCitizenByVoterId
}

export default withRouter(connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(CitizenDetailsPage)));