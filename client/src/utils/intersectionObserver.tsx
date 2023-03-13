const load = (img: any) => {
  const url = img.getAttribute("lazy-src");
  img.setAttribute("src", url);
  img.removeAttribute("lazy-src-product");
};

const ready = () => {
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const image = entry.target;
            observer.unobserve(image);
            load(image);
          }
        });
      },
      { threshold: 0.25 }
    );
    document.querySelectorAll("[lazy-src]").forEach((img) => {
      observer.observe(img);
    });
  } else {
    alert("IntersectionObserver does not work");
  }
};
document.addEventListener("DOMContentLoaded", ready);

export default ready;
