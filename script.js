// This file does three small, separate jobs. Each is self-contained.

// JOB 1 — autoplay. Every video plays muted on its own for every visitor
// (Eren's choice, 24 Oct 2026). Study clips (fundamentals.html) use the native
// "autoplay muted" attributes; this is a backup nudge for browsers that wait.
// The homepage reel is started in JOB 3 once YouTube's player is ready.

document.querySelectorAll("video.auto-clip").forEach(function (video) {
  video.muted = true;
  var attempt = video.play();
  if (attempt && attempt.catch) { attempt.catch(function () {}); }
});

// JOB 2 — email. The address is stored backwards in the HTML
// ("moc.liamg@20usnjsk") so scraper bots can't lift it.
// a) <span class="email">reversed</span> becomes a clickable link.
// b) <a data-email="reversed"> keeps its text and gets a mailto link.

function unreverse(text) { return text.split("").reverse().join(""); }

document.querySelectorAll(".email").forEach(function (span) {
  var address = unreverse(span.textContent.trim());
  var link = document.createElement("a");
  link.href = "mailto:" + address;
  link.textContent = address;
  span.replaceWith(link);
});

document.querySelectorAll("a[data-email]").forEach(function (link) {
  link.href = "mailto:" + unreverse(link.getAttribute("data-email"));
});

// JOB 3 — homepage reel timeline. Loads YouTube's player script so the
// timeline under the reel can play, pause and scrub the video frame by frame,
// and loops just Eren's shots (data-start to data-end, in seconds).
// The timeline stays hidden unless the player loads, so nothing breaks
// if YouTube is blocked.

(function () {
  var frame = document.getElementById("reel-player");
  var bar = document.querySelector("[data-timeline]");
  if (!frame || !bar) return;

  var START = Number(frame.getAttribute("data-start"));
  var END = Number(frame.getAttribute("data-end"));
  var FPS = 24;
  var TOTAL = Math.round((END - START) * FPS);

  var range = bar.querySelector("input[type='range']");
  var head = bar.querySelector(".tl-head");
  var fill = bar.querySelector(".tl-fill");
  var readout = bar.querySelector("[data-frame]");
  var total = bar.querySelector("[data-total]");
  var button = bar.querySelector(".tl-btn");
  var player = null;
  var playing = false;
  var dragging = false;

  function pad(n) { return String(n).padStart(3, "0"); }

  function paint(f) {
    var p = (f / TOTAL) * 100;
    head.style.left = p + "%";
    fill.style.width = p + "%";
    readout.textContent = pad(f + 1 > TOTAL ? TOTAL : f + 1);
  }

  function setButton() {
    button.setAttribute("data-state", playing ? "playing" : "paused");
    button.setAttribute("aria-label", playing ? "Pause reel" : "Play reel");
  }

  function tick() {
    if (player && typeof player.getCurrentTime === "function") {
      var t = player.getCurrentTime();
      if (playing && t >= END - 0.05) {
        player.seekTo(START, true);
        t = START;
      }
      var f = Math.min(TOTAL, Math.max(0, Math.round((t - START) * FPS)));
      if (!dragging) {
        range.value = f;
        paint(f);
      }
    }
    window.requestAnimationFrame(tick);
  }

  window.onYouTubeIframeAPIReady = function () {
    player = new YT.Player(frame, {
      events: {
        onReady: function () {
          player.mute();
          player.playVideo();
          range.max = TOTAL;
          total.textContent = pad(TOTAL);
          bar.hidden = false;
          tick();
        },
        onStateChange: function (e) {
          if (e.data === YT.PlayerState.ENDED) {
            player.seekTo(START, true);
            player.playVideo();
            return;
          }
          playing = e.data === YT.PlayerState.PLAYING || e.data === YT.PlayerState.BUFFERING;
          setButton();
        }
      }
    });
  };

  range.addEventListener("input", function () {
    if (!player) return;
    dragging = true;
    var f = Number(range.value);
    paint(f);
    player.pauseVideo();
    player.seekTo(START + f / FPS, true);
  });
  range.addEventListener("change", function () { dragging = false; });

  button.addEventListener("click", function () {
    if (!player) return;
    if (playing) { player.pauseVideo(); } else { player.playVideo(); }
  });

  var api = document.createElement("script");
  api.src = "https://www.youtube.com/iframe_api";
  api.async = true;
  document.head.appendChild(api);
})();
