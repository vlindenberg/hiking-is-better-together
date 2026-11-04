import type { ReactNode } from "react";

export function Phone({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative aspect-[9/19] w-56 shrink-0 rounded-[2.4rem] bg-ink p-2 shadow-2xl transition-transform duration-500 hover:-translate-y-4 hover:rotate-0 md:w-64 ${className}`}>
      <div className="absolute left-1/2 top-3 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-ink" />
      <div className="h-full w-full overflow-hidden rounded-[2rem] bg-cloud text-ink">{children}</div>
    </div>
  );
}

const Bar = ({ title }: { title: string }) => (
  <div className="flex items-center justify-between px-4 pb-2 pt-10">
    <span className="tech text-lg">{title}</span>
    <span className="h-7 w-7 rounded-full bg-violet" />
  </div>
);

export function HomeScreen({ img }: { img: string }) {
  return (
    <div className="h-full">
      <Bar title="Hey, Lia" />
      <p className="display px-4 text-3xl italic">Where to this weekend?</p>
      <div className="relative mx-4 mt-3 h-36 overflow-hidden rounded-2xl">
        <img src={img} alt="" className="h-full w-full object-cover" />
        <span className="label absolute left-2 top-2 rounded-full bg-lime px-2 py-1 text-[9px]">Sat · 8 going</span>
        <span className="tech absolute bottom-2 left-2 text-lg text-cloud">Pico Ridge Loop</span>
      </div>
      <div className="label mt-4 px-4 text-[9px] text-muted-foreground">Near you</div>
      {["Sunrise Peak", "Lake Trail", "Pine Valley"].map((t, i) => (
        <div key={t} className="mx-4 mt-2 flex items-center gap-2 rounded-xl bg-ink/5 p-2">
          <span className={`h-8 w-8 rounded-lg ${["bg-orange", "bg-violet", "bg-lime"][i]}`} />
          <div className="flex-1"><div className="text-xs font-bold">{t}</div><div className="text-[9px] text-muted-foreground">{4 + i * 3} km · {3 + i} hikers</div></div>
        </div>
      ))}
    </div>
  );
}

export function ExploreScreen() {
  return (
    <div className="h-full bg-violet text-cloud">
      <Bar title="Explore" />
      <div className="mx-4 flex gap-1">{["All", "Easy", "Social", "Summit"].map((c, i) => <span key={c} className={`label rounded-full px-2 py-1 text-[8px] ${i === 2 ? "bg-lime text-ink" : "border border-cloud/40"}`}>{c}</span>)}</div>
      {[["Cascade Run", "12 km", "bg-orange"], ["Moonlit Hills", "6 km", "bg-lime"], ["Granite Steps", "9 km", "bg-cloud"]].map(([t, k, c]) => (
        <div key={t} className="mx-4 mt-3 rounded-2xl bg-cloud p-3 text-ink">
          <div className={`h-14 rounded-xl ${c} opacity-90`} />
          <div className="mt-2 flex items-center justify-between"><span className="tech text-sm">{t}</span><span className="label rounded-full bg-ink px-2 py-1 text-[8px] text-cloud">Join</span></div>
          <div className="text-[9px] text-muted-foreground">{k} · 5 spots left</div>
        </div>
      ))}
    </div>
  );
}

export function AIScreen() {
  return (
    <div className="flex h-full flex-col bg-ink text-cloud">
      <Bar title="Trail AI" />
      <div className="ml-auto mr-4 max-w-[75%] rounded-2xl rounded-br-sm bg-lime p-2 text-[10px] font-semibold text-ink">Something quiet, great views, not too crowded 🌄</div>
      <div className="mx-4 mt-3 max-w-[85%] rounded-2xl rounded-bl-sm bg-cloud/10 p-2 text-[10px]">Found 3 hidden gems for you. Top pick:</div>
      <div className="mx-4 mt-2 rounded-2xl bg-violet p-3">
        <div className="tech text-base">Valle Escondido</div>
        <div className="text-[9px] opacity-80">7.4 km · low crowds · panoramic</div>
        <div className="mt-2 h-1.5 rounded-full bg-cloud/20"><div className="h-full w-4/5 rounded-full bg-lime" /></div>
        <div className="label mt-1 text-[8px]">94% match</div>
      </div>
      <div className="mt-auto m-4 rounded-full border border-cloud/30 px-3 py-2 text-[10px] opacity-60">Describe your perfect hike…</div>
    </div>
  );
}

export function CreateScreen() {
  return (
    <div className="h-full bg-orange">
      <Bar title="New hike" />
      <p className="display px-4 text-3xl italic text-cloud">Start a crew.</p>
      {[["Route", "Montserrat Ridge"], ["Date", "Sun, 9 Nov · 08:00"], ["Level", "Moderate"], ["Spots", "6 hikers"]].map(([l, v]) => (
        <div key={l} className="mx-4 mt-2 rounded-xl bg-cloud p-2"><div className="label text-[8px] text-muted-foreground">{l}</div><div className="text-xs font-bold">{v}</div></div>
      ))}
      <div className="label mx-4 mt-4 rounded-full bg-ink py-3 text-center text-[10px] text-lime">Publish hike</div>
    </div>
  );
}

export function DetailScreen({ img }: { img: string }) {
  return (
    <div className="h-full">
      <div className="relative h-44"><img src={img} alt="" className="h-full w-full object-cover" /><span className="tech absolute bottom-3 left-4 text-2xl text-cloud">Sunrise Peak</span></div>
      <div className="grid grid-cols-3 gap-1 p-4 text-center">{[["9km", "Distance"], ["640m", "Climb"], ["4h", "Time"]].map(([a, b]) => <div key={b} className="rounded-lg bg-lime p-1"><div className="tech text-sm">{a}</div><div className="text-[8px]">{b}</div></div>)}</div>
      <div className="label px-4 text-[9px] text-muted-foreground">Crew · 6/8</div>
      <div className="flex px-4 pt-2">{["bg-orange", "bg-violet", "bg-lime", "bg-ink", "bg-orange"].map((c, i) => <span key={i} className={`-ml-1 h-8 w-8 rounded-full border-2 border-cloud first:ml-0 ${c}`} />)}</div>
      <div className="label mx-4 mt-5 rounded-full bg-orange py-3 text-center text-[10px] text-cloud">Join the crew</div>
    </div>
  );
}

export function ChatScreen() {
  const msgs: [string, boolean][] = [["Who's bringing snacks? 🍫", false], ["Me! And coffee ☕", true], ["Meet at the trailhead 7:45", false], ["See you there crew 🙌", true]];
  return (
    <div className="h-full bg-lime">
      <Bar title="Peak Crew" />
      <div className="space-y-2 px-4">{msgs.map(([m, me], i) => <div key={i} className={`max-w-[80%] rounded-2xl p-2 text-[10px] font-semibold ${me ? "ml-auto bg-ink text-cloud" : "bg-cloud"}`}>{m}</div>)}</div>
    </div>
  );
}
