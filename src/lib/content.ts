// Shared placeholder content for the five homepage concepts.
// Company/partner names are intentionally generic placeholders, not real
// confirmed partners — swap for real names once Aktiiva confirms them.

import { assetPath } from "@/lib/site";

export const nav = [
  { label: "Etusivu", href: "/" },
  { label: "Aktiiva", href: "/aktiiva" },
  { label: "Hallitus", href: "/hallitus" },
  { label: "Yhteystiedot", href: "/yhteystiedot" },
];

export const orgFacts = {
  name: "Aktiiva ry",
  institution: "Turun kauppakorkeakoulu",
  fields: ["Laskentatoimi", "Rahoitus", "Yritysjuridiikka"],
  founded: "1985",
  city: "Turku",
};

export const audiences = [
  {
    id: "opiskelijat",
    label: "Opiskelijoille",
    heading: "Yhteisö opintojen ajaksi ja sen jälkeen",
    body: "Aktiiva tuo yhteen laskentatoimen, rahoituksen ja yritysjuridiikan opiskelijat. Tapahtumat ja excursiot tekevät opinnoista muutakin kuin luentoja.",
    image: assetPath("/photos/tse-entrance-wide.jpg"),
    imageAlt: "Turun kauppakorkeakoulun sisäänkäynti.",
  },
  {
    id: "tyonantajat",
    label: "Työnantajille",
    heading: "Suora yhteys alan opiskelijoihin",
    body: "Kumppanuus Aktiivan kanssa tuo yrityksenne näkyville juuri niille opiskelijoille, jotka suuntaavat laskentatoimen, rahoituksen ja yritysjuridiikan tehtäviin.",
    image: assetPath("/photos/kupittaa-architecture.jpg"),
    imageAlt: "Toimistorakennusten julkisivuja Kupittaalla.",
  },
  {
    id: "alumnit",
    label: "Alumneille",
    heading: "Verkosto ei pääty valmistumiseen",
    body: "Aktiivan alumniverkosto pitää yhteyden entisiin opiskelijoihin yllä. Jaettu tausta kantaa pitkälle työelämään.",
    image: assetPath("/photos/turku-riverside-wide.jpg"),
    imageAlt: "Aurajoen rantaa Turun keskustassa.",
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
  email: "hallitus@aktiiva.fi",
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

export const board: BoardMember[] = [
  {
    role: "Puheenjohtaja",
    name: "Eino Vuopala",
    email: "eino.s.vuopala@utu.fi",
    remit: "Kokonaisvastuu toiminnasta, edustaminen ja yhteydet tiedekuntaan.",
  },
  {
    role: "Varapuheenjohtaja",
    name: "Roy Järvinen",
    email: "roy.j.jarvinen@utu.fi",
    remit: "Puheenjohtajan tuki, hallituksen sisäinen koordinointi.",
  },
  {
    role: "Rahastonhoitaja",
    name: "Topi Hälinen",
    email: "topi.s.halinen@utu.fi",
    remit: "Talous, budjetointi ja kirjanpito.",
  },
  {
    role: "Yrityssuhdevastaava",
    name: "Alex Hiltunen",
    email: "alex.a.hiltunen@utu.fi",
    remit: "Kumppanuudet ja rekrytointiyhteistyö.",
  },
  {
    role: "Excursiovastaava",
    name: "Emma Seppinen",
    email: "emma.e.seppinen@utu.fi",
    remit: "Excursioiden suunnittelu ja käytännön järjestelyt.",
  },
  {
    role: "Koulutuspoliittinen vastaava",
    name: "Elmeri Kero",
    email: "elmeri.l.kero@utu.fi",
    remit: "Opiskelijoiden edunvalvonta ja palaute opetuksesta tiedekunnalle.",
  },
  {
    role: "Sihteeri",
    name: "Mikael Lonka",
    email: "mikael.j.lonka@utu.fi",
    remit: "Kokousten pöytäkirjat ja hallituksen asiakirjahallinto.",
  },
  {
    role: "Tiedottaja",
    name: "Jun Hyytiäinen",
    email: "jun.e.hyytiainen@utu.fi",
    remit: "Kanavat, jäsenviestintä ja verkkosivut.",
  },
];

// What the association actually does, used on /aktiiva.
export const activities = [
  {
    title: "Opiskelijat",
    body: "Järjestämme lukuvuoden aikana excursioita ja afterwork-tapahtumia. Tavoitteena on auttaa jäseniä edistymään opinnoissaan, löytämään oma ura ja luomaan kontakteja niin opiskelijoihin kuin alumneihin.",
    image: assetPath("/photos/toiminta-opiskelijat.jpg"),
    imageAlt: "Kauppakorkeakoulun sisäänkäynti iltavalaistuksessa, julkisivulla TuKY:n tunnus.",
  },
  {
    title: "Laskentatoimen ja rahoituksen laitos",
    body: "Varmistamme, että opiskelijoiden ääni kuuluu laitoksella. Käymme säännöllistä vuoropuhelua ja välitämme palautetta suoraan sinne, missä opintoja kehitetään.",
    image: assetPath("/photos/toiminta-laitos.jpg"),
    imageAlt: "Opiskelijoita luentosalissa esityksen aikana.",
  },
  {
    title: "Yritysyhteistyö­kumppanit",
    body: "Jaamme työpaikkailmoituksia ja muuta ajankohtaista sähköpostilistoillamme ja sosiaalisessa mediassa. Järjestämme lisäksi yritystapahtumia, joissa opiskelijat ja työnantajat kohtaavat.",
    image: assetPath("/photos/toiminta-yritykset.jpg"),
    imageAlt: "Paneelikeskustelu Aktiivan yritystapahtumassa.",
  },
  {
    title: "Alumnit",
    body: "Tuomme alumneja mukaan tapahtumiimme ja tarjoamme opiskelijoille mahdollisuuden oppia heidän kokemuksistaan ja urapoluistaan.",
    image: assetPath("/photos/toiminta-alumnit.jpg"),
    imageAlt: "Aktiivan jäseniä iltatapahtumassa.",
  },
];

// Numbers shown on /aktiiva. Placeholder figures.
export const orgNumbers = [
  { value: "1985", label: "Perustettu" },
  { value: "n. 400", label: "Opiskelijaa" },
  { value: "3", label: "Opintosuuntaa" },
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
