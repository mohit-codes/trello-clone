export const blurHandler = (setShowModal) => {
  const element = document.querySelector(".out-of-focus");

  return () => {
    // clean up for useEffect
    element.style.display = "block";
    element.addEventListener("click", () => {
      setShowModal(false);
    });

    return () => {
      element.style.display = "none";
      element.removeEventListener("click", () => {
        setShowModal(false);
      });
    };
  };
};
