import coffee from "@/assets/usecase-coffee.jpg";
import gym from "@/assets/usecase-gym.jpg";
import villa from "@/assets/usecase-villa.jpg";
import internal from "@/assets/usecase-internal.jpg";

const cases = [
  { src: coffee, label: "Coffee Shop" },
  { src: gym, label: "Gym" },
  { src: villa, label: "Villa" },
  { src: internal, label: "Internal" },
];

export const UseCase = () => (
  <section className="section">
    <div className="container-tight">
      <div className="max-w-2xl reveal">
        <p className="eyebrow">Use Case</p>
        <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold leading-tight">
          Cocok untuk berbagai bisnis
        </h2>
      </div>
      <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cases.map((c) => (
          <figure key={c.label} className="group relative aspect-[4/5] overflow-hidden rounded-2xl">
            <img
              src={typeof c.src === 'string' ? c.src : (c.src as any).src}
              alt={c.label}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
            <figcaption className="absolute bottom-5 left-5 font-display font-semibold">
              {c.label}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
);