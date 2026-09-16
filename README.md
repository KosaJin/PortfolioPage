# Portfolio site — how to use this

Plain HTML and CSS. No frameworks, no build step, nothing to install.
Open `index.html` by double-clicking it and it works.

## Files

- `index.html` — home page. Reel at the top, shot list below.
- `last-duel.html`, `witch.html`, `acting-lipsync.html` — one page per shot.
  **Copy one of these** for each new piece and edit the copy.
- `fundamentals.html` — study pieces (bouncing ball, walk cycle, etc.),
  linked from the About section on `index.html`.
- `styles.css` — all the visual design. One file controls every page.
- `script.js` — linked on every page. Does two things: autoplays the study
  clips on `fundamentals.html`, and turns email addresses into working
  links (see "Email address" below). Comments in the file explain both.
- `images/`, `videos/` — put your thumbnails and clips here.

## Anything highlighted in yellow needs replacing

In the HTML you'll see `<span class="edit">LIKE THIS</span>`. Those render
with a yellow background so you can spot what's still placeholder. Replace
the text, delete the `<span class="edit">` and `</span>` around it.

Also replace, everywhere it appears:
- `YOUTUBE_ID` in every page that has one — see "Videos" below

## Email address

The address isn't written as plain text anywhere in the HTML — that's
deliberate, so bots that scan pages for `mailto:` and `@` can't harvest it.
It appears in two different forms, in two different places:

**1. The contact icon** (About section, `index.html`) — a plain
`<a href="mailto:ksjnsu02@gmail.com">` wrapped around the Gmail icon image.
This one just works, no JavaScript needed — that's the point of it, it's
the reliable fallback link.

**2. The "Reach me at..." sentence** (also the About section) — the
address is written *backwards* as plain text:

```
<span class="email" title="...">moc.liamg@20usnjsk</span>
```

`script.js` finds every `<span class="email">`, reverses the text back to
normal, and swaps the span for a real, clickable `mailto:` link showing
the address the right way round. If JavaScript is off, visitors see the
reversed text — readable backwards, with a tooltip (the `title` attribute)
explaining why.

**To change your email address:**
- Update the `href="mailto:..."` on the Gmail icon link.
- Find the `<span class="email">` and replace its text with your new
  address spelled backwards. (Type it forwards, then reverse the
  characters — any text editor's find-and-replace won't do this for you,
  it has to be typed or generated in reverse.)

## Contact icons

The About section's icon links use three files already in `images/`:
`gmail.jpg` (Email), `artstation.png` (ArtStation), `linkedin.jpg`
(LinkedIn). Each is wrapped in a link — see `index.html`. To swap an icon
for a different image, just replace the file (same name) or change the
`src`; the CSS keeps them all a consistent 28×28px regardless of the
source image's actual size.

There's also a `youtube.jpg` in `images/` that isn't linked to anything
yet — add a fourth icon link following the same pattern if you want one.

## Videos

Reel and finals are embedded from YouTube. Short process clips (reference,
blocking) can be `.mp4` files in `videos/` — keep each one under about
10 MB or the page gets slow.

### Finding a video's YouTube ID and swapping it in

Upload the video to YouTube (Unlisted is fine — it still embeds, it just
won't show up in YouTube search). Open the video and look at the URL:

```
https://www.youtube.com/watch?v=w487xuELWTc
                                └────┬────┘
                                the ID — everything after "v="
```

In the HTML, find the `<iframe>` for that video and replace `YOUTUBE_ID`
in its `src` with that string, e.g.:

```
src="https://www.youtube.com/embed/w487xuELWTc?rel=0&modestbranding=1"
```

`rel=0&modestbranding=1` keeps YouTube's end-screen suggestions limited to
your own videos instead of recommending random other channels — leave that
part alone, just swap the ID.

To make an embed start partway through a longer video (like `last-duel.html`
does, so it opens on your shots instead of the start), add `&start=SECONDS`
— and `&end=SECONDS` to stop it there too. Both are just the timecode
converted to seconds (1:29 = 89).

Thumbnails: 1600px wide, export as `.jpg` or `.webp`, into `images/`.

## Adding a new shot

1. Copy an existing shot page (e.g. `last-duel.html`), rename it, edit
   the content.
2. In `index.html`, copy one `<li class="shot"> ... </li>` block, paste it
   below, change the text and the `href` to your new file name.

That's the whole workflow. It should take 20 minutes per piece.

## Adding a reference/blocking section

`witch.html` and `acting-lipsync.html` don't have one yet — there's no
footage for it. `last-duel.html` still has its section and works as the
template. To add one to a page that doesn't have it:

1. Open `last-duel.html` and copy the whole block from `<h2>Reference and
   blocking</h2>` down to the `.pair` block's closing `</div>`.
2. Paste it into your page, directly above the `<p class="back">` line.
3. Change the two `src` paths (one per video) and the `poster` paths to
   your own files.

## Adding a new fundamentals study

In `fundamentals.html`, find the `<ul class="studies">` list. Copy one
`<li class="study"> ... </li>` block (the "Bouncing ball" one is a good
template), paste it below the last one, then change:

- the two `src` paths (poster image and video file)
- the `<h3>` name
- the one-line note in the `<p>`

Keep the clip short and small — these autoplay on page load, so a heavy
file will make the page slow to open.

### Troubleshooting: clip won't autoplay on iPhone

Modern iOS Safari autoplays inline video fine as long as it has both
`muted` and `playsinline` on the `<video>` tag (both are already there in
the template). If a clip still won't autoplay on an iPhone, the most likely
fix is re-exporting it without an audio track — some older Safari versions
are stricter about that.

## Putting it online

1. Make a free GitHub account.
2. Create a repository, drag this whole folder into it.
3. Settings → Pages → set the branch to `main`. You get a live URL.
4. Later, buy a domain and point it at that URL.

## Next things worth doing

- Fill in everything highlighted in yellow across all pages (see above).
- Add real thumbnails to `images/` and clips to `videos/` — see "Videos"
  above for size guidance.
- Check it on your phone before sending it to anyone.
