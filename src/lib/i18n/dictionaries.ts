import type { Locale } from "./locales";
import { BOOKING_LINKS, mailtoHref } from "@/lib/contact";

// Locale-scoped copy, kept as plain data (not hardcoded in JSX) so content
// edits stay low-risk and each section's dictionary slice can be filled in
// independently slice-by-slice. Extended as later slices land (about,
// specialization, testimonials, pricing, faq, footer, etc).

export interface NavItem {
  id: string; // matches the target section's HTML id, e.g. "about"
  label: string;
}

export interface Dictionary {
  switcher: {
    label: string; // label for the *other* locale's link, e.g. "CZ" shown on the uk site
    ariaLabel: string; // full accessible name, e.g. "Switch to Czech"
  };
  brand: string;
  nav: NavItem[];
  hero: {
    heading: string;
    subheading: string;
    ctaPrimary: string;
    ctaSecondary: string;
    stats: { value: string; label: string }[];
  };
  about: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
    credentialsHeading: string;
    credentials: string[];
    photoAlt: string;
  };
  specialization: {
    heading: string;
    items: { title: string; description: string }[];
  };
  testimonials: {
    heading: string;
  };
  gettingStarted: {
    heading: string;
    steps: { title: string; description: string }[];
    bookingHeading: string;
    bookingCtas: { label: string; href: string }[];
    fallbackHeading: string;
    fallbackBody: string;
    fallbackCta: string;
  };
  pricing: {
    heading: string;
    subheading: string;
    durationLabels: { min60: string; min90: string };
    tiers: { key: "individual" | "group"; title: string; note: string }[];
    discountHeading: string;
    discountNote: string;
  };
  faq: {
    heading: string;
  };
  footer: {
    heading: string;
    body: string;
    emailCta: string;
    termsLabel: string;
    privacyLabel: string;
  };
  placeholder: {
    heading: string;
  };
}

// Nav items double as in-page anchor targets — Slice 3+ each add the
// matching `<section id="...">` these ids point at.
const navItems: Record<Locale, NavItem[]> = {
  uk: [
    { id: "about", label: "Про мене" },
    { id: "testimonials", label: "Відгуки" },
    { id: "getting-started", label: "З чого почати" },
    { id: "pricing", label: "Ціни" },
    { id: "faq", label: "Часті запитання" },
  ],
  cs: [
    { id: "about", label: "O mně" },
    { id: "testimonials", label: "Reference" },
    { id: "getting-started", label: "Jak začít" },
    { id: "pricing", label: "Ceník" },
    { id: "faq", label: "Časté dotazy" },
  ],
};

export const dictionaries: Record<Locale, Dictionary> = {
  uk: {
    switcher: { label: "CZ", ariaLabel: "Перейти на чеську версію сайту" },
    brand: "Plynule česky",
    nav: navItems.uk,
    hero: {
      heading: "Говоріть чеською вільно і впевнено",
      subheading:
        "Індивідуальні та групові заняття з досвідченим викладачем із 10+ роками знання мови на рівні носія.",
      ctaPrimary: "Записатись на пробне заняття",
      ctaSecondary: "Дізнатись більше",
      stats: [
        { value: "8+", label: "роки викладацької практики" },
        { value: "A1–C1", label: "рівні навчання" },
        { value: "10+", label: "років у Чеській Республіці" },
      ],
    },
    about: {
      eyebrow: "Про мене",
      heading: "Катерина Лещенко",
      paragraphs: [
        "Мене звати Катерина, я проводжу як індивідуальні, так і групові заняття, програма яких адаптується під конкретні запити клієнтів.",
        "Моя взаємодія з чеською мовою розпочалася ще в початковій школі, а з 2014 року я постійно проживаю в Чеській Республіці. Це дозволяє мені не лише вільно володіти мовою на рівні носія, але й глибоко розуміти соціокультурний контекст, який є критично важливим для успішної інтеграції іноземців у Чехії.",
        "Протягом останніх трьох років я веду активну викладацьку практику, працюючи зі студентами рівнів від початкового (A1) до просунутого (C1).",
      ],
      credentialsHeading: "Моя професійна кваліфікація підтверджена:",
      credentials: [
        "Державний сертифікат про успішне складання іспиту з чеської мови CCE на рівні C1.",
        "Сертифікат про проходження спеціалізованого методичного курсу з викладання чеської мови як іноземної при Карловому університеті (Univerzita Karlova).",
      ],
      photoAlt: "Катерина Лещенко",
    },
    specialization: {
      heading: "Моя спеціалізація включає",
      items: [
        {
          title: "Підготовку до державних іспитів",
          description:
            "Цілеспрямована робота для успішного складання іспитів на отримання постійного місця проживання (trvalý pobyt) та громадянства Чеської Республіки.",
        },
        {
          title: "Академічну підготовку",
          description:
            "Комплексна допомога абітурієнтам у підготовці до вступних іспитів у чеські заклади вищої освіти.",
        },
        {
          title: "Підвищення загальної мовної компетенції",
          description:
            "Розвиток навичок для вільної комунікації у повсякденному житті, професійному середовищі та бізнесі.",
        },
      ],
    },
    testimonials: { heading: "Відгуки" },
    gettingStarted: {
      heading: "З чого почати",
      steps: [
        {
          title: "Вибір часу",
          description:
            "Перейдіть до онлайн-календаря нижче та оберіть зручний для вас день і час заняття.",
        },
        {
          title: "Бронювання та оплата",
          description:
            "Оберіть підходящий термін і здійсніть онлайн-оплату безпосередньо на сайті для підтвердження бронювання.",
        },
        {
          title: "Підключення до уроку",
          description:
            "Усі заняття проходять дистанційно на платформі Google Meet. Посилання на онлайн-кімнату буде надіслано вам автоматично після успішного оформлення.",
        },
      ],
      bookingHeading: "Записатись на заняття",
      bookingCtas: [
        { label: "60 хвилин", href: BOOKING_LINKS.min60 },
        { label: "90 хвилин", href: BOOKING_LINKS.min90 },
      ],
      fallbackHeading: "Що робити, якщо в календарі немає вільних віконець?",
      fallbackBody:
        "Якщо наразі в календарі відсутній зручний для вас час, будь ласка, надішліть електронний лист. У листі коротко опишіть вашу поточну ситуацію, основну мету навчання та ваші часові можливості (бажані дні та години). Я обов'язково розгляну ваш запит, і ми узгодимо індивідуальний графік.",
      fallbackCta: "Написати на пошту",
    },
    pricing: {
      heading: "Вартість занять",
      subheading:
        "Прозорі ціни без прихованих платежів. Перше пробне заняття обговорюється індивідуально.",
      durationLabels: { min60: "60 хв.", min90: "90 хв." },
      tiers: [
        {
          key: "individual",
          title: "Індивідуальне заняття",
          note: "Ідеально для регулярних занять і стабільного прогресу.",
        },
        {
          key: "group",
          title: "Групове заняття 2–4 особи",
          note: "Живе спілкування та обмін досвідом з іншими студентами.",
        },
      ],
      discountHeading: "Знижка за пакет занять",
      discountNote: "5% знижки за оплату 4–7 занять на місяць, 10% знижки за 8 і більше занять.",
    },
    faq: { heading: "Часті запитання" },
    footer: {
      heading: "Готові розпочати?",
      body: "Напишіть мені — разом визначимо ваш рівень і підберемо зручний графік.",
      emailCta:
        "Якщо ви маєте питання, проблеми з оплатою або хочете залишити відгук - звʼяжіться зі мною.",
      termsLabel: "Умови та повернення",
      privacyLabel: "Захист персональних даних",
    },
    placeholder: { heading: "Plynule česky" },
  },
  cs: {
    switcher: { label: "UA", ariaLabel: "Přepnout na ukrajinskou verzi webu" },
    brand: "Plynule česky",
    nav: navItems.cs,
    hero: {
      heading: "Mluvte česky plynule a sebejistě",
      subheading:
        "Individuální a skupinové lekce se zkušenou lektorkou s více než 10 lety znalosti jazyka na úrovni rodilého mluvčího.",
      ctaPrimary: "Přihlásit se na zkušební lekci",
      ctaSecondary: "Zjistit více",
      stats: [
        { value: "8+", label: "roky pedagogické praxe" },
        { value: "A1–C1", label: "úrovně výuky" },
        { value: "10+", label: "let v České republice" },
      ],
    },
    about: {
      eyebrow: "O mně",
      heading: "Kateryna Leshchenko",
      paragraphs: [
        "Jmenuji se Kateryna a vedu jak individuální, tak skupinové lekce, jejichž program přizpůsobuji konkrétním potřebám klientů.",
        "S češtinou jsem se poprvé setkala už na základní škole a od roku 2014 žiji trvale v České republice. Díky tomu ovládám jazyk nejen na úrovni rodilého mluvčího, ale také hluboce rozumím sociokulturnímu kontextu, který je klíčový pro úspěšnou integraci cizinců v Česku.",
        "Poslední tři roky se aktivně věnuji výuce a pracuji se studenty od začátečnické úrovně (A1) až po pokročilou (C1).",
      ],
      credentialsHeading: "Moje odborná kvalifikace je potvrzena:",
      credentials: [
        "Státní certifikát o úspěšném složení zkoušky z českého jazyka CCE na úrovni C1.",
        "Certifikát o absolvování specializovaného metodického kurzu výuky češtiny jako cizího jazyka na Univerzitě Karlově.",
      ],
      photoAlt: "Kateryna Leshchenko",
    },
    specialization: {
      heading: "Moje specializace zahrnuje",
      items: [
        {
          title: "Příprava na státní zkoušky",
          description:
            "Cílená příprava na úspěšné složení zkoušek pro získání trvalého pobytu a občanství České republiky.",
        },
        {
          title: "Akademická příprava",
          description:
            "Komplexní pomoc uchazečům při přípravě na přijímací zkoušky na české vysoké školy.",
        },
        {
          title: "Zvýšení celkové jazykové kompetence",
          description:
            "Rozvoj dovedností pro plynulou komunikaci v každodenním životě, profesním prostředí a byznysu.",
        },
      ],
    },
    testimonials: { heading: "Reference" },
    gettingStarted: {
      heading: "Jak začít",
      steps: [
        {
          title: "Výběr času",
          description:
            "Přejděte do online kalendáře níže a vyberte si vhodný den a čas lekce.",
        },
        {
          title: "Rezervace a platba",
          description:
            "Vyberte vhodný termín a proveďte online platbu přímo na webu pro potvrzení rezervace.",
        },
        {
          title: "Připojení k lekci",
          description:
            "Všechny lekce probíhají online na platformě Google Meet. Odkaz na online místnost vám bude automaticky zaslán po úspěšném dokončení rezervace.",
        },
      ],
      bookingHeading: "Přihlásit se na lekci",
      bookingCtas: [
        { label: "60 minut", href: BOOKING_LINKS.min60 },
        { label: "90 minut", href: BOOKING_LINKS.min90 },
      ],
      fallbackHeading: "Co dělat, když v kalendáři nejsou volné termíny?",
      fallbackBody:
        "Pokud aktuálně v kalendáři není vhodný termín, napište prosím e-mail. Stručně popište svou současnou situaci, hlavní cíl studia a své časové možnosti (preferované dny a hodiny). Váš požadavek určitě zvážím a domluvíme si individuální rozvrh.",
      fallbackCta: "Napsat e-mail",
    },
    pricing: {
      heading: "Ceník",
      subheading:
        "Transparentní ceny bez skrytých poplatků. První zkušební lekce se domlouvá individuálně.",
      durationLabels: { min60: "60 min.", min90: "90 min." },
      tiers: [
        {
          key: "individual",
          title: "Individuální lekce",
          note: "Ideální pro pravidelné lekce a stabilní pokrok.",
        },
        {
          key: "group",
          title: "Skupinová lekce 2–4 osoby",
          note: "Živá komunikace a sdílení zkušeností s dalšími studenty.",
        },
      ],
      discountHeading: "Sleva za balíček lekcí",
      discountNote: "5% sleva při platbě za 4–7 lekcí měsíčně, 10% sleva od 8 lekcí.",
    },
    faq: { heading: "Časté dotazy" },
    footer: {
      heading: "Jste připraveni začít?",
      body: "Napište mi — společně určíme vaši úroveň a domluvíme vhodný rozvrh.",
      emailCta:
        "Pokud máte dotaz, problém s platbou nebo chcete zanechat recenzi, kontaktujte mě",
      termsLabel: "Podmínky a vrácení peněz",
      privacyLabel: "Ochrana osobních údajů",
    },
    placeholder: { heading: "Plynule česky" },
  },
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
