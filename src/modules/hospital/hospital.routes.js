import express from "express";
import { protectedRoutes } from "../auth/auth.controller.js";
import * as hospitalController from "./hospital.controller.js";

const HospitalRouter = express.Router();

HospitalRouter.route("/")
    .post(protectedRoutes, hospitalController.add)
    .get(protectedRoutes, hospitalController.getAllHospitals);

export default HospitalRouter;
