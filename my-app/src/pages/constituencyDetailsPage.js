import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import { getConstituencyById } from '../actions/constituencyAction';
import ConstituencyCard from '../components/Constituency';
import CandidateCard from '../components/Candidate';

const styles = {
    constituencyDetails: {
        display: "flex",
        boxSizing: "border-box",
        margin: "20px",
        padding: "10px",
        flexDirection: "row",
        justifyContent: "space-around",
        flexWrap: "wrap",
        alignItems: "center",
    },
    constituencyCard: {
        margin: "10px"
    },
    candidateCards: {
        width: "600px",
        display: "flex",
        boxSizing: "border-box",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-around",
    }
}

class ConstituencyDetailsPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            constituencyId: ''
        }
    }

    componentDidMount() {
        const constituencyId = this.props.match.params.constituencyId;
        this.props.getConstituencyById(constituencyId, this.props);
    }

    render() {
        const { classes } = this.props;
        const { constituency, isDataLoaded } = this.props.constituency;
        return (isDataLoaded && <div className={classes.constituencyDetails}>
            <div className={classes.constituencyCard}>
                <ConstituencyCard constituency={this.props.constituency.constituency}
                    contractConstituency={this.props.constituency.contractConstituency} />
            </div>
            <div className={classes.candidateCards}>
                {constituency.candidates.map(candidate =>
                    <CandidateCard candidate={candidate} needVoteButton={false} />)}
            </div>
        </div>);
    }
}

const mapStateToProps = (state) => ({
    constituency: state.constituency
})

const mapActionsToProps = {
    getConstituencyById
}

export default withRouter(connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ConstituencyDetailsPage)));