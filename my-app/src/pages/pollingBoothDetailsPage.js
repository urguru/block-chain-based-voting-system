import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import { getPollingBoothById } from '../actions/pollingBoothActions';
import PollingBoothTable from '../components/PollingBooth';

const styles = {
    pollingBoothDetails: {
        display: "flex",
        boxSizing: "border-box",
        margin: "20px",
        padding: "10px",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    }
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
        const { pollingBooth,classes } = this.props;
        return (pollingBooth.isDataLoaded &&
            <div className={classes.pollingBoothDetails} >
                <CandidateTable pollingBooth={pollingBooth.pollingBooth} />
            </div>);
    }
}

const mapStateToProps = (state) => ({
    pollingBooth: state.pollingBooth
})

const mapActionsToProps = {
    getPollingBoothById
}


export default withRouter(connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PollingBoothDetailsPage)));