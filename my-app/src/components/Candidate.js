import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import constants from '../common/constants';
import TableCard from './Table';
import { getVotesForTheCandidate, calculateCandidateRank, getContestingConstituencyOfCandidate } from '../common/utils';

const styles = {
}

class CandidateCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    getTableItems = () => {
        const { candidate, electionStatus, contract } = this.props;
        const tableList = [];
        const contestingConstituency = getContestingConstituencyOfCandidate(candidate.voterId, contract.candidates);
        tableList.push(["Name", candidate.citizen.name]);
        tableList.push(["Voter Id", candidate.voterId]);
        tableList.push(["Gender", candidate.citizen.gender]);
        tableList.push(["Home Constituency", candidate.citizen.constituency.name]);
        tableList.push(["Contesting Constituency", contestingConstituency]);
        if (electionStatus.text == constants.electionStatus.COMPLETED.text) {
            const databaseTotalVoteCount = candidate.otherVoteCount + candidate.femaleVoteCount + candidate.maleVoteCount;
            const contractTotalVoteCount = getVotesForTheCandidate(candidate.voterId, contract.candidates, contract.voteCountArray);
            const candidateRank = calculateCandidateRank(candidate.voterId, contestingConstituency, contract.candidates, contract.voteCountArray);
            tableList.push(["Male Vote Count", candidate.maleVoteCount]);
            tableList.push(["Female Vote Count", candidate.femaleVoteCount]);
            tableList.push(["Others Vote Count", candidate.otherVoteCount]);
            tableList.push(["Database Total Vote Count", databaseTotalVoteCount]);
            tableList.push(["Smart contract Total Vote Count", contractTotalVoteCount]);
            tableList.push(["Rank in constituency", candidateRank]);
        }
        return tableList;
    }

    render() {
        return (
            <TableCard title="Candidate Details" lists={this.getTableItems()} />
        )
    }
}

const mapStateToProps = (state) => ({
    electionStatus: state.election.electionStatus,
    contract: state.contract
})

const mapActionsToProps = {
}

export default withRouter(connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(CandidateCard)));