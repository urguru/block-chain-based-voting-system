import React from 'react';
import _ from 'lodash';
import InformationCard from '../components/InformationCard';
import SearchBar from '../components/SearchBar';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import { loadContractData, contractNeedsReload } from '../actions/contractActions';

const styles = {
    numbers: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around"
    },
    searchBoxes: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        margin: "10px 0"
    }
}

class DashboardPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.contract.isContractNeedsReload) {
            this.props.loadContractData();
        }
        this.props.contractNeedsReload();
    }

    render() {
        console.log(this.props.contract)
        const { classes, contract } = this.props;
        return (
            contract.isContractLoaded &&
            <div>
                <div className={classes.numbers}>
                    <InformationCard value={_.toUpper(this.props.electionText)} text={"Election Status"} link={null} />
                    <InformationCard value={contract.totalCitizens} text={"Registered voters"} link={null} />
                    <InformationCard value={contract.constituencies.map(a => parseInt(a[1])).reduce((s, p) => s + p)} text={"Votes Casted"} link={null} />
                    <InformationCard value={contract.constituencies.length} text={"Total constituencies"} link={null} />
                    <InformationCard value={contract.candidates.length} text={"Total candidates"} link={null} />
                    <InformationCard value={contract.pollingBooths.length} text={"Total polling booths"} link={null} />
                </div>
                <div className={classes.searchBoxes}>
                    <SearchBar id="constituencyId" title="Constituency" freeSolo={true} options={_.values(contract.constituencies.map(item => item[0]))} link="/constituency/" />
                    <SearchBar id="candidateVoterId" title="Candidate" freeSolo={true} options={_.values(contract.candidates.map(item => item[0]))} link="/candidate/" />
                    <SearchBar id="pollingBoothId" title="Polling Booth" freeSolo={true} options={contract.pollingBooths} link="/pollingBooth/" />
                    {this.props.admin.isLoggedIn && <SearchBar id="citizen" title="Citizen" freeSolo={true} options={[]} link="/citizen/" />}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    admin: state.admin,
    contract: state.contract,
    electionText: state.election.electionStatus.text
})

const mapActionsToProps = {
    loadContractData,
    contractNeedsReload
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(DashboardPage));