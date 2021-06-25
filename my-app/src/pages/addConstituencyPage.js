import React from 'react';
import _ from 'lodash';
import withStyles from '@material-ui/core/styles/withStyles';
import { addConstituency } from '../actions/constituencyAction';

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

class AddConstituency extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            constituencyId: '',
            name: '',
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const constituency = {
            constituencyId: this.state.constituencyId,
            name: this.state.name,
        }
        this.props.addConstituency(constituency, this.props);
    }

    handleChange = (event) => {
        if (event.target.name == "constituencyId") {
            event.target.value = _.toUpper(event.target.value);
        }
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
                        Add Constituency
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField id='constituencyId'  variant="outlined"  name='constituencyId' type='text' label="Constituency ID" className={classes.textField} value={this.state.constituencyId} onChange={this.handleChange} fullWidth />
                        <TextField id='name' name='name'  variant="outlined"  type='text' label="Name" className={classes.textField} value={this.state.name} onChange={this.handleChange} fullWidth />
                        <Button type="submit" variant="contained" color="primary" className={classes.Button}>
                            Add Constituency
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
    addConstituency
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(AddConstituency));