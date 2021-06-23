import types from "./types";
import citizenClient from "../clients/citizenClient";

export const addCitizen = (citizen) => async (dispatch, getState) => {
    const ACCESS_TOKEN = getState().auth.token;
    const mainAccount = getState().contract.mainAccount;
    console.log(citizen);
    console.log(ACCESS_TOKEN)
    const con = await getState().contract.contract.methods.addConstituency("RAD").send({ from: mainAccount });
    console.log(con);
}

