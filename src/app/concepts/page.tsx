import Link from "next/link";
import styles from "./concepts.module.css";

export const metadata = {
  title: "Aktiiva ry — designarkisto",
};

const concepts: { href: string; name: string; desc: string; highlight?: boolean }[] = [
  {
    href: "/concept-1b-a",
    name: "1b-A. Saaristo, kirkas",
    desc: "Täysbleed-valokuva Turun saaristosta heron taustalla, kirkas päivävalo. Navy-pisteet, hienovarainen halo A:n ympärillä.",
  },
  {
    href: "/concept-1b",
    name: "1b. Masthead — arkkitehtuuri A:n sisällä",
    desc: "Aiempi välivaihe: hero on lähes tekstitön, interaktiivinen hiukkaskenttä paperitaustalla, jossa Kupittaan arkkitehtuurivalokuva näkyy A-symbolin sisällä.",
  },
  {
    href: "/concept-1",
    name: "1. Masthead (alkuperäinen)",
    desc: "Editoriaalinen ja tekstivetoinen. Hero ilman kuvaa — Fraunces-otsikko kantaa koko avauksen. Työpaikat ilmoitustauluna, kumppanit porrastettuna rivinä.",
  },
  {
    href: "/concept-2",
    name: "2. Split Frame",
    desc: "Pohjoismainen 55/45-jako navyn ja valokuvan välillä. Archivo + Newsreader Italic. Kumppanit käänteisinä valkoisina logoina navy-raidalla.",
  },
  {
    href: "/concept-3",
    name: "3. Grid System",
    desc: "Systemaattinen 12-palstainen ruudukko, ääriviiva-A vuotaa heron reunan yli. Spectral + Work Sans + JetBrains Mono. Työpaikat rekisterimäisenä taulukkona.",
  },
  {
    href: "/concept-4",
    name: "4. Community Layers",
    desc: "Lämpimin ja yhteisöllisin suunta. Kerrostettu, limittyvä kuvaklusteri herossa. Newsreader-antiikva. Kohderyhmät eri kokoisina kuvapaloina seinällä.",
  },
  {
    href: "/concept-5",
    name: "5. Ledger / Index",
    desc: "Data- ja työpaikkavetoinen. JetBrains Mono -otsikko, työpaikkaindeksi heti heron alla pääsisältönä. Kumppanit pelkkänä tekstilistana.",
  },
];

export default function ConceptsArchive() {
  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <span>Aktiiva ry — designarkisto</span>
          <Link href="/">← Nykyinen etusivu</Link>
        </div>
        <h1 className={styles.title}>Etusivukonseptien historia</h1>
        <p className={styles.lede}>
          Kaikki etusivulle harkitut suunnat ennen valintaa. Konsepti 1b-B
          valittiin lopulliseksi suunnaksi ja on nyt sivuston etusivulla
          osoitteessa <code>/</code>. Nämä sivut säilytetään vertailun ja
          historian vuoksi, eikä niitä enää päivitetä.
        </p>
      </header>

      <div className={styles.grid}>
        {concepts.map((c) => (
          <div
            key={c.href}
            className={`${styles.card} ${c.highlight ? styles.cardHighlight : ""}`}
          >
            <div className={styles.thumbFrame}>
              <a
                href={c.href}
                className={styles.thumbLink}
                aria-label={`Avaa ${c.name}`}
              />
              <iframe
                src={c.href}
                className={styles.thumbIframe}
                tabIndex={-1}
                aria-hidden="true"
                title=""
              />
            </div>
            <div className={styles.cardMeta}>
              <h2>{c.name}</h2>
              <a href={c.href}>Avaa konsepti →</a>
            </div>
            <p className={styles.cardDesc}>{c.desc}</p>
          </div>
        ))}
      </div>

      <footer className={styles.footer}>
        Tausta-aineisto: <code>brief.md</code>, <code>concepts.md</code>,{" "}
        <code>design-system.md</code> ja <code>references/</code> projektin
        juuressa.
      </footer>
    </div>
  );
}
