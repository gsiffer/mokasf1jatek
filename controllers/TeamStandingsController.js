import { BadRequestError, NotFoundError } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
import TeamStandings from "../models/TeamStandings.js";
import Constructor from "../models/Constructor.js";

const getTeamStandings = async (req, res) => {
  let teamStandings = await TeamStandings.find({});

  if (teamStandings.length === 0) {
    teamStandings = await Constructor.find({});

    const items = teamStandings.map((standing) => ({
      _id: standing._id,
      locationName: standing.constructorName,
    }));

    const result = {
      items: items,
    };

    res.status(StatusCodes.OK).json({ teamStandings: result });
  }

  teamStandings = teamStandings[teamStandings.length - 1];

  res.status(StatusCodes.OK).json({ teamStandings });
};

const getTeamStandingByLocationId = async (req, res) => {
  const { locationId } = req.body;

  if (!locationId) {
    throw new BadRequestError("Location ID is required");
  }

  const teamStanding = await TeamStandings.findOne({
    activeLocationId: locationId,
  });

  res.status(StatusCodes.OK).json({ teamStanding: teamStanding || null });
};

const createTeamStandings = async (req, res) => {
  const { activeLocationName, activeLocationId, items } = req.body;

  if (!activeLocationName || !activeLocationId || !items) {
    throw new BadRequestError("Please provide all values");
  }

  const isTeamStandingsCreated = await TeamStandings.findOne({
    activeLocationId: activeLocationId,
  });

  if (isTeamStandingsCreated) {
    throw new BadRequestError("There is already a saved item in the database");
  }
  req.body.createdBy = req.user.userId;
  const teamStanding = await TeamStandings.create(req.body);

  res.status(StatusCodes.CREATED).json({ teamStanding });
};

const updateTeamStandings = async (req, res) => {
  const { id: teamStandingId } = req.params;

  const { activeLocationName, activeLocationId, items } = req.body;

  if (!activeLocationName || !activeLocationId || !items) {
    throw new BadRequestError("Please provide all values");
  }

  const teamStanding = await TeamStandings.findOne({ _id: teamStandingId });

  if (!teamStanding) {
    throw new NotFoundError(`No team standing list with id ${teamStandingId}`);
  }

  const updatedTeamStanding = await TeamStandings.findOneAndUpdate(
    { _id: teamStandingId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({ updatedTeamStanding });
};

export {
  createTeamStandings,
  getTeamStandings,
  updateTeamStandings,
  getTeamStandingByLocationId,
};
