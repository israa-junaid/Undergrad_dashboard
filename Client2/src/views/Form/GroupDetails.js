import React, {useState, useContext, useEffect} from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
// import Table from "./Table";
import {makeStyles} from "@material-ui/core/styles";
//import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import axios from "axios";
//import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {FORM_DATA} from "../../ReduxStore/Actions";
import {useDispatch,connect} from "react-redux";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import {StudentDataContext} from "../../Context/StudentContext.js";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  formControl: {
    margin: theme.spacing(3),
  },
  formControl2: {
    margin: theme.spacing(0),
    minWidth: 220,
  },
  // selectEmpty: {
  //   marginTop: theme.spacing(2),
  // },
}));

function GroupDetails({id, isSUBMIT, isINVITE, isACCEPTED}) {
  const [memberSeatNo2, setMemberSeatNo2] = useState("");
  const [memberName2, setMemberName2] = useState("");
  const [memberEmail2, setMemberEmail2] = useState("");
  const dispatch = useDispatch();
  const classes = useStyles();
  const value = useContext(StudentDataContext);
  const {
    mem1,
    setmem1,
    mem2,
    setmem2,
    mem3,
    setmem3,
    val,
    setval,
    handleChange,
    handleGroup,
    list,
  } = value;
  const {group_count} = val;
  const [bool, setbool] = useState(0);
  // console.log(val);
  const display = () => {
    if (bool === 0) {
      // console.log("group count is 3");
      const name = "group_count";
      const value = 3;
      setval((ev) => {
        return {...ev, [name]: value};
      });
      setbool(1);
    } else {
      // console.log("group count is 2");
      const name = "group_count";
      const value = 2;
      setval((ev) => {
        return {...ev, [name]: value};
      });
      setbool(0);
    }
  };
  // console.log(bool);

  const [std1, setStd1] = useState({
    name1: "",
    rollno1: "",
    contactno1: "",
    email1: "",
  });
  const [std2, setStd2] = useState({
    name2: "",
    rollno2: "",
    contactno2: "",
    email2: "",
  });
  const [std3, setStd3] = useState({
    name3: "",
    rollno3: "",
    contactno3: "",
    email3: "",
  });

  // ******************************** HANDLE CHANGE FOR SELECT BOX AND TO UPDATE VALUES
  const handleSelectChangeOf = async (e, value) => {
    // console.log(e, value);
    axios
      .get(`/studentof/${value}`)
      .then((res) => {
        if (e == 1) {
          setmem1({
            email: res.data.email,
            contact: res.data.contact,
          });
          // console.log(mem1);
          const name = "stu1_id";
          const value = res.data.id;

          setval((ev) => {
            return {...ev, [name]: value};
          });
        }
        if (e == 2) {
          setmem2({
            email: res.data.email,
            contact: "0333333333",
          });

          const name = "stu2_id";

          const value = res.data.id;
          setval((ev) => {
            return {...ev, [name]: value};
          });
        }
        if (e == 3) {
          setmem3({
            email: res.data.email,
            contact: res.data.contact,
          });

          const name = "stu3_id";

          const value = res.data.id;

          setval((ev) => {
            // console.log(ev);
            return {...ev, [name]: value};
          });
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  // const FormData = async () => {
  //   console.log("GROUP DATA ID: "+id);
  //   await axios
  //     .get(`/student/getformdata/${id}`)
  //     .then((res) => {
  //       console.log("DATA SHOULD BE GIVEN: ",id);
  //       const {student,name,email,seatno}=res.data;

  //       //console.log("FORM DATA MEMBER COUNT: ", res.data);
  //       const mem2SeatNo = res.data.student[1].seatno;
  //       setMemberSeatNo2(mem2SeatNo);
  //       const mem2Name = res.data.student[1].name;
  //       setMemberName2(mem2Name);
  //       const mem2Email = res.data.student[1].email;
  //       setMemberEmail2(mem2Email);
  //     })
  //     .catch((err) => {
  //       console.log("FORM DATA ERROR");
  //     });
  // };
  const FormData = async () => {
    console.log("FORM DATA ID: " + id);
    await axios
      .get(`/student/getformdata/${id}`)
      .then((res) => {
        console.log("FORM DATA MEMBER COUNT: ", res.data);
        const {project_title, internal, external, student} = res.data;
        const mem2SeatNo = res.data.student[1].seatno;
        setMemberSeatNo2(mem2SeatNo);
        const mem2Name = res.data.student[1].name;
        setMemberName2(mem2Name);
        const mem2Email = res.data.student[1].email;
        setMemberEmail2(mem2Email);
        // console.log("RESPONSE OF FORM DATA API: ", res.data.internal);
        // console.log("RESPONSE OF FORM DATA API: ", res.data.external);
        // console.log("RESPONSE OF FORM DATA API: ", res.data.project_title);
        // console.log("RESPONSE OF FORM DATA API: ", res.data.student[1].seatno);
        // ********************************DISPATCHING ACTION IN CASE OF LOGIN SUCCESS****************/
        if (student.length == 1) {
          dispatch({
            type: FORM_DATA,
            payload: {
              s_organization: "",
              mem1: student[0].seatno,
              mem2: "",
              mem3: "",
              mem1_email: student[0].email,
              mem1_name: student[0].name,
              mem1_status: student[0].status,
              mem2_email: "",
              mem2_name: "",
              mem2_status: "",
              mem3_email: "",
              mem3_name: "",
              mem3_status: "",
              s_project_title: project_title,
              s_internal: internal,
              s_external: external,
            },
          });
        } else if (student.length == 2) {
          const mem2 = res.data.student[1].seatno;
          console.log("MEMBER 2 SEATNO.:", mem2);
          dispatch({
            type: FORM_DATA,
            payload: {
              s_organization: "",
              mem1: student[0].seatno,
              mem2: student[1].seatno,
              mem3: "",
              mem1_email: student[0].email,
              mem1_name: student[0].name,
              mem1_status: student[0].status,
              mem2_email: student[1].email,
              mem2_name: student[1].name,
              mem2_status: student[1].status,
              mem3_email: "",
              mem3_name: "",
              mem3_status: "",
              s_project_title: project_title,
              s_internal: internal,
              s_external: external,
            },
          });
        } else if (student.length == 3) {
          
          dispatch({
            type: FORM_DATA,
            payload: {
              s_organization: "",
              mem1: student[0].seatno,
              mem2: student[1].seatno,
              mem3: student[2].seatno,
              mem1_email: student[0].email,
              mem1_name: student[0].name,
              mem1_status: student[0].status,
              mem2_email: student[1].email,
              mem2_name: student[1].name,
              mem2_status: student[1].status,
              mem3_email: student[2].email,
              mem3_name: student[2].name,
              mem3_status: student[2].status,
              s_project_title: project_title,
              s_internal: internal,
              s_external: external,
            },
          });
        }
      })
      .catch((err) => {
        console.log("FORM DATA ERROR");
        // ***dispatching an action in case of LOGIN FAIL
        // dispatch({
        //   type: LOGIN_FAIL,
        //   payload: {
        //     auth: false,
        //     id: "",
        //     name: "",
        //     email: "",
        //     contact: "",
        //     department: "",
        //     isSUBMIT: false,
        //     isACCEPTED: false,
        //     isINVITE: false,
        //   },
        // });
        //history.push("/auth/login");
      });
  };

  useEffect(() => {
    if (isINVITE == true && isSUBMIT == false|| isACCEPTED == true) {
      FormData();
    }
  }, [isACCEPTED,isSUBMIT,isINVITE]);
  //console.log("OUTSIDE THE FUNCTION: ",memberSeatNo2);
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Leader Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={10} sm={5}>
          <TextField
            required
            id="rollno1"
            name="stu1_id"
            value={val.stu1_id}
            // onChange={handleGroup}
            label="Roll No."
            fullWidth
            readOnly
            autoComplete="given-name"
          />
        </Grid>
        <Grid item xs={10} sm={5}>
          <TextField
            required
            id="contactno1"
            name="name"
            value={mem1.name}
            readonly
            label="Name"
            fullWidth
            autoComplete="given-name"
          />
        </Grid>
        <Grid item xs={10} sm={5}>
          <TextField
            required
            id="contactno1"
            name="contactno1"
            value={mem1.contact}
            readonly
            label="Contact Number"
            fullWidth
            autoComplete="given-name"
          />
        </Grid>
        <Grid item xs={10} sm={5}>
          <TextField
            required
            id="email1"
            name="email1"
            label="email"
            value={mem1.email}
            readonly
            fullWidth
            autoComplete="given-name"
          />
        </Grid>
      </Grid>
      <br></br>
      {group_count == 2 || group_count == 3 ? (
        <>
          <Typography variant="h6" gutterBottom>
            Second Member Details
          </Typography>
          <Grid container spacing={3}>
            {memberSeatNo2 ? (
              <>
                <Grid item xs={10} sm={5}>
                  <FormControl className={classes.formControl2}>
                    <InputLabel id="demo-simple-select-label">
                      Select Roll No
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="stu2_id"
                      value={memberSeatNo2}
                      // onChange={handleGroup}
                    >
                      {list.map((v, ind) => {
                        return (
                          <MenuItem value={v.id} key={ind}>
                            {v.id}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={10} sm={5}>
                  <TextField
                    required
                    id="contactno1"
                    name="name"
                    value={memberName2}
                    readonly
                    label="Name"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={10} sm={5}>
                  <TextField
                   
                    id="contactno2"
                    name="contactno2"
                    label="Contact Number"
                    value={mem2.contact}
                    
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={10} sm={5}>
                  <TextField
                    required
                    id="email2"
                    name="email2"
                    label="email"
                    value={memberEmail2}
                    readonly
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
              </>
            ) : (
              <>
                {console.log("IM HERE")}
                <Grid item xs={10} sm={5}>
                  <FormControl className={classes.formControl2}>
                    <InputLabel id="demo-simple-select-label">
                      Select Roll No
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="stu2_id"
                      value={val.stu2_id}
                      onChange={handleGroup}
                    >
                      {list.map((v, ind) => {
                        return (
                          <MenuItem value={v.id} key={ind}>
                            {v.id}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={10} sm={5}>
                  <TextField
                    required
                    id="contactno1"
                    name="name"
                    value={mem2.name}
                    readonly
                    label="Name"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={10} sm={5}>
                  <TextField
                  
                    id="contactno2"
                    name="contactno2"
                    label="Contact Number"
                    value={mem2.contact}
                   
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={10} sm={5}>
                  <TextField
                    required
                    id="email2"
                    name="email2"
                    label="email"
                    value={mem2.email}
                    readonly
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
              </>
            )}
          </Grid>
        </>
      ) : (
        ""
      )}
      <br></br>
      {group_count == 3 ? (
        <>
          <Typography variant="h6" gutterBottom>
            Third Member Details
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={10} sm={5}>
              <FormControl className={classes.formControl2}>
                <InputLabel id="demo-simple-select-label">
                  Select Roll No
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="stu3_id"
                  value={val.stu3_id}
                  onChange={handleGroup}
                >
                  {list.map((v, ind) => {
                    return (
                      <MenuItem value={v.id} key={ind}>
                        {v.id}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              {/* <TextField
                required
                id="rollno3"
                name="stu3_id"
                value={val.stu3_id}
                onChange={handleGroup}
                label="Roll No."
                fullWidth
                autoComplete="given-name"
              /> */}
            </Grid>
            <Grid item xs={10} sm={5}>
              <TextField
                required
                id="contactno1"
                name="name"
                value={mem3.name}
                readonly
                label="Name"
                fullWidth
                autoComplete="given-name"
              />
            </Grid>
            <Grid item xs={10} sm={5}>
              <TextField
                required
                id="contactno3"
                name="contactno3"
                label="Contact Number"
                value={mem3.contact}
                readonly
                fullWidth
                autoComplete="given-name"
              />
            </Grid>
            <Grid item xs={10} sm={5}>
              <TextField
                required
                id="email3"
                name="email3"
                label="email"
                value={mem3.email}
                readonly
                fullWidth
                autoComplete="given-name"
              />
            </Grid>
          </Grid>
        </>
      ) : (
        ""
      )}
    </React.Fragment>
  );
}

function mapStateToProps({DataRed: {id, isSUBMIT, isINVITE, isACCEPTED}}) {
  return {
    id: id,
    isSUBMIT: isSUBMIT,
    isINVITE: isINVITE,
    isACCEPTED: isACCEPTED,
  };
}
export default connect(mapStateToProps)(GroupDetails);
