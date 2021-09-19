import React, {  useEffect } from "react";
import { Grid, TextField, withStyles, FormControl, InputLabel, Select, MenuItem, Button, FormHelperText } from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../actions/semestri";
import { useToasts } from "react-toast-notifications";

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

const initialFieldValues = {
    studentId: '',
    semestri: '',
    qytetiKampus: ''
}

const SemestriForm = ({ classes, ...props }) => {

    //toast msg.
    const { addToast } = useToasts()

    //validate()
    //validate({studentId:'192047769'})
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('studentId' in fieldValues)
            temp.studentNameId = fieldValues.studentId ? "" : "This field is required."
        if ('semestri' in fieldValues)
            temp.semestri = fieldValues.semestri ? "" : "This field is required."
        if ('qytetiKampus' in fieldValues)
            temp.qytetiKampus = fieldValues.qytetiKampus ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, validate, props.setCurrentId)

    //material-ui select
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            const onSuccess = () => {
                resetForm()
                addToast("U paraqit me sukses", { appearance: 'success' })
            }
            if (props.currentId === 0)
                props.createSemestri(values, onSuccess)
            else
                props.updateSemestri(props.currentId, values, onSuccess)
        }
    }

    useEffect(() => {
        if (props.currentId !== 0) {
            setValues({
                ...props.semestriList.find(x => x.id === props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId])

    return (
        <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <TextField
                        name="studentId"
                        variant="filled"
                        label="ID e Studentit"
                        value={values.studentId}
                        onChange={handleInputChange}
                        {...(errors.studentId && { error: true, helperText: errors.studentId })}
                    />
                    <FormControl variant="filled"
                        className={classes.formControl}
                        {...(errors.semestri && { error: true })}
                    >
                        <InputLabel ref={inputLabel}>Semestri</InputLabel>
                        <Select
                            name="semestri"
                            value={values.semestri}
                            onChange={handleInputChange}
                            labelWidth={labelWidth}
                        >
                            <MenuItem value="Semestri I">Semestri I</MenuItem>
                            <MenuItem value="Semestri II">Semestri II</MenuItem>
                            <MenuItem value="Semestri III">Semestri III</MenuItem>
                            <MenuItem value="Semestri IV">Semestri IV</MenuItem>
                            <MenuItem value="Semestri V">Semestri V</MenuItem>
                            <MenuItem value="Semestri VI">Semestri VI</MenuItem>                            
                        </Select>
                        {errors.semestri && <FormHelperText>{errors.semestri}</FormHelperText>}
                    </FormControl>

                    <FormControl variant="filled"
                        className={classes.formControl}
                        {...(errors.qytetiKampus && { error: true })}
                    >
                        <InputLabel ref={inputLabel}>Dega e Kampusit</InputLabel>
                        <Select
                            name="qytetiKampus"
                            value={values.qytetiKampus}
                            onChange={handleInputChange}
                            labelWidth={labelWidth}
                        >
                            <MenuItem value="Prishtina">Prishtina</MenuItem>
                            <MenuItem value="Peja">Peja</MenuItem>
                            <MenuItem value="Lipjani">Lipjani</MenuItem>
                            <MenuItem value="Prizren">Prizren</MenuItem>
                            <MenuItem value="Ferizaj">Ferizaj</MenuItem>
                            <MenuItem value="Gjilan">Gjilan</MenuItem>
                        </Select>
                        {errors.semestri && <FormHelperText>{errors.semestri}</FormHelperText>}
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className={classes.smMargin}
                        >
                            Submit
                        </Button>
                        <Button
                            variant="contained"
                            className={classes.smMargin}
                            onClick={resetForm}
                        >
                            Reset
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </form>
    );
}


const mapStateToProps = state => ({
   semestriList: state.semestri.list
})

const mapActionToProps = {
    createSemestri: actions.create,
    updateSemestri: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(SemestriForm));