import types from "./types";
import citizenClient from "../clients/citizenClient";
import { addCitizenContract } from "./ethereumActions";

export const createCitizen = (ACCESS_TOKEN, citizen) => async (dispatch, getState) => {
    console.log(ACCESS_TOKEN, citizen);
    addCitizenContract(citizen.voterId, citizen.constituencyId);
}
