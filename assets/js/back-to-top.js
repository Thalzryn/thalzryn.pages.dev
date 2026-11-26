const backToTop = document.getElementById("back-to-top");

backToTop?.addEventListener("click", () => {
  document.documentElement.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});