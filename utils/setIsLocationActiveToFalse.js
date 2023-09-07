const setIsLocationActiveToFalse = async (Location) => {
  // Find all locations where active is true
  const locationsToUpdate = await Location.find({ isLocationActive: true });

  // Update the active property to false for each location
  for (const location of locationsToUpdate) {
    location.isLocationActive = false;
    await location.save(); // Save the updated location to the database
  }
};

export default setIsLocationActiveToFalse;
