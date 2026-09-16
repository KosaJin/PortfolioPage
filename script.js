// This file does two small, separate jobs. Each is self-contained —
// check with Eren before adding a third.

// JOB 1 — fundamentals.html only: the study clips autoplay on their own
// via the native "autoplay" attribute in the HTML — that's more reliable
// than calling .play() from script (no promise to reject, no timing
// dependency on this file having run yet). All this does is the opposite:
// if the visitor has "reduce motion" on in their OS/browser settings, stop
// the clips and drop them back to their poster image. Harmless no-op on
// pages with no ".auto-clip" videos.

var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (prefersReducedMotion) {
  document.querySelectorAll("video.auto-clip").forEach(function (video) {
    video.pause();
    video.removeAttribute("autoplay");
    video.currentTime = 0;
    video.load(); // re-arms the poster image in place of the last decoded frame
  });
}

// JOB 2 — every page: find any address written backwards (e.g.
// "moc.liamg@20usnjsk") and turn it into a normal, clickable mailto
// link showing the address the right way round. It's stored reversed in
// the HTML so scraper bots that scan for "@" and "mailto:" can't lift
// it — see each span's title attribute for a human-readable hint.

document.querySelectorAll(".email").forEach(function (span) {
  var address = span.textContent.split("").reverse().join("");
  var link = document.createElement("a");
  link.href = "mailto:" + address;
  link.textContent = address;
  span.replaceWith(link);
});
