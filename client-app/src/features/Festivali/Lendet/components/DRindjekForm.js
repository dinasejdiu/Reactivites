import React, {  useEffect } from "react";
import { Grid, TextField, withStyles, FormControl, InputLabel, Select, MenuItem, Button, FormHelperText } from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../actions/dRindjek";
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
  vendi: '',
    vendi_Marrjes_Se_Biletes: '',
   cmimi: '',
    kengetari: ''
}

const DRindjekForm = ({ classes, ...props }) => {

    //toast msg.
    const { addToast } = useToasts()

    //validate()
    //validate({studentNameId:'192047769'})
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('Vendi' in fieldValues)
            temp.vendi= fieldValues.vendi ? "" : "This field is required."
        if ('Vendi_Marrjes_Se_Biletes' in fieldValues)
            temp.vendi_Marrjes_Se_Biletes = fieldValues.vendi_Marrjes_Se_Biletes ? "" : "This field is required."
        if ('Cmimi' in fieldValues)
            temp.cmimi = fieldValues.cmimi ? "" : "This field is required."
        if ('Kengetari' in fieldValues)
            temp.kengetari = fieldValues.kengetari ? "" : "This field is required."
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
                addToast("U Shtua koncerti", { appearance: 'success' })
            }
            if (props.currentId === 0)
                props.createDRindjek(values, onSuccess)
            else
                props.updateDRindjek(props.currentId, values, onSuccess)
        }
    }

    useEffect(() => {
        if (props.currentId !== 0) {
            setValues({
                ...props.dRindjekList.find(x => x.id === props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId])

    return (
        <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <TextField
                        name="Vendi"
                        variant="filled"
                        label="Vendi"
                        value={values.vendi}
                        onChange={handleInputChange}
                        {...(errors.vendi && { error: true, helperText: errors.vendi })}
                    />
                    <TextField
                        name="Vendi_Marrjes_Se_Biletes"
                        variant="filled"
                        label="Vendi_Marrjes_Se_Biletes"
                        value={values.vendi_Marrjes_Se_Biletes}
                        onChange={handleInputChange}
                        {...(errors.vendi_Marrjes_Se_Biletes && { error: true, helperText: errors.vendi_Marrjes_Se_Biletes })}
                    />
                    <FormControl variant="filled"
                        className={classes.formControl}
                        {...(errors.Cmimi && { error: true })}
                    >
                        <InputLabel ref={inputLabel}>Cmimi</InputLabel>
                        <Select
                            name="Cmimi"
                            value={values.semestri}
                            onChange={handleInputChange}
                            labelWidth={labelWidth}
                        >
                            <MenuItem value="Cmimi veror ">100</MenuItem>
                            <MenuItem value="Cmimi Dimeror">50</MenuItem>
                        </Select>
                        {errors.cmimi && <FormHelperText>{errors.cmimi}</FormHelperText>}
                    </FormControl>                       
                      
                        {errors.kengetari && <FormHelperText>{errors.kengetari}</FormHelperText>}
                        <TextField
                        name="kengetari"
                        variant="filled"
                        label="kengetari"
                        value={values.kengetari}
                        onChange={handleInputChange}
                        {...(errors.kengetari && { error: true, helperText: errors.kengetari})}
                    />
                   
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
    dRindjekList: state.dRindjek.list
})

const mapActionToProps = {
    createDRindjek: actions.create,
    updateDRindjek: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(DRindjekForm));