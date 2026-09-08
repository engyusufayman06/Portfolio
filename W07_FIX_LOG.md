# W07 — Portfolio Quality Fix Log

## Scope

I audited the portfolio for the W07 quality pass with a mobile-first focus: layout, tap targets, readability, accessibility, links, image loading, and unnecessary work on small devices.

## Fix log

| Area | Before | After |
|---|---|---|
| Mobile navigation | Mobile menu CSS had duplicated rules and an invalid `inset=` declaration. | Simplified the behavior through the mobile navigation handler and added consistent open/close state, labels, and focus behavior. |
| Mobile tap targets | Several controls were small or relied on padding alone. | Interactive buttons and links now use a minimum 44px target; form controls use a comfortable 16px font size. |
| Mobile layout | Some desktop effects and fixed sizing could make the mobile experience feel cramped. | Added mobile spacing, single-column project/service layouts, safer image sizing, and removed the 3D tilt effect on coarse pointers. |
| Project images | Images could use expensive hover transforms on touch devices. | Touch devices no longer run the hover zoom/3D interaction; project images remain contained and responsive. |
| Hero image loading | The hero image was marked lazy even though it is part of the first screen. | Hero image is eager-loaded with high fetch priority; below-the-fold images remain lazy. |
| Background animation | Particle animation could continue doing work on small/touch devices. | Particle canvas animation is skipped on coarse-pointer/mobile devices; desktop particle count is capped. |
| Keyboard accessibility | Global focus outlines were suppressed until a custom class was added. | `:focus-visible` now provides a clear keyboard focus indicator. |
| Skills filter | Filter buttons did not update `aria-pressed`. | Active filter state now updates `aria-pressed` for assistive technology. |
| LinkedIn | Footer LinkedIn link was a `#` placeholder. | LinkedIn now points to the real profile URL and opens safely in a new tab. |
| CV button | `Download CV` had no handler/file behind it. | Renamed to `Request CV` and wired it to the public contact email instead of leaving a dead control. |
| Unused asset | An unused 16.7 MB image was stored in the repository. | Removed the unused oversized asset. |

## Image/performance note

The repository still contains one large legacy project image (`images/Poster.jpg`). The current code defers project images with lazy loading so it is not downloaded until needed. A true binary recompression/re-encoding of that source file should be done in the next asset pass when the original image can be replaced without reducing portfolio quality.

## Verification checklist

- [x] Responsive CSS reviewed and hardened for mobile widths.
- [x] Touch/keyboard interaction handling improved.
- [x] Internal anchor behavior reviewed.
- [x] Placeholder LinkedIn link removed.
- [x] Dead CV button replaced with a working contact action.
- [x] Unused 16.7 MB asset removed.
- [ ] Real-phone verification still needs to be performed on an actual phone.
- [ ] Final live URL behavior and every external destination should be tapped once on the phone.
- [ ] A before/after phone screenshot should be attached to the submission if available.

## Final note

The code-level fixes are committed to `main`. Real-phone verification cannot honestly be claimed from a repository audit alone, so the final submission check must be performed on the physical phone used for testing.
