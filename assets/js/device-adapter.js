(function () {
  var root = document.documentElement;
  var resizeTimer;

  function applyDeviceClass() {
    var coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    var mobileWidth = window.matchMedia("(max-width: 680px)").matches;
    var tabletWidth = window.matchMedia("(min-width: 681px) and (max-width: 1024px)").matches;
    var device = "desktop";

    if (mobileWidth || (coarsePointer && window.innerWidth < 760)) {
      device = "mobile";
    } else if (tabletWidth || (coarsePointer && window.innerWidth < 1180)) {
      device = "tablet";
    }

    root.dataset.device = device;
    root.classList.remove("is-mobile", "is-tablet", "is-desktop");
    root.classList.add("is-" + device);
  }

  applyDeviceClass();

  window.addEventListener("resize", function () {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(applyDeviceClass, 120);
  });
})();
