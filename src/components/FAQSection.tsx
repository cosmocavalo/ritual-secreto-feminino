import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Para quem é o Guia do Ritual Secreto?",
    answer: "O guia foi desenvolvido especialmente para mulheres de 25 a 55 anos que já tentaram diversas dietas sem sucesso, sofrem com metabolismo lento, retenção de líquido, inchaço ou fome emocional. Se você busca uma solução natural, simples e sem precisar de academia, este método é para você."
  },
  {
    question: "Em quanto tempo vou ver resultados?",
    answer: "A maioria das mulheres começa a perceber diferença já na primeira semana, com menos inchaço e mais disposição. Resultados mais expressivos de emagrecimento costumam aparecer entre 14 e 21 dias seguindo o ritual corretamente todos os dias."
  },
  {
    question: "Preciso comprar ingredientes caros?",
    answer: "Não! Os ingredientes do tônico são simples e você encontra facilmente em qualquer mercado ou feira. O ritual foi pensado para ser acessível e prático no seu dia a dia."
  },
  {
    question: "O método é seguro? Tem contraindicação?",
    answer: "Sim, o método é 100% natural e seguro. Porém, se você está grávida, amamentando ou possui alguma condição de saúde específica, recomendamos consultar seu médico antes de iniciar qualquer novo hábito alimentar."
  },
  {
    question: "E se não funcionar para mim? Tem garantia?",
    answer: "Sim! Oferecemos garantia incondicional de 7 dias. Se por qualquer motivo você não ficar satisfeita com o guia, basta enviar um e-mail solicitando o reembolso e devolvemos 100% do seu dinheiro, sem perguntas."
  }
];

const FAQSection = () => {
  return (
    <section className="py-20 px-4 bg-secondary/30">
      <div className="container max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-muted-foreground text-lg">
            Tire suas dúvidas sobre o Ritual Secreto
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-card rounded-xl border border-border/50 px-6 data-[state=open]:shadow-elegant transition-shadow"
            >
              <AccordionTrigger className="text-left font-display text-lg font-medium text-foreground hover:text-primary py-5 [&[data-state=open]]:text-primary">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
