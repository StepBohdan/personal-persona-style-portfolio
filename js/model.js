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
      title: "Facet Searcher",
      tag: "Live App", color: "#e60012", live: true,
      url: "https://facet-searcher.vercel.app", cta: "Open facet-searcher.vercel.app →",
      img: "assets/projects/facet-searcher.png",
      desc: "A product catalogue with faceted search: filter groups, active filter chips, pagination and a responsive product grid. React and TypeScript on the client, a Node.js API backed by PostgreSQL on the server.",
    },
    {
      title: "Gutenberg Reader",
      tag: "React", color: "#f1e05a",
      url: "https://github.com/StepBohdan/Gutenberg-project", cta: "View on GitHub →",
      img: "assets/projects/gutenberg.png",
      desc: "A book browser and reader for the Project Gutenberg library, built with React, React Router and SCSS. Renders book content safely with DOMPurify and lets you star your favourite titles.",
    },
    {
      title: "Warriors: Strategy Game",
      tag: "Java", color: "#b07219",
      url: "https://github.com/StepBohdan/PWR_PO-project", cta: "View on GitHub →",
      img: "assets/projects/warriors.png",
      desc: "A turn-based strategy battle game with a Swing GUI, where players command different classes of warriors on a terrain map, each with unique abilities. Built with object-oriented design and covered by unit tests.",
    },
    {
      title: "Database Systems Project",
      tag: "Databases", color: "#3178c6",
      url: "https://github.com/StepBohdan/PWR_BD2_project", cta: "View on GitHub →",
      img: "assets/projects/bd2.png",
      desc: "A university database systems project: relational schema design, SQL queries and data modelling.",
    },
  ],

  // Repos already shown in "featured" get hidden from the GitHub feed
  featuredRepoNames: [
    "Spotimusic",
    "Facet-Searcher",
    "Gutenberg-project",
    "PWR_PO-project",
    "PWR_BD2_project",
  ],

  // Shown if the GitHub API can't be reached
  fallbackRepos: [
    {
      name: "PlaceFinder", language: "TypeScript", stargazers_count: 0,
      html_url: "https://github.com/StepBohdan/PlaceFinder",
      description: "",
    },
    {
      name: "ocado-myShop-project", language: "TypeScript", stargazers_count: 0,
      html_url: "https://github.com/StepBohdan/ocado-myShop-project",
      description: "",
    },
    {
      name: "tradeblade", language: "SCSS", stargazers_count: 0,
      html_url: "https://github.com/StepBohdan/tradeblade",
      description: "",
    },
    {
      name: "first-angular_app", language: "TypeScript", stargazers_count: 0,
      html_url: "https://github.com/StepBohdan/first-angular_app",
      description: "",
    },
  ],

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
