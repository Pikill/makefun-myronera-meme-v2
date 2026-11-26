# Post the Meme, Win the Feed

[![make.fun](https://make.fun/badge/u-myronera-post-the-meme-win-the-feed-2de960bf.svg)](https://make.fun/c/u-myronera-post-the-meme-win-the-feed-2de960bf)
[![rank](https://make.fun/badge/u-myronera-post-the-meme-win-the-feed-2de960bf/Pikill/makefun-myronera-meme-v2/rank.svg)](https://make.fun/c/u-myronera-post-the-meme-win-the-feed-2de960bf)
[![reward](https://make.fun/badge/u-myronera-post-the-meme-win-the-feed-2de960bf/Pikill/makefun-myronera-meme-v2/reward.svg)](https://make.fun/c/u-myronera-post-the-meme-win-the-feed-2de960bf)

A make.fun entry for **Post the Meme, Win the Feed** (`u-myronera-post-the-meme-win-the-feed-2de960bf`).
The entry is the X post itself: one meme picture about make.fun, posted from a
public account with `@_myronera` and a play code in the post text. The house
reads the post's counts after entries close and ranks by
`score = likes + reposts + quotes`, highest first; the top 15 share $2.

## The meme (Concept B — chosen in-session)

Three concepts were drafted and scored against the brief (instantly readable
on a phone, lands what make.fun is, builders would pass it on, text short
and spelled right):

- **A — Drake-style two-panel** ("building bots for free" / "my agent winning
  bounties on make.fun"): familiar, but two panels shrink the text on a phone.
- **B — "This is Fine" robot** (winner): a calm cartoon robot at a laptop in
  a burning room, laptop screen showing `make.fun` and `+$0.60`, top caption
  "ME WATCHING MY AGENT GRIND BOUNTIES AT 3AM". One frame, so the text stays
  big; the 3am bounty grind is the builder experience; it names make.fun,
  bounties, the leaderboard grind, and getting paid in a single glance.
- **C — "POV: your agent just paid for your coffee"**: cute, but the joke
  needs the viewer to parse the POV framing first — slower than B.

Self-audit findings applied to B: the fire stays a background glow so the
laptop screen text (`make.fun`, `+$0.60`) stays readable at phone size; the
caption sits inside the image with wide margins so X's preview never crops
it; the robot smiles calmly, so the tiny `+$0.60` reads as a self-aware joke,
not a complaint.

## Image status: PENDING — Gemini image quota is 0

The picture must be generated with the user's own Google Gemini API (standing
rule). Attempted in-session on 2026-11-26 via the Gemini API
(`gemini-2.5-flash-image`, connector surrogate path): the call failed with
HTTP 429 — "Quota exceeded for metric:
generativelanguage.googleapis.com/generate_content_free_tier_requests, limit:
0, model: gemini-2.5-flash-preview-image". The free tier carries no image
quota (paid-only), the same result recorded on 2026-11-16. No fallback image
was made: no built-in generator, no hand-drawn SVG. `meme.png` will be added
to this repo once the Gemini image path works (or the user overrides the
rule); the post text below is ready to go with it.

## The post (draft — the user posts it)

The post carries the meme picture, tags `@_myronera`, and includes the play
code `makefun-barnyard-blade-crow`:

```
my agent has entered 47 bounties at 3am. it won $0.60. it has never been happier. neither have i.

@_myronera makefun-barnyard-blade-crow
```

## The program

`main.ts` (Node 22, standard library only) copies `POST.json` from this
repository to `/output/POST.json`. That is all it does — the house reads the
post itself, so nothing here touches the score. It validates that POST.json
is a JSON object with an `https://` url first, so a malformed file fails
loudly instead of shipping a silent zero.

Run it locally:

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

`out/POST.json` is then byte-for-byte this directory's `POST.json`, and the
program prints nothing on success. Two consecutive runs write identical bytes.

`POST.json` currently holds the starter placeholder. Replace it with the real
post address (`{"url": "https://x.com/<handle>/status/<id>"}`) after posting,
then submit.
