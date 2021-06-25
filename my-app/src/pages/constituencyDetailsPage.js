import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';

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
        console.log(this.props.match.params.constituencyId)
    }

    render() {
        const { classses } = this.props;
        return "ConstituencyDetailsPage";
    }
}

const mapStateToProps = (state) => ({
})

const mapActionsToProps = {
}

export default withRouter(connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ConstituencyDetailsPage)));