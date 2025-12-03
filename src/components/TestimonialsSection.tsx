import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Maria S.",
    location: "São Paulo, SP",
    text: "Depois de anos tentando todas as dietas, finalmente encontrei algo que funciona. Perdi 6kg em 3 semanas sem passar fome. Meu marido até perguntou o que eu estava fazendo de diferente!",
    highlight: "Perdi 6kg em 3 semanas"
  },
  {
    name: "Carla M.",
    location: "Rio de Janeiro, RJ",
    text: "O inchaço que eu sentia todo dia simplesmente sumiu. Acordo mais leve, com mais energia, e minhas roupas voltaram a servir. Não acreditava até experimentar.",
    highlight: "Inchaço sumiu completamente"
  },
  {
    name: "Ana Paula R.",
    location: "Belo Horizonte, MG",
    text: "Com 47 anos achei que meu metabolismo tinha parado de vez. Esse ritual mudou tudo. Em 21 dias eliminei 5kg e finalmente consegui sair do efeito sanfona.",
    highlight: "5kg em 21 dias aos 47 anos"
  },
  {
    name: "Juliana F.",
    location: "Curitiba, PR",
    text: "O melhor de tudo é que é simples. Faço o ritual toda manhã em 2 minutos. A fome emocional que eu sentia à noite praticamente desapareceu. Recomendo demais!",
    highlight: "Fome emocional controlada"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="container max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Histórias Reais de Transformação
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Mulheres como você que descobriram o poder do Ritual Secreto
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-6 sm:p-8 border border-border/50 relative"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/10" />
              
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                ))}
              </div>

              {/* Highlight */}
              <div className="inline-block bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full mb-4">
                {testimonial.highlight}
              </div>

              {/* Text */}
              <p className="text-foreground/80 leading-relaxed mb-6 italic">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-primary font-semibold text-sm">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
