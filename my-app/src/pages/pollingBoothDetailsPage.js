import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import { getPollingBoothById } from '../actions/pollingBoothActions';

const styles = {
}

class PollingBoothDetailsPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pollingBoothId: ''
        }
    }

    componentDidMount() {
        const pollingBoothId = this.props.match.params.pollingBoothId;
        this.props.getPollingBoothById(pollingBoothId, this.props)
    }

    render() {
        const { classes } = this.props;
        return `${JSON.stringify(this.props.pollingBooth)}`;
    }
}

const mapStateToProps = (state) => ({
    pollingBooth: state.pollingBooth
})

const mapActionsToProps = {
    getPollingBoothById
}


export default withRouter(connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PollingBoothDetailsPage)));