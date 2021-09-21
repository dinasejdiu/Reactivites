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
        axios.get('http://localhost:5000/api/kengetari')
        .then((res)=>{
            console.log(res.data);
            setList([]);
            setList(res.data);
        })
    }, [refresh])

    const formik = useFormik({
        initialValues: {
            Emri: '',
            Mbiemri: '',
            Date: '',
            Profesioni: '',
          
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            if(editState){
                axios.put("http://localhost:5000/api/kengetari"+editStateID,values)
                .then((res)=>{
                    console.log(res.data);
                    setRefresh(refresh+1);
                    setEditState(false);
                    setEditStateID(0);
                    formik.values.Emri = '';
                    formik.values.Mbiemri = '';
                    formik.values.Date ='';
                    formik.values.Profesioni = '';
            
                })
            }else{
                axios.post("http://localhost:5000/api/kengetari",values)
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
        formik.values.Emri = props.emri;
        formik.values.Mbiemri = props.mbiemri;
        formik.values.Date = props.date;
        formik.values.Profesioni = props.profesioni;
    
    
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
                                        <TextField id="Emri"
                                                   label={"Emri"}
                                                   variant="outlined"
                                                   fullWidth
                                                   name={"Emri"}
                                                   value={formik.values.Emri}
                                                   onChange={formik.handleChange}
                                                   error={formik.touched.Emri && Boolean(formik.errors.Emri)}
                                                   helperText={formik.touched.Emri && formik.errors.Emri}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField id="Mbiemri"
                                                   label={"Mbiemri"}
                                                   variant="outlined"
                                                   fullWidth
                                                //    type={"number"}
                                                   name={"Mbiemri"}
                                                   value={formik.values.Mbiemri}
                                                   onChange={formik.handleChange}
                                                   error={formik.touched.Mbiemri && Boolean(formik.errors.Mbiemri)}
                                                   helperText={formik.touched.Mbiemri && formik.errors.Mbiemri}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField id="Date"
                                                   label={"Date "}
                                                   variant="outlined"
                                                   fullWidth
                                                   name={"Date"}
                                                   value={formik.values.Date}
                                                   onChange={formik.handleChange}
                                                   error={formik.touched.Date && Boolean(formik.errors.Date)}
                                                   helperText={formik.touched.Date && formik.errors.Date}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField id="Profesioni"
                                                   label={"Profesioni"}
                                                   variant="outlined"
                                                   fullWidth
                                                   name={"Profesioni"}
                                                   value={formik.values.Profesioni}
                                                   onChange={formik.handleChange}
                                                   error={formik.touched.Profesioni && Boolean(formik.errors.Profesioni)}
                                                   helperText={formik.touched.Profesioni && formik.errors.Profesioni}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                       
                                    </Grid>
                                    
                                    <Box p={1}>
                                    <Button variant="contained"
                                            color="secondary"
                                            size="large"
                                            // disabled={loading}
                                            type={"submit"}
                                            fullWidth={true}
                                    >
                                     
                                        { editState ? "Edit" : "Shto Kengetarin"}
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
                                      Anulo
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
                        <TableCell align="center">Emri </TableCell>
                        <TableCell align="center">Mbiemri</TableCell>
                        <TableCell align="center">Profesioni</TableCell>
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
                        <TableCell align="center">{row.emri}</TableCell>
                        <TableCell align="center">{row.mbiemri}</TableCell>
                        <TableCell align="center">{row.profesioni}</TableCell>
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
                            axios.delete('http://localhost:5000/api/kengetari'+row.id)
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