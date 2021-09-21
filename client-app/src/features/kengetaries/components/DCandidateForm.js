import React, {  useEffect } from "react";
import { Grid, TextField, withStyles, FormControl, InputLabel, Select, MenuItem, Button, FormHelperText } from "@material-ui/core";
import { connect } from "react-redux";
import * as actions from "../actions/dCandidate";


import * as yup from 'yup';
import {useFormik} from "formik";

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            minWidth: 230,
        }
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 230,
    },
    smMargin: {
        margin: theme.spacing(1)
    }
})

const validationSchema = yup.object({
    student_Name: yup
        .string("Student Name")
        .min(2, "Firstname should be of minimum {0} characters length")
        .max(42, "Firstname should be of minimum {0} characters length")
        .required('Firstname should be of minimum {0} characters length'),

});
const DCandidateForm = ({ classes, ...props }) => {

    const formik = useFormik({
        initialValues: {
            student_Name: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
        
        },
    });
    

    return (
        <form className={classes.root}>
            <Grid container>
                <Grid item xs={6}>
                    <TextField
                        name="Emri"
                        variant="outlined"
                        label="Emri"
                        value={formik.values.emri}
                        onChange={formik.handleChange}
                        error={formik.touched.emri && Boolean(formik.errors.emri)}
                        helperText={formik.touched.emri && formik.errors.emri}
                    />
                    
                </Grid>
                <Grid item xs={6}>

            
                    {}
                    
                    <div>
                        <Button
                            variant="contained"
                            color="secondary"
                            type="submit"
                            className={classes.smMargin}
                        >
                            Submit
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.smMargin}
                            // onClick={resetForm}
                        >
                           Anulo
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </form>
    );
}


const mapStateToProps = state => ({
    dCandidateList: state.dCandidate.list 
})

const mapActionToProps = {
    createDCandidate: actions.create,
    updateDCandidate: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(DCandidateForm));