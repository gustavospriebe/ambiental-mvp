const Certification = () => {
  return (
    <div className="flex w-full flex-col bg-red-50 md:ml-52 md:h-screen">
      <p>Intro que tem em todas as paginas</p>
      <p>Indicadores da certificação</p>
      <p>
        Detalhes da certificação = Descrição / Quando foi criado / Vencimento /
        afins
      </p>
      <p>Tabela com tasks e ordenação e criação de tasks</p>
    </div>
  );
};

// Qtd task em atraso
// Tasks feitas / Tasks em aberto
// Prazo da Certificação
// Botão nova task
// tabela com as tarefas com exclusão   --- talvez edição
// Ordenação
// grafico de dias que as tasks foram completadas (se 5 foram completadas dias x, linha vai no 5 e por ai vai ...)

{
  /* <Indicator
                title="Vencimento próxima Certificação"
                data={maxCertificationDue}
              /> */
}

export default Certification;
