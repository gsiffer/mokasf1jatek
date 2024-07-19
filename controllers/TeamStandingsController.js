import { BadRequestError, NotFoundError } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
import TeamStandings from "../models/TeamStandings.js";

const createTeamStandings = async (req, res) => {
  res.status(StatusCodes.OK).send("createTeamStandings");
};

const getTeamStandings = async (req, res) => {
  res.status(StatusCodes.OK).send("getTeamStandings");
};

const updateTeamStandings = async (req, res) => {
  res.status(StatusCodes.OK).send("updateTeamStandings");
};

export { createTeamStandings, getTeamStandings, updateTeamStandings };
