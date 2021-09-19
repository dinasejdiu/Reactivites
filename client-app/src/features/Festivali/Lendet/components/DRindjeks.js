import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/dRindjek";
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button } from "@material-ui/core";
import DRindjekForm from "./DRindjekForm";
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

const DRindjeks = ({ classes, ...props }) => {
    const [currentId, setCurrentId] = useState(0)

    useEffect(() => {
        props.fetchAllDRindjeks()
    }, [])//componentDidMount
    
    //toast msg.
    const { addToast } = useToasts()

    const onDelete = id => {
        if (window.confirm('A jeni i sigurtë që dëshironi ta fshini festivalin?'))
            props.deleteDRindjek(id,()=>addToast("U fshi me sukses", { appearance: 'info' }))
    }
    return (
        <Paper className={classes.paper} elevation={3}>
            <Grid container>
                <Grid item xs={6}>
                    <DRindjekForm {...({ currentId, setCurrentId })} />
                </Grid>
                <Grid item xs={6}>
                    <TableContainer>
                        <Table>
                            <TableHead className={classes.root}>
                                <TableRow>
                                    <TableCell> Vendi</TableCell>
                                    <TableCell>Vendi_Marrjes_Se_Biletes</TableCell>
                                    <TableCell>cmimi</TableCell>
                                    <TableCell>Kengetari</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.dRindjekList.map((record, index) => {
                                        return (<TableRow key={index} hover>
                                            <TableCell>{record.vendi}</TableCell>
                                            <TableCell>{record.Vendi_Marrjes_Se_Biletes}</TableCell>
                                            <TableCell>{record.Cmimi}</TableCell>
                                            <TableCell>{record.Kengetari}</TableCell>
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
    dRindjekList: state.dRindjek.list
})

const mapActionToProps = {
    fetchAllDRindjeks: actions.fetchAll,
    deleteDRindjek: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(DRindjeks));