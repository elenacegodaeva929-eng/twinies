/* =====================================================================
   TWINIES — логика сайта: раскрытие карточек, окно проекта, формы.
   Весь контент берётся из content.js. Здесь править ничего не нужно.
   ===================================================================== */

(function(){
"use strict";

var C = window.CONTENT || (typeof CONTENT !== "undefined" ? CONTENT : null);
if(!C){ console.error("content.js не загрузился — проверьте, что файл лежит рядом с index.html"); return; }

function $(id){ return document.getElementById(id); }
function esc(s){
  return String(s == null ? "" : s).replace(/[&<>"]/g, function(c){
    return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c];
  });
}
function img(src, cls, alt){
  return src ? '<img class="' + cls + '" src="' + esc(src) + '" alt="' + esc(alt || "") + '" loading="lazy">'
             : '<div class="slot ' + cls + '">photo</div>';
}

/* ------------------------- переключение страниц ------------------------- */
var VIEWS = ["home","create","join"];
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
$("heroLogo").innerHTML  = C.heroLogo
  ? '<img class="hero-logo" src="' + esc(C.heroLogo) + '" alt="Twinies">'
  : '<div class="slot logo-slot">logo</div>';
$("heroClown").innerHTML = C.heroClown
  ? '<img class="clown" src="' + esc(C.heroClown) + '" alt="">'
  : '<div class="slot clown">clown illustration</div>';
$("footMail").innerHTML  = '<a class="mail" href="mailto:' + esc(C.email) + '">' + esc(C.email) + '</a>';

/* ------------------------------- владельцы ------------------------------- */
var ownerGrid = $("ownerGrid"), ownerBox = $("ownerDetail"), openOwner = null;

ownerGrid.innerHTML = C.owners.map(function(o){
  return '<button class="owner" data-owner="' + esc(o.id) + '">' +
    img(o.photo, "photo", o.name) +
    '<div><h3>' + esc(o.name) + '</h3><div class="role">' + esc(o.role) + '</div></div>' +
    '<p class="short">' + esc(o.short) + '</p>' +
    '<span class="more">Read the story →</span></button>';
}).join("");

ownerGrid.addEventListener("click", function(e){
  var b = e.target.closest("[data-owner]"); if(!b) return;
  var id = b.dataset.owner;
  if(openOwner === id){ ownerBox.innerHTML = ""; openOwner = null; return; }
  var o = C.owners.filter(function(x){ return x.id === id; })[0];
  openOwner = id;
  ownerBox.innerHTML = '<div class="bio">' +
    '<div><h3>' + esc(o.name) + '</h3><div class="role">' + esc(o.role) + '</div></div>' +
    '<div class="chips">' + o.tags.map(function(t){ return '<span class="chip">' + esc(t) + '</span>'; }).join("") + '</div>' +
    '<p>' + esc(o.bio) + '</p>' +
    '<blockquote>' + esc(o.quote) + '<cite>' + esc(o.cite) + '</cite></blockquote>' +
    '<div><button class="btn" type="button" data-go="create">Create art</button></div>' +
    '<button class="closer" type="button">Close</button></div>';
  ownerBox.scrollIntoView({behavior:"smooth", block:"nearest"});
});

ownerBox.addEventListener("click", function(e){
  if(e.target.classList.contains("closer")){ ownerBox.innerHTML = ""; openOwner = null; }
});

/* ------------------------------ подразделения ------------------------------ */
var divGrid = $("divGrid"), divPanel = $("divPanel"), openDiv = null;

function sigil(d){
  return d.logo ? '<img class="sigil" src="' + esc(d.logo) + '" alt="' + esc(d.name) + '">'
                : '<div class="slot sigil-slot">logo</div>';
}

divGrid.innerHTML = C.divisions.map(function(d){
  return '<button class="div-card" data-div="' + esc(d.id) + '" aria-expanded="false">' +
    sigil(d) + '<h3>' + esc(d.name) + '</h3><span class="roles">' + esc(d.roles) + '</span></button>';
}).join("");

function renderDivision(id){
  var d = C.divisions.filter(function(x){ return x.id === id; })[0];
  var people = (C.team && C.team[id]) || [];

  divPanel.innerHTML = '<div class="panel">' +
    '<div class="top">' + sigil(d) +
      '<div><h3>' + esc(d.name) + '</h3><p class="desc">' + esc(d.desc) + '</p></div></div>' +
    '<p class="eyebrow count">' + people.length + ' twinies</p>' +
    '<div class="people">' + people.map(function(p, i){
      var av = p.photo ? '<img class="av" src="' + esc(p.photo) + '" alt="" loading="lazy">'
                       : '<span class="av"></span>';
      return '<button class="person" data-p="' + i + '" aria-pressed="false">' + av +
        '<span class="nm">' + esc(p.name) + '</span><span class="rl">' + esc(p.role) + '</span></button>';
    }).join("") + '</div>' +
    '<div id="personCard"></div>' +
    '<button class="closer" type="button" data-close-div>Close division</button></div>';

  divPanel.querySelector(".people").addEventListener("click", function(e){
    var b = e.target.closest("[data-p]"); if(!b) return;
    var p = people[+b.dataset.p];
    var was = b.getAttribute("aria-pressed") === "true";
    divPanel.querySelectorAll(".person").forEach(function(x){ x.setAttribute("aria-pressed", "false"); });
    var card = $("personCard");
    if(was){ card.innerHTML = ""; return; }
    b.setAttribute("aria-pressed", "true");
    var links = (p.links || []).map(function(l){
      return '<a class="chip" href="' + esc(l[1]) + '" target="_blank" rel="noopener">' + esc(l[0]) + '</a>';
    }).join(" ");
    card.innerHTML = '<div class="person-card">' + img(p.photo, "photo", p.name) +
      '<div style="min-width:0;display:grid;gap:10px;align-content:start">' +
      '<div><h4>' + esc(p.name) + '</h4>' +
      '<div class="rl" style="color:var(--green);font-weight:700;margin-top:4px">' +
      esc(p.role) + ' · ' + esc(d.name) + '</div></div>' +
      '<p style="color:var(--mute);font-size:14px">' + esc(p.bio || "Short bio goes here.") + '</p>' +
      (links ? '<div class="chips">' + links + '</div>' : "") +
      '</div></div>';
  });

  divPanel.querySelector("[data-close-div]").addEventListener("click", function(){
    divPanel.innerHTML = ""; openDiv = null;
    document.querySelectorAll(".div-card").forEach(function(c){ c.setAttribute("aria-expanded", "false"); });
  });
}

divGrid.addEventListener("click", function(e){
  var b = e.target.closest("[data-div]"); if(!b) return;
  var id = b.dataset.div;
  document.querySelectorAll(".div-card").forEach(function(c){ c.setAttribute("aria-expanded", "false"); });
  if(openDiv === id){ divPanel.innerHTML = ""; openDiv = null; return; }
  openDiv = id;
  b.setAttribute("aria-expanded", "true");
  renderDivision(id);
  setTimeout(function(){ divPanel.scrollIntoView({behavior:"smooth", block:"nearest"}); }, 60);
});

/* -------------------------- проекты и окно проекта -------------------------- */
var projGrid = $("projGrid"), modalRoot = $("modalRoot"), lastFocus = null;

projGrid.innerHTML = C.projects.map(function(p, i){
  var style = p.cover ? ' style="background-image:url(' + esc(p.cover) + ')"' : "";
  return '<button class="proj' + (p.cover ? " has-cover" : "") + '" data-proj="' + i + '"' + style + '>' +
    '<span class="kind">' + esc(p.kind) + '</span><span class="t">' + esc(p.title) + '</span></button>';
}).join("");

function closeModal(){
  modalRoot.innerHTML = "";
  document.body.style.overflow = "";
  if(lastFocus) lastFocus.focus();
}

projGrid.addEventListener("click", function(e){
  var b = e.target.closest("[data-proj]"); if(!b) return;
  lastFocus = b;
  var p = C.projects[+b.dataset.proj];
  var reel = p.reel
    ? '<iframe src="' + esc(p.reel) + '" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="' + esc(p.title) + '"></iframe>'
    : '<div class="slot reel">showreel 16:9</div>';
  var tags = (p.tags || []).map(function(t){ return '<span class="chip">' + esc(t) + '</span>'; }).join(" ");
  modalRoot.innerHTML = '<div class="scrim" role="dialog" aria-modal="true" aria-label="' + esc(p.title) + '">' +
    '<button class="x" type="button" aria-label="Close">✕</button>' +
    '<div class="modal">' + reel + '<div class="body">' +
    '<span class="kind">' + esc(p.kind) + '</span><h3>' + esc(p.title) + '</h3><p>' + esc(p.desc) + '</p>' +
    (tags ? '<div class="chips">' + tags + '</div>' : "") +
    '</div></div></div>';
  document.body.style.overflow = "hidden";
  modalRoot.querySelector(".x").focus();
  modalRoot.querySelector(".scrim").addEventListener("click", function(ev){
    if(ev.target.classList.contains("scrim") || ev.target.closest(".x")) closeModal();
  });
});

document.addEventListener("keydown", function(e){
  if(e.key === "Escape" && modalRoot.innerHTML) closeModal();
});

/* -------------------------------- CREATE -------------------------------- */
$("createBody").innerHTML = C.createForm
  ? '<div class="form"><p style="color:#D8D2E2">Fill in the brief — it takes about three minutes.</p>' +
    '<div><a class="btn" href="' + esc(C.createForm) + '" target="_blank" rel="noopener">Open the brief</a></div>' +
    '<p class="note">We read every brief and answer within three working days.</p></div>'
  : '<form class="form" id="formCreate">' +
    '<div class="field"><label for="c1">Main request *</label><textarea id="c1" required placeholder="What should we make? Format, idea, references…"></textarea></div>' +
    '<div class="field"><label for="c2">Budget *</label><input id="c2" required placeholder="Range is fine"></div>' +
    '<div class="field"><label for="c3">Timeline *</label><input id="c3" required placeholder="Start date, deadline, premiere"></div>' +
    '<div class="field"><label for="c4">Anything else</label><textarea id="c4" placeholder="Links, decks, restrictions"></textarea></div>' +
    '<div class="field"><label for="c5">Contact *</label><input id="c5" required placeholder="Email or @telegram"></div>' +
    '<div><button class="btn" type="submit">Send the brief</button></div>' +
    '<p class="note">We read every brief and answer within three working days.</p></form>' +
    '<div id="okCreate"></div>';

/* --------------------------------- JOIN --------------------------------- */
$("joinBody").innerHTML =
  '<form class="form" id="formJoin">' +
  '<div class="field"><label for="j1">What you do *</label><select id="j1" required>' +
  '<option value="">Choose a division</option>' +
  C.divisions.map(function(d){
    return '<option>' + esc(d.name) + ' — ' + esc(d.roles.replace(/ · /g, ", ").toLowerCase()) + '</option>';
  }).join("") +
  '<option>Not sure yet</option></select></div>' +
  '<div class="field"><label for="j2">Education</label><input id="j2" placeholder="School, course, or self-taught"></div>' +
  '<div class="field"><label for="j3">Experience, CV or portfolio *</label><textarea id="j3" required placeholder="Links to your work — that matters most"></textarea></div>' +
  '<div class="field"><label for="j4">Anything else</label><textarea id="j4" placeholder="What you want to make with us"></textarea></div>' +
  '<div class="field"><label for="j5">Contact *</label><input id="j5" required placeholder="Email or @telegram"></div>' +
  '<div><button class="btn" type="submit">Send</button></div>' +
  '<p class="note">Your mail app opens with the letter ready for ' + esc(C.email) + '.</p></form>' +
  '<div id="okJoin"></div>';

var formCreate = $("formCreate");
if(formCreate){
  formCreate.addEventListener("submit", function(e){
    e.preventDefault();
    formCreate.hidden = true;
    $("okCreate").innerHTML = '<div class="ok"><strong>Sent.</strong>' +
      '<p>We answer within three working days.</p></div>';
  });
}

var formJoin = $("formJoin");
if(formJoin){
  formJoin.addEventListener("submit", function(e){
    e.preventDefault();
    var body =
      "Division: " + $("j1").value + "\n" +
      "Education: " + $("j2").value + "\n" +
      "Experience / portfolio: " + $("j3").value + "\n" +
      "Anything else: " + $("j4").value + "\n" +
      "Contact: " + $("j5").value;
    window.location.href = "mailto:" + C.email +
      "?subject=" + encodeURIComponent("Twinies — join us") +
      "&body=" + encodeURIComponent(body);
    $("okJoin").innerHTML = '<div class="ok"><strong>Almost there.</strong>' +
      '<p>Your mail app should open with the letter ready. If it did not, write to ' +
      esc(C.email) + ' directly.</p></div>';
  });
}

})();
