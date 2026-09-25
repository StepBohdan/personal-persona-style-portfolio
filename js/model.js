/* =====================================================================
   MODEL — the data and state of the app. Never touches the DOM.
   Edit your content here: featured projects, skills, image overrides.
   ===================================================================== */

const Model = {

  githubUser: "StepBohdan",

  // Where the contact form delivers (via formsubmit.co relay)
  contactEmail: "bogdanstepan2006@gmail.com",

  // App state (read/written by the Controller, displayed by the View)
  state: {
    screen: "home",        // which screen is showing
    menuIndex: 0,          // selected item on the home menu
    reposLoaded: false,
    skillsBuilt: false,
  },

  // ---- Featured projects (hand-written, shown above the GitHub feed) ----
  featured: [
    {
      title: "Spotimusic",
      tag: "Full-Stack", color: "#3dff6e",
      url: "https://github.com/StepBohdan/Spotimusic", cta: "View on GitHub →",
      img: "assets/projects/spotimusic.png",
      desc: "A lightweight Spotify-inspired music app built with React, Vite and Redux Toolkit on top of an Express API. Features JWT authentication with refresh tokens in HTTP-only cookies and protected routes, with the frontend on GitHub Pages and the backend on Railway.",
    },
    {
      title: "Persona Portfolio",
      tag: "JavaScript", color: "#36c6ff", live: true,
      url: "https://personal-persona-style-portfolio.vercel.app/", cta: "Open live site →",
      img: "assets/projects/persona-portfolio.png",
      desc: "This site: a Persona 3-inspired portfolio in vanilla JavaScript with an MVC structure. Ransom-note lettering, screen wipe transitions, an animated sprite cursor, keyboard navigation and a project feed pulled from the GitHub API.",
    },
    {
      title: "PlaceFinder",
      tag: "React Native", color: "#61dafb",
      url: "https://github.com/StepBohdan/PlaceFinder", cta: "View on GitHub →",
      img: "assets/projects/placefinder.png",
      desc: "A React Native (Expo) app for discovering places nearby: geolocation, filters, detail screens with photo galleries and working hours, and favourites saved on the device. State managed with Redux Toolkit.",
    },
    {
      title: "Warriors: Strategy Game",
      tag: "Java", color: "#b07219",
      url: "https://github.com/StepBohdan/PWR_PO-project", cta: "View on GitHub →",
      img: "assets/projects/warriors.png",
      desc: "A turn-based strategy battle game with a Swing GUI, where players command different classes of warriors on a terrain map, each with unique abilities. Built with object-oriented design and covered by unit tests.",
    },
  ],

  // Repos already shown in "featured" get hidden from the GitHub feed
  featuredRepoNames: [
    "Spotimusic",
    "persona-portfolio",
    "PlaceFinder",
    "PWR_PO-project",
  ],

  // Shown if the GitHub API can't be reached
  fallbackRepos: [
    { name: "Gutenberg-project", language: "JavaScript", html_url: "https://github.com/StepBohdan/Gutenberg-project" },
    { name: "Facet-Searcher", language: "TypeScript", html_url: "https://github.com/StepBohdan/Facet-Searcher" },
    { name: "ocado-myShop-project", language: "TypeScript", html_url: "https://github.com/StepBohdan/ocado-myShop-project" },
    { name: "tradeblade", language: "SCSS", html_url: "https://github.com/StepBohdan/tradeblade" },
    { name: "first-angular_app", language: "TypeScript", html_url: "https://github.com/StepBohdan/first-angular_app" },
  ],

  // Short blurbs for the "All repositories" feed.
  // A description set on GitHub itself takes priority over these.
  repoDescriptions: {
    "Gutenberg-project": "A book browser and reader for the Project Gutenberg library, built with React, React Router and SCSS. Renders book content safely with DOMPurify and lets you star your favourite titles.",
    "PWR_BD2_project": "A university database systems project: relational schema design, SQL queries and data modelling.",
    "Facet-Searcher": "Product search with faceted filters, active filter chips and pagination. React and TypeScript on the client, a Node.js API with PostgreSQL on the server.",
    "PWR_IO-project": "An ATM self-service banking system in Java: withdrawals, deposits, transfers, balance and history. Designed around MVC with Strategy, Factory, Decorator and DAO patterns.",
    "tradeblade": "A responsive landing page for a trading platform built with React, Vite and SCSS: hero, feature sections, platform showcase, stats, pricing plans and FAQ.",
    "first-angular_app": "A housing listings app in Angular: browse homes, open a details page for each one and submit an application form, with data served from a mock JSON API.",
    "ocado-myShop-project": "A shop app built for the Ocado recruitment task with React, TypeScript and Vite: product list, cart managed with the Context API, and a checkout summary. Deployed to GitHub Pages.",
    "Createx-project": "Repository set up for an upcoming Createx website build.",
    "secondproject.github.io": "A team project: a medical clinic dashboard in vanilla JavaScript. After logging in, users create, edit and delete visit cards for cardiologists, dentists and therapists through a REST API.",
    "firstadaptive.github.io": "My first adaptive landing page: semantic HTML and modular SCSS, built and minified with a Gulp pipeline.",
  },

  // Optional thumbnail overrides: repo name → image path.
  // Anything not listed is looked up at assets/projects/<RepoName>.png
  projectImages: {
    // "PlaceFinder": "assets/projects/placefinder.png",
  },

  langColors: {
    JavaScript: "#f1e05a", TypeScript: "#3178c6", Python: "#3572A5",
    PHP: "#4F5D95", CSS: "#663399", SCSS: "#c6538c", HTML: "#e34c26",
    "Jupyter Notebook": "#DA5B0B", MATLAB: "#e16737", Java: "#b07219", C: "#555", "C++": "#f34b7d",
  },

  // ---- Skills screen ----
  skills: [
    { group: "Frontend", items: [
      ["JavaScript / TypeScript", 88], ["React · Redux Toolkit", 88],
      ["Next.js", 76], ["React Native", 70],
      ["HTML5 · CSS · SCSS", 90], ["Component-based architecture", 85],
    ]},
    { group: "Backend & APIs", items: [
      ["REST API", 85], ["WebSocket (real-time updates)", 80],
      ["GraphQL", 72], ["Node.js · Express", 70],
      ["PostgreSQL", 65],
    ]},
    { group: "Tooling & Workflow", items: [
      ["Git & GitHub", 88], ["Jest", 72],
      ["Docker", 65], ["Agile / Scrum", 82],
    ]},
    { group: "Spoken Languages", items: [
      ["Ukrainian · Russian (native)", 100], ["Polish (B2)", 75], ["English (B2)", 75],
    ]},
  ],

  // ---- Background music (remembered between visits) ----
  music: { volume: 0.3, muted: false },

  loadMusic() {
    try {
      const v = localStorage.getItem("bgm-volume");
      if (v !== null) this.music.volume = Math.min(1, Math.max(0, +v || 0));
      this.music.muted = localStorage.getItem("bgm-muted") === "1";
    } catch {}
  },

  saveMusic() {
    try {
      localStorage.setItem("bgm-volume", this.music.volume);
      localStorage.setItem("bgm-muted", this.music.muted ? "1" : "0");
    } catch {}
  },

  // ---- Data fetching ----
  async fetchRepos() {
    const skip = new Set(this.featuredRepoNames);
    try {
      const res = await fetch(
        `https://api.github.com/users/${this.githubUser}/repos?per_page=100&sort=updated`
      );
      if (!res.ok) throw new Error(res.status);
      const repos = (await res.json()).filter(r => !r.fork && !skip.has(r.name));
      return { repos, live: true };
    } catch {
      return { repos: this.fallbackRepos.filter(r => !skip.has(r.name)), live: false };
    }
  },
};
