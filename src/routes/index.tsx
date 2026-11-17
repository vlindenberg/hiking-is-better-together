import { createFileRoute } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import helpA from "@/assets/helping_hand.png.asset.json";
import sunsetA from "@/assets/summit_sunset.jpeg.asset.json";
import groupA from "@/assets/hiking_group.png.asset.json";
import hailA from "@/assets/hikers_hail.webp.asset.json";
import heroA from "@/assets/hikers_hillside.jpeg.asset.json";
import soloA from "@/assets/hikers_pointing.png.asset.json";
import homeA from "@/assets/screen_home.png.asset.json";
import joinHomeA from "@/assets/screen_join_home.png.asset.json";
import joinSearchA from "@/assets/screen_join_search.png.asset.json";
import aiAssistantA from "@/assets/screen_ai_assistant.png.asset.json";
import joinDetailA from "@/assets/screen_join_detail.png.asset.json";
import youreInA from "@/assets/screen_youre_in.png.asset.json";
import createA from "@/assets/screen_create_hike.png.asset.json";
const hero = heroA.url, solo = soloA.url;
import { Phone, ImgScreen } from "@/components/Phone";
import { LeadForm } from "@/components/LeadForm";
import { AppIcon } from "@/components/AppIcon";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HikeUp — Hiking is better together" },
      { name: "description", content: "HikeUp is the social hiking app that helps you find people to hike with and the right trail for you." },
      { property: "og:title", content: "HikeUp — Hiking is better together" },
      { property: "og:description", content: "Find your people. Find your trail. The social hiking app for finding hiking partners." },
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

const Btn = ({ href, children, tone = "lime", external }: { href: string; children: ReactNode; tone?: "lime" | "ink" | "outline" | "cloud"; external?: boolean }) => {
  const s = { lime: "bg-lime text-ink", ink: "bg-ink text-cloud", cloud: "bg-cloud text-ink", outline: "border-2 border-current" }[tone];
  return (
    <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className={`label inline-flex items-center gap-3 rounded-full px-7 py-4 text-sm transition-transform duration-300 hover:scale-105 ${s}`}>
      {children}<span aria-hidden>→</span>
    </a>
  );
};

const links: [string, string][] = [["How it works", "#how"], ["Features", "#features"], ["AI", "#ai"], ["Join", "#join"]];

function Index() {
  useReveal();
  return (
    <main className="overflow-x-clip">
      <nav className="fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-3 bg-ink/90 px-5 py-3 text-cloud backdrop-blur md:px-10">
        <a href="#" className="flex items-center gap-2"><AppIcon size={36} /><span className="display text-2xl">HikeUp</span></a>
        <div className="hidden gap-1 text-sm font-bold md:flex">
          {links.map(([l, h]) => <a key={l} href={h} className="rounded-full px-4 py-2 transition-colors hover:text-lime">{l}</a>)}
        </div>
        <a href="#join" className="label whitespace-nowrap rounded-full bg-lime px-5 py-3 text-ink transition-transform hover:scale-105">Join the crew</a>
      </nav>

      {/* HERO */}
      <section className="relative bg-violet text-cloud lg:min-h-[44rem]">
        <div className="lg:grid lg:min-h-[44rem] lg:grid-cols-2">
          <div className="relative z-10 px-5 pb-16 pt-28 md:px-10 md:pt-32 lg:pb-24">
            <AppIcon size={120} className="h-24 w-24 md:h-[120px] md:w-[120px]" />
            <h1 className="display mt-8 text-6xl md:text-8xl">Hiking is better together.</h1>
            <p className="display mt-6 text-3xl text-lime md:text-4xl">Find your people. <span className="italic">Find your trail.</span></p>
            <p className="mt-6 max-w-lg text-lg md:text-xl">HikeUp is the social hiking app that helps you find people to hike with and the right trail for you.</p>
            <div className="mt-8 flex flex-wrap gap-3"><Btn href="#join" tone="lime">Join the crew</Btn></div>
          </div>
          <div className="relative h-[22rem] overflow-hidden md:h-[30rem] lg:h-auto">
            <img src={hero} alt="Friends hiking up a grassy hill above the sea" width={1920} height={1282} className="absolute inset-0 h-full w-full object-cover object-[60%_75%]" />
            <div aria-hidden className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-violet to-transparent lg:inset-y-0 lg:left-0 lg:right-auto lg:h-full lg:w-24 lg:bg-gradient-to-r" />
          </div>
        </div>
      </section>

      <div className="bg-lime px-5 py-6 text-center text-ink">
        <p className="display text-2xl md:text-4xl">Hiking is better together · Find your people · Find your trail</p>
      </div>

      {/* PROBLEM */}
      <section id="idea" className="relative overflow-hidden bg-ink px-5 py-32 text-cloud md:px-10 md:py-44">
        <img src={solo} alt="Two hikers pointing at a dramatic mountain face" loading="lazy" width={1024} height={1280} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/30" />
        <div className="relative">
          <div className="reveal max-w-2xl">
            <span className="label text-orange">The problem</span>
            <h2 className="display mt-6 text-5xl md:text-7xl">Love hiking.<br /><span className="text-lime">Don't have a crew?</span></h2>
            <p className="mt-6 max-w-md text-lg text-cloud/80">Your friends are busy, so the mountains wait — or you go alone. Again.</p>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section id="features" className="bg-orange px-5 py-24 text-ink md:px-10">
        <span className="label text-ink">Benefits</span>
        <h2 className="display mt-4 text-5xl md:text-7xl">Why HikeUp</h2>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {[
            ["Connect", "Find hiking partners who share your passion, so you never miss a hike because nobody is free.", "bg-violet text-cloud", helpA.url, "Hikers helping each other up a rocky ridge"],
            ["Discover", "Explore new trails and get personalised suggestions from the AI hiking assistant.", "bg-lime text-ink", sunsetA.url, "Three hikers on a summit at sunset"],
            ["Organise", "Create or join a hike in a few taps and plan everything in the group chat.", "bg-ink text-cloud", groupA.url, "A large group of hikers posing on a rock in a pine forest"],
          ].map(([t, d, c, img, alt]) => (
            <div key={t} className={`reveal overflow-hidden rounded-[2rem] md:flex lg:block ${c}`}>
              <div className="overflow-hidden md:w-2/5 md:shrink-0 lg:w-full">
                <img src={img} alt={alt} loading="lazy" width={1080} height={1350} className={`aspect-[4/5] h-full w-full object-cover ${t === "Connect" ? "scale-[1.12]" : ""}`} />
              </div>
              <div className="p-8 md:flex md:flex-col md:justify-center md:p-10">
                <h3 className="display text-4xl md:text-5xl">{t}</h3>
                <p className="mt-4 text-lg">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW */}
      <section id="how" className="bg-ink px-5 py-24 text-cloud md:px-10">
        <span className="label text-lime">How it works</span>
        <h2 className="display mt-4 text-5xl md:text-7xl">Three steps to the trail</h2>
        <div className="mt-12 space-y-6">
          {[
            { n: "01", t: "Discover a hike", d: "Explore hikes created by other people and find an adventure that suits you.", bg: "bg-lime text-ink", img: joinHomeA.url, alt: "HikeUp join a hike screen" },
            { n: "02", t: "Join the crew", d: "Join existing hiking groups, meet new people and share the experience.", bg: "bg-violet text-cloud", img: joinDetailA.url, alt: "Hike details with join button" },
            { n: "03", t: "Create your own adventure", d: "Organise a hike, choose your route and invite others to join you.", bg: "bg-orange text-ink", img: createA.url, alt: "Create a hike form", noNotch: true },
          ].map((s, i) => (
            <div key={s.n} className={`reveal grid items-center gap-10 rounded-[2rem] px-6 py-12 md:px-12 lg:grid-cols-2 ${s.bg}`}>
              <div className={`min-w-0 ${i % 2 ? "lg:order-2" : ""}`}>
                <span className="label">Step {s.n}</span>
                <h3 className="display mt-3 text-4xl md:text-6xl">{s.t}</h3>
                <p className="mt-4 max-w-md text-lg">{s.d}</p>
              </div>
              <div className="flex justify-center"><Phone notch={!s.noNotch} tilt={i % 2 ? 4 : -4}><ImgScreen img={s.img} alt={s.alt} /></Phone></div>
            </div>
          ))}
        </div>
      </section>

      {/* AI */}
      <section id="ai" className="bg-lime px-5 py-24 text-ink md:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="reveal lg:col-span-7">
            <span className="label">App feature · AI hiking assistant</span>
            <h2 className="display mt-6 text-5xl md:text-7xl">Not sure where to go?</h2>
            <p className="display mt-4 text-3xl italic text-violet md:text-4xl">Let AI find your next adventure.</p>
            <p className="mt-6 max-w-lg text-lg">Describe the hike you're craving. The assistant recommends routes that match — and hidden alternatives beyond the most crowded trails.</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {["Peaceful nature", "Beautiful views", "A social adventure", "Less crowded", "Sunrise summit"].map((p, i) => (
                <span key={p} className={`label rounded-full px-4 py-3 ${i % 2 ? "bg-violet text-cloud" : "bg-ink text-lime"}`}>“{p}”</span>
              ))}
            </div>
          </div>
          <div className="flex justify-center lg:col-span-5"><Phone tilt={4}><ImgScreen img={aiAssistantA.url} alt="AI hiking assistant" /></Phone></div>
        </div>
      </section>

      {/* SHOWCASE */}
      <section id="app" className="bg-violet px-5 py-24 text-cloud md:px-10">
        <div className="text-center">
          <span className="label text-lime">The app</span>
          <h2 className="display mt-4 text-5xl md:text-7xl">Your trail in your pocket</h2>
        </div>
        <div className="mx-auto mt-14 grid max-w-6xl grid-cols-2 justify-items-center gap-4 md:gap-8 lg:grid-cols-4">
          {[[homeA.url, "HikeUp home screen"], [joinSearchA.url, "Hike search results"], [joinDetailA.url, "Hike details with join button"], [youreInA.url, "You're in confirmation screen"]].map((x) => x as [string, string]).map(([img, alt], i) => (
            <Phone key={alt} notch={false} tilt={i % 2 ? 4 : -4} className="!w-full max-w-[16rem]"><ImgScreen img={img} alt={alt} /></Phone>
          ))}
        </div>
      </section>

      {/* QUOTES */}
      <section id="proof" className="bg-cloud px-5 py-20 text-ink md:px-10 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-2 md:gap-16">
          {[["Hiking buddies can be hard to come by.", "Explorer Chick"], ["Once upon a time, I didn't hike because I didn't have friends who hiked.", "Jan McEwen, hiker"]].map(([t, n]) => (
            <figure key={n} className="reveal">
              <span aria-hidden className="display block text-8xl leading-none text-violet">“</span>
              <blockquote className="display -mt-6 text-3xl italic md:text-4xl">{t}</blockquote>
              <figcaption className="mt-6 text-sm font-bold">{n}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="bg-orange text-ink lg:grid lg:min-h-[40rem] lg:grid-cols-2">
        <div className="flex flex-col justify-center px-5 py-24 md:px-10 lg:py-32">
          <h2 className="display reveal max-w-2xl text-5xl md:text-7xl">Your next adventure starts with <span className="italic">a hello.</span></h2>
          <div className="mt-10"><Btn href="#join" tone="ink">Join the crew</Btn></div>
        </div>
        <div className="relative h-[22rem] overflow-hidden md:h-[30rem] lg:h-auto">
          <img src={hailA.url} alt="Two friends laughing under a rock overhang in a hailstorm" loading="lazy" width={1920} height={1281} className="absolute inset-0 h-full w-full object-cover object-[55%_60%]" />
          <div aria-hidden className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-orange to-transparent lg:inset-y-0 lg:left-0 lg:right-auto lg:h-full lg:w-24 lg:bg-gradient-to-r" />
        </div>
      </section>

      {/* JOIN */}
      <section id="join" className="bg-ink px-5 py-24 text-cloud md:px-10">
        <div className="grid items-center gap-12 md:grid-cols-12">
          <div className="reveal md:col-span-6">
            <span className="label text-lime">Join the crew</span>
            <h2 className="display mt-6 text-5xl md:text-6xl">Get the trail <span className="italic text-lime">in your inbox</span></h2>
            <p className="mt-6 max-w-md text-lg text-cloud/80">New hikes, trail ideas and early access to HikeUp — before anyone else.</p>
          </div>
          <div className="reveal md:col-span-6"><LeadForm /></div>
        </div>
      </section>

      <footer className="bg-ink px-5 pb-10 text-cloud md:px-10">
        <div className="flex flex-wrap items-start justify-between gap-8 border-t border-cloud/15 pt-10">
          <div>
            <a href="#" className="flex items-center gap-2"><AppIcon size={40} /><span className="display text-3xl">HikeUp</span></a>
            <p className="mt-3 text-cloud/70">Find your people. Find your trail.</p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-bold">
            <a href="#how" className="hover:text-lime">How it works</a>
            <a href="#features" className="hover:text-lime">Features</a>
            <a href="#join" className="hover:text-lime">Join</a>
          </div>
        </div>
        <p className="mt-10 text-xs text-cloud/60">© 2026 HikeUp · Applied Technology · BA Business Design</p>
      </footer>
    </main>
  );
}
