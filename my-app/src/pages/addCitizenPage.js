import React from 'react';
import _ from 'lodash';
import { addCitizen } from '../actions/citizenActions';
import withStyles from '@material-ui/core/styles/withStyles';

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

class AddCitizen extends React.Component {
    constructor() {
        super();
        this.state = {
            voterId: 'a',
            name: 'a',
            gender: 'a',
            constituencyId: 'a',
            error: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        // if (nextProps.auth.error) {
        //     //this.setState({ error: nextProps.auth.error })
        // } else {
        //     //this.setState({ error: '' })
        // }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const citizen = {
            voterId: this.state.voterId,
            name: this.state.name,
            gender: this.state.gender,
            constituencyId: this.state.constituencyId,
        }
        this.props.addCitizen(citizen);
    }

    handleChange = (event) => {
        console.log(event.target)
        console.log(event.target.name + event.target.value);
        this.setState({
            [event.target.name]: event.target.value
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
                        Add Citizen
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField id='name' name='name' type='text' label="Name" value={this.state.name} onChange={this.handleChange} fullWidth />
                        <TextField id='voterId' name='voterId' type='text' label="Voter ID" className={classes.textField} value={this.state.voterId} onChange={this.handleChange} fullWidth />
                        <TextField id='gender' name='gender' type='text' label="Gender" value={this.state.gender} onChange={this.handleChange} fullWidth />
                        <TextField id='constituencyId' name='constituencyId' type='text' label="Constituency ID" value={this.state.constituencyId} onChange={this.handleChange} fullWidth />
                        {error && <Typography variant="body2" className={classes.customError} >{error}</Typography>}
                        <Button type="submit" variant="contained" color="primary" className={classes.Button}>
                            Add Citizen
                        </Button>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
})

const mapActionsToProps = {
    addCitizen,
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(AddCitizen));