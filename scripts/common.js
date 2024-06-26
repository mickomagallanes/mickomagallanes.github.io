const CANVAS_WIDTH = 1920;
const CANVAS_HEIGHT = 1080;
const BOTTOM_TREES_HEIGHT = 69;
const LEFT = 37;
const RIGHT = 39;
const UP = 38;
const DOWN = 40;
const LEFT_A = 65;
const RIGHT_D = 68;
const UP_W = 87;
const DOWN_S = 83;
const PLAYER_WIDTH = 48;
const PLAYER_HEIGHT = 96;

const CANVAS = document.getElementById("game");
const CONTEXT = CANVAS.getContext("2d");
const FOG_CANVAS = document.getElementById("fogCanvas");
const FOG_CONTEXT = FOG_CANVAS.getContext("2d");

const RESUME_WIDTH = 32;
const RESUME_HEIGHT = 34;

const BOOK_WIDTH = 33;
const BOOK_HEIGHT = 33;

const hashArray = (arr) => {
  return arr.sort().join("|");
};

const DIRECTION_KEYS = new Map([
  [hashArray([RIGHT]), "right"],
  [hashArray([LEFT]), "left"],
  [hashArray([UP]), "up"],
  [hashArray([DOWN]), "down"],
  [hashArray([DOWN, RIGHT]), "downRight"],
  [hashArray([DOWN, LEFT]), "downLeft"],
  [hashArray([UP, RIGHT]), "upRight"],
  [hashArray([UP, LEFT]), "upLeft"],

  [hashArray([RIGHT_D]), "right"],
  [hashArray([LEFT_A]), "left"],
  [hashArray([UP_W]), "up"],
  [hashArray([DOWN_S]), "down"],
  [hashArray([DOWN_S, RIGHT_D]), "downRight"],
  [hashArray([DOWN_S, LEFT_A]), "downLeft"],
  [hashArray([UP_W, RIGHT_D]), "upRight"],
  [hashArray([UP_W, LEFT_A]), "upLeft"],
]);

const WORK_EXP = [
  {
    left: `
    <h3> Navix Health (Jan 2023 - May 2024) </h3>
    <img src="assets/img/navix.png" alt="Navix Health" loading="lazy" />
    <div> 
      <span class="pill">React</span>
      <span class="pill">Next.js 12</span>
      <span class="pill">HTML</span>
      <span class="pill">CSS</span>
      <span class="pill">Javascript</span>
      <span class="pill">Bootstrap</span>
      <span class="pill">SWR</span>
      <span class="pill">Zustand</span>
    </div>
    `,
    right: `<p> A fully unified platform for behavioral health software. Combining CRM 
    (customer relationship management), EMR (electronic medical records), 
    RCM (revenue cycle management) and NavixAI (artifcial intellgents) 
    services into one seamless platform </p>
    
    <p><b>Frontend:</b> <br /> Developed and maintained pages and components. Investigated bugs found in production. 
    Refactored and applied coding principles to the existing old components. </p>
    <a href="https://navixhealth.com/" target="_blank"><i class="fa-solid fa-link"></i> Navix Health</a>`,
  },
  {
    left: `
    <h3> Phoenix Super LPG (Jul 2022 - Jan 2023) </h3>
    <img src="assets/img/phoenix.jpg" alt="Phoenix Super LPG" loading="lazy" />
    <div>
      <span class="pill">Angular</span>
      <span class="pill">HTML</span>
      <span class="pill">CSS</span>
      <span class="pill">Javascript</span>
      <span class="pill">Node.js</span>
      <span class="pill">Express</span>
      <span class="pill">Laravel</span>
      <span class="pill">MySQL</span>
    </div>
    `,
    right: `
    <p> Mobile app where customers can order products and get them delivered to their house </p>
    <p><b>Frontend: </b> <br /> Added features to the legacy Administrator Panel.
    <br /><br /> <b>Backend:</b> <br />
    Converted the backend made in Node.js Express
    to Laravel. Created APIs for the mobile app. I developed the proximity map logic</p>
    
    <a href="https://play.google.com/store/apps/details?id=ph.phoenixfuels.limitless&hl=en&pli=1" target="_blank">
    <i class="fa-solid fa-link"></i> Limitless App </a>`,
  },
  {
    left: `
    <h3> Assetmart (Oct 2021 - Aug 2022) </h3>
    <img src="assets/img/assetmart.png" alt="Assetmart" loading="lazy" />
    <div>
      <span class="pill">React</span>
      <span class="pill">HTML</span>
      <span class="pill">CSS</span>
      <span class="pill">Javascript</span>
      <span class="pill">Typescript</span>
      <span class="pill">Node.js</span>
      <span class="pill">AdonisJS</span>
      <span class="pill">Ant Design</span>
      <span class="pill">MySQL</span>
    </div>
    `,
    right: `
     <p> Look for a property, schedule a property viewing, and chat with the Assetmart advisers </p>
    <p><b>Frontend: </b> <br />Developed and maintained the Administrator Panel for Assetmart. 
   <br /><br /> <b>Backend:</b> <br /> Created the APIs and backend business logic for the Administrator Panel with Node.js + AdonisJS.</p>
    <a href="https://assetmart.global/" target="_blank"><i class="fa-solid fa-link"></i> Assetmart</a>`,
  },
  {
    left: `
     
    <h3> Automart PH (Oct 2021 - Dec 2022) </h3>
    <img src="assets/img/automart.png" alt="Automart" loading="lazy" />
    <div>
      <span class="pill">React</span>
      <span class="pill">HTML</span>
      <span class="pill">CSS</span>
      <span class="pill">Javascript</span>
      <span class="pill">Node.js</span>
      <span class="pill">AdonisJS</span>
      <span class="pill">Ant Design</span>
      <span class="pill">MySQL</span>
    </div>
    `,
    right: `
    <p> Bid or buy a repossessed car and speak with your adviser </p>
    <p><b>Frontend: </b> <br />Added features and functionalities to the Administrator Panel frontend. 
    <br /><br /> <b>Backend:</b> <br />
    Modified and 
    consolidated the designated APIs.</p>
    <a href="https://automart.ph/" target="_blank"><i class="fa-solid fa-link"></i> Automart PH</a>`,
  },
  {
    left: `
    <h3> Smartway Solutions (Feb 2020 - Feb 2021) </h3>
    <img src="assets/img/smartway.png" alt="Smartway Solutions" loading="lazy" />
    <div>
      <span class="pill">HTML</span>
      <span class="pill">CSS</span>
      <span class="pill">Javascript</span>
      <span class="pill">Node.js</span>
      <span class="pill">Express</span>
      <span class="pill">MySQL</span>
    </div>
    `,
    right: `
    <p> Tracking NB-IoT parking devices in real time </p>
    <p><b>Frontend: </b> <br />Developed the entire Administrator Panel
    <br /><br /> <b>Backend:</b> <br />
    Created APIs endpoints, database models and business logic services </p>
    <a href="https://www.smartway-solutions-inc.com" target="_blank"><i class="fa-solid fa-link"></i> Smartway Solutions</a>
    <a class="mt-1" href="mailto:walkerfleck@gmail.com"><i class="fa fa-envelope"></i> Walkerfleck (Mentor)</a>
    `,
  },
  {
    left: `
    <h3> Freelance PHP Developer (Jan 2019 - Oct 2021) </h3>
    <img src="assets/img/pier22.png" alt="Pier 22" loading="lazy" />
    <div>
    <span class="pill">PHP</span>
      <span class="pill">HTML</span>
      <span class="pill">CSS</span>
      <span class="pill">Javascript</span>
      <span class="pill">MySQL</span>
    </div>
    `,
    right: `<p>Developed a couple of administrator panels for different websites</p>
    <a class="mt-1" href="mailto:walkerfleck@gmail.com"><i class="fa fa-envelope"></i> Walkerfleck (Mentor)</a>
    `,
  },
];

const PERSONAL_EXP = [
  {
    left: `
    <h3> My Portfolio (April 2024 - Ongoing) </h3>
    <img src="assets/img/portfolio.png" alt="My Portfolio" loading="lazy" />
    <div> 
      <span class="pill">HTML</span>
      <span class="pill">Canvas API</span>
      <span class="pill">CSS</span>
      <span class="pill">Javascript</span>
    </div>
    `,
    right: `
    <p>Pixel RPG game about me. You can find my personal projects, work projects and my resume. 
    I used HTML 5 canvas and animation frame. No external libraries or frameworks used.</p>
    <div class="flex-0"><a href="https://github.com/mickomagallanes/mickomagallanes.github.io" target="_blank">
    <i class="fa-brands fa-github"></i></a></div>`,
  },
  {
    left: `
    <h3> Basketball Stats App (June 21, 2024 - June 23, 2024) </h3>
    <img src="assets/img/player-app.png" alt="Basketball Stats" loading="lazy" />
    <div> 
      <span class="pill">Next.js 14</span>
      <span class="pill">React</span>
      <span class="pill">HTML</span>
      <span class="pill">CSS</span>
      <span class="pill">Javascript</span>
      <span class="pill">Tailwind CSS</span>
      <span class="pill">Synergy Sports API</span>
    </div>
    `,
    right: `
    <p>An app I created for a job interview examination. I had to create it for a total of 16 hours. 
    It fetches the stats of a basketball player </p>
    <a href="https://player-app-micko-magallanes-projects.vercel.app/" target="_blank"><i class="fa-solid fa-link"></i> Basketball Stats App</a>
    <div class="flex-0 mt-1"><a href="https://github.com/mickomagallanes/player-app" target="_blank">
    <i class="fa-brands fa-github"></i></a></div>`,
  },
  {
    left: `
    <h3> Crypto Tracker (May 2024 - Ongoing) </h3>
    <img src="assets/img/crypto-tracker.png" alt="Crypto Tracker" loading="lazy" />
    <div> 
      <span class="pill">Next.js 14</span>
      <span class="pill">React</span>
      <span class="pill">HTML</span>
      <span class="pill">CSS</span>
      <span class="pill">Javascript</span>
      <span class="pill">Tailwind CSS</span>
      <span class="pill">CoinGecko API</span>
      <span class="pill">NewsData.io API</span>
    </div>
    `,
    right: `
    <p>A simple crypto tracker web-app. Supports mobile and desktop. I used Server Components to 
    fetch data from different external APIs. Client Components for merely those who are supposed to.</p>
    <a href="https://crypto-tracker-micko-magallanes-projects.vercel.app/" target="_blank"><i class="fa-solid fa-link"></i> Crypto Tracker</a>
    <div class="flex-0 mt-1"><a href="https://github.com/mickomagallanes/crypto-tracker" target="_blank">
    <i class="fa-brands fa-github"></i></a></div>`,
  },
  {
    left: `
    <h3> Carodus Admin Dashboard (Jan 2021 - Oct 2021) </h3>
    <img src="assets/img/carodus.png" alt="Carodus Admin Dashboard" loading="lazy" />
    <div> 
      <span class="pill">React</span>
      <span class="pill">HTML</span>
      <span class="pill">CSS</span>
      <span class="pill">Javascript</span>
      <span class="pill">Redux</span>
      <span class="pill">Bootstrap</span>
      <span class="pill">Node.js</span>
      <span class="pill">Express</span>
      <span class="pill">MySQL</span>
    </div>
    `,
    right: `
    <p>Frontend is built with React + React Router. Backend is Node.js Express + MySQL. 
     I handled authentication using cookies and bcrypt for the password. I used raw SQL and never used an ORM
    </p>
    <div class="flex-0 mt-1"><a href="https://github.com/mickomagallanes/2021-dashboard" target="_blank">
    <i class="fa-brands fa-github"></i></a></div>`,
  },
  {
    left: `
    <h3> Shooter game (Jun 2019 - Oct 2019) </h3>
    <img src="assets/img/shooter.png" alt="Shooter game" loading="lazy" />
    <div> 
      <span class="pill">HTML</span>
      <span class="pill">Canvas API</span>
      <span class="pill">CSS</span>
      <span class="pill">Javascript</span>
    </div>
    `,
    right: `
    <p>The project that taught me how to make an HTML 5 game. Thanks to my mentor Walkerfleck for guiding me!
    </p>
    <a href="https://mickomagallanes.github.io/shooter" target="_blank"><i class="fa-solid fa-link"></i> Shooter Game</a>
    <div class="flex-0 mt-1"><a href="https://github.com/mickomagallanes/shooter" target="_blank">
    <i class="fa-brands fa-github"></i></a></div>`,
  },
];

const loadImage = (src, callback = () => {}) => {
  const img = new Image();

  img.src = src;

  img.onload = () => {
    callback(img);
  };

  return img;
};

function getVisibleCanvasWidth() {
  const canvasRect = CANVAS.getBoundingClientRect();
  const visibleWidth =
    Math.min(canvasRect.right, window.innerWidth) -
    Math.max(canvasRect.left, 0);

  return visibleWidth;
}

function getVisibleCanvasHeight() {
  if (!CANVAS) return 0; // Canvas not found

  const canvasRect = CANVAS.getBoundingClientRect();
  const visibleHeight =
    Math.min(canvasRect.bottom, window.innerHeight) -
    Math.max(canvasRect.top, 0);

  return visibleHeight;
}

function createDirections(y) {
  return [
    { x: 7, y: y },
    { x: 0, y: y },
    { x: 6, y: y },
    { x: 0, y: y },
    { x: 1, y: y },
    { x: 2, y: y },
    { x: 8, y: y },
    { x: 2, y: y },
  ];
}

function createDirectionsDiag(y) {
  return [
    { x: 4, y: y },
    { x: 3, y: y },
    { x: 11, y: y },
    { x: 3, y: y },
    { x: 4, y: y },
    { x: 5, y: y },
    { x: 9, y: y },
    { x: 5, y: y },
  ];
}

function randomizeNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function addEventListenerWithReplacement(element, event, handler) {
  // First, remove any existing event listener of the same type
  element.removeEventListener(event, handler);

  // Then, add the new event listener
  element.addEventListener(event, handler);
}
