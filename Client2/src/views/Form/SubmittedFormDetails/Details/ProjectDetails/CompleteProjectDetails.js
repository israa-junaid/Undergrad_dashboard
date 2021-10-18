import React,{useState} from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import { blueGrey } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import { useEffect } from 'react';
import axios from "axios";
import {useDispatch, connect, useSelector} from "react-redux";
const footer = blueGrey[50];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
    
  },
});

const SubmittedFormDetails = ({id,member1,member2,member3,mem1_email,mem1_name,mem1_status,
  mem2_email,
   mem2_name,
   mem2_status,
 
    mem3_email,
   mem3_name,
   mem3_status,
   s_project_title,
   s_internal,
   s_external}) => {
  const classes = useStyles();
  const [data, setdata] = useState([]);
  const [details , setDetails] = useState({
    title: "" , description:"" , internal:"" , external:""
  })


  const projectDescription = async () => {
    await axios
      .get(`/student/getformdata/${id}`)
      .then((res) => {
        const {
          project_title,
          internal,
          external,
        } = res.data;

        setDetails({
          title: project_title , 
          description:"Our project is designed to manage different activites conducted during fyp evaluations throughout the year. People engaged during the process like: Students, Internal Advisor, Chairman, Departmental committee; can manage their activities easily." , 
          internal:internal , external:external
        })
      })
      .catch((err) => {
        console.log("FORM DATA ERROR");
      });
  };
  useEffect(() => {
    projectDescription();
  }, []);


  return (
        <>
  
        <TableBody>
          <TableRow bgcolor={`${footer}`}>
            <TableCell rowSpan={4} />
            <TableCell colSpan={2}>Project Title: </TableCell>
            <TableCell align="right" colSpan={2}>{s_project_title}</TableCell>
          </TableRow>
          <TableRow bgcolor={`${footer}`}>
            <TableCell colSpan={2}>Project Description</TableCell>
            <TableCell align="right" colSpan={2}>{details.description}</TableCell>
          </TableRow>
          <TableRow bgcolor={`${footer}`}>
            <TableCell colSpan={2}>Internal Advisor</TableCell>
            <TableCell align="right" colSpan={2}>{s_internal}</TableCell>
          </TableRow>
          <TableRow bgcolor={`${footer}`}>
            <TableCell colSpan={2}>External Advisor</TableCell>
            <TableCell align="right" colSpan={2}>{s_external}</TableCell>
          </TableRow>
        </TableBody>

        </>
  );
}
function mapStateToProps({DataRed: {id},FormRed:{mem1,mem2,mem3,mem1_email,mem1_name,mem1_status,
  mem2_email,
   mem2_name,
   mem2_status,
 
    mem3_email,
   mem3_name,
   mem3_status,
   s_project_title,
   s_internal,
   s_external}}) {
console.log("MEM1:",mem1);
  return {id: id,member1:mem1,member2:mem2,member3:mem3,mem1_email,mem1_name,mem1_status,
    mem2_email,
     mem2_name,
     mem2_status,
   
      mem3_email,
     mem3_name,
     mem3_status,
     s_project_title,
     s_internal,
     s_external}
}
export default connect(mapStateToProps)(SubmittedFormDetails);