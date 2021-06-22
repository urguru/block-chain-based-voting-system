import React from 'react';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import _ from 'lodash';
import Modal from '@material-ui/core/Modal';

const styles = {
    paper: {
        position: "absolute",
        width: "600px",
        height:"200px",
        backgroundColor: "#f5f5f5",
        border: "2px solid #000",
        boxShadow: "1px",
        padding: "5px",
        top:"50%",
        left:"50%",
        transform:"translate(-50%,-50%)",
        borderRadius:"5px",
    },
}

class MainLoadingWindow extends React.Component {
    constructor() {
        super();
        this.state = {
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <Modal open={false}>
                <div className={classes.paper}>
                    hellow world
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => ({
    ui: state.ui
})

const mapActionsToProps = {
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(MainLoadingWindow));
