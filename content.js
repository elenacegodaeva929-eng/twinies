/* =====================================================================
   КОНТЕНТ САЙТА TWINIES

   Это единственный файл, который нужно править, чтобы поменять
   фаундеров, подразделения, сотрудников, фильмы, ленту работ и контакты.
   Дизайн и вёрстка живут в других файлах — их трогать не надо.

   ТРИ ПРАВИЛА, ЧТОБЫ НИЧЕГО НЕ СЛОМАТЬ:
     1. Текст всегда внутри кавычек:  name: "Kseniia Klever"
     2. После каждой строки — запятая, кроме самой последней в блоке.
     3. Если внутри текста нужны кавычки — ставьте «ёлочки» или ' ,
        но не " — она закроет строку раньше времени.

   Картинки лежат в корне репозитория, рядом с index.html.
   Поэтому путь — просто имя файла: "kseniia.jpg", без папок.

   После правки: сохранить файл и залить на GitHub поверх старого.
   ===================================================================== */

const CONTENT = {

  /* ================== КАРТИНКИ ГЛАВНОГО ЭКРАНА ================== */

  heroLogo:  "",                  /* доп. логотип над заголовком — обычно не нужен,
                                     настоящий логотип стоит в меню            */
  heroClown: "logo-hero.png",     /* иллюстрация клоуна                        */

  /* Показывать ли большую надпись TWINIES градиентом над иллюстрацией.
     Сейчас выключена: название уже есть на самой иллюстрации.
     Поставьте true, если хотите вернуть её.                                   */
  showTitle: false,


  /* ====================== КОНТАКТЫ И ФОРМЫ ======================
     createForm — ссылка на гугл-форму для заявок в студию
     joinForm   — ссылка на гугл-форму «стать частью команды»
     Пока ссылка пустая — показывается форма, которая собирает
     ответы и открывает почту с готовым письмом.                    */

  createForm: "",
  joinForm: "",
  email: "hello@twinies.studio",


  /* ====================== ГЛАВНЫЙ ЭКРАН ====================== */

  tagline: "Clown production studio",

  intro: [
    "Twinies is a clown production studio bringing artists from around the world together to create independent art in all its forms. Our mission is to make art accessible to everyone, regardless of their background, status, or experience.",
    "At Twinies, we're all twins. No two of us are alike, but we share a love for creating and a taste for the unconventional. Our twinies are always ready to jump into projects of any scale or complexity. Everyone on our team has the freedom to explore their own interests and grow in whatever direction they choose — and that's what makes each twinie unique.",
    "We bring the people, skills, and ideas that other projects need to come to life, while making plenty of our own. Rebellion against the system, creative freedom, unconventional thinking, and staying true to ourselves — that's what Twinies is all about."
  ],


  /* ========================== ФАУНДЕРЫ ==========================
     photo — имя файла, загруженного в репозиторий: "kseniia.jpg"   */

  founders: [
    {
      id: "kseniia",
      name: "Kseniia Klever",
      short: "Director, Producer, Screenwriter",
      title: "Founder & Lead Producer, Twinies",
      photo: "",
      achievements: [
        "Produced, wrote, and directed 120+ projects, managing over $600K in production budgets.",
        "Brought 157 emerging artists into paid productions through Twinies, with 80+ now working in the film industry.",
        "Won twelve international film and screenwriting festivals.",
        "Led a 124-person cast and crew on an original series backed by $225K in financing.",
        "Curated 160+ cultural events attended by 50,000+ people."
      ],
      about: "Over eight years, I've been a theater director, an art director, a horror writer, and a hundred other things. But through it all, I was always on my own. I was never what I was supposed to be. Always too strange, too crazy, too hard to understand. I created Twinies to bring together all the misfits and give them a chance to create something real.",
      quote: "If human foolishness had been as carefully nurtured and cultivated as intelligence has been for centuries, perhaps it would have turned into something extremely precious.",
      cite: "Yevgeny Zamyatin, We"
    },
    {
      id: "alisa",
      name: "Alisa Sakson",
      short: "Screenwriter, Producer",
      title: "Co-Founder & Lead Producer, Twinies",
      photo: "",
      achievements: [
        "Wrote, produced, and directed 30+ projects, managing over $200K in production budgets.",
        "Developed original television series for NMG — Russia's largest media holding — and pitched projects to three major streaming platforms: Okko, Kion, and Premier.",
        "Won sixteen international film and screenwriting festivals.",
        "Secured a $52K national arts grant for an original theatrical production."
      ],
      about: "For six years, I fought to make it as a screenwriter in the Russian film industry, and encountered more than my share of horrors. My scripts were stolen, major production companies cheated me, and once I even came close to going to prison over something I'd written. I left Russia to study in America, hoping to finally find the creative freedom I'd been fighting for. I joined Twinies because I want everyone, everywhere, to have the freedom to create art on their own terms.",
      quote: "If liberty means anything at all it means the right to tell people what they do not want to hear.",
      cite: "George Orwell, The Freedom of the Press"
    }
  ],


  /* ======================= ПОДРАЗДЕЛЕНИЯ =======================
     На главной — только логотип и название.
     Описание и состав открываются при клике.                       */

  divisions: [
    {
      id: "eye",
      name: "Eye",
      logo: "eye.png",
      roles: "Directors, Cinematographers & Editors",
      desc: "We bring visions to life, from the first wild idea to the final frame. We dream up, shoot, and edit films, commercials, music videos, and anything else meant to be seen."
    },
    {
      id: "hand",
      name: "Hand",
      logo: "hand.png",
      roles: "Design, Art & AI",
      desc: "We turn imagination into something you can see and touch. We build visual identities, create bold designs, graphics, illustrations, and entire digital worlds. No rules and no limits."
    },
    {
      id: "mouth",
      name: "Mouth",
      logo: "mouth.png",
      roles: "Producers, Marketing & Mediation",
      desc: "We make things happen. We turn impossible ideas into real projects, bring the right people together, break down barriers, build strategies, and lead productions from chaos to creation."
    },
    {
      id: "ear",
      name: "Ear",
      logo: "ear.png",
      roles: "Musicians, Sound Designers & Audio Engineers",
      desc: "We give ideas a voice. We compose original music, design soundscapes, and shape the sound of films, commercials, and digital experiences. From the first note to the final echo."
    }
  ],


  /* ========================= СОТРУДНИКИ =========================
     Ключи eye / hand / mouth / ear — те же id, что у подразделений.
     Чтобы добавить человека — скопировать строку { … } целиком,
     вставить ниже и переписать. Чтобы убрать — удалить её
     вместе с фигурными скобками и запятой.

     На каждого человека:
       name     — имя
       role     — должность
       photo    — файл фото, например "sergey.jpg"
       bio      — абзацы о нём, каждый в кавычках через запятую
       selected — блок «Selected work», одной строкой
       projects — картинки его работ: ["work1.jpg", "work2.jpg"]
                  они открываются по кнопке Projects в карточке
       links    — доп. кнопки: ["Подпись", "ссылка"]                */

  team: {
    eye: [
      {
        name: "Sergey Sutyagin",
        role: "Director, Screenwriter, Digital Designer & Production Designer",
        photo: "",
        bio: [
          "Postgraduate student in Fiction Film Directing at the Gerasimov Institute of Cinematography (VGIK).",
          "Director of six short films, with work screened at Russian and international film festivals. Actor at the Pyotr Fomenko Workshop Theatre in Moscow. Collaborates with CINEVENT PRODUCTION as a director of music videos and commissioned productions."
        ],
        selected: "Director of The Power of Childhood, It Can't Be!, Coincidences, and The Snowman, all screened at VGIK film festivals. Director of the music video Paskuda for V Oknakh Aprel. Actors' Assistant on the feature film The Master and Margarita (2024), script supervisor for the series Friendzone, and production designer of Twinies's short film Nothing Feels.",
        projects: [],
        links: []
      },
      { name: "Twinie 02", role: "Cinematographer", photo: "", bio: [], selected: "", projects: [], links: [] },
      { name: "Twinie 03", role: "Editor",          photo: "", bio: [], selected: "", projects: [], links: [] }
    ],
    hand: [
      { name: "Twinie 04", role: "Art director",    photo: "", bio: [], selected: "", projects: [], links: [] },
      { name: "Twinie 05", role: "Graphic design",  photo: "", bio: [], selected: "", projects: [], links: [] },
      { name: "Twinie 06", role: "AI artist",       photo: "", bio: [], selected: "", projects: [], links: [] }
    ],
    mouth: [
      { name: "Twinie 07", role: "Producer",        photo: "", bio: [], selected: "", projects: [], links: [] },
      { name: "Twinie 08", role: "Marketing",       photo: "", bio: [], selected: "", projects: [], links: [] }
    ],
    ear: [
      { name: "Twinie 09", role: "Composer",        photo: "", bio: [], selected: "", projects: [], links: [] },
      { name: "Twinie 10", role: "Sound designer",  photo: "", bio: [], selected: "", projects: [], links: [] }
    ]
  },


  /* ====================== ФИЛЬМЫ СТУДИИ ======================
     Собственные проекты Твинис. Афиша + описание, трейлер позже.
     poster  — имя файла: "film-poster.jpg"
     trailer — ССЫЛКА-EMBED, именно в таком виде:
                 YouTube   https://www.youtube.com/embed/КОД
                 Vimeo     https://player.vimeo.com/video/НОМЕР
               Пока пусто — в окне написано, что трейлер скоро.     */

  films: [
    {
      title: "Film title",
      year: "2026",
      kind: "Feature film",
      poster: "",
      trailer: "",
      desc: "What the film is about, who made it, where it screened. Two or three paragraphs at most — nobody reads long text here."
    }
  ],


  /* ======================== ЛЕНТА РАБОТ ========================
     Работы ребят из команды. Только картинки, без описаний.
     img — имя файла. Клик открывает картинку крупно.
     Добавлять можно сколько угодно — лента сама разложится.        */

  works: [
    { img: "", alt: "" },
    { img: "", alt: "" },
    { img: "", alt: "" },
    { img: "", alt: "" },
    { img: "", alt: "" },
    { img: "", alt: "" },
    { img: "", alt: "" },
    { img: "", alt: "" }
  ],


  /* ===================== ТЕКСТЫ СТРАНИЦ ===================== */

  createIntro: [
    "The same thing can be seen a thousand different ways. We bring together people with different perspectives, backgrounds, and creative minds to come up with ideas none of us could ever imagine alone.",
    "We create anything and everything across film, art, and everything that doesn't exist yet. From the smallest detail to an entire world, we dream it up, design it, make it happen, and bring it to life. Any form and any scale."
  ],

  joinIntro: [
    "If you're just starting out, we'll teach you everything we know. We'll show you how the industry works and help you find your place in it.",
    "And if you're already a master of your craft, we'll find you projects that make your eyes light up.",
    "We love teaching, creating, and meeting talented misfits.",
    "Fill out the form. Let's do some gloriously stupid things together!"
  ]

};
