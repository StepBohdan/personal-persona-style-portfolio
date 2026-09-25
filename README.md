# Persona-Style Portfolio

Personal portfolio of **Bohdan Stepanenko**, a Frontend Developer based in Wrocław.
Inspired by the Persona game menus, it's built in vanilla JavaScript (no frameworks,
no build step) and structured as Model–View–Controller.

## Features

- Ransom-note lettering, slashing screen-wipe transitions, and an animated sprite cursor
- Keyboard-first navigation with a sound effect on select and confirm
- Each screen has its own background art (the home screen uses a looping video)
- Projects screen shows hand-picked featured cards plus a live feed from the GitHub API,
  with an offline fallback list if the API can't be reached
- Animated skill bars grouped by area
- About page with a downloadable CV
- Contact form delivered to email via [formsubmit.co](https://formsubmit.co), with a honeypot field against spam
- Background music with a volume slider and mute button; the settings are saved in `localStorage`

## Structure

```
├── index.html            View skeleton: markup, bio and contact links
├── css/
│   └── style.css         All styling (theme colors in :root at the top)
├── js/
│   ├── model.js          DATA: projects, skills, GitHub fetch, music settings, app state
│   ├── view.js           DOM: rendering, ransom lettering, wipe, cursor, sound, music
│   └── controller.js     EVENTS: keyboard/mouse input, navigation, contact form
└── assets/
    ├── sfx/
    │   ├── select.mp3    Menu sound (select/confirm)
    │   └── bgm.mp3       Background music loop
    ├── cursors/          Animated cursor sprite strips (normal.png, link.png)
    ├── menus/            Per-screen backgrounds:
    │                     home.mp4 (+ home.png poster), skills.webp, about.webp,
    │                     contact.jpg. Add projects.jpg to complete the set
    ├── cv/               BohdanStepanenkoCV.pdf (linked from About + Contact)
    ├── hero.png          optional: extra art layered on the home screen
    ├── me.jpg            optional: photo for the About polaroid
    └── projects/         optional: card thumbnails
        ├── spotimusic.png, persona-portfolio.png, placefinder.png, warriors.png  (featured)
        └── <RepoName>.png  (auto-matched to GitHub repos by exact name)
```

Missing images and art remove themselves, so there are no broken icons. Screens without
art fall back to the CSS stripe background.

## Editing content

Most of the content lives in **js/model.js**:

- `githubUser`: whose repositories are loaded
- `featured` / `featuredRepoNames`: featured project cards; these repos are hidden from the feed
- `repoDescriptions`: blurbs for repos that have no description on GitHub
- `fallbackRepos`: shown when the GitHub API is unavailable
- `projectImages`: thumbnail overrides (repo name to image path)
- `skills`: skill groups and bar levels (0–100)
- `contactEmail`: where the contact form delivers

The bio, about text, and contact links are plain HTML in **index.html**.
Colors are CSS variables at the top of **css/style.css**.

> The first message sent through the contact form triggers a one-time activation
> email from formsubmit.co. Confirm it, and later messages will arrive normally.

## Run locally

```
python -m http.server
```

Then open http://localhost:8000. Opening `index.html` directly (`file://`) blocks
the audio and the GitHub API in most browsers.

## Deploy

Push the folder to a GitHub repo and enable Pages
(Settings → Pages → Deploy from branch → `main` → `/ (root)`).

## Controls

| Key | Action |
| --- | --- |
| ↑ / ↓ | Select menu item |
| Enter | Confirm |
| Esc | Back |
| Click the name | Go home |
| Speaker icon | Hover for the volume slider, click to mute |
