/* =====================================================================
   TWINIES — логика сайта: переходы между экранами, карточки, окна, формы.
   Весь контент берётся из content.js. Здесь править ничего не нужно.
   ===================================================================== */

(function(){
"use strict";

var C = (typeof CONTENT !== "undefined") ? CONTENT : null;
if(!C){ console.error("content.js не загрузился — проверьте, что файл лежит рядом с index.html"); return; }

function $(id){ return document.getElementById(id); }
function esc(s){
  return String(s == null ? "" : s).replace(/[&<>"]/g, function(c){
    return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c];
  });
}
function pic(src, cls, alt, phText){
  return '<div class="' + cls + '">' + (src
    ? '<img src="' + esc(src) + '" alt="' + esc(alt || "") + '" loading="lazy">'
    : '<span class="ph"><span>' + (phText || "photo") + '</span></span>') + '</div>';
}

/* ----------------------------- спираль ----------------------------- */
(function spiral(){
  var cv = $("spiral"); if(!cv) return;
  function draw(){
    var size = Math.min(1500, Math.round(Math.min(window.innerWidth, window.innerHeight) * 1.9));
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = size * dpr; cv.height = size * dpr;
    var x = cv.getContext("2d");
    x.scale(dpr, dpr);
    var c = size / 2, turns = 5.5, steps = 1100, max = c * 0.94;
    var grad = x.createLinearGradient(0, 0, size, size);
    grad.addColorStop(0, "#7CFF2E"); grad.addColorStop(.5, "#4FE8FF"); grad.addColorStop(1, "#B14BFF");
    x.strokeStyle = grad; x.lineWidth = Math.max(1.4, size / 620); x.lineCap = "round";
    x.beginPath();
    for(var i = 0; i <= steps; i++){
      var t = turns * 2 * Math.PI * i / steps;
      var r = 6 + (max - 6) * (t / (turns * 2 * Math.PI));
      var px = c + r * Math.cos(t), py = c + r * Math.sin(t);
      if(i === 0) x.moveTo(px, py); else x.lineTo(px, py);
    }
    x.stroke();
  }
  draw();
  var t; window.addEventListener("resize", function(){ clearTimeout(t); t = setTimeout(draw, 220); });
})();

/* ------------------------- переходы по экранам ------------------------- */
var VIEWS = ["home", "founder", "division", "create", "join"];
var SECTION_OF = { founders: "founders", divisions: "divisions", projects: "projects" };

function show(view){
  VIEWS.forEach(function(v){ $("view-" + v).hidden = (v !== view); });
  document.querySelectorAll(".nav nav button").forEach(function(b){
    b.setAttribute("aria-current", String(b.dataset.go === view));
  });
}
function go(view){ show(view); window.scrollTo(0, 0); }

function toSection(id){
  show("home");
  requestAnimationFrame(function(){
    var el = $(SECTION_OF[id] || id);
    if(el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

document.addEventListener("click", function(e){
  var g = e.target.closest("[data-go]");     if(g){ go(g.dataset.go); return; }
  var n = e.target.closest("[data-nav]");    if(n){ toSection(n.dataset.nav); return; }
});

/* --------------------------- главный экран --------------------------- */
$("tagline").textContent = C.tagline || "";
$("heroText").innerHTML =
  '<p class="lede">' + esc(C.intro[0]) + '</p>' +
  '<div class="hero-cols">' + C.intro.slice(1).map(function(p){
    return '<p>' + esc(p) + '</p>';
  }).join("") + '</div>';

$("footMail").innerHTML = '<a class="mail" href="mailto:' + esc(C.email) + '">' + esc(C.email) + '</a>';
$("joinTeaser").innerHTML = C.joinIntro.slice(0, 2).map(function(p){ return '<p>' + esc(p) + '</p>'; }).join("");

/* ------------------------------ фаундеры ------------------------------ */
$("founderGrid").innerHTML = C.founders.map(function(f){
  return '<button class="founder" data-founder="' + esc(f.id) + '">' +
    pic(f.photo, "portrait", f.name) +
    '<div><h3>' + esc(f.name) + '</h3><div class="role">' + esc(f.short) + '</div></div>' +
    '<span class="more">About me →</span></button>';
}).join("");

function openFounder(id){
  var f = C.founders.filter(function(x){ return x.id === id; })[0];
  if(!f) return;
  $("founderBody").innerHTML = '<div class="founder-page">' +
    pic(f.photo, "portrait", f.name) +
    '<div class="sheet">' +
      '<div><h2>' + esc(f.name) + '</h2><div class="title">' + esc(f.title) + '</div></div>' +
      '<div><p class="label" style="margin-bottom:14px">Selected achievements</p>' +
        '<ul class="ach">' + f.achievements.map(function(a){ return '<li>' + esc(a) + '</li>'; }).join("") + '</ul></div>' +
      '<div><p class="label" style="margin-bottom:14px">About me</p>' +
        '<p class="about">' + esc(f.about) + '</p></div>' +
      '<blockquote>' + esc(f.quote) + '<cite>' + esc(f.cite) + '</cite></blockquote>' +
      '<div><button class="btn" type="button" data-go="create">Create art</button></div>' +
    '</div></div>';
  go("founder");
}
$("founderGrid").addEventListener("click", function(e){
  var b = e.target.closest("[data-founder]");
  if(b) openFounder(b.dataset.founder);
});

/* ---------------------------- подразделения ---------------------------- */
function sigil(d, extra){
  return d.logo ? '<img class="sigil ' + (extra || "") + '" src="' + esc(d.logo) + '" alt="' + esc(d.name) + '">'
                : '<span class="ph">logo</span>';
}

$("divGrid").innerHTML = C.divisions.map(function(d){
  return '<button class="div-card" data-division="' + esc(d.id) + '">' +
    '<span class="sigil-box">' + sigil(d) + '</span>' +
    '<h3>' + esc(d.name) + '</h3></button>';
}).join("");

function openDivision(id){
  var d = C.divisions.filter(function(x){ return x.id === id; })[0];
  if(!d) return;
  var people = (C.team && C.team[id]) || [];

  $("divisionBody").innerHTML = '<div class="division-page">' +
    '<div class="dhead">' + sigil(d) +
      '<div><h2>' + esc(d.name) + '</h2>' +
      '<div class="roles">' + esc(d.roles) + '</div>' +
      '<p class="desc">' + esc(d.desc) + '</p></div></div>' +
    '<p class="label" style="margin-top:34px">' + people.length + ' twinies</p>' +
    '<div class="people">' + people.map(function(p, i){
      var av = p.photo ? '<img class="av" src="' + esc(p.photo) + '" alt="" loading="lazy">'
                       : '<span class="av"></span>';
      return '<button class="person" data-p="' + i + '" aria-pressed="false">' + av +
        '<span class="nm">' + esc(p.name) + '</span>' +
        '<span class="rl">' + esc(p.role) + '</span></button>';
    }).join("") + '</div>' +
    '<div id="personCard"></div></div>';

  var grid = $("divisionBody").querySelector(".people");
  grid.addEventListener("click", function(e){
    var b = e.target.closest("[data-p]"); if(!b) return;
    var p = people[+b.dataset.p];
    var was = b.getAttribute("aria-pressed") === "true";
    grid.querySelectorAll(".person").forEach(function(x){ x.setAttribute("aria-pressed", "false"); });
    var card = $("personCard");
    if(was){ card.innerHTML = ""; return; }
    b.setAttribute("aria-pressed", "true");
    var links = (p.links || []).map(function(l){
      return '<a class="chip" href="' + esc(l[1]) + '" target="_blank" rel="noopener">' + esc(l[0]) + '</a>';
    }).join(" ");
    card.innerHTML = '<div class="person-card">' + pic(p.photo, "portrait", p.name) +
      '<div style="min-width:0;display:grid;gap:12px;align-content:start">' +
      '<div><h4>' + esc(p.name) + '</h4>' +
      '<div class="rl" style="color:var(--green);font-weight:700;letter-spacing:.1em;text-transform:uppercase;font-size:11.5px;margin-top:6px">' +
      esc(p.role) + ' · ' + esc(d.name) + '</div></div>' +
      '<p style="color:var(--mute);font-size:14.5px">' + esc(p.bio || "Short bio goes here.") + '</p>' +
      (links ? '<div class="chips">' + links + '</div>' : "") +
      '</div></div>';
    card.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });

  go("division");
}
$("divGrid").addEventListener("click", function(e){
  var b = e.target.closest("[data-division]");
  if(b) openDivision(b.dataset.division);
});

/* -------------------------- окна: фильм и картинка -------------------------- */
var overlay = $("overlay"), lastFocus = null;

function closeOverlay(){
  overlay.innerHTML = "";
  document.body.style.overflow = "";
  if(lastFocus) lastFocus.focus();
}
function openOverlay(inner, label, cls){
  overlay.innerHTML = '<div class="scrim ' + (cls || "") + '" role="dialog" aria-modal="true" aria-label="' + esc(label) + '">' +
    '<button class="x" type="button" aria-label="Close">✕</button>' + inner + '</div>';
  document.body.style.overflow = "hidden";
  overlay.querySelector(".x").focus();
  overlay.querySelector(".scrim").addEventListener("click", function(ev){
    if(ev.target.classList.contains("scrim") || ev.target.closest(".x")) closeOverlay();
  });
}
document.addEventListener("keydown", function(e){
  if(e.key === "Escape" && overlay.innerHTML) closeOverlay();
});

/* -------------------------------- фильмы -------------------------------- */
var filmGrid = $("filmGrid");
if(C.films.length === 1) filmGrid.classList.add("single");

filmGrid.innerHTML = C.films.map(function(f, i){
  var meta = esc(f.kind) + (f.year ? ' · ' + esc(f.year) : "");
  var teaser = C.films.length === 1
    ? '<p class="teaser">' + esc(f.desc) + '</p><span class="watch">Open →</span>'
    : "";
  return '<button class="film" data-film="' + i + '">' +
    pic(f.poster, "poster", f.title, "poster") +
    '<span class="film-meta"><span class="meta">' + meta + '</span>' +
    '<h4>' + esc(f.title) + '</h4>' + teaser + '</span>' +
    '</button>';
}).join("");

filmGrid.addEventListener("click", function(e){
  var b = e.target.closest("[data-film]"); if(!b) return;
  lastFocus = b;
  var f = C.films[+b.dataset.film];
  var reel = f.trailer
    ? '<iframe src="' + esc(f.trailer) + '" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="' + esc(f.title) + '"></iframe>'
    : '<div class="reel">trailer coming soon</div>';
  openOverlay('<div class="modal">' + reel + '<div class="body">' +
    '<div class="meta" style="font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:var(--green);font-weight:700">' +
    esc(f.kind) + (f.year ? ' · ' + esc(f.year) : "") + '</div>' +
    '<h3>' + esc(f.title) + '</h3>' +
    '<p>' + esc(f.desc) + '</p></div></div>', f.title);
});

/* ------------------------------ лента работ ------------------------------ */
$("workGrid").innerHTML = C.works.map(function(w, i){
  return '<button class="work" data-work="' + i + '">' + (w.img
    ? '<img src="' + esc(w.img) + '" alt="' + esc(w.alt || "") + '" loading="lazy">'
    : '<span class="ph">work</span>') + '</button>';
}).join("");

$("workGrid").addEventListener("click", function(e){
  var b = e.target.closest("[data-work]"); if(!b) return;
  var w = C.works[+b.dataset.work];
  if(!w.img) return;
  lastFocus = b;
  openOverlay('<img src="' + esc(w.img) + '" alt="' + esc(w.alt || "") + '">', w.alt || "Work", "lightbox");
});

/* ------------------------------ страницы форм ------------------------------ */
$("createIntro").innerHTML = C.createIntro.map(function(p){ return '<p>' + esc(p) + '</p>'; }).join("");
$("joinIntro").innerHTML   = C.joinIntro.map(function(p){ return '<p>' + esc(p) + '</p>'; }).join("");

function linkForm(url, buttonText){
  return '<div class="form">' +
    '<div><a class="btn" href="' + esc(url) + '" target="_blank" rel="noopener">' + buttonText + '</a></div>' +
    '<p class="note">We read everything and answer from ' + esc(C.email) + ' within three working days.</p></div>';
}

$("createBody").innerHTML = C.createForm ? linkForm(C.createForm, "Open the form") :
  '<form class="form" id="formCreate">' +
  '<div class="field"><label for="c1">Main request *</label><textarea id="c1" required placeholder="What should we make? Format, idea, references…"></textarea></div>' +
  '<div class="field"><label for="c2">Budget *</label><input id="c2" required placeholder="A range is fine"></div>' +
  '<div class="field"><label for="c3">Timeline *</label><input id="c3" required placeholder="Start date, deadline, premiere"></div>' +
  '<div class="field"><label for="c4">Anything else</label><textarea id="c4" placeholder="Links, decks, restrictions"></textarea></div>' +
  '<div class="field"><label for="c5">Contact *</label><input id="c5" required placeholder="Email or @telegram"></div>' +
  '<div><button class="btn" type="submit">Send the brief</button></div>' +
  '<p class="note">Your mail app opens with the brief ready for ' + esc(C.email) + '.</p></form>' +
  '<div id="okCreate"></div>';

$("joinBody").innerHTML = C.joinForm ? linkForm(C.joinForm, "Open the form") :
  '<form class="form" id="formJoin">' +
  '<div class="field"><label for="j1">What you do *</label><select id="j1" required>' +
  '<option value="">Choose a division</option>' +
  C.divisions.map(function(d){
    return '<option>' + esc(d.name) + ' — ' + esc(d.roles) + '</option>';
  }).join("") +
  '<option>Not sure yet</option></select></div>' +
  '<div class="field"><label for="j2">Education</label><input id="j2" placeholder="School, course, or self-taught"></div>' +
  '<div class="field"><label for="j3">Experience, CV or portfolio *</label><textarea id="j3" required placeholder="Links to your work — that matters most"></textarea></div>' +
  '<div class="field"><label for="j4">Anything else</label><textarea id="j4" placeholder="What you want to make with us"></textarea></div>' +
  '<div class="field"><label for="j5">Contact *</label><input id="j5" required placeholder="Email or @telegram"></div>' +
  '<div><button class="btn" type="submit">Send</button></div>' +
  '<p class="note">Your mail app opens with the letter ready for ' + esc(C.email) + '.</p></form>' +
  '<div id="okJoin"></div>';

function mailto(subject, lines){
  window.location.href = "mailto:" + C.email +
    "?subject=" + encodeURIComponent(subject) +
    "&body=" + encodeURIComponent(lines.join("\n"));
}

var fc = $("formCreate");
if(fc) fc.addEventListener("submit", function(e){
  e.preventDefault();
  mailto("Twinies — create art", [
    "Main request: " + $("c1").value,
    "Budget: " + $("c2").value,
    "Timeline: " + $("c3").value,
    "Anything else: " + $("c4").value,
    "Contact: " + $("c5").value
  ]);
  $("okCreate").innerHTML = '<div class="ok"><strong>Almost there.</strong>' +
    '<p>Your mail app should open with the brief ready. If it did not, write to ' +
    esc(C.email) + ' directly.</p></div>';
});

var fj = $("formJoin");
if(fj) fj.addEventListener("submit", function(e){
  e.preventDefault();
  mailto("Twinies — join us", [
    "Division: " + $("j1").value,
    "Education: " + $("j2").value,
    "Experience / portfolio: " + $("j3").value,
    "Anything else: " + $("j4").value,
    "Contact: " + $("j5").value
  ]);
  $("okJoin").innerHTML = '<div class="ok"><strong>Almost there.</strong>' +
    '<p>Your mail app should open with the letter ready. If it did not, write to ' +
    esc(C.email) + ' directly.</p></div>';
});

})();
