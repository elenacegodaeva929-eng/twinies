/* =====================================================================
   TWINIES — логика сайта: раскрытие карточек, окна, формы.
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
/* Названия фильмов и проектов по-английски пишут курсивом, а не в кавычках.
   В content.js они обёрнуты звёздочками: *Nothing Feels*.
   Здесь звёздочки превращаются в курсив — уже после экранирования,
   поэтому вставить html через content.js нельзя, всё безопасно.        */
function rich(s){
  return esc(s).replace(/\*([^*\n]+)\*/g, "<em>$1</em>");
}
function pic(src, cls, alt, phText){
  return src
    ? '<img class="' + cls + '" src="' + esc(src) + '" alt="' + esc(alt || "") + '" loading="lazy">'
    : '<div class="slot ' + cls + '">' + (phText || "photo") + '</div>';
}

/* ------------------------------- бургер ------------------------------- */
(function(){
  var btn = $("burger"), nav = document.querySelector("header.nav");
  if(!btn || !nav) return;

  function setOpen(open){
    nav.setAttribute("data-open", String(open));
    btn.setAttribute("aria-expanded", String(open));
  }
  btn.addEventListener("click", function(){
    setOpen(nav.getAttribute("data-open") !== "true");
  });
  /* любой пункт меню закрывает панель */
  nav.querySelector("nav").addEventListener("click", function(e){
    if(e.target.closest("button")) setOpen(false);
  });
  document.addEventListener("keydown", function(e){
    if(e.key === "Escape") setOpen(false);
  });
  /* вернулись на широкий экран — панель больше не нужна */
  window.addEventListener("resize", function(){
    if(window.innerWidth > 860) setOpen(false);
  });
})();

/* ------------------------------ прожектор ------------------------------ */
(function(){
  var spot = $("spot"); if(!spot) return;
  if(!window.matchMedia || !window.matchMedia("(hover:hover)").matches) return;

  var tx = window.innerWidth / 2, ty = window.innerHeight * 0.4;
  var cx = tx, cy = ty, raf = null;

  function frame(){
    cx += (tx - cx) * 0.16;
    cy += (ty - cy) * 0.16;
    spot.style.setProperty("--mx", cx.toFixed(1) + "px");
    spot.style.setProperty("--my", cy.toFixed(1) + "px");
    raf = (Math.abs(tx - cx) > 0.4 || Math.abs(ty - cy) > 0.4)
      ? requestAnimationFrame(frame) : null;
  }
  function move(e){
    tx = e.clientX; ty = e.clientY;
    if(!raf) raf = requestAnimationFrame(frame);
  }
  window.addEventListener("pointermove", move, {passive:true});
  window.addEventListener("pointerdown", move, {passive:true});

  /* пятно гаснет, когда курсор ушёл со страницы */
  document.addEventListener("mouseleave", function(){ spot.style.opacity = "0"; });
  document.addEventListener("mouseenter", function(){ spot.style.opacity = ""; });
})();

/* ------------------------- переключение страниц ------------------------- */
var VIEWS = ["home", "create", "join"];
function go(view){
  VIEWS.forEach(function(v){ $("view-" + v).hidden = (v !== view); });
  document.querySelectorAll(".nav nav button").forEach(function(b){
    b.setAttribute("aria-current", String(b.dataset.go === view));
  });
  window.scrollTo(0, 0);
}
document.addEventListener("click", function(e){
  var g = e.target.closest("[data-go]");
  if(g){ go(g.dataset.go); return; }
  var s = e.target.closest("[data-scroll]");
  if(s){
    go("home");
    setTimeout(function(){ $(s.dataset.scroll).scrollIntoView({behavior:"smooth", block:"start"}); }, 40);
  }
});

/* ----------------------------- главный экран ----------------------------- */
$("tagline").textContent = C.tagline || "";
if(!C.showTitle) document.querySelector("h1.title").classList.add("sr-only");
$("heroLogo").innerHTML  = C.heroLogo
  ? '<img class="hero-logo" src="' + esc(C.heroLogo) + '" alt="Twinies">'
  : "";
$("heroClown").innerHTML = C.heroClown
  ? '<img class="clown" src="' + esc(C.heroClown) + '" alt="">'
  : '<div class="slot clown">clown illustration</div>';
$("heroText").innerHTML  = C.intro.map(function(p){ return '<p class="lede">' + esc(p) + '</p>'; }).join("");
$("footMail").innerHTML  = '<a class="mail" href="mailto:' + esc(C.email) + '">' + esc(C.email) + '</a>';

/* ------------------------------- фаундеры ------------------------------- */
var fGrid = $("founderGrid"), fBox = $("founderDetail"), openFounder = null;

fGrid.innerHTML = C.founders.map(function(f){
  return '<button class="owner" data-founder="' + esc(f.id) + '">' +
    pic(f.photo, "photo", f.name) +
    '<div><h3>' + esc(f.name) + '</h3><div class="role">' + esc(f.short) + '</div></div>' +
    '<span class="more">About me →</span></button>';
}).join("");

fGrid.addEventListener("click", function(e){
  var b = e.target.closest("[data-founder]"); if(!b) return;
  var id = b.dataset.founder;
  if(openFounder === id){ fBox.innerHTML = ""; openFounder = null; return; }
  var f = C.founders.filter(function(x){ return x.id === id; })[0];
  openFounder = id;
  fBox.innerHTML = '<div class="bio">' +
    '<div><h3>' + esc(f.name) + '</h3><div class="role">' + esc(f.title) + '</div></div>' +
    '<div><p class="eyebrow mb">Selected achievements</p>' +
      '<ul class="ach">' + f.achievements.map(function(a){ return '<li>' + rich(a) + '</li>'; }).join("") + '</ul></div>' +
    '<div><p class="eyebrow mb">About me</p><p class="about">' + rich(f.about) + '</p></div>' +
    '<blockquote>' + rich(f.quote) + '<cite>' + esc(f.cite) + '</cite></blockquote>' +
    '<div><button class="btn" type="button" data-go="create">Create art</button></div>' +
    '<button class="closer" type="button">Close</button></div>';
  fBox.scrollIntoView({behavior:"smooth", block:"nearest"});
});

fBox.addEventListener("click", function(e){
  if(e.target.classList.contains("closer")){ fBox.innerHTML = ""; openFounder = null; }
});

/* ------------------------------ подразделения ------------------------------ */
function sigil(d){
  return d.logo ? '<img class="sigil" src="' + esc(d.logo) + '" alt="' + esc(d.name) + '">'
                : '<div class="slot sigil-slot">logo</div>';
}

var dGrid = $("divGrid"), dPanel = $("divPanel"), openDiv = null;

/* на главной — только логотип и название, без описаний */
dGrid.innerHTML = C.divisions.map(function(d){
  return '<button class="div-card" data-div="' + esc(d.id) + '" aria-expanded="false">' +
    '<span class="sigil-box">' + sigil(d) + '</span>' +
    '<h3>' + esc(d.name) + '</h3></button>';
}).join("");

function renderDivision(id){
  var d = C.divisions.filter(function(x){ return x.id === id; })[0];
  var people = (C.team && C.team[id]) || [];

  dPanel.innerHTML = '<div class="panel">' +
    '<div class="top">' + sigil(d) +
      '<div><h3>' + esc(d.name) + '</h3>' +
      '<div class="roles">' + esc(d.roles) + '</div>' +
      '<p class="desc">' + esc(d.desc) + '</p></div></div>' +
    '<p class="eyebrow mb">' + people.length + ' twinies</p>' +
    '<div class="people">' + people.map(function(p, i){
      var av = p.photo ? '<img class="av" src="' + esc(p.photo) + '" alt="" loading="lazy">'
                       : '<span class="av"></span>';
      return '<button class="person" data-p="' + i + '" aria-pressed="false">' + av +
        '<span class="nm">' + esc(p.name) + '</span>' +
        '<span class="rl">' + esc(p.role || "\u2014") + '</span></button>';
    }).join("") + '</div>' +
    '<button class="closer" type="button" data-close-div>Close division</button></div>';

  var grid = dPanel.querySelector(".people");
  grid.addEventListener("click", function(e){
    var b = e.target.closest("[data-p]"); if(!b) return;
    var p = people[+b.dataset.p];
    lastFocus = b;

    var links = (p.links || []).map(function(l){
      return '<a class="chip" href="' + esc(l[1]) + '" target="_blank" rel="noopener">' + esc(l[0]) + '</a>';
    }).join(" ");
    var paras = Array.isArray(p.bio) ? p.bio : (p.bio ? [p.bio] : []);
    var bioHtml = paras.length
      ? paras.map(function(t){ return '<p class="pc-bio">' + rich(t) + '</p>'; }).join("")
      : '<p class="pc-bio pc-empty">Bio goes here.</p>';
    var selHtml = p.selected
      ? '<div><p class="eyebrow mb">Selected work</p><p class="pc-bio">' + rich(p.selected) + '</p></div>'
      : "";

    /* карточка сотрудника открывается всплывающим окном поверх страницы,
       а не внизу списка — иначе на телефоне её просто не видно */
    openModal('<div class="person-card">' +
      pic(p.photo, "photo", p.name) +
      '<div class="pc-body">' +
        '<div><h4>' + esc(p.name) + '</h4>' +
        '<div class="pc-role">' + (p.role ? esc(p.role) + ' \u00b7 ' : "") + esc(d.name) + '</div></div>' +
        bioHtml + selHtml +
        (links ? '<div class="chips">' + links + '</div>' : "") +
      '</div></div>', p.name, "person-modal");
  });

  dPanel.querySelector("[data-close-div]").addEventListener("click", function(){
    dPanel.innerHTML = ""; openDiv = null;
    document.querySelectorAll(".div-card").forEach(function(c){ c.setAttribute("aria-expanded", "false"); });
  });
}

dGrid.addEventListener("click", function(e){
  var b = e.target.closest("[data-div]"); if(!b) return;
  var id = b.dataset.div;
  document.querySelectorAll(".div-card").forEach(function(c){ c.setAttribute("aria-expanded", "false"); });
  if(openDiv === id){ dPanel.innerHTML = ""; openDiv = null; return; }
  openDiv = id;
  b.setAttribute("aria-expanded", "true");
  renderDivision(id);
  setTimeout(function(){ dPanel.scrollIntoView({behavior:"smooth", block:"nearest"}); }, 60);
});

/* ------------------------------ окна ------------------------------ */
var modalRoot = $("modalRoot"), lastFocus = null;

function closeModal(){
  modalRoot.innerHTML = "";
  document.body.style.overflow = "";
  if(lastFocus) lastFocus.focus();
}
function openModal(inner, label, cls){
  modalRoot.innerHTML = '<div class="scrim ' + (cls || "") + '" role="dialog" aria-modal="true" aria-label="' + esc(label) + '">' +
    '<button class="x" type="button" aria-label="Close">✕</button>' + inner + '</div>';
  document.body.style.overflow = "hidden";
  modalRoot.querySelector(".x").focus();
  modalRoot.querySelector(".scrim").addEventListener("click", function(ev){
    if(ev.target.classList.contains("scrim") || ev.target.closest(".x")) closeModal();
  });
}
document.addEventListener("keydown", function(e){
  if(e.key === "Escape" && modalRoot.innerHTML) closeModal();
});

/* ------------------------------ фильмы ------------------------------ */
var filmGrid = $("filmGrid");
if(C.films.length === 1) filmGrid.classList.add("single");

filmGrid.innerHTML = C.films.map(function(f, i){
  var meta = esc(f.kind) + (f.year ? ' · ' + esc(f.year) : "");
  var teaser = C.films.length === 1
    ? '<p class="teaser">' + rich(f.desc) + '</p><span class="watch">Open →</span>'
    : "";
  return '<button class="film" data-film="' + i + '">' +
    pic(f.poster, "poster", f.title, "poster") +
    '<span class="film-meta"><span class="kind">' + meta + '</span>' +
    '<h4>' + esc(f.title) + '</h4>' + teaser + '</span></button>';
}).join("");

filmGrid.addEventListener("click", function(e){
  var b = e.target.closest("[data-film]"); if(!b) return;
  lastFocus = b;
  var f = C.films[+b.dataset.film];
  var reel = f.trailer
    ? '<iframe src="' + esc(f.trailer) + '" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="' + esc(f.title) + '"></iframe>'
    : '<div class="slot reel">trailer coming soon</div>';
  openModal('<div class="modal">' + reel + '<div class="body">' +
    '<span class="kind">' + esc(f.kind) + (f.year ? ' · ' + esc(f.year) : "") + '</span>' +
    '<h3>' + esc(f.title) + '</h3><p>' + rich(f.desc) + '</p></div></div>', f.title);
});

/* ---------------------------- лента работ ----------------------------
   У каждой работы подписан автор. Имя из поля by ищется среди
   сотрудников всех подразделений — оттуда берётся фото для кружка. */

var PEOPLE = {};
Object.keys(C.team || {}).forEach(function(k){
  (C.team[k] || []).forEach(function(p){ if(p.name) PEOPLE[p.name] = p; });
});
(C.founders || []).forEach(function(p){ if(p.name && !PEOPLE[p.name]) PEOPLE[p.name] = p; });

function credit(name){
  if(!name) return "";
  var p = PEOPLE[name];
  var av = (p && p.photo)
    ? '<img class="by-av" src="' + esc(p.photo) + '" alt="" loading="lazy">'
    : '<span class="by-av by-av-ph" aria-hidden="true"></span>';
  return '<span class="by">' + av + '<span class="by-name">' + esc(name) + '</span></span>';
}

$("workGrid").innerHTML = C.works.map(function(w, i){
  return '<figure class="work-cell">' +
    '<button class="work" data-work="' + i + '">' + (w.img
      ? '<img src="' + esc(w.img) + '" alt="' + esc(w.alt || "") + '" loading="lazy">'
      : '<span class="work-ph">work</span>') + '</button>' +
    (w.by ? '<figcaption>' + credit(w.by) + '</figcaption>' : "") +
  '</figure>';
}).join("");

$("workGrid").addEventListener("click", function(e){
  var b = e.target.closest("[data-work]"); if(!b) return;
  var w = C.works[+b.dataset.work];
  if(!w.img) return;
  lastFocus = b;
  openModal('<img src="' + esc(w.img) + '" alt="' + esc(w.alt || "") + '">', w.by || w.alt || "Work", "lightbox");
});

/* ------------------------------ формы ------------------------------ */
$("createIntro").innerHTML = C.createIntro.map(function(p){ return '<p>' + esc(p) + '</p>'; }).join("");
$("joinIntro").innerHTML   = C.joinIntro.map(function(p){ return '<p>' + esc(p) + '</p>'; }).join("");

function linkForm(url){
  return '<div class="form">' +
    '<div><a class="btn" href="' + esc(url) + '" target="_blank" rel="noopener">Open the form</a></div>' +
    '<p class="note">We read everything and answer from ' + esc(C.email) + ' within three working days.</p></div>';
}

$("createBody").innerHTML = C.createForm ? linkForm(C.createForm) :
  '<form class="form" id="formCreate">' +
  '<div class="field"><label for="c1">Main request *</label><textarea id="c1" required placeholder="What should we make? Format, idea, references…"></textarea></div>' +
  '<div class="field"><label for="c2">Budget *</label><input id="c2" required placeholder="A range is fine"></div>' +
  '<div class="field"><label for="c3">Timeline *</label><input id="c3" required placeholder="Start date, deadline, premiere"></div>' +
  '<div class="field"><label for="c4">Anything else</label><textarea id="c4" placeholder="Links, decks, restrictions"></textarea></div>' +
  '<div class="field"><label for="c5">Contact *</label><input id="c5" required placeholder="Email or @telegram"></div>' +
  '<div><button class="btn" type="submit">Send the brief</button></div>' +
  '<p class="note">Your mail app opens with the brief ready for ' + esc(C.email) + '.</p></form>' +
  '<div id="okCreate"></div>';

$("joinBody").innerHTML = C.joinForm ? linkForm(C.joinForm) :
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
