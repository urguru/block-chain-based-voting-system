import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';

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
        console.log(this.props.match.params.pollingBoothId)
    }

    render() {
        const { classses } = this.props;
        return "PollingBoothDetailsPage";
    }
}

const mapStateToProps = (state) => ({
})

const mapActionsToProps = {
}

export default withRouter(connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PollingBoothDetailsPage)));