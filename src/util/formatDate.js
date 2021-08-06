// yyyy-mm-dd to dd-mm-yyyy
function formatDate(date) {
  const [yyyy, mm, dd] = date.substr(0, 10).split("-");
  return `${dd}-${mm}-${yyyy}`;
}
export { formatDate };
