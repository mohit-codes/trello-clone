import humanizeDuration from "humanize-duration";

// yyyy-mm-dd to dd-mm-yyyy
function formatDate(date) {
  const [yyyy, mm, dd] = date.substr(0, 10).split("-");
  return `${dd}-${mm}-${yyyy}`;
}

const options = {
  largest: 1, // Only returns 1 unit, so 1 day and not 1 day 2 hours or 1 min and not 1 min 5 seconds
  round: true, // 1 hour vs 1.2 hours
  spacer: "", // 3hours vs 3 hours
  language: "shortEn", // Specify language
  languages: {
    // Define custom language
    shortEn: {
      y: () => "y",
      mo: () => "mo",
      w: () => "w",
      d: () => "d",
      h: () => "h",
      m: () => "m",
      s: () => "s",
      ms: () => "ms",
    },
  },
};

function timeSince(updatedAt) {
  const ms = new Date() - new Date(updatedAt);
  return humanizeDuration(ms, options);
}

export { formatDate, timeSince };
