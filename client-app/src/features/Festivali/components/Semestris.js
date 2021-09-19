import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/semestri";
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button } from "@material-ui/core";
import SemestriForm from "./SemestriForm";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";



const styles = theme => ({
    root: {
        "& .MuiTableCell-head": {
            fontSize: "1.25rem"
        }
    },
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    }
})

const Semestris = ({ classes, ...props }) => {
    const [currentId, setCurrentId] = useState(0)

    useEffect(() => {
        props.fetchAllSemestris()
    }, [])//componentDidMount
    
    //toast msg.
    const { addToast } = useToasts()

    const onDelete = id => {
        if (window.confirm('A jeni i sigurtë që dëshironi ta fshini lëndën e përzgjedhur për rindjekje?'))
            props.deleteSemestri(id,()=>addToast("U fshi me sukses", { appearance: 'info' }))
    }
    return (
        <Paper className={classes.paper} elevation={3}>
            <Grid container>
                <Grid item xs={6}>
                    <SemestriForm {...({ currentId, setCurrentId })} />
                </Grid>
                <Grid item xs={6}>
                    <TableContainer>
                        <Table>
                            <TableHead className={classes.root}>
                                <TableRow>
                                    <TableCell>Student ID</TableCell>
                                    <TableCell>Semestri</TableCell>
                                    <TableCell>Dega e kampusit</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.semestriList.map((record, index) => {
                                        return (<TableRow key={index} hover>
                                            <TableCell>{record.studentId}</TableCell>
                                            <TableCell>{record.semestri}</TableCell>
                                            <TableCell>{record.qytetiKampus}</TableCell>
                                            <TableCell>
                                                <ButtonGroup variant="text">
                                                    <Button><EditIcon color="primary"
                                                        onClick={() => { setCurrentId(record.id) }} /></Button>
                                                    <Button><DeleteIcon color="secondary"
                                                        onClick={() => onDelete(record.id)} /></Button>
                                                </ButtonGroup>
                                            </TableCell>
                                        </TableRow>)
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Paper>
    );
}

const mapStateToProps = state => ({
    semestriList: state.semestri.list
})

const mapActionToProps = {
    fetchAllSemestris: actions.fetchAll,
    deleteSemestri: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Semestris));