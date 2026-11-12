import { createFileRoute } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import heroA from "@/assets/hikers_hillside.jpeg.asset.json";
import c2A from "@/assets/hikers_hail.webp.asset.json";
import soloA from "@/assets/hikers_pointing.png.asset.json";
import c1A from "@/assets/hiking_group.png.asset.json";
import homeA from "@/assets/summit_sunset.jpeg.asset.json";
import joinHomeA from "@/assets/screen_join_home.png.asset.json";
import joinSearchA from "@/assets/screen_join_search.png.asset.json";
import aiAssistantA from "@/assets/screen_ai_assistant.png.asset.json";
import joinDetailA from "@/assets/screen_join_detail.png.asset.json";
import youreInA from "@/assets/screen_youre_in.png.asset.json";
const hero = heroA.url, c2 = c2A.url, solo = soloA.url, c1 = c1A.url;
import { Phone, HomeScreen, CreateScreen, ImgScreen } from "@/components/Phone";

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

function Index() {
  useReveal();
  return (
    <main>
      {/* NAV */}
      <nav className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-4 md:px-10">
        <a href="#" className="tech flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-xl text-cloud">
          <span className="h-3 w-3 rounded-full bg-lime" />HikeUp
        </a>
        <div className="label hidden gap-1 rounded-full bg-cloud/90 p-1 backdrop-blur md:flex">
          {[["Idea", "#idea"], ["How", "#how"], ["App", "#app"], ["AI", "#ai"], ["Crew", "#crew"]].map(([l, h]) => (
            <a key={l} href={h} className="rounded-full px-4 py-2 transition-colors hover:bg-violet hover:text-cloud">{l}</a>
          ))}
        </div>
        <a href="#cta" className="label rounded-full bg-orange px-5 py-3 text-cloud transition-transform hover:scale-105">Get the app</a>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen overflow-hidden bg-cloud pt-24">
        <div className="absolute -right-24 top-20 h-[30rem] w-[30rem] rounded-full bg-orange md:h-[44rem] md:w-[44rem]" />
        <div className="absolute -left-20 bottom-10 h-56 w-56 rotate-12 bg-violet" style={{ clipPath: "polygon(50% 0,100% 100%,0 100%)" }} />
        <div className="relative px-5 md:px-10">
          <h1 className="display relative z-20 text-[19vw] uppercase md:text-[13vw]">
            Hiking<br /><span className="ml-[8vw] italic">is better</span>
          </h1>
          <div className="relative -mt-[4vw] grid gap-8 md:grid-cols-12">
            <div className="relative z-10 md:col-span-7 md:col-start-5">
              <img src={hero} alt="Friends hiking up a grassy hill above the sea" width={1600} height={1104} className="aspect-[16/11] w-full rounded-t-full object-cover shadow-2xl" />
              <span className="spin-slow tech absolute -left-10 -top-10 grid h-32 w-32 place-items-center rounded-full bg-lime text-center text-sm md:h-40 md:w-40">✳ meet ✳<br />your crew</span>
            </div>
            <div className="z-20 flex flex-col justify-end gap-6 md:col-span-4 md:row-start-1 md:pb-10">
              <p className="text-xl font-semibold leading-snug md:text-2xl">Find your people. Discover new trails. Make every hike an adventure.</p>
              <div className="flex flex-wrap gap-3"><Btn href="#app" tone="ink">Discover the app</Btn><Btn href="#how" tone="outline">How it works</Btn></div>
            </div>
          </div>
          <h1 className="tech relative z-20 -mt-[6vw] text-right text-[17vw] text-violet md:text-[12vw]">TOGETHER.</h1>
        </div>
      </section>

      <Marquee text="Hiking is better together" className="-rotate-2 bg-lime text-ink" />

      {/* PROBLEM */}
      <section id="idea" className="relative overflow-hidden bg-ink px-5 py-28 text-cloud md:px-10">
        <div className="grid items-center gap-10 md:grid-cols-12">
          <div className="reveal md:col-span-7">
            <span className="label text-orange">01 — The problem</span>
            <h2 className="display mt-6 text-7xl uppercase md:text-[9vw]">Love hiking<span className="text-orange">.</span><br /><span className="italic text-lime">Don't have</span><br />a crew?</h2>
          </div>
          <div className="reveal relative md:col-span-5">
            <img src={solo} alt="Hikers on a mountain trail" loading="lazy" width={1024} height={1280} className="aspect-[4/5] w-full object-cover grayscale transition duration-700 hover:grayscale-0" />
            <div className="label absolute -bottom-6 -left-6 max-w-xs rotate-[-4deg] bg-cloud p-5 text-sm normal-case tracking-normal text-ink">
              Your friends are busy. Your group chat is silent. The mountains are waiting — and you're going alone. Again.
            </div>
          </div>
        </div>
        <div className="reveal mt-32 text-center">
          <span className="label text-lime">The idea</span>
          <p className="display mt-4 text-5xl md:text-8xl">Meet the app that <span className="italic text-orange">brings hikers</span> <span className="tech inline-block rotate-2 bg-violet px-4 text-cloud">TOGETHER</span></p>
          <p className="mx-auto mt-8 max-w-xl text-lg text-cloud/70">Like ride-sharing, but for trails. Someone's already planning the hike you want. Just say hi and join.</p>
        </div>
      </section>

      {/* HOW */}
      <section id="how" className="bg-cloud px-5 py-28 md:px-10">
        <div className="reveal flex flex-wrap items-end justify-between gap-6">
          <h2 className="display text-7xl uppercase md:text-[10vw]">How it<br /><span className="italic">works</span></h2>
          <span className="label max-w-xs">Three moves. Endless trails. Zero hiking alone.</span>
        </div>
        <div className="mt-16 space-y-6">
          {[
            { n: "01", t: "Discover a hike", d: "Explore hikes created by other people and find an adventure that suits you.", bg: "bg-lime", screen: <ImgScreen img={joinHomeA.url} alt="HikeUp join a hike screen" />, rot: "rotate-6" },
            { n: "02", t: "Join the crew", d: "Join existing hiking groups, meet new people and share the experience.", bg: "bg-violet text-cloud", screen: <ImgScreen img={joinDetailA.url} alt="Hike details with join button" />, rot: "-rotate-6" },
            { n: "03", t: "Create your own adventure", d: "Organise a hike, choose your route and invite others to join you.", bg: "bg-orange text-cloud", screen: <CreateScreen />, rot: "rotate-3" },
          ].map((s, i) => (
            <div key={s.n} className={`reveal group relative grid items-center gap-8 overflow-hidden px-6 py-12 md:grid-cols-12 md:px-12 ${s.bg} ${i % 2 ? "md:ml-[10%]" : "md:mr-[10%]"}`}>
              <span className="display absolute -right-4 -top-16 text-[16rem] italic opacity-20 transition-transform duration-700 group-hover:-translate-x-10 md:text-[22rem]">{s.n}</span>
              <div className={`relative md:col-span-7 ${i % 2 ? "md:order-2" : ""}`}>
                <span className="label">Step {s.n}</span>
                <h3 className="tech mt-3 text-5xl md:text-7xl">{s.t}</h3>
                <p className="mt-4 max-w-md text-lg font-medium">{s.d}</p>
              </div>
              <div className="relative flex justify-center md:col-span-5"><Phone className={s.rot}>{s.screen}</Phone></div>
            </div>
          ))}
        </div>
      </section>

      {/* SHOWCASE */}
      <section id="app" className="relative overflow-hidden bg-violet py-28 text-cloud">
        <div className="absolute left-1/2 top-1/2 h-[50rem] w-[50rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange/90" />
        <div className="absolute left-[10%] top-[20%] h-40 w-40 rounded-full bg-lime" />
        <div className="relative px-5 text-center md:px-10">
          <span className="label text-lime">04 — The app</span>
          <h2 className="display reveal mt-4 text-7xl uppercase md:text-[11vw]">Your trail<br /><span className="italic">in your pocket</span></h2>
        </div>
        <div className="relative mt-16 flex flex-wrap items-center justify-center gap-6 px-4 md:-space-x-10 md:gap-0">
          <Phone className="float -rotate-12 md:translate-y-16" ><HomeScreen img={homeA.url} /></Phone>
          <Phone className="rotate-6 md:-translate-y-6"><ImgScreen img={joinSearchA.url} alt="Hike search results" /></Phone>
          <Phone className="z-10 -rotate-3 md:scale-110"><ImgScreen img={joinDetailA.url} alt="Hike details with join button" /></Phone>
          <Phone className="rotate-12 md:translate-y-10"><ImgScreen img={youreInA.url} alt="You're in confirmation screen" /></Phone>
        </div>
        <div className="relative mt-10 flex flex-wrap justify-center gap-6 px-4 md:-space-x-10 md:gap-0">
          <Phone className="-rotate-6"><CreateScreen /></Phone>
        </div>
        <div className="relative mt-16 flex flex-wrap justify-center gap-3 px-5">
          {["Home", "Explore & join", "AI assistant", "Hike details", "Create a hike"].map((l) => (
            <span key={l} className="label rounded-full border-2 border-cloud px-4 py-2 transition-colors hover:bg-lime hover:text-ink">{l}</span>
          ))}
        </div>
      </section>

      {/* AI */}
      <section id="ai" className="relative overflow-hidden bg-lime px-5 py-28 md:px-10">
        <div className="grid items-center gap-12 md:grid-cols-12">
          <div className="reveal md:col-span-7">
            <span className="label">05 — Trail AI</span>
            <h2 className="display mt-6 text-6xl uppercase md:text-[7.5vw]">Not sure<br />where to go<span className="text-violet">?</span></h2>
            <p className="tech mt-6 text-4xl text-violet md:text-6xl">Let AI find your next adventure.</p>
            <p className="mt-8 max-w-lg text-lg font-medium">Describe the hike you're craving. Our assistant recommends routes that match — and uncovers hidden alternatives beyond the most crowded trails.</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {["Peaceful nature", "Beautiful views", "A social adventure", "Less crowded", "Sunrise summit"].map((p, i) => (
                <span key={p} className={`label cursor-default rounded-full px-4 py-3 transition-transform hover:-rotate-3 hover:scale-110 ${i % 2 ? "bg-violet text-cloud" : "bg-ink text-lime"}`}>“{p}”</span>
              ))}
            </div>
          </div>
          <div className="relative flex justify-center md:col-span-5">
            <div className="absolute h-80 w-80 rounded-full bg-violet" />
            <span className="display absolute -top-10 right-0 text-[10rem] italic text-violet">AI</span>
            <Phone className="rotate-6 md:scale-110"><ImgScreen img={aiAssistantA.url} alt="AI hiking assistant" /></Phone>
          </div>
        </div>
      </section>

      {/* COMMUNITY */}
      <section id="crew" className="bg-cloud px-5 py-28 md:px-10">
        <h2 className="display reveal text-6xl uppercase md:text-[9vw]">Come for<br />the hike<span className="text-orange">.</span></h2>
        <div className="mt-12 grid gap-6 md:grid-cols-12">
          <img src={c2} alt="Two friends laughing in a hailstorm" loading="lazy" width={1280} height={960} className="reveal aspect-[4/3] w-full object-cover transition duration-700 hover:scale-[1.02] md:col-span-7" />
          <div className="reveal flex flex-col justify-between gap-6 md:col-span-5">
            <p className="text-xl font-medium">HikeUp isn't just about finding trails. It's about the stranger who becomes your summit buddy, the shared snacks, the stories on the way down — making the outdoors open to everyone.</p>
            <div className="grid grid-cols-3 gap-2 text-center">
              {[["Beginners", "bg-lime"], ["Intermediate", "bg-violet text-cloud"], ["Expert", "bg-orange text-cloud"]].map(([l, c]) => <div key={l} className={`label p-4 ${c}`}>{l}</div>)}
            </div>
          </div>
          <div className="relative md:col-span-5 md:col-start-2">
            <img src={c1} alt="A big hiking group in the forest" loading="lazy" width={1024} height={1280} className="reveal aspect-[4/5] w-full rounded-t-full object-cover" />
          </div>
          <div className="flex items-end md:col-span-6">
            <h2 className="display reveal text-6xl uppercase md:text-[8vw]"><span className="italic text-violet">Stay for</span><br />the people.</h2>
          </div>
        </div>
      </section>

      <Marquee text="Say hello · Find your crew" className="rotate-1 bg-violet text-cloud" />

      {/* CTA */}
      <section id="cta" className="relative overflow-hidden bg-orange px-5 py-32 text-cloud md:px-10">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-lime" />
        <div className="absolute -bottom-20 left-10 h-64 w-64 rotate-45 bg-violet" />
        <div className="relative text-center">
          <h2 className="display reveal text-[14vw] uppercase md:text-[10vw]">Your next<br /><span className="italic">adventure</span><br />starts with</h2>
          <p className="tech reveal -mt-4 inline-block -rotate-3 bg-ink px-6 py-2 text-[18vw] text-lime md:text-[12vw]">a hello.</p>
          <p className="mx-auto mt-10 max-w-md text-xl font-semibold">Find your hiking crew and discover where the trail takes you.</p>
          <div className="mt-10"><Btn href="#app">Discover the app</Btn></div>
        </div>
      </section>

      <footer className="flex flex-wrap items-center justify-between gap-4 bg-ink px-5 py-8 text-cloud md:px-10">
        <span className="tech text-3xl">HikeUp</span>
        <span className="label text-cloud/60">Hiking is better together · © 2026</span>
      </footer>
    </main>
  );
}
