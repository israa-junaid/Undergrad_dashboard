const user = require("../models/StudentSchema");
const form = require("../models/FormSchema");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

///CONTROLLER FOR THE signup

const signup = async (req, res) => {
  //getting values from client

  try {
    console.log(req.body);
    const {
      s_name,
      s_email,
      password,
      s_department,
      s_batch,

      s_rollno,
      s_contact,
    } = req.body;
    //checking that if email already exists
    const verify_e = await user.findOne({s_email});

    //******************IF EMAIL EXISTS SEND DUPLICATE STATUS */

    if (verify_e) {
      console.log("email exits");
      return res.status(409).send("email exists");
    }

    const add = await new user({
      id: s_rollno,
      s_name,
      s_email,
      password,
      s_batch,
      s_rollno,
      s_contact,
      s_department,
      // s_members: [{ stu1_id: "1", stu2_id: "2", stu3_id: "3" }],
    });

    //saving in database

    const result = await add.save();
    console.log(result, "the result");
    // console.log(addData.email);
    res.send("Sucess signup");
  } catch (error) {
    res.status(400).send("error hay");
  }
};

//*****  CONTROLER FOR login
const login = async (req, res) => {
  try {
    const {email, pass} = req.body;
    //finding the user if exiss
    const person = await user.findOne({s_email: email});
    // console.log(person, "perspn");
    if (!person) {
      return res.status(404).send("INVALID CREDENTIALS");
    }
    //****if user exists  matching the password */
    const match = await bcrypt.compare(pass, person.password);
    // console.log(match);
    // *********************************IF MATCH CREATE JWT TOKEN TAHT WILL EXPIRES IN 15 MINUTES***//
    if (match) {
      const token = await person.getToken();

      // console.log(token);
      var inFifteenMinutes = new Date(new Date().getTime() + 45 * 60 * 1000);
      // console.log(inFifteenMinutes, "minutes");
      res.cookie("jwt", token, {
        expires: inFifteenMinutes,
      });
      //*******************SENDING THE RESPONSE TO CLIENT IF SUCCCESS */
      console.log(person, "id");
      return res.json({
        personid: person.id,
        name: person.s_name,
        email: person.s_email,
        contact: person.s_contact,
        isSUBMIT: person.isSUBMIT,
        isINVITE: person.isINVITE,
        isACCEPTED: person.isACCEPTED,
        department: person.s_department,
      });
    } else {
      res.cookie("jwt", {}, {maxAge: -1});
      return res.status(401).send("INVALID CREDENTIALS");
    }
  } catch (error) {
    res.clearCookie("jwt");
    res.status(401).send("INVALID CREDENTIALS");
  }
};

//*****CONTROLLER FOR THE MIDDLEWARE ****AUTHENTICATION */
const about = async (req, res) => {
  console.log(req.id, "the id");
  try {
    const result = await user.findOne({id: req.id}, {s_tokens: 0});
    const {
      s_name,
      id,
      s_email,
      s_contact,
      s_department,
      s_batch,
      isSUBMIT,
      isINVITE,
      isACCEPTED,
    } = result;
    if (req.formid) {
      console.log(req.formid, "haina");
      const formdata = await form.findOne({_id: req.formid});
      console.log("@", formdata.mem2.length, "1", formdata.mem1, "yes");
      if (formdata.mem2.length > 0 && formdata.mem3.length > 0) {
        console.log("nothing is null");
        res.json({
          personid: id,
          name: s_name,
          email: s_email,
          contact: s_contact,
          department: s_department,
          batch: s_batch,
          isSUBMIT,
          isINVITE,
          isACCEPTED,
          mem2: formdata.mem2,
          mem3: formdata.mem3,
        });
      } else if (!formdata.mem2 && !formdata.mem3.length) {
        console.log("execute");
        res.json({
          personid: id,
          name: s_name,
          email: s_email,
          contact: s_contact,
          department: s_department,
          batch: s_batch,
          isSUBMIT,
          isINVITE,
          isACCEPTED,
        });
      } else if (formdata.mem2.length == 0) {
        console.log("mem2 is 0");
        res.json({
          personid: id,
          name: s_name,
          email: s_email,
          contact: s_contact,
          department: s_department,
          batch: s_batch,
          isSUBMIT,
          isINVITE,
          isACCEPTED,
          mem2: formdata.mem3,
          //  mem3: formdata.mem3,
        });
      } else if (formdata.mem3.length == 0) {
        console.log("mem3 is 0");
        res.json({
          personid: id,
          name: s_name,
          email: s_email,
          contact: s_contact,
          department: s_department,
          batch: s_batch,
          isSUBMIT,
          isINVITE,
          isACCEPTED,
          mem2: formdata.mem2,
          //  mem3: formdata.mem3,
        });
      }
    } else {
      console.log("there is no form id");
      res.json({
        personid: id,
        name: s_name,
        email: s_email,
        contact: s_contact,
        department: s_department,
        batch: s_batch,
        isSUBMIT,
        isINVITE,
        isACCEPTED,
      });
    }

    // res.send("hello");
    // res.send("300");
  } catch (error) {
    res.status(401).json({error: "ajaj"});
  }
};
module.exports = {login, signup, about};
