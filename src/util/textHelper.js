export const capitalize = val =>
  val.replace(
    /\w\S*/g,
    txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
