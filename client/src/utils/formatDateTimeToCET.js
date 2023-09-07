const formatDateTimeToCET = (date) => {
  const options = {
    timeZone: "CET",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour24: true,
  };

  return new Date(date).toLocaleString("en-GB", options).replace(/\//g, "-");
};

export default formatDateTimeToCET;
