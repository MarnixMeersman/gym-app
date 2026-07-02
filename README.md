# IRONLOG

Offline-first workout, food, weight and sleep tracker built as a PWA. All data stays in your phone's localStorage; the repo hosts only code, so a public repo is safe. JSON export/import for backups.

## The program

Rotating queue, no fixed weekdays. Whenever you train, you do the next session in line:

**UA → LA → UB → LB → PC(optional) → repeat**

- **UA · Upper Horizontal:** bench, chest-supported row, incline DB, pulldown, laterals, curls, pushdowns
- **LA · Lower Squat:** squat, RDL, leg press, leg curl, calves, hanging leg raises
- **UB · Upper Vertical:** OHP, weighted pull-ups, cable row, dips, rear delts, hammer curls, overhead triceps
- **LB · Lower Hinge:** deadlift, hack squat, lunges, seated leg curl, seated calves, cable crunch
- **PC · Pump/Conditioning:** delts + arms + 25–35 min incline treadmill zone 2. Do it when fresh, skip when not.

Training 5–6 days/week this gives each muscle ~2x/week frequency at 10–16 hard sets/week, which is the right zone for a returning lifter on a recomp. Sessions fit 75–95 min with proper rest (2–3 min compounds, 1–2 min accessories).

### Progression engine (automatic)

- Hit the top of the rep range on all sets → weight increases next session
- Hit at least the bottom on all sets → weight holds
- Miss the bottom 3 sessions running → automatic 10% deload
- First two weeks after your layoff: start light, the engine ramps you back fast

### Nutrition phases (auto-computed from bodyweight)

- Cut: 31 × BW −15% (~2240 kcal at 85 kg) to ~15% BF, then Lean gain: +7% (~2820 kcal)
- Protein 2.2 g/kg (~187 g)
- Watch the 7-day average weight trend in the app, never single weigh-ins
- 8–10k steps/day; sleep is the third lever, hence Sleep Cycle import

## Deploy to GitHub Pages

```bash
gh repo create ironlog --public --source . --push
# then: repo Settings → Pages → Deploy from branch → main → / (root)
```

Open `https://<you>.github.io/ironlog/` on your phone → Chrome menu → **Add to Home screen**. It installs as an app and works fully offline afterwards.

Private repo alternative: GitHub Pages on private repos needs a paid plan; Cloudflare Pages and Vercel both deploy private repos free. Since no personal data is in the repo, public is also fine.

## Sleep Cycle import

Sleep Cycle → Profile → Settings → Download data → transfer `sleepdata.csv` to your phone → Log tab → import. Nights merge by date.

## Files

- `index.html` – entire app (no build step, no dependencies)
- `sw.js` – offline cache
- `manifest.webmanifest`, `icon.svg` – installability
