import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import _ from 'lodash';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Autocomplete from "@material-ui/lab/Autocomplete";
import constants from '../common/constants';

const styles = {
    searchBox: {
        width: "600px",
        height: "150px",
        boxSizing: "border-box",
        margin: "10px"
    },
    searchBoxTitle: {
        backgroundColor: "#bde0fe",
        width: "100%",
        height: "50px",
        display: "flex",
        justifyContent: "left",
        alignItems: "center",
        paddingLeft: "20px",
        boxSizing: "border-box",
    },
    searchBoxContent: {
        width: "100%",
        height: "100px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: "20px",
        alignItems: "center",
        boxSizing: "border-box",
    },
    searchBoxInput: {
        width: "70%",
        padding: "10px"
    }
}

class SearchBar extends React.Component {
    constructor() {
        super();
        this.state = {
            searchBoxContent: ''
        }
    }

    updateSearchBar = (value) => {
        if (_.isUndefined(value) || _.isNull(value)) {
            value = "";
        }
        this.setState({ searchBoxContent: value })
    }

    render() {
        const { classes } = this.props;
        return (
            <Card className={classes.searchBox} >
                <div className={classes.searchBoxTitle}>
                    <Typography variant="h5">
                        Search {this.props.title}
                    </Typography>
                </div>
                <div className={classes.searchBoxContent}>
                    <div className={classes.searchBoxInput}>
                        <Autocomplete id={this.props.id}
                            freeSolo={this.props.freeSolo}
                            options={this.props.options} name={this.props.id}
                            getOptionLabel={(option) => option}
                            onChange={(e, newValue) => this.updateSearchBar(newValue)}
                            onInputChange={(e, newValue) => this.updateSearchBar(newValue)}
                            renderInput={(params) => <TextField {...params} variant="outlined" label={this.props.title} fullWidth />} />
                    </div>

                    <Button type="submit" disabled={this.state.searchBoxContent.length == 0}
                        to={this.props.link + this.state.searchBoxContent}
                        component={Link} size="large" variant="contained" color="primary" className={classes.Button}>
                        Search
                    </Button>
                </div>
            </Card>
        );
    }
}

const mapStateToProps = (state) => ({
})

const mapActionsToProps = {
}

export default withRouter(connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(SearchBar)));
