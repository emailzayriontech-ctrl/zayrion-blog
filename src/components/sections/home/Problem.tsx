import { CheckCircle2 } from "lucide-react";

const points = [
  "Mengarahkan pengunjung jadi calon pembeli",
  "Cepat diakses (tidak bikin orang kabur)",
  "Jelas apa yang harus dilakukan user",
];

export const Problem = () => (
  <section className="section bg-card/20">
    <div className="container-tight max-w-5xl mx-auto">
      <div className="reveal grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        <div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            Kebanyakan website gagal bukan karena jelek—<br className="hidden md:block"/><span className="text-primary">tapi karena tidak dirancang untuk jualan.</span>
          </h2>
        </div>

        <div className="w-full p-6 sm:p-8 rounded-2xl bg-card border shadow-sm">
          <p className="text-lg font-medium text-foreground mb-6">
            Kami membangun website yang:
          </p>
          <ul className="flex flex-col gap-4">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary shrink-0" />
                <span className="text-foreground/90">{p}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 pt-6 border-t">
            <p className="text-lg font-semibold text-primary">
              Hasilnya? Lebih banyak klik, chat, dan closing.
            </p>
          </div>
        </div>

      </div>
    </div>
  </section>
);