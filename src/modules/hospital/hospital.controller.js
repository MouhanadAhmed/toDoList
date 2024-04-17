import { addOne,  getAll } from "../../utils/handlers/refactor.js";
import { hospitalModel } from "./hospital.model.js";

export const add = addOne(hospitalModel , "Hospital");

export const getAllHospitals = getAll(hospitalModel, 'Hospital')