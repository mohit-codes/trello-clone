// yyyy-mm-dd to dd-mm-yyyy
export default function formatDate(date) {
  const [yyyy, mm, dd] = date.substr(0, 10).split("-");
  return `${dd}-${mm}-${yyyy}`;
}
