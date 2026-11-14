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
    ? '<iframe src="' + esc(videoEmbed(f.trailer)) + '" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="' + esc(f.title) + '"></iframe>'
    : '<div class="slot reel">trailer coming soon</div>';
  openModal('<div class="modal">' + reel + '<div class="body">' +
    '<span class="kind">' + esc(f.kind) + (f.year ? ' · ' + esc(f.year) : "") + '</span>' +
    '<h3>' + esc(f.title) + '</h3><p>' + rich(f.desc) + '</p></div></div>', f.title);
});

/* ---------------------- видео: ссылки и обложки ----------------------
   Ссылку с ютуба можно вставлять в любом виде — youtu.be/КОД,
   youtube.com/watch?v=КОД или готовый embed. Здесь она приводится
   к виду, который умеет встраиваться, а обложка берётся с ютуба
   автоматически, если своя картинка не задана.                     */

function ytId(u){
  var m = String(u || "").match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|shorts\/|watch\?(?:.*&)?v=))([A-Za-z0-9_-]{11})/);
  return m ? m[1] : "";
}
function vimeoId(u){
  var m = String(u || "").match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return m ? m[1] : "";
}
function videoEmbed(u){
  var y = ytId(u);    if(y) return "https://www.youtube.com/embed/" + y;
  var v = vimeoId(u); if(v) return "https://player.vimeo.com/video/" + v;
  return String(u || "");
}
function videoPoster(u){
  var y = ytId(u);
  return y ? "https://img.youtube.com/vi/" + y + "/maxresdefault.jpg" : "";
}

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
  /* обложка: своя картинка, иначе кадр с ютуба */
  var poster = w.img || videoPoster(w.video);
  var inner = poster
    ? '<img src="' + esc(poster) + '" alt="' + esc(w.alt || "") + '" loading="lazy"' +
      (w.img ? '' : ' data-yt="1"') + '>'
    : '<span class="work-ph">' + (w.video ? "video" : "work") + '</span>';
  /* у видео поверх кадра — кнопка плей */
  var play = w.video
    ? '<span class="play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></span>'
    : "";
  return '<figure class="work-cell">' +
    '<button class="work' + (w.video ? ' is-video' : '') + '" data-work="' + i + '"' +
      (w.video ? ' aria-label="Play video"' : '') + '>' + inner + play + '</button>' +
    (w.by ? '<figcaption>' + credit(w.by) + '</figcaption>' : "") +
  '</figure>';
}).join("");

/* ------------------- раскладка ленты работ -------------------
   Колонки раскладываем сами, а не стандартным свойством columns:
   браузеры (особенно Safari) при карточках разной высоты оставляли
   последнюю колонку пустой. Здесь высота каждой карточки известна
   заранее — из пропорций картинки, — поэтому их можно разложить
   поровну и проследить, чтобы два проекта одного автора не попали
   в одну колонку.                                                */

var WORK_CELLS = [].slice.call($("workGrid").querySelectorAll(".work-cell"));
WORK_CELLS.forEach(function(cell, i){
  cell.dataset.by = (C.works[i] && C.works[i].by) || "";
});

/* пропорции карточки: пока картинка не загрузилась — 16:9 у видео */
function cellRatio(cell){
  var img = cell.querySelector("img");
  if(img && img.naturalWidth && img.naturalHeight) return img.naturalWidth / img.naturalHeight;
  var btn = cell.querySelector(".work");
  return (btn && btn.classList.contains("is-video")) ? 16 / 9 : 1;
}

/* сколько колонок помещается */
function colCount(width){
  return Math.max(2, Math.min(4, Math.floor(width / 230)));
}

/* в колонке не должно быть двух работ одного автора */
function colTakes(list, by){
  if(!by) return true;
  for(var i = 0; i < list.length; i++) if(list[i].by === by) return false;
  return true;
}

function colHeight(list, gap){
  var h = 0;
  for(var i = 0; i < list.length; i++) h += list[i].h;
  return h + gap * Math.max(0, list.length - 1);
}

/* на какой высоте окажется каждая карточка колонки */
function colSpans(list, gap){
  var out = [], y = 0, i;
  var sorted = list.slice().sort(function(a, b){ return a.i - b.i; });
  for(i = 0; i < sorted.length; i++){
    out.push({ by: sorted[i].by, top: y, bottom: y + sorted[i].h });
    y += sorted[i].h + gap;
  }
  return out;
}

/* Качество раскладки. Сначала смотрим, не оказались ли две работы
   одного автора бок о бок — то есть на одной высоте в соседних
   колонках. Потом уже ровняем низ колонок.                       */
function cost(cols, gap){
  var hi = -Infinity, lo = Infinity, spans = [], c, d, i, j;

  for(c = 0; c < cols.length; c++){
    var s = colSpans(cols[c], gap);
    var h = s.length ? s[s.length - 1].bottom : 0;
    if(h > hi) hi = h;
    if(h < lo) lo = h;
    spans.push(s);
  }

  var clash = 0;
  for(c = 0; c < spans.length; c++){
    for(d = c + 1; d < spans.length; d++){
      for(i = 0; i < spans[c].length; i++){
        for(j = 0; j < spans[d].length; j++){
          var a = spans[c][i], b = spans[d][j];
          if(a.by && a.by === b.by && a.top < b.bottom && b.top < a.bottom) clash++;
        }
      }
    }
  }
  return { clash: clash, spread: hi - lo };
}

/* первая раскладка лучше второй? */
function better(a, b){
  if(a.clash !== b.clash) return a.clash < b.clash;
  return a.spread < b.spread;
}

function layoutWorks(){
  var grid = $("workGrid");
  if(!grid || !WORK_CELLS.length) return;

  var gap = parseFloat(getComputedStyle(grid).columnGap) || 16;
  var total = grid.clientWidth;
  if(!total) return;

  var n = Math.min(colCount(total), WORK_CELLS.length);
  var colW = (total - gap * (n - 1)) / n;

  var items = WORK_CELLS.map(function(cell, i){
    return {
      i: i,
      el: cell,
      by: cell.dataset.by,
      h: colW / cellRatio(cell) + (cell.querySelector("figcaption") ? 32 : 0)
    };
  });

  /* сначала раскладываем крупные карточки, потом мелкие —
     так колонки выравниваются гораздо лучше                 */
  var cols = [], k;
  for(k = 0; k < n; k++) cols.push([]);

  /* первая работа из content.js всегда открывает ленту:
     левая колонка, самый верх — её мы потом не двигаем    */
  var first = items.shift();
  if(first){ first.lock = true; cols[0].push(first); }

  items.slice().sort(function(a, b){ return b.h - a.h; }).forEach(function(it){
    var best = -1, bestH = Infinity, fallback = -1, fallbackH = Infinity;
    for(var c = 0; c < n; c++){
      var h = colHeight(cols[c], gap);
      if(h < fallbackH){ fallbackH = h; fallback = c; }
      if(colTakes(cols[c], it.by) && h < bestH){ bestH = h; best = c; }
    }
    cols[best > -1 ? best : fallback].push(it);
  });

  /* подгонка: переносим и меняем карточки местами, пока разница
     между самой высокой и самой низкой колонкой уменьшается      */
  for(var pass = 0; pass < 25; pass++){
    var now = cost(cols, gap), moved = false, a, b, x, y;

    for(a = 0; a < n && !moved; a++){
      for(x = 0; x < cols[a].length && !moved; x++){
        if(cols[a][x].lock) continue;
        for(b = 0; b < n && !moved; b++){
          if(b === a || !colTakes(cols[b], cols[a][x].by)) continue;
          var it = cols[a].splice(x, 1)[0];
          cols[b].push(it);
          if(better(cost(cols, gap), now)){ moved = true; break; }
          cols[b].pop();
          cols[a].splice(x, 0, it);
        }
      }
    }

    for(a = 0; a < n && !moved; a++){
      for(b = a + 1; b < n && !moved; b++){
        for(x = 0; x < cols[a].length && !moved; x++){
          for(y = 0; y < cols[b].length && !moved; y++){
            var p = cols[a][x], q = cols[b][y];
            if(p.lock || q.lock) continue;
            if(p.by && p.by === q.by) continue;
            cols[a][x] = q; cols[b][y] = p;
            if(colTakes(cols[a].filter(function(_, j){ return j !== x; }), q.by) &&
               colTakes(cols[b].filter(function(_, j){ return j !== y; }), p.by) &&
               better(cost(cols, gap), now)){ moved = true; break; }
            cols[a][x] = p; cols[b][y] = q;
          }
        }
      }
    }

    if(!moved) break;
  }

  /* внутри колонки — в том же порядке, что и в content.js */
  var boxes = cols.map(function(list){
    var box = document.createElement("div");
    box.className = "works-col";
    list.sort(function(a, b){ return a.i - b.i; })
        .forEach(function(it){ box.appendChild(it.el); });
    return box;
  });

  while(grid.firstChild) grid.removeChild(grid.firstChild);
  boxes.forEach(function(box){ grid.appendChild(box); });
}

var workTimer = null;
function relayoutWorks(){
  clearTimeout(workTimer);
  workTimer = setTimeout(layoutWorks, 60);
}

layoutWorks();
window.addEventListener("resize", relayoutWorks);
/* картинка загрузилась — её настоящие пропорции известны, пересчитываем */
$("workGrid").addEventListener("load", function(e){
  if(e.target.tagName === "IMG" && e.target.closest(".work")) relayoutWorks();
}, true);
window.addEventListener("load", relayoutWorks);

/* Обложка не загрузилась: сначала пробуем обычную картинку ютуба
   вместо большой, а если и она не пришла — показываем заглушку,
   иначе ячейка схлопнется в ноль и лента поедет.                  */
$("workGrid").addEventListener("error", function(e){
  var img = e.target;
  if(img.tagName !== "IMG" || !img.closest(".work")) return;
  if(img.dataset.yt && img.src.indexOf("maxresdefault") > -1){
    img.src = img.src.replace("maxresdefault", "hqdefault");
    return;
  }
  var ph = document.createElement("span");
  ph.className = "work-ph";
  ph.textContent = img.closest(".work").classList.contains("is-video") ? "video" : "work";
  img.replaceWith(ph);
  relayoutWorks();
}, true);

/* кружок автора: если фото ещё не залито, показываем градиентную
   заглушку вместо сломанной картинки                              */
document.addEventListener("error", function(e){
  var img = e.target;
  if(img.tagName === "IMG" && img.classList.contains("by-av")){
    var ph = document.createElement("span");
    ph.className = "by-av by-av-ph";
    ph.setAttribute("aria-hidden", "true");
    img.replaceWith(ph);
  }
}, true);

$("workGrid").addEventListener("click", function(e){
  var b = e.target.closest("[data-work]"); if(!b) return;
  var w = C.works[+b.dataset.work];
  var poster = w.img || videoPoster(w.video);
  lastFocus = b;

  if(w.video){
    var src = String(w.video);
    /* ссылка на ютуб или вимео — окно с проигрывателем;
       имя файла — встроенный плеер браузера                      */
    var body = /^https?:/i.test(src)
      ? '<iframe src="' + esc(videoEmbed(src)) + '" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="' + esc(w.by || "Work") + '"></iframe>'
      : '<video src="' + esc(src) + '" controls autoplay playsinline' +
        (poster ? ' poster="' + esc(poster) + '"' : '') + '></video>';
    openModal('<div class="modal">' + body +
      (w.by ? '<div class="body"><h3>' + esc(w.by) + '</h3></div>' : "") +
      '</div>', w.by || w.alt || "Work");
    return;
  }

  if(!w.img) return;
  openModal('<img src="' + esc(w.img) + '" alt="' + esc(w.alt || "") + '">', w.by || w.alt || "Work", "lightbox");
});

/* ------------------------------ формы ------------------------------ */
$("createIntro").innerHTML = C.createIntro.map(function(p){ return '<p>' + esc(p) + '</p>'; }).join("");
$("joinIntro").innerHTML   = C.joinIntro.map(function(p){ return '<p>' + esc(p) + '</p>'; }).join("");

function noteText(){
  return C.web3formsKey
    ? "We read everything and answer from " + C.email + " within three working days."
    : "Your mail app opens with the letter ready for " + C.email + ".";
}

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
  '<label class="hp" aria-hidden="true"><input type="checkbox" id="cBot" tabindex="-1" autocomplete="off">Leave this empty</label>' +
  '<div><button class="btn" type="submit">Send the brief</button></div>' +
  '<p class="note">' + esc(noteText()) + '</p></form>' +
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
  '<label class="hp" aria-hidden="true"><input type="checkbox" id="jBot" tabindex="-1" autocomplete="off">Leave this empty</label>' +
  '<div><button class="btn" type="submit">Send</button></div>' +
  '<p class="note">' + esc(noteText()) + '</p></form>' +
  '<div id="okJoin"></div>';

function mailto(subject, lines){
  window.location.href = "mailto:" + C.email +
    "?subject=" + encodeURIComponent(subject) +
    "&body=" + encodeURIComponent(lines.join("\n"));
}

/* ------------------------- отправка заявки -------------------------
   Если в content.js вписан web3formsKey, форма уходит на сервер
   Web3Forms и письмо приходит на почту студии. Пока ключа нет —
   работает запасной вариант: открывается почтовая программа.      */

function sendForm(opts){
  var box = $(opts.okBox);
  var btn = opts.form.querySelector('button[type="submit"]');

  function done(title, text){
    box.innerHTML = '<div class="ok"><strong>' + esc(title) + '</strong><p>' + esc(text) + '</p></div>';
    box.scrollIntoView({behavior:"smooth", block:"nearest"});
  }

  /* запасной вариант без ключа */
  if(!C.web3formsKey){
    mailto(opts.subject, opts.fields.map(function(f){ return f[0] + ": " + f[1]; }));
    done("Almost there.",
      "Your mail app should open with the letter ready. If it did not, write to " + C.email + " directly.");
    return;
  }

  var body = { access_key: C.web3formsKey, subject: opts.subject, from_name: "Twinies website" };
  opts.fields.forEach(function(f){ body[f[0]] = f[1]; });
  if(opts.botcheck) return;   /* ловушка для ботов: люди это поле не видят */

  btn.disabled = true;
  var label = btn.textContent;
  btn.textContent = "Sending\u2026";

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify(body)
  })
  .then(function(r){ return r.json(); })
  .then(function(res){
    if(res.success){
      opts.form.reset();
      opts.form.style.display = "none";
      done("Got it.", "We read everything and answer from " + C.email + " within three working days.");
    } else {
      throw new Error(res.message || "error");
    }
  })
  .catch(function(){
    btn.disabled = false; btn.textContent = label;
    done("Something went wrong.",
      "The form did not go through. Please write to " + C.email + " directly \u2014 we will answer either way.");
  });
}

function val(id){ var el = $(id); return el ? el.value.trim() : ""; }

var fc = $("formCreate");
if(fc) fc.addEventListener("submit", function(e){
  e.preventDefault();
  sendForm({
    form: fc, okBox: "okCreate", subject: "Twinies \u2014 create art",
    botcheck: $("cBot") && $("cBot").checked,
    fields: [
      ["Main request", val("c1")],
      ["Budget", val("c2")],
      ["Timeline", val("c3")],
      ["Anything else", val("c4")],
      ["Contact", val("c5")]
    ]
  });
});

var fj = $("formJoin");
if(fj) fj.addEventListener("submit", function(e){
  e.preventDefault();
  sendForm({
    form: fj, okBox: "okJoin", subject: "Twinies \u2014 join us",
    botcheck: $("jBot") && $("jBot").checked,
    fields: [
      ["Division", val("j1")],
      ["Education", val("j2")],
      ["Experience / portfolio", val("j3")],
      ["Anything else", val("j4")],
      ["Contact", val("j5")]
    ]
  });
});

})();
