import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = {
}

class CitizenDetailsPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            voterId: ''
        }
    }

    componentDidMount() {
        console.log(this.props.match.params.voterId)
    }

    render() {
        const { classses } = this.props;
        return "CitizenDetailsPage";
    }
}

const mapStateToProps = (state) => ({
})

const mapActionsToProps = {
}

export default withRouter(connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(CitizenDetailsPage)));