import React from 'react';
import _ from 'lodash';
import withStyles from '@material-ui/core/styles/withStyles';
import { addCandidate } from '../actions/candidateActions'

// MUI Stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

//Redux
import { connect } from 'react-redux';

const styles = {
    form: {
        textAlign: 'center'
    },
    formImage: {
        width: 60,
        margin: "10px auto",
    },
    pageTitle: {
        margin: "10px auto"
    },
    textField: {
        margin: "10px auto"
    },
    Button: {
        marginTop: 20,
        position: 'relative'
    },
    customError: {
        color: "red",
        fontSize: "0.8rem",
        margin: "10v auto"
    }
}

class AddCandidate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            voterId: '',
            contestingConstituencyId: '',
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const candidate = {
            voterId: this.state.voterId,
            contestingConstituencyId: this.state.contestingConstituencyId,
        }
        this.props.addCandidate(candidate, this.props);
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: _.toUpper(event.target.value)
        })
    }

    render() {
        const { classes } = this.props
        const { error } = this.state
        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm>
                    <Typography variant="h3" className={classes.pageTitle}>
                        Add Candidate
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField id='voterId' name='voterId' type='text' label="Voter ID" className={classes.textField} value={this.state.voterId} onChange={this.handleChange} fullWidth />
                        <TextField id='contestingConstituencyId' name='contestingConstituencyId' type='text' label="Contesting Constituency ID" value={this.state.contestingConstituencyId} onChange={this.handleChange} fullWidth />
                        <Button type="submit" variant="contained" color="primary" className={classes.Button}>
                            Add Candidate
                        </Button>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
})

const mapActionsToProps = {
    addCandidate,
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(AddCandidate));