import { BadRequestError, NotFoundError } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
import TeamStandings from "../models/TeamStandings.js";
import Constructor from "../models/Constructor.js";
import Location from "../models/Location.js";

const getTeamStandings = async (req, res) => {
  let teamStandings = null;
  let isSaved = true;
  const activeLocation = await Location.findOne({ isLocationActive: true });
  const teamStandingsCount = await TeamStandings.find({});

  if (teamStandingsCount.length === 0) {
    teamStandings = await Constructor.find({});

    const items = teamStandings.map((standing) => ({
      teamId: standing._id,
      teamName: standing.constructorName,
      point: 0,
    }));

    const result = {
      items: items,
    };

    isSaved = false;

    res.status(StatusCodes.OK).json({ teamStandings: result, isSaved });
  }

  if (activeLocation) {
    teamStandings = await TeamStandings.findOne({
      activeLocationId: activeLocation._id,
    });

    if (!teamStandings) {
      teamStandings = await TeamStandings.find({});
      teamStandings = teamStandings[teamStandings.length - 1];
      isSaved = false;
    }
  }

  res.status(StatusCodes.OK).json({ teamStandings, isSaved });
};

const getTeamStandingByLocationId = async (req, res) => {
  const { id: locationId } = req.params;

  if (!locationId) {
    throw new BadRequestError("Location ID is required");
  }

  const teamStanding = await TeamStandings.findOne({
    activeLocationId: locationId,
  });

  res.status(StatusCodes.OK).json({ teamStanding: teamStanding || null });
};

const createTeamStandings = async (req, res) => {
  // const POINTS = [1, 2, 4, 6, 8, 10, 12, 15, 18, 25];

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

  console.log(req.body);

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
