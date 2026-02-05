// ======================
// Data
// ======================
const PLAYLISTS = [
  { key: "all",     title: "All case studies",        subtitle: "Everything worth skimming first" },
  { key: "check",   title: "Applied ML @ Check",      subtitle: "Pipelines, KPI design, dashboards, segmentation" },
  { key: "bachelor",title: "Bachelor projects",       subtitle: "Forecasting + applied modeling" },
  { key: "ml",      title: "ML + NLP projects",       subtitle: "Classification and sequence models" },
  { key: "dss",     title: "Decision Support System", subtitle: "Network analysis & roles/factions" },
];

const TRACKS = [
  {
    id: 1,
    playlist: "check",
    title: "Support Ops Dashboard (End-to-End)",
    subtitle: "APIs → Airflow → ClickHouse → KPI choices → Superset used in monthly reviews",
    tags: ["pipelines", "clickhouse", "airflow", "superset", "kpis"],
    length: "4:10",
    section: "Check Technologies",
    privacy: "public",
    case: {
      problem: "Support needed a reliable monitoring view to review performance and operations consistently.",
      constraints: [
        "Metrics can mislead if definitions are vague",
        "Multiple sources (APIs + platform data)",
        "Deliverable had to be usable by managers in recurring reviews"
      ],
      approach: [
        "Gathered data from APIs and built production tables via Airflow + ClickHouse",
        "Worked with the support manager to define KPIs and challenged metric choices when they didn't match decisions",
        "Built a Superset dashboard designed around the monthly review flow (not just charts)"
      ],
      impact: [
        "Dashboard is used by managers during monthly reviews",
        "Clear KPI definitions reduced ambiguity and improved follow-up discussions"
      ],
      links: [{ label: "Resume (context)", href: "#" }]
    }
  },
  {
    id: 2,
    playlist: "check",
    title: "User Clustering for Targeted Communication",
    subtitle: "Feature engineering across sources + stakeholder scoping → actionable segments",
    tags: ["clustering", "behavior", "feature engineering", "stakeholders"],
    length: "3:55",
    section: "Check Technologies",
    privacy: "public",
    case: {
      problem: "Segments were needed to explore communication targeting based on real behavior, not assumptions.",
      constraints: [
        "Behavior data is noisy and multi-modal",
        "Clusters must be interpretable to be used",
        "High risk of 'random clusters' without validation"
      ],
      approach: [
        "Engineered features by gathering data across platform sources",
        "Ran EDA to check relevance of variables and removed fragile proxies",
        "Scoped use-cases with stakeholders before locking modeling choices"
      ],
      impact: [
        "Defined clusters now being investigated for possible communication targeting",
        "Set up a repeatable workflow to iterate on features and validation"
      ],
      links: [{ label: "Resume (context)", href: "#" }]
    }
  },
  {
    id: 3,
    playlist: "bachelor",
    title: "NYC Subway Ridership Forecasting",
    subtitle: "SARIMA baseline + XGBoost improvement with structured validation",
    tags: ["time series", "sarima", "xgboost", "forecasting"],
    length: "3:24",
    section: "Bachelor thesis",
    privacy: "public",
    case: {
      problem: "Forecast ridership patterns with interpretable baselines and performance improvements.",
      constraints: [
        "Seasonality and structural changes",
        "Model comparison had to be fair and repeatable",
        "Evaluation needed to reflect forecasting reality"
      ],
      approach: [
        "Built SARIMA as a strong statistical baseline",
        "Trained XGBoost to capture nonlinearities and exogenous structure",
        "Compared models with time-aware splits and error analysis"
      ],
      impact: [
        "Produced a clear baseline vs improvement narrative",
        "Demonstrated how model choice changes decisions under uncertainty"
      ],
      links: [{ label: "Resume (context)", href: "#" }]
    }
  },
  {
    id: 4,
    playlist: "dss",
    title: "DSS for Clandestine Network Analysis",
    subtitle: "Community detection + role identification packaged for analysts",
    tags: ["networks", "dss", "communities", "roles", "evaluation"],
    length: "4:02",
    section: "VU Amsterdam",
    privacy: "public",
    case: {
      problem: "Support analysts by turning network algorithms into an interface that guides decisions.",
      constraints: [
        "Multiple algorithms give different outputs",
        "Results need validation and limits must be explicit",
        "UI must help interpretation, not just display graphs"
      ],
      approach: [
        "Integrated community detection and role identification methods",
        "Added comparison and validation signals (not just one score)",
        "Designed an interactive workflow to explore factions/roles and interpret them"
      ],
      impact: [
        "Produced a decision-support interface rather than a static analysis",
        "Made algorithm trade-offs visible for non-technical users"
      ],
      links: [{ label: "Resume (context)", href: "#" }]
    }
  },
  {
    id: 5,
    playlist: "ml",
    title: "Cardiovascular Disease Classification",
    subtitle: "Chi-square + correlation feature selection → Random Forest (73% accuracy)",
    tags: ["classification", "feature selection", "random forest", "stats"],
    length: "3:12",
    section: "ML + Statistics",
    privacy: "public",
    case: {
      problem: "Predict cardiovascular disease (CVD) and identify which health features drive risk.",
      constraints: [
        "Mix of categorical/binary and continuous variables",
        "Risk of collinearity in blood pressure signals",
        "Feature selection had to be justified statistically"
      ],
      approach: [
        "Used chi-square tests (α=0.05) for categorical/binary variables; all were significant",
        "Used correlation analysis and kept features with ≥0.2 correlation to CVD",
        "Dropped diastolic BP due to collinearity and trained multiple models"
      ],
      impact: [
        "Random Forest achieved best test accuracy (73%)",
        "Top features: systolic BP, then age and cholesterol"
      ],
      links: [{ label: "Resume (context)", href: "#" }]
    }
  },
  {
    id: 6,
    playlist: "ml",
    title: "Sarcasm Detection in News Headlines",
    subtitle: "GRU/LSTM + embeddings → F1 up to 0.86; minimal preprocessing worked best",
    tags: ["nlp", "lstm", "gru", "embeddings", "f1-score"],
    length: "3:28",
    section: "NLP",
    privacy: "public",
    case: {
      problem: "Detect sarcasm in news headlines (The Onion vs HuffPost) using NLP and sequence models.",
      constraints: [
        "Context cues are easy to strip during preprocessing",
        "Overfitting risk with RNN models",
        "Need a metric balancing precision/recall"
      ],
      approach: [
        "Used balanced dataset and verified data quality",
        "Built minimally processed vs fully processed pipelines",
        "Tested Word2Vec, GloVe, self-trained embeddings with GRU/LSTM and tuned hyperparameters"
      ],
      impact: [
        "Best F1 around 0.80–0.86; minimally processed text performed better",
        "GRU and LSTM performed similarly; embedding choice had limited impact"
      ],
      links: [{ label: "Resume (context)", href: "#" }]
    }
  },
];

// ======================
// State
// ======================
let currentIdx = 0;
let storyMode = false;
let saved = new Set();
let progressPct = 0.0;
let volumePct = 0.60;
let activePlaylist = "all";
let storyTimer = null;

// Lyrics
let lyricsPlaying = false;
let lyricsSpeed = 1;
let lyricsRAF = null;
let userInteracting = false;
let userInteractT = null;

// ======================
// Elements
// ======================
const trackBody = document.getElementById("trackBody");
const trackCount = document.getElementById("trackCount");
const nowTitle = document.getElementById("nowTitle");
const nowArtist = document.getElementById("nowArtist");
const playBtn = document.getElementById("playBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const likeBtn = document.getElementById("likeBtn");

const progress = document.getElementById("progress");
const progressFill = document.getElementById("progressFill");
const timeNow = document.getElementById("timeNow");
const timeEnd = document.getElementById("timeEnd");

const volbar = document.getElementById("volbar");
const volFill = document.getElementById("volFill");

const resumeBtn = document.getElementById("resumeBtn");
const resumeBtnSide = document.getElementById("resumeBtnSide");
const contactBtn = document.getElementById("contactBtn");
const toast = document.getElementById("toast");
const toastText = document.getElementById("toastText");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

// Drawer
const caseDrawer = document.getElementById("caseDrawer");
const caseTitle = document.getElementById("caseTitle");
const caseBody  = document.getElementById("caseBody");
const caseClose = document.getElementById("caseClose");

// Playlists
const playlistWrap = document.getElementById("playlistWrap");

// Content container
const content = document.getElementById("content");

// Lyrics elements
const lyricsBody = document.getElementById("lyricsBody");
const lyricsPlayBtn = document.getElementById("lyricsPlayBtn");
const lyricsSpeedBtn = document.getElementById("lyricsSpeedBtn");
const lyricsTopBtn = document.getElementById("lyricsTopBtn");

// ======================
// Helpers
// ======================
function showToast(msg){
  toastText.textContent = msg;
  toast.classList.add("show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove("show"), 1400);
}

function scrollToId(id){
  const el = document.getElementById(id);
  if(!el || !content) return;

  const cRect = content.getBoundingClientRect();
  const eRect = el.getBoundingClientRect();
  const top = (eRect.top - cRect.top) + content.scrollTop - 12;

  content.scrollTo({ top, behavior: "smooth" });

  document.querySelectorAll(".nav-item").forEach(n => n.classList.remove("active"));
  const active = document.querySelector(`.nav-item[data-jump="${id}"]`);
  if(active) active.classList.add("active");
}

function setVolume(p){
  volumePct = Math.max(0, Math.min(1, p));
  volFill.style.width = `${volumePct * 100}%`;
  showToast(`Volume ${Math.round(volumePct*100)}%`);
}

function setReadingProgress(p){
  progressPct = Math.max(0, Math.min(1, p));
  progressFill.style.width = `${progressPct * 100}%`;
  timeNow.textContent = `${Math.round(progressPct*100)}%`;
}

function updateSavedState(){
  const t = TRACKS[currentIdx];
  const isSaved = saved.has(t.id);
  likeBtn.textContent = isSaved ? "♥" : "♡";
  likeBtn.style.borderColor = isSaved ? "rgba(30,215,96,.45)" : "var(--line)";
  likeBtn.style.background = isSaved ? "rgba(30,215,96,.10)" : "rgba(255,255,255,.03)";
}

function setCurrentTrack(syncDrawer){
  const t = TRACKS[currentIdx];
  nowTitle.textContent = `Case ${String(t.id).padStart(2,"0")} — ${t.title}`;
  nowArtist.textContent = `Myriam Thabet • ${t.section}`;
  updateSavedState();

  document.querySelectorAll("#trackBody tr").forEach(tr => tr.classList.remove("active"));
  const activeRow = document.querySelector(`#trackBody tr[data-track-id="${t.id}"]`);
  if(activeRow) activeRow.classList.add("active");

  if(syncDrawer) openCase(t);
}

function openCase(t){
  caseTitle.textContent = `Now Playing — ${t.title}`;
  const c = t.case;

  const privacyLabel = (t.privacy === "private")
    ? `<div class="notice"><b style="color:var(--text);">Privacy note:</b> Details are intentionally kept high-level. The goal is to show how problems get framed and evaluated.</div>`
    : "";

  const links = (c.links || []).map(l =>
    `<a class="btn primary" target="_blank" rel="noreferrer" href="${l.href}">${l.label}</a>`
  ).join("");

  caseBody.innerHTML = `
    <div style="display:flex; justify-content:space-between; gap:10px; align-items:flex-start;">
      <div style="min-width:0;">
        <div style="color:var(--text); font-weight:850; letter-spacing:-.2px; font-size:16px;">${t.subtitle}</div>
        <div class="chips">${(t.tags||[]).map(x => `<span class="chip">${x}</span>`).join("")}</div>
      </div>
      <div style="flex:0 0 auto; color:var(--faint); font-family:var(--mono); font-size:12px; padding-top:4px;">${t.length}</div>
    </div>

    <div class="kicker">Problem</div>
    <div style="color:var(--muted); line-height:1.7;">${c.problem}</div>

    <div class="kicker">Constraints</div>
    <ul class="bullets">${(c.constraints||[]).map(x => `<li>${x}</li>`).join("")}</ul>

    <div class="kicker">Approach</div>
    <ul class="bullets">${(c.approach||[]).map(x => `<li>${x}</li>`).join("")}</ul>

    <div class="kicker">Outcome</div>
    <ul class="bullets">${(c.impact||[]).map(x => `<li>${x}</li>`).join("")}</ul>

    ${privacyLabel}

    <div style="margin-top:14px; display:flex; gap:10px; flex-wrap:wrap;">
      ${links}
    </div>
  `;

  caseDrawer.classList.add("open");
  caseDrawer.setAttribute("aria-hidden","false");
  setReadingProgress(0);

  requestAnimationFrame(() => {
    const el = caseBody;
    const onScroll = () => {
      const max = Math.max(1, el.scrollHeight - el.clientHeight);
      setReadingProgress(el.scrollTop / max);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  });
}

function closeCase(){
  caseDrawer.classList.remove("open");
  caseDrawer.setAttribute("aria-hidden","true");
  setReadingProgress(0);
}

function nextTrack(openDrawer = storyMode){
  currentIdx = (currentIdx + 1) % TRACKS.length;
  setCurrentTrack(openDrawer);
  if(openDrawer) scrollToId("tracks");
}

function prevTrack(openDrawer = storyMode){
  currentIdx = (currentIdx - 1 + TRACKS.length) % TRACKS.length;
  setCurrentTrack(openDrawer);
  if(openDrawer) scrollToId("tracks");
}

function toggleSaved(){
  const t = TRACKS[currentIdx];
  if(saved.has(t.id)) saved.delete(t.id);
  else saved.add(t.id);
  updateSavedState();
  showToast(saved.has(t.id) ? "Saved" : "Unsaved");
}

function updateStoryState(){
  playBtn.textContent = storyMode ? "❚❚" : "▶";
  showToast(storyMode ? "Story mode on" : "Story mode off");

  if(storyMode){
    clearInterval(storyTimer);
    storyTimer = setInterval(() => {
      if(!caseDrawer.classList.contains("open")){
        openCase(TRACKS[currentIdx]);
      } else {
        nextTrack(true);
      }
    }, 12000);
  } else {
    clearInterval(storyTimer);
    storyTimer = null;
  }
}

function renderPlaylists(){
  playlistWrap.innerHTML = "";
  PLAYLISTS.forEach(p => {
    const row = document.createElement("div");
    row.className = "playlist" + (p.key === activePlaylist ? " active" : "");
    row.dataset.playlist = p.key;

    row.innerHTML = `
      <div class="pl-art" aria-hidden="true"></div>
      <div class="pl-meta">
        <strong>${p.title}</strong>
        <span class="pl-tooltip" role="tooltip">${p.subtitle}</span>
      </div>
    `;

    row.addEventListener("click", () => {
      activePlaylist = p.key;
      document.querySelectorAll(".playlist").forEach(x => x.classList.remove("active"));
      row.classList.add("active");
      renderTracks(getVisibleTracks());
      showToast(p.key === "all" ? "Showing all" : `Filtered: ${p.title}`);
      scrollToId("tracks");
    });

    playlistWrap.appendChild(row);
  });
}

function getVisibleTracks(){
  if(activePlaylist === "all") return TRACKS;
  return TRACKS.filter(t => t.playlist === activePlaylist);
}

function ensureCurrentTrackVisible(list){
  if(!list || list.length === 0) return;
  const visibleIds = new Set(list.map(t => t.id));
  const currentId = TRACKS[currentIdx]?.id;

  if(!visibleIds.has(currentId)){
    const firstId = list[0].id;
    const realIndex = TRACKS.findIndex(x => x.id === firstId);
    if(realIndex >= 0) currentIdx = realIndex;
  }
}

function renderTracks(list){
  trackBody.innerHTML = "";
  trackCount.textContent = String(list.length).padStart(2,"0");

  list.forEach((t, idx) => {
    const tr = document.createElement("tr");
    tr.dataset.trackId = t.id;

    tr.innerHTML = `
      <td class="idx">${String(idx+1).padStart(2,"0")}</td>
      <td>
        <div class="track-title">
          <div class="t-art" aria-hidden="true"></div>
          <div class="t-meta">
            <strong>Case ${String(t.id).padStart(2,"0")} — ${t.title}</strong>
            <span>${t.subtitle}</span>
          </div>
        </div>
      </td>
      <td class="dur">${t.length}</td>
    `;

    tr.addEventListener("click", () => {
      const realIndex = TRACKS.findIndex(x => x.id === t.id);
      if(realIndex >= 0) {
        currentIdx = realIndex;
        setCurrentTrack(true);
        showToast(`Opened: ${TRACKS[currentIdx].title}`);
      }
    });

    trackBody.appendChild(tr);
  });

  ensureCurrentTrackVisible(list);
  setCurrentTrack(false);
}

function doSearch(){
  const q = searchInput.value.trim().toLowerCase();
  const base = getVisibleTracks();

  if(!q){
    renderTracks(base);
    showToast(activePlaylist === "all" ? "Showing all" : "Showing filtered playlist");
    return;
  }

  const filtered = base.filter(t =>
    t.title.toLowerCase().includes(q) ||
    t.subtitle.toLowerCase().includes(q) ||
    (t.tags || []).join(" ").toLowerCase().includes(q) ||
    (t.section || "").toLowerCase().includes(q)
  );
  renderTracks(filtered);
  showToast(`${filtered.length} match(es)`);
  scrollToId("tracks");
}

function openResume(){
  const url = "./Resume_Thabet_Myriam.pdf";
  window.open(url, "_blank", "noopener,noreferrer");
}

// ======================
// Lyrics (auto-scroll + highlight)
// ======================
function lyricsSetBtn(){
  if(!lyricsPlayBtn || !lyricsSpeedBtn) return;
  lyricsPlayBtn.textContent = lyricsPlaying ? "Pause" : "Auto-scroll";
  lyricsSpeedBtn.textContent = `${lyricsSpeed}×`;
}

function markUserInteracting(){
  userInteracting = true;
  clearTimeout(userInteractT);
  userInteractT = setTimeout(() => userInteracting = false, 900);
}

function setLyricsHighlight(){
  if(!lyricsBody) return;
  const ps = Array.from(lyricsBody.querySelectorAll("p"));
  if(!ps.length) return;

  const top = lyricsBody.getBoundingClientRect().top;
  const targetY = top + lyricsBody.clientHeight * 0.10;

  let best = null;
  let bestDist = Infinity;
  for(const p of ps){
    const r = p.getBoundingClientRect();
    const mid = r.top + r.height * 0.5;
    const d = Math.abs(mid - targetY);
    if(d < bestDist){
      bestDist = d;
      best = p;
    }
  }

  ps.forEach(p => p.classList.remove("is-active","is-near"));
  if(best){
    best.classList.add("is-active");
    const idx = ps.indexOf(best);
    if(ps[idx-1]) ps[idx-1].classList.add("is-near");
    if(ps[idx+1]) ps[idx+1].classList.add("is-near");
  }
}

function lyricsTick(){
  if(!lyricsPlaying || !lyricsBody) return;

  if(userInteracting){
    setLyricsHighlight();
    lyricsRAF = requestAnimationFrame(lyricsTick);
    return;
  }

  const px = 2 * lyricsSpeed; // faster
  lyricsBody.scrollTop += px;

  setLyricsHighlight();

  const atEnd = (lyricsBody.scrollTop + lyricsBody.clientHeight) >= (lyricsBody.scrollHeight - 2);
  if(atEnd){
    lyricsPlaying = false;
    lyricsSetBtn();
    showToast("Lyrics reached the end");
    return;
  }

  lyricsRAF = requestAnimationFrame(lyricsTick);
}

function lyricsPlay(){
  if(!lyricsBody) return;
  lyricsPlaying = true;
  lyricsSetBtn();
  cancelAnimationFrame(lyricsRAF);
  lyricsRAF = requestAnimationFrame(lyricsTick);
  showToast("Lyrics auto-scroll");
}

function lyricsPause(){
  lyricsPlaying = false;
  lyricsSetBtn();
  cancelAnimationFrame(lyricsRAF);
  lyricsRAF = null;
  showToast("Lyrics paused");
}

// ======================
// Events
// ======================
document.querySelectorAll("[data-jump]").forEach(el => {
  el.addEventListener("click", () => scrollToId(el.dataset.jump));
});

caseClose.addEventListener("click", closeCase);

playBtn.addEventListener("click", () => {
  storyMode = !storyMode;
  updateStoryState();
});

nextBtn.addEventListener("click", () => nextTrack(true));
prevBtn.addEventListener("click", () => prevTrack(true));
likeBtn.addEventListener("click", toggleSaved);

progress.addEventListener("click", (e) => {
  if(!caseDrawer.classList.contains("open")){
    showToast("Open a case study first");
    return;
  }
  const rect = progress.getBoundingClientRect();
  const p = (e.clientX - rect.left) / rect.width;
  const el = caseBody;
  const max = Math.max(1, el.scrollHeight - el.clientHeight);
  el.scrollTop = max * p;
});

volbar.addEventListener("click", (e) => {
  const rect = volbar.getBoundingClientRect();
  const p = (e.clientX - rect.left) / rect.width;
  setVolume(p);
});

contactBtn.addEventListener("click", () => scrollToId("contact"));

resumeBtn.addEventListener("click", openResume);
resumeBtnSide.addEventListener("click", openResume);

searchBtn.addEventListener("click", doSearch);
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") doSearch();
  if (e.key === "Escape") {
    searchInput.value = "";
    renderTracks(getVisibleTracks());
    showToast("Search cleared");
  }
});

// Lyrics controls + pause on interaction
lyricsPlayBtn?.addEventListener("click", () => {
  lyricsPlaying ? lyricsPause() : lyricsPlay();
});

lyricsSpeedBtn?.addEventListener("click", () => {
  const cycle = [1, 1.5, 2, 0.75];
  const i = cycle.indexOf(lyricsSpeed);
  lyricsSpeed = cycle[(i + 1) % cycle.length];
  lyricsSetBtn();
  showToast(`Lyrics speed ${lyricsSpeed}×`);
});

lyricsTopBtn?.addEventListener("click", () => {
  if(!lyricsBody) return;
  lyricsBody.scrollTop = 0;
  setLyricsHighlight();
  showToast("Back to top");
});

lyricsBody?.addEventListener("wheel", () => { markUserInteracting(); setLyricsHighlight(); }, { passive: true });
lyricsBody?.addEventListener("touchmove", () => { markUserInteracting(); setLyricsHighlight(); }, { passive: true });
lyricsBody?.addEventListener("mouseenter", () => { markUserInteracting(); setLyricsHighlight(); });
lyricsBody?.addEventListener("scroll", () => { markUserInteracting(); setLyricsHighlight(); }, { passive: true });

window.addEventListener("keydown", (e) => {
  const tag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : "";
  const typing = tag === "input" || tag === "textarea";
  if(typing) return;

  if(e.key === " "){ e.preventDefault(); storyMode = !storyMode; updateStoryState(); }
  if(e.key.toLowerCase() === "n"){ nextTrack(true); }
  if(e.key.toLowerCase() === "p"){ prevTrack(true); }
  if(e.key.toLowerCase() === "s"){ toggleSaved(); }

  if(e.key === "1"){ scrollToId("about"); }
  if(e.key === "2"){ scrollToId("tracks"); }
  if(e.key === "3"){ scrollToId("home"); }
  if(e.key === "4"){ scrollToId("contact"); }

  if(e.key.toLowerCase() === "r"){ openResume(); }
  if(e.key === "?"){ showToast("Space: story • N/P: next/prev • S: save • R: resume"); }

  if(e.key === "Escape"){
    if(caseDrawer.classList.contains("open")) closeCase();
  }
});

const sectionIds = ["about","tracks","home","contact"];
content.addEventListener("scroll", () => {
  const tops = sectionIds.map(id => {
    const el = document.getElementById(id);
    const r = el.getBoundingClientRect();
    const containerTop = content.getBoundingClientRect().top;
    return { id, dist: Math.abs(r.top - containerTop - 18) };
  });
  tops.sort((a,b) => a.dist - b.dist);
  const activeId = tops[0]?.id;
  if(activeId){
    document.querySelectorAll(".nav-item").forEach(n => n.classList.remove("active"));
    const active = document.querySelector(`.nav-item[data-jump="${activeId}"]`);
    if(active) active.classList.add("active");
  }
});

// init
renderPlaylists();
renderTracks(getVisibleTracks());
setVolume(volumePct);
updateStoryState();
lyricsSetBtn();
setLyricsHighlight();
showToast('Loaded. Click a case study to open "Now Playing".');

