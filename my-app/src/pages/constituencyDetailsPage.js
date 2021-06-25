import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import { getConstituencyById } from '../actions/constituencyAction';

const styles = {
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
        const { classses } = this.props;
        return "ConstituencyDetailsPage";
    }
}

const mapStateToProps = (state) => ({
})

const mapActionsToProps = {
    getConstituencyById
}

export default withRouter(connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ConstituencyDetailsPage)));