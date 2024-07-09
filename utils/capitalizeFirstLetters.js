const capitalizeFirstLetters = (text) => {
  if (text) {
    return text
      .split(" ")
      .map((word) => {
        if (word.length === 1) {
          return word.toUpperCase();
        } else if (word.length === 2) {
          return word.charAt(0).toUpperCase() + word.charAt(1).toUpperCase();
        } else {
          return word.charAt(0).toUpperCase() + word.slice(1);
        }
      })
      .join(" ");
  }

  return null;
};

export default capitalizeFirstLetters;
