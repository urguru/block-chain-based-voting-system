import React from 'react';
import _ from 'lodash';
import { addCitizen } from '../actions/citizenActions';
import withStyles from '@material-ui/core/styles/withStyles';

// MUI Stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Autocomplete from "@material-ui/lab/Autocomplete";

//Redux
import { connect } from 'react-redux';
import constants from '../common/constants';

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
            voterId: '',
            name: '',
            gender: '',
            constituencyId: '',
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const citizen = {
            voterId: this.state.voterId,
            name: this.state.name,
            gender: this.state.gender,
            constituencyId: this.state.constituencyId,
        }
        this.props.addCitizen(citizen, this.props);
    }

    handleChange = (event) => {
        if (event.target.name == "voterId") {
            event.target.value = _.toUpper(event.target.value);
        }
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const { classes } = this.props
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
                        {/* Gender */}
                        <Autocomplete id="gender"
                            options={_.values(constants.gender)} name="gender"
                            getOptionLabel={(option) => option}
                            onChange={(e, newValue) => this.setState({ gender: newValue })}
                            renderInput={(params) => <TextField {...params} label="Gender" fullWidth />} />
                        {/* Constituency ID */}
                        <Autocomplete id="constituencyId"
                            options={_.values(this.props.contract.constituencies.map(item => item[0]))} name="constituencyId"
                            getOptionLabel={(option) => option}
                            onChange={(e, newValue) => this.setState({ constituencyId: newValue })}
                            renderInput={(params) => <TextField {...params} label="Constituency ID" fullWidth />} />
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
    admin: state.admin,
    contract: state.contract,
})

const mapActionsToProps = {
    addCitizen,
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(AddCitizen));