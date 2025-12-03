import { Flame, Droplets, Moon, Heart, Zap, Leaf, Clock } from "lucide-react";

const benefits = [
  {
    icon: Flame,
    title: "Acelera o Metabolismo",
    description: "Ativa o modo queima natural do corpo feminino logo nas primeiras horas do dia."
  },
  {
    icon: Droplets,
    title: "Elimina Retenção de Líquido",
    description: "Reduz o inchaço e a sensação de peso que te incomoda todos os dias."
  },
  {
    icon: Moon,
    title: "Melhora o Sono",
    description: "Ingredientes que relaxam o corpo e promovem um descanso reparador."
  },
  {
    icon: Heart,
    title: "Controla a Fome Emocional",
    description: "Ajuda a regular os hormônios que controlam a compulsão alimentar."
  },
  {
    icon: Zap,
    title: "Aumenta a Disposição",
    description: "Energia constante durante o dia, sem picos de cansaço."
  },
  {
    icon: Leaf,
    title: "100% Natural",
    description: "Ingredientes puros e seguros, sem químicas ou substâncias artificiais."
  },
  {
    icon: Clock,
    title: "Resultados em 21 Dias",
    description: "Método testado que entrega transformações visíveis em poucas semanas."
  }
];

const BenefitsSection = () => {
  return (
    <section className="py-20 px-4 bg-secondary/30">
      <div className="container max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Por que o Ritual Funciona?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            7 benefícios comprovados que transformam o corpo feminino de dentro para fora
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="card-benefit group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <benefit.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
