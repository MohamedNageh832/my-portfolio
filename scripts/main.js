const sidebar = document.querySelector(".sidebar");
const sidebarToggler = document.querySelector(".sidebar-toggler");

sidebarToggler.addEventListener("click", () => {
  sidebar.classList.toggle("active");

  const overlay = document.querySelector(".overlay");

  if (overlay !== null) {
    overlay.remove();
  } else {
    const overlay = document.createElement("div");
    overlay.className = "overlay";

    overlay.addEventListener("click", () => {
      overlay.remove();
      sidebar.classList.remove("active");
    });

    document.body.appendChild(overlay);
  }
});

const sidebarLinks = document.querySelectorAll(".sidebar__link");
const wrapper = document.querySelector(".wrapper");

wrapper.addEventListener("scroll", handleScroll);

function handleScroll() {
  let activeLink = Math.floor(wrapper.scrollTop / window.innerHeight);
  const linksCount = sidebarLinks.length - 1;

  if (activeLink > linksCount) activeLink = linksCount;

  sidebarLinks.forEach((el) => el.classList.remove("active"));
  sidebarLinks[activeLink].classList.add("active");
}

sidebarLinks.forEach((el) => {
  el.addEventListener("click", handleClick);
});

function handleClick() {
  sidebarLinks.forEach((el) => el.classList.remove("active"));
  this.classList.add("active");
}

const clickToPreview = document.querySelectorAll("[data-preview]");

clickToPreview.forEach((el) => {
  const src = el.getAttribute("data-preview");

  el.addEventListener("click", () => previewImg(src));
});

function previewImg(src) {
  const div = document.createElement("div");
  const imgWrapper = document.createElement("div");
  const img = document.createElement("img");
  const overlay = document.createElement("div");

  div.className = "preview";
  imgWrapper.className = "preview__wrapper";
  img.className = "preview__img";
  img.src = src;

  imgWrapper.appendChild(img);
  div.appendChild(imgWrapper);

  div.addEventListener("mousedown", handlePreviewMouseDown);
  window.addEventListener("mousemove", handleDragImg);
  window.addEventListener("mouseup", handlePreviewMouseUp);

  overlay.classList = "overlay";

  overlay.addEventListener("click", () => {
    window.removeEventListener("mousemove", handleDragImg);
    window.removeEventListener("mousedown", handlePreviewMouseUp);
    div.remove();
    overlay.remove();
  });

  document.body.append(div, overlay);
}

let isDragging = false;
const mouseOffsets = {
  y: undefined,
};

function handlePreviewMouseDown(e) {
  isDragging = true;
  const { top } = e.target.getBoundingClientRect();
  mouseOffsets.y = e.clientY + e.target.scrollTop - top;
}

function handleDragImg(e) {
  e.preventDefault();

  if (!isDragging) return;

  e.target.scrollTop = Math.abs(e.clientY - mouseOffsets.y);
}

function handlePreviewMouseUp() {
  isDragging = false;
}
