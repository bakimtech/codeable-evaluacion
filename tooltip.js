let tooltipElement;

document.onmouseover = function (event) {
  let tooltipContent = event.target.dataset.tooltip;

  if (!tooltipContent) return;

  tooltipElement = document.createElement("div");
  tooltipElement.className = "tooltip";
  tooltipElement.innerHTML = tooltipContent;
  document.querySelector(".tooltip-demo").append(tooltipElement);

  const coords = event.target.getBoundingClientRect();

  tooltipElement.style.left = `${
    coords.left +
    window.scrollX +
    coords.width / 2 -
    tooltipElement.offsetWidth / 2
  }px`;
  tooltipElement.style.top = `${
    coords.top + window.scrollY - tooltipElement.offsetHeight - 5
  }px`;
};

document.onmouseout = function (e) {
  if (tooltipElement) {
    tooltipElement.remove();
    tooltipElement = null;
  }
};
