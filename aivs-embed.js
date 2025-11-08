
(function () {
  function init(el) {
    const src = el.getAttribute("data-src");
    const minH = el.getAttribute("data-min-height") || "480";
    const ifr = document.createElement("iframe");
    ifr.src = src;
    ifr.loading = "lazy";
    ifr.style.width = "100%";
    ifr.style.border = "0";
    ifr.style.minHeight = minH + "px";
    ifr.setAttribute("title", "AI Video Summary – Upload");
    ifr.setAttribute("referrerpolicy", "no-referrer-when-downgrade");
    el.appendChild(ifr);
  }
  document.querySelectorAll(".aivs-embed").forEach(init);

  window.addEventListener("message", function (e) {
    const d = e.data || {};
    if (d.aivs !== "size") return;
    document.querySelectorAll(".aivs-embed > iframe").forEach(function (ifr) {
      if (ifr.contentWindow === e.source) {
        const maxH = parseInt(ifr.parentElement.getAttribute("data-max-height") || "2200", 10);
        const h = Math.min(parseInt(d.height || 0, 10), maxH);
        if (h > 0) ifr.style.height = h + "px";
      }
    });
  });
})();
