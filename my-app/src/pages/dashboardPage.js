import React from 'react';
import _ from 'lodash';
import InformationCard from '../components/InformationCard';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import { loadContractData } from '../actions/contractActions';

const styles = {
    numbers: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around"
    }
}

class DashboardPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.loadContractData();
    }

    render() {
        console.log(this.props.contract)
        const { classes, contract } = this.props;
        return (
            <div className={classes.numbers}>
                <InformationCard value={_.toUpper(this.props.electionText)} text={"Election Status"} link={null} />
                <InformationCard value={contract.totalCitizens} text={"Registered voters"} link={null} />
                {contract.constituencies && <InformationCard value={contract.constituencies.length} text={"Total constituencies"} link={null} />}
                {contract.candidates && <InformationCard value={contract.candidates.length} text={"Total candidates"} link={null} />}
                {contract.pollingBooths && <InformationCard value={contract.pollingBooths.length} text={"Total polling booths"} link={null} />}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    contract: state.contract,
    electionText: state.election.electionStatus.text
})

const mapActionsToProps = {
    loadContractData
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(DashboardPage));