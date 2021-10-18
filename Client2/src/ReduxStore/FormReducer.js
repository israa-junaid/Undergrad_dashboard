import { FORM_DATA } from "./Actions";

const initialstate = {
 
  s_organization: "",
  mem1: "",
  mem2: "",
  mem3: "",
  mem1_email:"",
  mem1_name:"",
  mem1_status:"",
 mem2_email:"",
  mem2_name:"",
  mem2_status:"",

   mem3_email:"",
  mem3_name:"",
  mem3_status:"",
  s_project_title: "",
  s_internal: "",
  s_external: ""
};
export default function FormRed(state = initialstate, action) {
  switch (action.type) {
    case FORM_DATA:
      return {
        ...state,

        s_organization: action.payload.s_organization,
        mem1: action.payload.mem1,
        mem2: action.payload.mem2,
        mem3: action.payload.mem3,
        mem1_email: action.payload.mem1_email,
        mem1_name: action.payload.mem1_name,
        mem1_status: action.payload.mem1_status,
        mem2_email: action.payload.mem2_email,
        mem2_name: action.payload.mem2_name,
        mem2_status: action.payload.mem2_status,
        mem3_email:action.payload.mem3_email,
        mem3_name: action.payload.mem3_name,
        mem3_status: action.payload.mem3_status,
        s_project_title: action.payload.s_project_title,
        s_internal: action.payload.s_internal,
        s_external: action.payload.s_external,
      };

    default:
      return state;
  }
}