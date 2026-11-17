import { createFileRoute } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import heroA from "@/assets/hikers_hillside.jpeg.asset.json";
import c2A from "@/assets/hikers_hail.webp.asset.json";
import soloA from "@/assets/hikers_pointing.png.asset.json";
import c1A from "@/assets/hiking_group.png.asset.json";
import homeA from "@/assets/screen_home.png.asset.json";
import joinHomeA from "@/assets/screen_join_home.png.asset.json";
import joinSearchA from "@/assets/screen_join_search.png.asset.json";
import aiAssistantA from "@/assets/screen_ai_assistant.png.asset.json";
import joinDetailA from "@/assets/screen_join_detail.png.asset.json";
import youreInA from "@/assets/screen_youre_in.png.asset.json";
import createA from "@/assets/screen_create_hike.png.asset.json";
import createLocA from "@/assets/screen_create_location.png.asset.json";
const hero = heroA.url, c2 = c2A.url, solo = soloA.url, c1 = c1A.url;
import { Phone, ImgScreen } from "@/components/Phone";
import { LeadForm } from "@/components/LeadForm";
import { AppIcon } from "@/components/AppIcon";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HikeUp — Hiking is better together" },
      { name: "description", content: "Find your people. Find your trail. HikeUp is the social hiking app that helps you find people to hike with and the right trail for you." },
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
    <main className="overflow-x-clip">
      {/* NAV */}
      <nav className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-4 md:px-10">
        <a href="#" className="tech flex items-center gap-2 rounded-full bg-ink py-1.5 pl-1.5 pr-4 text-xl text-cloud">
          <AppIcon size={32} />HikeUp
        </a>
        <div className="label hidden gap-1 rounded-full bg-cloud/90 p-1 backdrop-blur md:flex">
          {[["Idea", "#idea"], ["How", "#how"], ["App", "#app"], ["AI", "#ai"], ["Crew", "#crew"], ["Join", "#join"]].map(([l, h]) => (
            <a key={l} href={h} className="rounded-full px-4 py-2 transition-colors hover:bg-violet hover:text-cloud">{l}</a>
          ))}
        </div>
        <a href="#cta" className="label rounded-full bg-orange px-5 py-3 text-cloud transition-transform hover:scale-105">Get the app</a>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden bg-violet px-5 pb-20 pt-28 text-cloud md:px-10 lg:min-h-screen lg:pt-32">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="relative z-10 lg:col-span-7">
            <span className="label inline-flex items-center gap-3 rounded-full bg-ink py-1.5 pl-1.5 pr-4 text-lime"><AppIcon size={28} />Hiking is better together</span>
            <h1 className="display mt-8 text-[13vw] uppercase leading-[0.9] md:text-[9vw] lg:text-[5.6vw]">
              Find your <span className="italic">people.</span>
              <br />
              <span className="text-lime">Find your <span className="italic">trail.</span></span>
            </h1>
            <p className="mt-8 max-w-xl text-xl font-medium leading-snug md:text-2xl">HikeUp is the social hiking app that helps you find people to hike with and the right trail for you.</p>
            <div className="mt-10 flex flex-wrap gap-3"><Btn href="#join" tone="lime">Join the crew</Btn><Btn href="#how" tone="outline">How it works</Btn></div>
          </div>
          <div className="relative lg:col-span-5">
            <img src={hero} alt="Friends hiking up a grassy hill above the sea" width={1920} height={1282} className="aspect-[4/5] w-full rounded-t-full object-cover object-[58%_center] shadow-2xl md:mx-auto md:max-w-md lg:max-w-none lg:rotate-2 transition-transform duration-700 hover:rotate-0" />          </div>
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
            <div className="label absolute -bottom-6 left-0 max-w-xs md:-left-6 rotate-[-4deg] bg-cloud p-5 text-sm normal-case tracking-normal text-ink">
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

      {/* BENEFITS */}
      <section id="benefits" className="relative overflow-hidden bg-orange px-5 py-28 text-ink md:px-10">
        <div className="relative">
          <span className="label">02 — Benefits</span>
          <h2 className="display reveal mt-4 text-7xl uppercase md:text-[9vw]">Why <span className="italic">HikeUp</span><span className="text-cloud">?</span></h2>
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
          <h2 className="display text-7xl uppercase md:text-[10vw]">How it<br /><span className="italic">works</span></h2>
          <span className="label max-w-xs">Three moves. Endless trails. Zero hiking alone.</span>
        </div>
        <div className="mt-16 space-y-6">
          {[
            { n: "01", t: "Discover a hike", d: "Explore hikes created by other people and find an adventure that suits you.", bg: "bg-lime", screen: <ImgScreen img={joinHomeA.url} alt="HikeUp join a hike screen" />, rot: "rotate-6" },
            { n: "02", t: "Join the crew", d: "Join existing hiking groups, meet new people and share the experience.", bg: "bg-violet text-cloud", screen: <ImgScreen img={joinDetailA.url} alt="Hike details with join button" />, rot: "-rotate-6" },
            { n: "03", t: "Create your own adventure", d: "Organise a hike, choose your route and invite others to join you.", bg: "bg-orange text-cloud", screen: <ImgScreen img={createA.url} alt="Create a hike form" />, rot: "rotate-3", noNotch: true },
          ].map((s, i) => (
            <div key={s.n} className={`reveal group relative grid items-center gap-8 overflow-hidden px-6 py-12 lg:grid-cols-12 md:px-12 ${s.bg} ${i % 2 ? "md:ml-[10%]" : "md:mr-[10%]"}`}>
              <span className="display absolute -right-4 -top-16 text-[16rem] italic opacity-20 transition-transform duration-700 group-hover:-translate-x-10 md:text-[22rem]">{s.n}</span>
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
          <span className="label text-lime">04 — The app</span>
          <h2 className="display reveal mt-4 text-7xl uppercase md:text-[11vw]">Your trail<br /><span className="italic">in your pocket</span></h2>
        </div>
        <div className="relative mt-16 flex flex-wrap items-center justify-center gap-6 px-4 lg:-space-x-10 lg:gap-0">
          <Phone className="float -rotate-12 lg:translate-y-16" ><ImgScreen img={homeA.url} alt="HikeUp home screen" /></Phone>
          <Phone className="rotate-6 lg:-translate-y-6"><ImgScreen img={joinSearchA.url} alt="Hike search results" /></Phone>
          <Phone className="z-10 -rotate-3 lg:scale-110"><ImgScreen img={joinDetailA.url} alt="Hike details with join button" /></Phone>
          <Phone className="rotate-12 lg:translate-y-10"><ImgScreen img={youreInA.url} alt="You're in confirmation screen" /></Phone>
        </div>
        <div className="relative mt-10 flex flex-wrap items-center justify-center gap-6 px-4 md:gap-16">
          <Phone className="-rotate-6" notch={false}><ImgScreen img={createA.url} alt="Create a hike form" /></Phone>
          <Phone className="rotate-6" notch={false}><ImgScreen img={createLocA.url} alt="Choose the hike location on a map" /></Phone>
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

      <Marquee text="Say hello · Find your crew" className="rotate-1 bg-violet text-cloud" />

      {/* SOCIAL PROOF — real quotes from hikers */}
      <section id="voices" className="relative overflow-hidden bg-ink px-5 py-28 text-cloud md:px-10">
        <div className="relative grid gap-16 md:grid-cols-2 md:gap-12">
          {[
            { q: "Hiking buddies can be hard to come by.", n: "Explorer Chick", r: "md:-rotate-1" },
            { q: "Once upon a time, I didn't hike because I didn't have friends who hiked.", n: "Jan McEwen, hiker", r: "md:rotate-1 md:mt-24" },
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
      <section id="cta" className="relative overflow-hidden bg-orange px-5 py-32 text-cloud md:px-10">
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
            <span className="label text-lime">06 — Join the crew</span>
            <h2 className="display mt-6 text-6xl uppercase md:text-[6.5vw]">
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
          <nav aria-label="Footer" className="label grid grid-cols-2 gap-x-10 gap-y-3 text-cloud/80">
            {[["The idea", "#idea"], ["Benefits", "#benefits"], ["How it works", "#how"], ["The app", "#app"], ["Trail AI", "#ai"], ["Join the crew", "#join"]].map(([l, h]) => (
              <a key={l} href={h} className="transition-colors hover:text-lime">{l}</a>
            ))}
          </nav>
        </div>
        <p className="label mt-12 text-cloud/50">© 2026 HikeUp · Hiking is better together · Applied Technology · BA Business Design</p>
      </footer>
    </main>
  );
}
