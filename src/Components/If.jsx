/**
 * Component to render a component if a condition is true
 * @param {boolean} condition - condition to check
 * @param {JSX.Element} children - component to render if condition is true
 * @returns {JSX.Element}
 */
export const If = ({ condition, children }) => {
  return condition && children;
};
