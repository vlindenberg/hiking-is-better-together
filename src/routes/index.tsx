import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import heroA from "@/assets/hikers_hillside.jpeg.asset.json";
import c2A from "@/assets/hikers_hail.webp.asset.json";
import soloA from "@/assets/hikers_pointing.png.asset.json";
import c1A from "@/assets/hiking_group.png.asset.json";
import homeA from "@/assets/screen_home.png.asset.json";
import joinHomeA from "@/assets/screen_join_home.png.asset.json";
import aiAssistantA from "@/assets/screen_ai_assistant.png.asset.json";
import joinDetailA from "@/assets/screen_join_detail.png.asset.json";
import youreInA from "@/assets/screen_youre_in.png.asset.json";
import createA from "@/assets/screen_create_hike.png.asset.json";
const hero = heroA.url, c2 = c2A.url, solo = soloA.url, c1 = c1A.url;
import { Phone, ImgScreen } from "@/components/Phone";
import { LeadForm } from "@/components/LeadForm";
import { AppIcon } from "@/components/AppIcon";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HikeUp — Hiking is better together" },
      { name: "description", content: "Find your people, discover new trails and make every hike an adventure with HikeUp." },
      { property: "og:title", content: "HikeUp — Hiking is better together" },
      { property: "og:description", content: "The social hiking app: discover hikes, join a crew, create your own adventure." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("in")), { threshold: 0.15 });
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const Btn = ({ href, children, tone = "lime" }: { href: string; children: ReactNode; tone?: "lime" | "ink" | "outline" }) => {
  const s = { lime: "bg-lime text-ink", ink: "bg-ink text-cloud", outline: "border-2 border-current" }[tone];
  return (
    <a href={href} className={`label group inline-flex items-center gap-3 rounded-full px-7 py-4 text-sm transition-all duration-300 hover:scale-105 hover:-rotate-2 ${s}`}>
      {children}<span className="transition-transform group-hover:translate-x-1">→</span>
    </a>
  );
};

const Marquee = ({ text, className }: { text: string; className: string }) => (
  <div className={`overflow-hidden whitespace-nowrap py-4 ${className}`}>
    <div className="marquee inline-block">
      {Array.from({ length: 8 }).map((_, i) => <span key={i} className="tech mx-6 text-4xl md:text-6xl">{text} <span className="display italic font-normal">✳</span></span>)}
    </div>
  </div>
);

type Hike = { trail: string; place: string; level: string; km: string; time: string; by: string; why: string };
const HIKES: Record<string, Hike> = {
  montserrat: { trail: "Montserrat Mountain Trail", place: "Montserrat, Barcelona", level: "Moderate", km: "8.2 km", time: "3h 10 min", by: "Marta", why: "Jagged rock towers and wide views over Catalonia. Start from Monistrol de Montserrat station." },
  fageda: { trail: "Fageda d’en Jordà Forest Trail", place: "La Garrotxa", level: "Easy", km: "4.8 km", time: "1h 30 min", by: "Núria", why: "A quiet beech forest on an old lava flow. Soft paths, birdsong and almost no climbing." },
  laguna: { trail: "Hiking Laguna Grande", place: "Peñalara, Madrid", level: "Hard", km: "9.6 km", time: "3h 30 min", by: "Jordi", why: "A mountain lake below the Peñalara peak. Meet at Puerto de Cotos car park." },
  nuria: { trail: "Vall de Núria Mountain Trail", place: "Vall de Núria, Pyrenees", level: "Moderate", km: "10.5 km", time: "4h 15 min", by: "Pau", why: "No cars can reach this valley. Take the rack railway from Queralbs and leave the crowds behind." },
  pedraforca: { trail: "Pedraforca Summit Trail", place: "Berguedà, Pyrenees", level: "Hard", km: "11 km", time: "5h 30 min", by: "Laura", why: "An early start to one of Catalonia’s most iconic peaks, with the first light on the summit." },
  ronda: { trail: "Camí de Ronda Trail", place: "Costa Brava", level: "Moderate", km: "6.14 km", time: "1h 35 min", by: "Alex", why: "A coastal path past hidden coves and turquoise water. Bring your swimsuit." },
  collserola: { trail: "Collserola Nature Walk", place: "Carretera de les Aigües, Barcelona", level: "Easy", km: "5.4 km", time: "1h 50 min", by: "Sam", why: "A flat, easy walk above the city with views over Barcelona. Perfect for a first group hike." },
};
const AI_CHIPS: [string, keyof typeof HIKES | "surprise"][] = [
  ["Scenic views", "montserrat"],
  ["Peaceful nature", "fageda"],
  ["Waterfalls & lakes", "laguna"],
  ["Less crowded", "nuria"],
  ["Sunrise summit", "pedraforca"],
  ["Surprise me!", "surprise"],
];

function AiDemo() {
  const [pick, setPick] = useState<string | null>(null);
  const [hike, setHike] = useState<Hike | null>(null);
  const [thinking, setThinking] = useState(false);
  const choose = (label: string, key: keyof typeof HIKES | "surprise") => {
    let h: Hike;
    if (key === "surprise") {
      const all = Object.values(HIKES).filter((x) => x !== hike);
      h = all[Math.floor(Math.random() * all.length)];
    } else h = HIKES[key];
    setPick(label);
    setHike(h);
    setThinking(true);
    window.setTimeout(() => setThinking(false), 700);
  };
  return (
    <div className="mt-8">
      <p className="label text-sm">Try it: what kind of experience?</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {AI_CHIPS.map(([label, key], i) => (
          <button
            key={label}
            type="button"
            onClick={() => choose(label, key)}
            aria-pressed={pick === label}
            className={`label cursor-pointer rounded-full px-4 py-3 transition-transform hover:-rotate-3 hover:scale-110 ${pick === label ? "bg-orange text-ink ring-2 ring-ink" : i % 2 ? "bg-violet text-cloud" : "bg-ink text-lime"}`}
          >
            {label}
          </button>
        ))}
      </div>
      <div aria-live="polite" className="mt-6 max-w-lg">
        {hike && (
          <div className="rounded-3xl rounded-tl-none bg-ink p-6 text-cloud shadow-xl">
            <p className="label text-xs text-lime">HikeUp AI</p>
            {thinking ? (
              <p className="mt-3 animate-pulse text-lg font-medium">Finding your adventure…</p>
            ) : (
              <>
                <p className="display mt-3 text-3xl italic">{hike.trail}</p>
                <p className="mt-1 text-sm font-semibold text-cloud/70">{hike.place} · Organised by {hike.by}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="label rounded-full bg-lime px-3 py-1 text-xs text-ink">{hike.level}</span>
                  <span className="label rounded-full bg-violet px-3 py-1 text-xs text-cloud">{hike.km}</span>
                  <span className="label rounded-full bg-orange px-3 py-1 text-xs text-ink">{hike.time}</span>
                </div>
                <p className="mt-4 font-medium">{hike.why}</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const NAV_LINKS: [string, string][] = [
  ["The problem", "#idea"],
  ["Why HikeUp", "#benefits"],
  ["How it works", "#how"],
  ["The app", "#app"],
  ["AI assistant", "#ai"],
  ["Community", "#crew"],
  ["Join the crew", "#join"],
];

function SiteNav() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-3 md:px-10">
        <a href="#" onClick={() => setOpen(false)} className="tech flex items-center gap-2 rounded-full bg-ink py-1 pl-1 pr-3 text-base text-cloud">
          <AppIcon size={26} />HikeUp
        </a>
        <div className="flex items-center gap-2">
          <a href="#join" onClick={() => setOpen(false)} className="label hidden rounded-full bg-orange px-4 py-2.5 text-cloud transition-transform hover:scale-105 sm:inline-block">Join the crew</a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="site-menu"
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full bg-ink text-cloud transition-transform hover:scale-105"
          >
            <span className={`block h-0.5 w-5 bg-current transition-transform duration-300 ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 bg-current transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 bg-current transition-transform duration-300 ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>
      <div
        id="site-menu"
        className={`fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto bg-ink px-5 pb-10 pt-28 text-cloud transition-all duration-500 md:px-10 ${open ? "visible opacity-100" : "invisible opacity-0"}`}
      >
        <ul className="space-y-1">
          {NAV_LINKS.map(([l, h], i) => (
            <li key={l}>
              <a
                href={h}
                onClick={() => setOpen(false)}
                className={`display block text-5xl uppercase transition-colors hover:text-lime md:text-7xl ${i === NAV_LINKS.length - 1 ? "text-orange" : ""}`}
              >
                {l}
              </a>
            </li>
          ))}
        </ul>
        <p className="display mt-10 text-2xl italic text-lime">Find your people. Find your trail.</p>
      </div>
    </>
  );
}

function Index() {
  useReveal();
  return (
    <main className="overflow-x-clip">
      {/* NAV */}
      <SiteNav />

      {/* HERO */}
      <section className="relative min-h-screen overflow-hidden bg-ink pt-24 text-cloud">
        <img src={hero} alt="Friends hiking up a grassy hill above the sea" width={1920} height={1282} className="absolute inset-0 h-full w-full object-cover object-[55%_70%]" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/30 to-ink/80" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-ink/50 to-transparent" />
        <div className="relative flex min-h-[calc(100vh-6rem)] flex-col justify-between gap-10 px-5 pb-10 md:px-10">
          <h1 className="display text-[19vw] uppercase [text-shadow:0_4px_30px_rgb(0_0_0/0.35)] md:text-[13vw]">
            Hiking<br /><span className="ml-[8vw] italic">is better</span>
          </h1>
          <div className="flex flex-col gap-6 lg:max-w-md">
            <p className="text-xl font-semibold leading-snug md:text-2xl">Find your people. Discover new trails. Make every hike an adventure.</p>
            <div className="flex flex-wrap gap-3"><Btn href="#app" tone="lime">Discover the app</Btn><Btn href="#how" tone="outline">How it works</Btn></div>
          </div>
          <h1 className="tech text-right text-[13vw] text-lime [text-shadow:0_4px_30px_rgb(0_0_0/0.35)] md:text-[12vw]">TOGETHER.</h1>
        </div>
      </section>

      {/* PROBLEM */}
      <section id="idea" className="relative overflow-hidden bg-ink px-5 py-28 text-cloud md:px-10">
        <div className="grid items-center gap-10 md:grid-cols-12">
          <div className="reveal md:col-span-7">
            <h2 className="display text-7xl uppercase md:text-[9vw]">Love hiking.<br /><span className="italic">Don't have</span><br />a crew?</h2>
          </div>
          <div className="reveal relative md:col-span-5">
            <img src={solo} alt="Hikers on a mountain trail" loading="lazy" width={1024} height={1280} className="aspect-[4/5] w-full object-cover" />
            <div className="label absolute -bottom-6 left-0 max-w-xs md:-left-6 rotate-[-4deg] bg-cloud p-5 text-sm normal-case tracking-normal text-ink">
              Your friends are busy. Your group chat is silent. The mountains are waiting — and you're going alone. Again.
            </div>
          </div>
        </div>
        <div className="reveal mt-32 text-center">
          <p className="mx-auto max-w-xl text-lg text-cloud/70">Like ride-sharing, but for trails. Someone's already planning the hike you want. Just say hi and join.</p>
        </div>
      </section>

      {/* BENEFITS */}
      <section id="benefits" className="relative overflow-hidden bg-orange px-5 py-28 text-ink md:px-10">
        <div className="relative">
          <h2 className="display reveal text-7xl uppercase md:text-[9vw]">Why <span className="italic">HikeUp</span>?</h2>
          <div className="mt-16 grid gap-8 md:grid-cols-3 md:gap-6">
            {[
              { n: "01", t: "Connect", d: "Find hiking partners who share your passion, so you never miss a hike because nobody is free.", c: "bg-violet text-cloud", r: "md:-rotate-2" },
              { n: "02", t: "Discover", d: "Explore new trails and get personalised suggestions from the AI hiking assistant.", c: "bg-lime text-ink", r: "md:rotate-1 md:translate-y-8" },
              { n: "03", t: "Organise", d: "Create or join a hike in a few taps and plan everything in the group chat.", c: "bg-ink text-cloud", r: "md:-rotate-1" },
            ].map((b) => (
              <div key={b.t} className={`reveal min-w-0 p-8 transition-transform duration-500 hover:rotate-0 hover:scale-[1.03] md:p-10 ${b.c} ${b.r}`}>
                <span className="display text-6xl italic opacity-40">{b.n}</span>
                <h3 className="tech mt-4 text-4xl [overflow-wrap:anywhere] lg:text-5xl">{b.t}</h3>
                <p className="mt-4 text-lg font-medium">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW */}
      <section id="how" className="bg-cloud px-5 py-28 md:px-10">
        <div className="reveal flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="display text-7xl uppercase md:text-[10vw]">How it<br /><span className="italic">works</span></h2>
          </div>
          <span className="label max-w-xs">Three moves. Endless trails. Zero hiking alone.</span>
        </div>
        <div className="mt-16 space-y-6">
          {[
            { n: "01", t: "Discover a hike", d: "Explore hikes created by other people and find an adventure that suits you.", bg: "bg-lime", screen: <ImgScreen img={joinHomeA.url} alt="HikeUp join a hike screen" />, rot: "rotate-6" },
            { n: "02", t: "Join the crew", d: "Join existing hiking groups, meet new people and share the experience.", bg: "bg-violet text-cloud", screen: <ImgScreen img={joinDetailA.url} alt="Hike details with join button" />, rot: "-rotate-6" },
            { n: "03", t: "Create your own adventure", d: "Organise a hike, choose your route and invite others to join you.", bg: "bg-orange text-cloud", screen: <ImgScreen img={createA.url} alt="Create a hike form" />, rot: "rotate-3", noNotch: true },
          ].map((s, i) => (
            <div key={s.n} className={`reveal group relative grid items-center gap-8 overflow-hidden px-6 py-12 lg:grid-cols-12 md:px-12 ${s.bg} ${i % 2 ? "md:ml-[10%]" : "md:mr-[10%]"}`}>
              <span className={`display pointer-events-none absolute -top-16 text-[16rem] italic opacity-25 transition-transform duration-700 md:text-[22rem] ${i % 2 ? "-right-4 group-hover:-translate-x-10" : "-left-4 group-hover:translate-x-10"}`}>{s.n}</span>
              <div className={`relative z-10 min-w-0 lg:col-span-7 ${i % 2 ? "lg:order-2" : ""}`}>
                <span className="label">Step {s.n}</span>
                <h3 className="tech mt-3 text-5xl [overflow-wrap:anywhere] md:text-6xl xl:text-7xl">{s.t}</h3>
                <p className="mt-4 max-w-md text-lg font-medium">{s.d}</p>
                {i === 0 && (
                  <div className="mt-6">
                    <span className="label">For every level</span>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {[["Beginner", "bg-ink text-lime"], ["Intermediate", "bg-violet text-cloud"], ["Expert", "bg-orange text-ink"]].map(([l, c]) => <span key={l} className={`label rounded-full px-4 py-3 ${c}`}>{l}</span>)}
                    </div>
                  </div>
                )}
              </div>
              <div className="relative flex justify-center lg:col-span-5"><Phone className={s.rot} notch={!s.noNotch}>{s.screen}</Phone></div>
            </div>
          ))}
        </div>
      </section>

      {/* SHOWCASE */}
      <section id="app" className="relative overflow-hidden bg-violet py-28 text-cloud">
        <div className="relative px-5 text-center md:px-10">
          <h2 className="display reveal text-7xl uppercase md:text-[11vw]">Your trail<br />in your pocket</h2>
        </div>
        <div className="relative mt-16 flex flex-wrap items-center justify-center gap-6 px-4 lg:-space-x-10 lg:gap-0">
          <Phone className="float -rotate-12 lg:translate-y-16" ><ImgScreen img={homeA.url} alt="HikeUp home screen" /></Phone>
          <Phone className="z-10 -rotate-3 lg:scale-110"><ImgScreen img={joinDetailA.url} alt="Hike details with join button" /></Phone>
          <Phone className="rotate-12 lg:translate-y-10"><ImgScreen img={youreInA.url} alt="You're in confirmation screen" /></Phone>
          <Phone className="-rotate-6 lg:-translate-y-4" notch={false}><ImgScreen img={createA.url} alt="Create a hike form" /></Phone>
        </div>
        <div className="relative mt-16 flex flex-wrap justify-center gap-3 px-5">
          {["Home", "Explore & join", "AI assistant", "Hike details", "Create a hike"].map((l) => (
            <span key={l} className="label rounded-full border-2 border-cloud px-4 py-2 transition-colors hover:bg-lime hover:text-ink">{l}</span>
          ))}
        </div>
      </section>

      {/* AI */}
      <section id="ai" className="relative overflow-hidden bg-lime px-5 py-28 md:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="reveal lg:col-span-7">
            <h2 className="display text-6xl uppercase md:text-[7.5vw]">Not sure<br />where to go?</h2>
            <p className="tech mt-6 text-4xl text-violet md:text-6xl">Let AI find your next adventure.</p>
            <p className="mt-8 max-w-lg text-lg font-medium">Describe the hike you're craving. Our assistant recommends routes that match — and uncovers hidden alternatives beyond the most crowded trails.</p>
            <AiDemo />
          </div>
          <div className="relative flex flex-col items-center lg:col-span-5">
            <span className="tech relative z-20 -mb-12 -rotate-6 self-start bg-ink px-6 py-3 text-7xl text-lime shadow-xl md:text-8xl lg:-ml-6">AI</span>
            <Phone className="rotate-6 md:scale-110"><ImgScreen img={aiAssistantA.url} alt="AI hiking assistant" /></Phone>
          </div>
        </div>
      </section>

      {/* COMMUNITY */}
      <section id="crew" className="bg-cloud px-5 py-28 md:px-10">
        <div className="grid items-center gap-10 md:grid-cols-12 md:gap-12">
          <div className="reveal md:col-span-5">
            <h2 className="display text-6xl uppercase md:text-[7vw]">Come for<br />the hike<span className="text-orange">.</span></h2>
            <p className="mt-8 max-w-md text-xl font-medium">HikeUp isn't just about finding trails. It's about the stranger who becomes your summit buddy, the shared snacks, the stories on the way down — making the outdoors open to everyone.</p>
          </div>
          <img src={c2} alt="Two friends laughing under a rock in a hailstorm" loading="lazy" width={1920} height={1281} className="reveal aspect-[3/2] w-full object-cover md:col-span-7 md:rotate-1 transition-transform duration-700 hover:rotate-0" />
        </div>
        <div className="mt-20 grid items-center gap-10 md:mt-28 md:grid-cols-12 md:gap-12">
          <img src={c1} alt="A big group of hikers together in a pine forest" loading="lazy" width={1080} height={1351} className="reveal aspect-[4/5] w-full object-cover md:col-span-5 md:-rotate-1 transition-transform duration-700 hover:rotate-0" />
          <div className="reveal md:col-span-7">
            <h2 className="display text-6xl uppercase md:text-[7vw]"><span className="italic text-violet">Stay for</span><br />the people.</h2>
            <p className="mt-8 max-w-md text-xl font-medium">Every hike ends with new friends — and the next adventure already planned in the group chat.</p>
          </div>
        </div>
      </section>

      <Marquee text="Find your people · Find your trail" className="rotate-1 bg-violet text-cloud" />

      {/* SOCIAL PROOF — real quotes from hikers */}
      <section id="voices" className="relative overflow-hidden bg-ink px-5 py-28 text-cloud md:px-10">
        <div className="relative grid gap-16 md:grid-cols-2 md:gap-12">
          {[
            { q: "I moved to a new city and knew nobody. Two weeks on HikeUp and I already have a Sunday hiking crew.", n: "Laura, 24 · beginner hiker", r: "md:-rotate-1" },
            { q: "The AI found me a trail I'd never heard of, and I got to hike it with five new friends. Best Saturday in ages.", n: "Marc, 31 · weekend explorer", r: "md:rotate-1 md:mt-24" },
          ].map((v) => (
            <figure key={v.n} className={`reveal ${v.r}`}>
              <span aria-hidden className="display block text-[8rem] leading-none text-lime">“</span>
              <blockquote className="display -mt-10 text-4xl italic md:text-5xl">{v.q}</blockquote>
              <figcaption className="label mt-6 inline-block bg-lime px-3 py-2 text-ink">{v.n}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="relative overflow-hidden bg-violet px-5 py-32 text-cloud md:px-10">
        <div className="relative text-center">
          <h2 className="display reveal text-[14vw] uppercase md:text-[10vw]">Your next<br /><span className="italic">adventure</span><br />starts with</h2>
          <p className="tech reveal mt-6 inline-block -rotate-3 bg-ink px-6 py-2 text-[18vw] text-lime md:text-[12vw]">a hello.</p>
          <p className="mx-auto mt-10 max-w-md text-xl font-semibold">Find your hiking crew and discover where the trail takes you.</p>
          <div className="mt-10"><Btn href="#app">Discover the app</Btn></div>
        </div>
      </section>

      {/* JOIN THE CREW — lead form */}
      <section id="join" className="relative overflow-hidden bg-ink px-5 py-28 text-cloud md:px-10">
        <div className="relative grid items-center gap-12 md:grid-cols-12">
          <div className="reveal md:col-span-6">
            <h2 className="display text-6xl uppercase md:text-[6.5vw]">
              Get the trail
              <br />
              <span className="italic text-lime">in your inbox</span>
            </h2>
            <p className="mt-8 max-w-md text-lg font-medium text-cloud/70">
              New hikes, trail ideas and early access to HikeUp — before anyone else.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {["New hikes near you", "Trail tips", "Early access"].map((p, i) => (
                <span key={p} className={`label rounded-full px-4 py-3 ${i % 2 ? "bg-lime text-ink" : "border-2 border-cloud/40"}`}>
                  {p}
                </span>
              ))}
            </div>
          </div>
          <div className="reveal md:col-span-6">
            <LeadForm />
          </div>
        </div>
      </section>

      <footer className="bg-ink px-5 pb-10 text-cloud md:px-10">
        <div className="flex flex-wrap items-start justify-between gap-10 border-t border-cloud/15 pt-12">
          <div>
            <a href="#" className="tech flex items-center gap-3 text-4xl"><AppIcon size={48} />HikeUp</a>
            <p className="display mt-4 text-2xl italic text-lime">Find your people. Find your trail.</p>
          </div>
          <div className="flex flex-wrap gap-x-16 gap-y-10">
            <div>
              <p className="label text-lime">Explore</p>
              <nav aria-label="Footer" className="label mt-4 grid grid-cols-2 gap-x-10 gap-y-3 text-cloud/80">
                {NAV_LINKS.map(([l, h]) => (
                  <a key={l} href={h} className="transition-colors hover:text-lime">{l}</a>
                ))}
              </nav>
            </div>
            <div>
              <p className="label text-lime">Contact</p>
              <ul className="mt-4 space-y-3 font-medium text-cloud/80">
                <li>Email: coming soon</li>
                <li>Barcelona, Spain</li>
              </ul>
            </div>
            <div id="privacy" className="max-w-xs">
              <p className="label text-lime">Privacy</p>
              <p className="mt-4 text-sm font-medium text-cloud/80">
                We only use your email to send you HikeUp news and early access. We never share or sell it, and you can unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
        <p className="label mt-12 text-cloud/50">© 2026 HikeUp · Hiking is better together</p>
      </footer>
    </main>
  );
}
