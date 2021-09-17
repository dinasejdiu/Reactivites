import React, {useState,useEffect} from "react";
import axios from 'axios';
import * as yup from 'yup';
import {useFormik} from "formik";
import {Box, Button, Grid, IconButton, Link, TextField, Typography, useTheme,} from "@material-ui/core";
import { DataGrid } from '@material-ui/data-grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';


const validationSchema = yup.object({
    Student_Name: yup
        .string("Student Name")
        .min(2, "Student name should be at least 2 characters")
        .max(42, "Student name should be less than 42 characters")
        .required("Student name is required"),
    Semestri: yup
        .string("semestri")
        .required("semestri name is required"),
    Email: yup
        .string("Enter student email address")
        .email()
        .required("email is required"),
    Profesori: yup
        .string("profesori Name")
        .min(2, "profesori name should be at least 2 characters")
        .max(42, "profesori name should be less than 42 characters")
        .required("profesori name is required"),
});

export default function MainForm(props) {

    const [list , setList ] = useState([]);
    const [refresh , setRefresh ] = useState(0);
    const [editState , setEditState] = useState(false);
    const [editStateID , setEditStateID] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:52820/api/dcandidate')
        .then((res)=>{
            console.log(res.data);
            setList([]);
            setList(res.data);
        })
    }, [refresh])

    const formik = useFormik({
        initialValues: {
            Student_Name: '',
            Email: '',
            Semestri: '',
            Lenda: '',
            Profesori: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            if(editState){
                axios.put("http://localhost:52820/api/dcandidate/"+editStateID,values)
                .then((res)=>{
                    console.log(res.data);
                    setRefresh(refresh+1);
                    setEditState(false);
                    setEditStateID(0);
                    formik.values.Student_Name = '';
                    formik.values.Semestri = '';
                    formik.values.Email ='';
                    formik.values.Profesori = '';
                    formik.values.Lenda = '';
                })
            }else{
                axios.post("http://localhost:52820/api/dcandidate",values)
                .then((res)=>{
                    console.log(res.data);
                    formik.resetForm();
                    setRefresh(refresh+1);
                })
            }
            formik.resetForm();
        },
        
    });
    

    const handleEdit = (props) =>{
        setEditState(true);
        setEditStateID(props.id);
        formik.values.Student_Name = props.student_Name;
        formik.values.Semestri = props.semestri;
        formik.values.Email = props.email;
        formik.values.Profesori = props.profesori;
        formik.values.Lenda = props.lenda;
    
    }



    return (
        <React.Fragment>
            <Box p={4}>
            <Grid container>
                
                <Grid item md={6} xs={12}>
                    
                        <form className={"classes.loginForm"} onSubmit={formik.handleSubmit}>
                        <Box p={1}>

                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <TextField id="Student_Name"
                                                   label={"Student name"}
                                                   variant="outlined"
                                                   fullWidth
                                                   name={"Student_Name"}
                                                   value={formik.values.Student_Name}
                                                   onChange={formik.handleChange}
                                                   error={formik.touched.Student_Name && Boolean(formik.errors.Student_Name)}
                                                   helperText={formik.touched.Student_Name && formik.errors.Student_Name}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField id="Semestri"
                                                   label={"Semestri"}
                                                   variant="outlined"
                                                   fullWidth
                                                //    type={"number"}
                                                   name={"Semestri"}
                                                   value={formik.values.Semestri}
                                                   onChange={formik.handleChange}
                                                   error={formik.touched.Semestri && Boolean(formik.errors.Semestri)}
                                                   helperText={formik.touched.Semestri && formik.errors.Semestri}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField id="Email"
                                                   label={"Email Address"}
                                                   variant="outlined"
                                                   fullWidth
                                                   name={"Email"}
                                                   value={formik.values.Email}
                                                   onChange={formik.handleChange}
                                                   error={formik.touched.Email && Boolean(formik.errors.Email)}
                                                   helperText={formik.touched.Email && formik.errors.Email}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField id="Profesori"
                                                   label={"Profesori"}
                                                   variant="outlined"
                                                   fullWidth
                                                   name={"Profesori"}
                                                   value={formik.values.Profesori}
                                                   onChange={formik.handleChange}
                                                   error={formik.touched.Profesori && Boolean(formik.errors.Profesori)}
                                                   helperText={formik.touched.Profesori && formik.errors.Profesori}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField id="Lenda"
                                                   label={"Lenda"}
                                                   variant="outlined"
                                                   fullWidth
                                                   name={"Lenda"}
                                                   value={formik.values.Lenda}
                                                   onChange={formik.handleChange}
                                                   error={formik.touched.Lenda && Boolean(formik.errors.Lenda)}
                                                   helperText={formik.touched.Lenda && formik.errors.Lenda}
                                        />
                                    </Grid>
                                    
                                    <Box p={1}>
                                    <Button variant="contained"
                                            color="secondary"
                                            size="large"
                                            // disabled={loading}
                                            type={"submit"}
                                            fullWidth={true}
                                    >
                                        { editState ? "Edit" : "Create"}
                                    </Button>
                                    </Box>
                                    <Box p={1}>
                                    <Button variant="contained"
                                            color="primary"
                                            size="large"
                                            // disabled={loading}
                                            fullWidth={true}
                                            onClick={()=>{
                                                formik.resetForm();
                                            }}
                                    >
                                        Reset
                                    </Button>
                                    </Box>
                                    
                                </Grid>
                        </Box>
                        </form>

                </Grid>
            
            </Grid>
            <Box p={4} >
            <TableContainer component={Paper}>
                <Table className={"classes.table"} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="center">Emri i Studentit</TableCell>
                        <TableCell align="center">Lenda</TableCell>
                        <TableCell align="center">Profesori</TableCell>
                        <TableCell align="center"> </TableCell>
                        <TableCell align="center"> </TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {list.map((row) => (
                        <TableRow key={row.id}>
                        <TableCell component="th" scope="row">
                            {row.id}
                        </TableCell>
                        <TableCell align="center">{row.student_Name}</TableCell>
                        <TableCell align="center">{row.lenda}</TableCell>
                        <TableCell align="center">{row.profesori}</TableCell>
                        <TableCell align="center"><Button
                         variant="contained"
                         color="red"
                         className={"classes.button"}
                         startIcon={<EditIcon />}
                         onClick={()=>{
                            handleEdit(row);
                         }}
                        >Edit
                        
                        </Button>
                        
                        </TableCell>
                        <TableCell align="center"><Button
                         variant="contained"
                         color="red"
                         className={"classes.button"}
                         startIcon={<DeleteIcon />}
                        onClick={()=>{
                            axios.delete('http://localhost:52820/api/dcandidate/'+row.id)
                            setRefresh(refresh+1);
                        }}
                        > Delete
                        
                        </Button>
                        
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                
            </TableContainer>
            </Box>
            </Box>            
        </React.Fragment>
    );

}