import { FORM_DATA } from "./Actions";

const initialstate = {
  id: "",
  mem_count: "",
  s_organization: "",
  mem1: "",
  mem2: "",
  mem3: "",
  s_project_title: "",
  s_internal: "",
  s_external: ""
};
export default function DataRed(state = initialstate, action) {
  switch (action.type) {
    case FORM_DATA:
      return {
        ...state,
        id: action.payload.id,
        mem_count: action.payload.mem_count,
        s_organization: action.payload.s_organization,
        mem1: action.payload.mem1,
        mem2: action.payload.mem2,
        mem3: action.payload.mem3,
        s_project_title: action.payload.s_project_title,
        s_internal: action.payload.s_internal,
        s_external: action.payload.s_external,
      };

    default:
      return state;
  }
}
