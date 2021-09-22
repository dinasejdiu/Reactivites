import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/dCandidate";
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button } from "@material-ui/core";
import DCandidateForm from "./DCandidateForm";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';


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
const DCandidates = ({ classes, ...props }) => {
    const [currentId, setCurrentId] = useState(0)

    useEffect(() => {
        props.fetchAllDCandidates()
    }, [])//componentDidMount
    
    //toast msg.
    const { addToast } = useToasts()

    const onDelete = id => {
        if (window.confirm('Are you sure to delete this record?'))
            props.deleteDCandidate(id,()=>addToast("Deleted successfully", { appearance: 'info' }))
    }
    return (
        <Paper className={classes.paper} elevation={3}>
           <Grid  container>
              <Grid iteam xs={6}>
                 <DCandidateForm {...({currentId,setCurrentId})}/>
                   </Grid> 
                     <Grid iteam xs={6}>
                       <TableContainer>
                          <Table>
                            <TableHead className={classes.root}>
                               <TableRow>
                 <TableCell>Emri</TableCell>
                 <TableCell>Mbiemri</TableCell>
                 <TableCell>Profesioni</TableCell>
                 <TableCell></TableCell>
             </TableRow>
         </TableHead>
         <TableBody>
             {
                 props.dCandidateList.map((record,index)=>{
                     return(<TableRow key={index} hover>
                         <TableCell>{record.Emri}</TableCell>
                         <TableCell>{record.Mbiemri}</TableCell>
                         <TableCell>{record.Profesioni}</TableCell>
                         <TableCell>
                             <ButtonGroup variant ="text">
                          <Button><EditIcon color="primary"
                              onClick={() => {setCurrentId(record.id)}} /></Button>
                           <Button><DeleteIcon color="secondary"
                           variant = "contained"
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
const mapStateToProps  = state=>({
        dCandidateList:state.dCandidate.list
    })

const mapActionToProps = {
    fetchAllDCandidates:actions.fetchAll,
    deleteDCandidate: actions.Delete

}

export default connect(mapStateToProps,mapActionToProps)(withStyles(styles)(DCandidates));