import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import TableCard from '../components/Table';

const styles = {
}

class CitizenCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    getTableItems = () => {
        const { citizen } = this.props;
        const tableList = [];
        tableList.push(["Name", citizen.name]);
        tableList.push(["Voter Id", citizen.voterId]);
        tableList.push(["Gender", citizen.gender]);
        tableList.push(["Constituency", citizen.constituency.name]);
        tableList.push(["Voted", citizen.hasVoted ? "Yes" : "No"]);
        if (citizen.hasVoted) {
            tableList.push(["VotedAt", citizen.timeVotedAt]);
            tableList.push(["Location", citizen.pollingBooth.name]);
        }
        return tableList;
    }

    componentDidMount() {
    }

    render() {
        const { classes } = this.props;
        return (<TableCard title="Citizen Details" lists={this.getTableItems()} />)
    }
}

const mapStateToProps = (state) => ({
})

const mapActionsToProps = {
}

export default withRouter(connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(CitizenCard)));