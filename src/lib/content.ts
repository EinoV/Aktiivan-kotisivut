// Shared placeholder content for the five homepage concepts.
// Company/partner names are intentionally generic placeholders, not real
// confirmed partners — swap for real names once Aktiiva confirms them.

export const nav = [
  { label: "Etusivu", href: "/" },
  { label: "Aktiiva", href: "/aktiiva" },
  { label: "Työpaikat", href: "/tyopaikat" },
  { label: "Kumppanit", href: "/kumppanit" },
  { label: "Hallitus", href: "/hallitus" },
  { label: "Yhteystiedot", href: "/yhteystiedot" },
];

export const orgFacts = {
  name: "Aktiiva ry",
  institution: "Turun kauppakorkeakoulu",
  fields: ["Laskentatoimi", "Rahoitus", "Yritysjuridiikka"],
  founded: "1987",
  city: "Turku",
};

export const audiences = [
  {
    id: "opiskelijat",
    label: "Opiskelijoille",
    heading: "Yhteisö opintojen ajaksi ja sen jälkeen",
    body: "Aktiiva tuo yhteen laskentatoimen, rahoituksen ja yritysjuridiikan opiskelijat. Tapahtumat, excursiot ja tuutorointi tekevät opinnoista muutakin kuin luentoja.",
  },
  {
    id: "tyonantajat",
    label: "Työnantajille",
    heading: "Suora yhteys alan opiskelijoihin",
    body: "Kumppanuus Aktiivan kanssa tuo yrityksenne näkyville juuri niille opiskelijoille, jotka suuntaavat laskentatoimen, rahoituksen ja yritysjuridiikan tehtäviin.",
  },
  {
    id: "alumnit",
    label: "Alumneille",
    heading: "Verkosto ei pääty valmistumiseen",
    body: "Aktiivan alumniverkosto pitää yhteyden entisiin opiskelijoihin yllä — jaettu tausta kantaa pitkälle työelämään.",
  },
];

export type Job = {
  role: string;
  employer: string;
  field: string;
  location: string;
  deadline: string;
  type: string;
};

export const jobs: Job[] = [
  {
    role: "Harjoittelija, tilintarkastus",
    employer: "Tilintarkastusyhteisö",
    field: "Laskentatoimi",
    location: "Turku",
    deadline: "15.8.2026",
    type: "Kesäharjoittelu",
  },
  {
    role: "Trainee, yritysrahoitus",
    employer: "Pankki",
    field: "Rahoitus",
    location: "Helsinki",
    deadline: "22.8.2026",
    type: "Traineeohjelma",
  },
  {
    role: "Assistentti, yritysjuridiikka",
    employer: "Asianajotoimisto",
    field: "Yritysjuridiikka",
    location: "Turku",
    deadline: "1.9.2026",
    type: "Osa-aikatyö",
  },
  {
    role: "Analyytikko, konsultointi",
    employer: "Konsultointiyhtiö",
    field: "Rahoitus",
    location: "Helsinki",
    deadline: "5.9.2026",
    type: "Vakituinen",
  },
  {
    role: "Kesäharjoittelija, taloushallinto",
    employer: "Tilitoimisto",
    field: "Laskentatoimi",
    location: "Turku",
    deadline: "12.9.2026",
    type: "Kesäharjoittelu",
  },
];

export type Partner = {
  name: string;
  tier: "Pääyhteistyökumppani" | "Yhteistyökumppani" | "Tapahtumakumppani";
};

export const partners: Partner[] = [
  { name: "Tilintarkastusyhteisö", tier: "Pääyhteistyökumppani" },
  { name: "Pankki", tier: "Yhteistyökumppani" },
  { name: "Konsultointiyhtiö", tier: "Yhteistyökumppani" },
  { name: "Asianajotoimisto", tier: "Yhteistyökumppani" },
  { name: "Vakuutusyhtiö", tier: "Tapahtumakumppani" },
  { name: "Tilitoimisto", tier: "Tapahtumakumppani" },
];

// The display strings and the URLs are separate fields rather than one
// object per channel: the archived /concept-* pages render `instagram`
// and `linkedin` directly as text, and reshaping them would break those
// for no benefit. Only the live site links them.
export const contact = {
  email: "hallitus@aktiivary.fi",
  instagram: "@aktiiva",
  instagramUrl: "https://www.instagram.com/aktiiva/",
  linkedin: "Aktiiva ry",
  linkedinUrl: "https://www.linkedin.com/company/aktiiva-ry/",
  address: "Rehtorinpellonkatu 3, 20500 Turku",
};

export type BoardMember = {
  role: string;
  name: string;
  email: string;
  remit: string;
};

// Placeholder board — names are invented, not real officeholders.
// Swap for the actual roster once Aktiiva confirms it.
export const board: BoardMember[] = [
  {
    role: "Puheenjohtaja",
    name: "Etunimi Sukunimi",
    email: "puheenjohtaja@aktiivary.fi",
    remit: "Kokonaisvastuu toiminnasta, edustaminen ja yhteydet tiedekuntaan.",
  },
  {
    role: "Varapuheenjohtaja",
    name: "Etunimi Sukunimi",
    email: "varapuheenjohtaja@aktiivary.fi",
    remit: "Puheenjohtajan tuki, hallituksen sisäinen koordinointi.",
  },
  {
    role: "Rahastonhoitaja",
    name: "Etunimi Sukunimi",
    email: "talous@aktiivary.fi",
    remit: "Talousarvio, kirjanpito ja jäsenmaksut.",
  },
  {
    role: "Yrityssuhdevastaava",
    name: "Etunimi Sukunimi",
    email: "yritys@aktiivary.fi",
    remit: "Kumppanuudet, excursiot ja rekrytointiyhteistyö.",
  },
  {
    role: "Tapahtumavastaava",
    name: "Etunimi Sukunimi",
    email: "tapahtumat@aktiivary.fi",
    remit: "Vuosijuhlat, sitsit ja viikoittainen tapahtumatoiminta.",
  },
  {
    role: "Viestintävastaava",
    name: "Etunimi Sukunimi",
    email: "viestinta@aktiivary.fi",
    remit: "Kanavat, jäsenviestintä ja verkkosivut.",
  },
  {
    role: "Opintovastaava",
    name: "Etunimi Sukunimi",
    email: "opinnot@aktiivary.fi",
    remit: "Opiskelijoiden edunvalvonta ja palaute opetuksesta.",
  },
];

// What the association actually does, used on /aktiiva.
export const activities = [
  {
    title: "Excursiot ja yritysvierailut",
    body: "Vierailuja tilintarkastusyhteisöihin, pankkeihin ja asianajotoimistoihin sekä Turussa että pääkaupunkiseudulla. Näet työn ennen kuin haet sitä.",
  },
  {
    title: "Tapahtumat",
    body: "Sitsit, vuosijuhlat, saunaillat ja lajikokeilut. Suurin osa jäsenten välisistä ystävyyksistä syntyy näissä, ei luentosalissa.",
  },
  {
    title: "Opintojen tuki",
    body: "Tuutorointi ensimmäisen vuoden opiskelijoille, tenttiarkisto ja kurssipalautteen välittäminen eteenpäin tiedekuntaan.",
  },
  {
    title: "Edunvalvonta",
    body: "Opiskelijoiden ääni opetuksen kehittämisessä — kurssitarjonta, aikataulut ja arviointikäytännöt.",
  },
];

// Numbers shown on /aktiiva. Placeholder figures.
export const orgNumbers = [
  { value: "1987", label: "Perustettu" },
  { value: "n. 450", label: "Jäsentä" },
  { value: "3", label: "Opintosuuntaa" },
  { value: "n. 40", label: "Tapahtumaa vuodessa" },
];

export type NewsItem = {
  date: string;
  isoDate: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
};

// Placeholder announcements — invented, not real events. The dates are
// deliberately in the near past/future so the list never looks abandoned
// in a demo; swap for real items before launch.
export const news: NewsItem[] = [
  {
    date: "12.8.2026",
    isoDate: "2026-08-12",
    title: "Syksyn excursiokierros aukeaa haettavaksi",
    excerpt:
      "Kolme vierailua tilintarkastukseen ja yritysrahoitukseen, sekä ensimmäistä kertaa kokonainen päivä asianajotoimistossa. Paikat täytetään ilmoittautumisjärjestyksessä.",
    image: "/photos/tse-building-card.jpg",
    imageAlt: "Turun kauppakorkeakoulun rakennus.",
  },
  {
    date: "28.7.2026",
    isoDate: "2026-07-28",
    title: "Fuksien tuutorointi käynnistyy elokuussa",
    excerpt:
      "Uudet opiskelijat saavat oman tuutoriryhmän heti orientaatioviikolla. Tuutorit ovat toisen ja kolmannen vuoden aktiivalaisia.",
    image: "/photos/tse-entrance-card.jpg",
    imageAlt: "Turun kauppakorkeakoulun pääsisäänkäynti.",
  },
  {
    date: "3.7.2026",
    isoDate: "2026-07-03",
    title: "Vuosijuhlat järjestetään marraskuussa",
    excerpt:
      "Aktiivan vuosijuhlat kokoavat jäsenet, alumnit ja kumppanit saman pöydän ääreen. Ilmoittautuminen avataan syyskuussa.",
    image: "/photos/turku-aerial-card.jpg",
    imageAlt: "Ilmakuva Turun keskustasta ja Aurajoesta.",
  },
];

// Study-path information, mirroring the "what you can study" block the
// reference association sites lead with.
export const studyPaths = [
  {
    name: "Laskentatoimi",
    body: "Tilinpäätös, tilintarkastus ja johdon laskentatoimi. Polku vie tyypillisesti Big Four -yhteisöihin, sisäiseen tarkastukseen tai yritysten talousjohtoon.",
  },
  {
    name: "Rahoitus",
    body: "Yritysrahoitus, sijoittaminen ja rahoitusmarkkinat. Valmistuneet päätyvät pankkeihin, varainhoitoon, corporate finance -tehtäviin ja konsultointiin.",
  },
  {
    name: "Yritysjuridiikka",
    body: "Sopimus-, yhtiö- ja vero-oikeus liiketoiminnan näkökulmasta. Yhdistelmä, jota tarvitaan asianajotoimistoissa ja yritysten lakiasiainyksiköissä.",
  },
];

// Photo credits. design-system.md §8 requires licensed imagery to be
// credited; these are rendered in the subpage footer.
export const photoCredits = [
  {
    subject: "Turun kauppakorkeakoulu",
    author: "Anneli Salo",
    licence: "CC BY-SA 3.0",
    licenceUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
  },
  {
    subject: "Kauppakorkeakoulun pääsisäänkäynti",
    author: "Samuli Lintula",
    licence: "CC BY-SA 3.0",
    licenceUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
  },
  {
    subject: "Ilmakuva Turusta",
    author: "kallerna",
    licence: "CC BY-SA 4.0",
    licenceUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  },
];

// What a partner gets, used on /kumppanit.
export const partnerBenefits = [
  {
    title: "Näkyvyys oikealle kohderyhmälle",
    body: "Jäsenistö koostuu laskentatoimen, rahoituksen ja yritysjuridiikan opiskelijoista — ei koko korkeakoulusta. Viesti menee niille, jotka hakevat alanne tehtäviin.",
  },
  {
    title: "Excursiot ja vierailut",
    body: "Isännöikää vierailua toimistollanne tai pitäkää työpaja kampuksella. Tehokkain tapa tulla tunnetuksi työnantajana.",
  },
  {
    title: "Rekrytointi-ilmoitukset",
    body: "Avoimet paikat Työpaikat-sivulle ja jäsenkanaviin ilman erillistä veloitusta kumppanuuden aikana.",
  },
  {
    title: "Tapahtumayhteistyö",
    body: "Näkyvyys vuosijuhlissa ja muissa vuoden päätapahtumissa yhteistyön tason mukaan.",
  },
];
