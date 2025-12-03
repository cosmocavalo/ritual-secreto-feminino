const Footer = () => {
  return (
    <footer className="py-10 px-4 bg-foreground text-background/70">
      <div className="container max-w-4xl mx-auto text-center">
        <p className="font-display text-xl text-background mb-4">
          Guia do Ritual Secreto do Tônico Feminino
        </p>
        <p className="text-sm mb-6 max-w-lg mx-auto">
          Este produto não substitui orientação médica. Os resultados podem variar de pessoa para pessoa. 
          Consulte um profissional de saúde antes de iniciar qualquer programa alimentar.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
          <a href="#" className="hover:text-background transition-colors">
            Termos de Uso
          </a>
          <span className="text-background/30">•</span>
          <a href="#" className="hover:text-background transition-colors">
            Política de Privacidade
          </a>
          <span className="text-background/30">•</span>
          <a href="mailto:contato@exemplo.com" className="hover:text-background transition-colors">
            Contato
          </a>
        </div>
        <p className="mt-8 text-xs text-background/50">
          © {new Date().getFullYear()} Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
