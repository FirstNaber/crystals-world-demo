# HANDOFF — Crystals World variations

**All six phases are complete.** Branches (repo FirstNaber/crystals-world-demo), each built on the previous; `main` is untouched:
`phase-1-audit` → `phase-2-foundation` → `phase-3-gallery` → `phase-4-austin` → `phase-5-collector` → `phase-6-verification` (latest).

- Final report: `REPORT.md` · going live / POS sync / tax: `docs/GOING-LIVE.md` · sources & facts: `AUDIT.md`
- Preview: https://firstnaber.github.io/crystals-world-variations/ (gh-pages of FirstNaber/crystals-world-variations)
- Tests used (not committed): a CDP-driven end-to-end run (62 checks: add→cart→checkout→confirmation for pickup and shipping, sold states, keyboard, no console errors), a reduced-motion check, a 90-combination overflow sweep, and Lighthouse mobile (see REPORT.md).
- To redeploy the preview: build with the default BASE_PATH, then push `dist/` to gh-pages of crystals-world-variations. Do NOT publish to crystals-world-demo's gh-pages (that is the live original).
