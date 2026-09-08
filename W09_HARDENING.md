# W09 — Break Your Own Site / Hardening Review

## Scope
This checkpoint hardens the portfolio by testing failure paths, improving basic SEO metadata, and separating issues that should be fixed now from limitations that are intentionally documented.

## 1. Where It Breaks — Edge-Case Checklist

| Test | Expected behavior | Status / finding | Triage |
|---|---|---|---|
| Submit contact form empty | Browser blocks submission | Required fields block empty submission | Fixed |
| Submit invalid email | Browser rejects invalid email format | `type="email"` validation is enabled | Fixed |
| Submit message empty | Browser blocks submission | Message is now `required` | Fixed |
| Submit twice quickly | Prevent duplicate sends while request is active | Existing JS disables the submit button during send | Fixed |
| Open mobile navigation | Menu opens/closes and exposes navigation links | Mobile navigation handler exists | Verify on real phone |
| Theme toggle | Theme changes without breaking layout | Theme handler exists | Verify on target browser |
| Show More | Hidden project cards become available | Existing JS controls `aria-expanded` and visibility | Verify on target browser |
| Project card / modal | Image modal opens and can close | Existing modal behavior is implemented | Verify on target browser |
| CV request | Opens mail client/request flow | Request-CV control is present | Verify on target browser |
| Social links | Links open the intended profiles | Links are present in footer | Verify each destination |
| Very slow / blocked external CDN | Page remains usable where possible | Google Fonts, Font Awesome, Unsplash and EmailJS are external dependencies | Known limitation |

## 2. SEO / Findability Hardening

Added:
- descriptive page title
- meta description
- `robots` directive
- canonical URL
- Open Graph title, description, URL and image
- Twitter large-image card metadata
- `robots.txt`
- `sitemap.xml`

The portfolio already had a descriptive HTML title and meta description; this pass extends them with social preview and crawler metadata.

## 3. Triage

### Fix-now — addressed
1. Contact message could be submitted empty → added `required`.
2. Social-share metadata was incomplete → added Open Graph and Twitter metadata.
3. Crawler guidance was missing → added `robots.txt` and `sitemap.xml`.

### Known limitations
1. `Poster.jpg` is comparatively large and can affect load time; W07 already documented it as a performance limitation.
2. Several assets/services are external dependencies (CDN fonts/icons, Unsplash hero image, EmailJS).
3. A genuine device/browser speed check and real-device interaction pass still need to be recorded before treating this document as final evidence.

## 4. Speed Check

The speed check should be run against the deployed GitHub Pages URL using a public performance checker. Record the date, device profile, and score/results rather than guessing or fabricating a measurement.

## 5. Hardening Review

Self-review prepared from the site's current source and previous fix log. The required mentor/structured-peer review is a separate human check and should be attached here once it occurs. No external reviewer feedback is claimed in this document.

### Review questions
- Can a visitor understand what the site is about immediately?
- Does the contact form reject empty/invalid input?
- Do navigation, project modal, theme and Show More work on mobile?
- Are all visible links intentional and reachable?
- Are SEO metadata and social previews present?
- Are known limitations clearly disclosed?

## 6. Evidence

- SEO metadata: `index.html`
- Crawler files: `robots.txt`, `sitemap.xml`
- Previous mobile hardening: `W07_FIX_LOG.md`
- Current changes are committed to the `main` branch.

## Final status

**Code hardening: addressed.**

**Honest limitation:** real browser/device execution, speed measurement, and mentor/peer review must be performed by a human to count as genuine evidence for those checkpoint requirements.
