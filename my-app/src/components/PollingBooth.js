import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import TableCard from './Table';

const styles = {
}

class PollingBoothCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    getTableItems = () => {
        const {pollingBooth } = this.props;
        const totalVoteCountFromDataBase = pollingBooth.maleVoteCount + pollingBooth.femaleVoteCount + pollingBooth.otherVoteCount;
        const tableList = [];
        tableList.push(["Name", pollingBooth.name]);
        tableList.push(["PollingBoothId", pollingBooth.pollingBoothId]);
        tableList.push(["Male Voter Turnout", pollingBooth.maleVoteCount]);
        tableList.push(["Female Voter Turnout", pollingBooth.femaleVoteCount]);
        tableList.push(["Others Voter Turnout", pollingBooth.otherVoteCount]);
        tableList.push(["Total Vote Count From Database", totalVoteCountFromDataBase]);
        return tableList;
    }

    render() {
        return (
            <TableCard title="Polling Booth Id" lists={this.getTableItems()} />)
    }
}

const mapStateToProps = (state) => ({
})

const mapActionsToProps = {
}

export default withRouter(connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PollingBoothCard)));