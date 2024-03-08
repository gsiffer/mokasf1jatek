const capitalizeFirstLetters = (text) => {
  if (text) {
    return text
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return null;
};

export default capitalizeFirstLetters;
