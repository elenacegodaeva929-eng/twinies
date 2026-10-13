/* =====================================================================
   КОНТЕНТ САЙТА TWINIES

   Это единственный файл, который нужно править, чтобы поменять
   владельцев, подразделения, сотрудников, проекты и контакты.
   Дизайн и вёрстка живут в других файлах — их трогать не надо.

   ТРИ ПРАВИЛА, ЧТОБЫ НИЧЕГО НЕ СЛОМАТЬ:
     1. Текст всегда внутри кавычек:  name: "Ksenia Klever"
     2. После каждой строки — запятая, кроме самой последней в блоке.
     3. Если внутри текста нужны кавычки — ставьте «ёлочки» или ' ,
        но не " — она закроет строку раньше времени.

   Апостроф в английском тексте (don't, we're) писать можно — всё в
   двойных кавычках, он их не ломает.

   После правки: сохранить файл и залить на хостинг поверх старого.
   ===================================================================== */

const CONTENT = {

  /* ================== КАРТИНКИ ГЛАВНОГО ЭКРАНА ==================
     Положите файлы в папку img/ и впишите имя.
     Пока пусто — на их месте пунктирные рамки.                      */

  heroLogo:  "",            /* например: "img/logo.svg"  */
  heroClown: "",            /* например: "img/clown.png" */


  /* ====================== КОНТАКТЫ И ФОРМЫ ======================
     createForm — ссылка на гугл-форму для заявок в студию.
                  Пока пусто, кнопка «Create» ведёт на страницу с
                  формой-заглушкой, которая никуда не отправляет.
     email      — почта, на которую пишут желающие в команду.         */

  createForm: "",
  email: "hello@twinies.studio",


  /* ========================= ВЛАДЕЛЬЦЫ =========================
     photo  — файл в папке img/, например "img/ksenia.jpg"
     tags   — достижения, короткими фразами
     bio    — текст от первого лица
     quote  — цитата, cite — чья                                      */

  owners: [
    {
      id: "ksenia",
      name: "Ksenia Klever",
      role: "Founder · Lead producer",
      short: "Director, producer, screenwriter.",
      photo: "",
      tags: ["Founder", "Lead producer", "Director", "Screenwriter"],
      bio: "In eight years of work I have been a theatre director, an art director, a writer of horror stories and plenty else. But I was always alone on that road. I was always «not the way you are supposed to be» — too strange, too mad, too hard to read. I built Twinies to bring the misfits together and give them a chance to make something real.",
      quote: "If human stupidity had been cherished and cultivated for centuries the way intelligence has, perhaps it would have turned into something extraordinarily precious.",
      cite: "Yevgeny Zamyatin, We"
    },
    {
      id: "alisa",
      name: "Alisa Saxon",
      role: "Co-founder · Lead producer",
      short: "Screenwriter, producer.",
      photo: "",
      tags: ["Co-founder", "Lead producer", "Screenwriter"],
      bio: "Six years of trying to break into the Russian film industry as a screenwriter brought me a pile of horrors: my work was stolen, big productions lied to me, and once I nearly ended up in prison over a script of mine. I left to study in America to finally get creative freedom. I joined Twinies to give everyone the chance to make art freely.",
      quote: "Freedom is the right to tell people what they do not want to hear.",
      cite: "George Orwell"
    }
  ],


  /* ======================= ПОДРАЗДЕЛЕНИЯ =======================
     logo  — картинка сигила из папки img/
     roles — кто входит, коротко, через ·
     desc  — абзац о том, чем занимается подразделение               */

  divisions: [
    {
      id: "eye",
      name: "Eye",
      logo: "img/eye.png",
      roles: "Directors · DOPs · Editors",
      desc: "The Eye decides what the film looks like. Directing, camera, light and the cut — from a one-day shoot to a full production cycle."
    },
    {
      id: "hand",
      name: "Hand",
      logo: "img/hand.png",
      roles: "Design · Art · AI",
      desc: "The Hand makes everything you see around the frame: identity, titles, posters, art direction, props and AI-assisted imagery."
    },
    {
      id: "mouth",
      name: "Mouth",
      logo: "img/mouth.png",
      roles: "Producers · Marketing · Mediation",
      desc: "The Mouth talks to the world: producing, budgets, partners, release and press. It is also where a brief turns into a plan."
    },
    {
      id: "ear",
      name: "Ear",
      logo: "img/ear.png",
      roles: "Musicians · Sound",
      desc: "The Ear writes the score and builds the sound: original music, sound design, mixing and everything a scene needs to be heard."
    }
  ],


  /* ========================= СОТРУДНИКИ =========================
     Ключи eye / hand / mouth / ear — те же id, что у подразделений.
     Чтобы добавить человека — скопируйте любую строчку { … } целиком
     и впишите своё. Чтобы убрать — удалите её вместе с фигурными
     скобками и запятой.

     links — кнопки под карточкой: ["Подпись", "ссылка"]              */

  team: {
    eye: [
      { name: "Twinie 01", role: "Director",       photo: "", bio: "", links: [] },
      { name: "Twinie 02", role: "DOP",            photo: "", bio: "", links: [] },
      { name: "Twinie 03", role: "Editor",         photo: "", bio: "", links: [] }
    ],
    hand: [
      { name: "Twinie 04", role: "Art director",   photo: "", bio: "", links: [] },
      { name: "Twinie 05", role: "Graphic design", photo: "", bio: "", links: [] },
      { name: "Twinie 06", role: "AI artist",      photo: "", bio: "", links: [] }
    ],
    mouth: [
      { name: "Twinie 07", role: "Producer",       photo: "", bio: "", links: [] },
      { name: "Twinie 08", role: "Marketing",      photo: "", bio: "", links: [] }
    ],
    ear: [
      { name: "Twinie 09", role: "Composer",       photo: "", bio: "", links: [] },
      { name: "Twinie 10", role: "Sound designer", photo: "", bio: "", links: [] }
    ]
  },


  /* =========================== ПРОЕКТЫ ===========================
     cover — обложка из папки img/. Без неё карточка будет в шашку.
     reel  — ССЫЛКА-EMBED на видео, именно в таком виде:
               YouTube   https://www.youtube.com/embed/КОД_ВИДЕО
               Vimeo     https://player.vimeo.com/video/НОМЕР
             Обычная ссылка из адресной строки не подойдёт.
     tags  — какие подразделения работали над проектом               */

  projects: [
    {
      title: "Project 01",
      kind: "Short film",
      cover: "",
      reel: "",
      desc: "Synopsis, year, festivals, and which divisions worked on it.",
      tags: ["Eye", "Hand", "Ear"]
    },
    {
      title: "Project 02",
      kind: "Music video",
      cover: "",
      reel: "",
      desc: "Artist, label, format, where it premiered.",
      tags: ["Eye", "Ear"]
    },
    {
      title: "Project 03",
      kind: "Commercial",
      cover: "",
      reel: "",
      desc: "Client, task, result. Short and concrete reads best here.",
      tags: ["Mouth", "Eye"]
    }
  ]

};
