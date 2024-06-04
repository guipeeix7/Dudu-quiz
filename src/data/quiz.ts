export const QUIZ = [
  {
    id: '1',
    title: 'Evento 1',
    level: 1,
    questions: [
      {
        title: 'Por quanto tempo o bariátrico precisa tomar vitaminas?',
        alternatives: [
          'Por 1 ano após a cirurgia.',
          'Por 3 anos após a cirurgia.',
          'Pelo resto da vida.',
          'Só precisará tomar caso apresente deficiências nutricionais.'
        ],
        correct: 2
      },
      {
        title: 'Muitos chamam a cirurgia bariátrica de cirurgia de redução de estômago. A cirurgia bariátrica sempre mexe apenas o estômago?',
        alternatives: [
          'Sim. Por isso o paciente come pouco e assim emagrece.',
          'Não. Existem alguns tipos cirúrgicos que mexem também no intestino.',
          'Sim. E o estomago pode voltar a aumentar, fazendo-o reganhar o peso perdido.',
          'Não. A cirurgia bariátrica, via de regra, mexe também no intestino, impossibilitando o paciente de ter uma vida normal.'
        ],
        correct: 1
      },
      {
        title: 'Qual abaixo é o nutriente mais importante para o bariátrico?',
        alternatives: [
          'Proteína',
          'Carboidrato',
          'Gordura',
          'Zinco'
        ],
        correct: 0
      },
      {
        title: 'Com quanto tempo, em média, o bariátrico atinge seu peso meta?',
        alternatives: [
          '3 anos',
          '6 meses',
          '1 ano e meio',
          '1 ano'
        ],
        correct: 2
      },
      {
        title: 'Quais das atitudes abaixo mais podem levar ao reganho de peso após a cirurgia bariátrica?',
        alternatives: [
          'O consumo de Whey protein na ausência de treino.',
          'O consumo excessivo de suplementos vitamínicos.',
          'O baixo consumo proteico e o hábito de beliscar.',
          'Não tomar a suplementação vitamínica.'
        ],
        correct: 2
      },
      {
        title: 'Sobre o uso de creatina em bariátricos, assinale a alternativa correta:',
        alternatives: [
          'Pode causar ganho de peso.',
          'Aumenta o risco de doenças renais.',
          'Auxilia no ganho de força e de massa muscular.',
          'Suas funções se limitam aos benefícios relativos ao treino (aumento de força e musculo).'
        ],
        correct: 2
      },
      {
        title: 'Qual dos tipos de treino abaixo é indispensável ao paciente bariátrico, especialmente no primeiro ano de cirurgia (fase de perda de peso)?',
        alternatives: [
          'Aeróbico (Caminhada, natação, corrida..)',
          'HIT (treino intervalado)',
          'Funcional',
          'Treino de força em geral'
        ],
        correct: 3
      }
    ]
  },
  {
    id: '2',
    title: 'Utilizando Typescript',
    level: 2,
    questions: [
      {
        title: 'Sobre a ingestão de whey protein após a cirurgia bariátrica, assinale a alternativa incorreta:',
        alternatives: [
          'Ele pode atrapalhar a perda de peso do paciente se ele não malhar.',
          'É importante para o paciente bariátrico por ajudá-lo a bater sua meta proteica e dessa maneira, não perder massa muscular em excesso.',
          'Pode auxiliar no tratamento da queda de cabelo.',
          'Sua versão isolada pode ser consumida mesmo pelo bariátrico que possui intolerância a lactose.'
        ],
        correct: 0
      },
      {
        title: 'Com quanto tempo, no mínimo, após a cirurgia bariátrica é recomendado para uma paciente engravidar?',
        alternatives: [
          '9 meses',
          '6 meses',
          '2 anos',
          '1 ano e meio'
        ],
        correct: 2
      },
      {
        title: 'Formigamentos, dormências em membros e memória fraca costumam ser sintomas mais comuns da deficiência de quais dos nutrientes abaixo?',
        alternatives: [
          'Ferro e cálcio',
          'Vitamina B12 e B1',
          'Vitamina C e magnésio',
          'Vitamina E e boro'
        ],
        correct: 1
      },
      {
        title: 'Qual a recomendação média geral de água por dia para o bariátrico?',
        alternatives: [
          '30 ml para cada kg de peso corporal',
          '40 ml para cada kg de peso corporal',
          '25 ml para cada kg de peso corporal',
          '1000 ml para cada 20 kg de peso corporal'
        ],
        correct: 0
      },
      {
        title: 'O sintoma de FRAQUEZA que muitos bariátricos relatam depois da cirurgia pode acontecer em função dos motivos abaixo, exceto:',
        alternatives: [
          'Perda excessiva de massa muscular',
          'Ocorrência de hipoglicemia reativa (queda repentina na glicemia).',
          'Deficiências nutricionais',
          'Restrição no consumo de açúcar e alimentos doces, gerando hipoglicemias frequentes.'
        ],
        correct: 3
      },
      {
        title: 'O paciente bariátrico terá risco aumentando de desenvolver doenças ósseas (Ex: osteoporose e osteopenia) e dentais caso não suplemente adequadamente:',
        alternatives: [
          'Carboidratos, vitamina D e C.',
          'Vitamina A, zinco e boro.',
          'Cálcio, vitamina D, magnésio, vitamina K2 e proteína.',
          'Boro e vitamina B12.'
        ],
        correct: 2
      },
      {
        title: 'Um paciente bariátrico pode se tornar um atleta caso deseje?',
        alternatives: [
          'Não. Infelizmente pela redução na absorção de gorduras, pode haver risco aumentado de deficiência de vitaminas lipossolúveis (K E D A), o que pode atrapalhar na performance física.',
          'Não, devido ao risco aumentado de síndrome de dumping com o uso de suplementos a base de carboidratos.',
          'Sim, atentando-se a alimentação e a suplementação da mesma maneira que um atleta não operado se atentaria.',
          'Sim, mas deverá ter o dobro de atenção na alimentação e suplementação, especialmente no que tange a meta proteica e risco de complicações nutricionais, como dumping e hipoglicemia reativa.'
        ],
        correct: 3
      }
    ]
  },
  {
    id: '3',
    title: 'React Navigation',
    level: 3,
    questions: [
      {
        title: 'Quais são os critérios atuais no Brasil para se fazer uma cirurgia bariátrica segundo a Agência nacional de saúde (ANS) e Conselho Federal de Medicina (CFM)?',
        alternatives: [
          'Possuir IMC (índice de massa corporal = Peso/Altura²) acima de 40 kg/m², independentemente da presença de comorbidades. IMC entre 35 e 40 kg/m² na presença de comorbidades. IMC entre 30 e 35 kg/m² na presença de comorbidades que tenham obrigatoriamente a classificação “grave” por um médico especialista na respectiva área da doença.',
          'Os critérios variam de pessoa para pessoa.',
          'Qualquer adulto portador de obesidade (IMC acima de 30 kg/m²) pode realizar a cirurgia.',
          'Possuir IMC (índice de massa corporal = Peso/Altura²) acima de 35 kg/m², independentemente da presença de comorbidades. IMC entre 30 e 35 kg/m² na presença de comorbidades que tenham obrigatoriamente a classificação “grave” por um médico especialista na respectiva área da doença.'
        ],
        correct: 0
      },
      {
        title: 'Um paciente bariátrico que cerca de 1 a 3 horas após comer começa a ter suador, fraqueza e visão turva, provavelmente está sofrendo de:',
        alternatives: [
          'Hiperglicemia, excesso de açúcar no sangue, em função de uma provável refeição rica em carboidratos.',
          'Hipoglicemia reativa, pela resposta exacerbada na secreção de insulina pós-prandial que pode acontecer depois da cirurgia, devido, principalmente, as alterações no padrão de secreção dos hormônios intestinais.',
          'Síndrome de dumping, devido a chegada rápida e de alimentos menos digeridos no intestino.',
          'Hiperglicemia, pela absorção mais rápida de açúcar, que acontece devido à redução no tamanho estomago e desvio intestinal.'
        ],
        correct: 1
      },
      {
        title: 'Uma mulher portadora de obesidade e que deseje engravidar:',
        alternatives: [
          'Deve engravidar antes de fazer a cirurgia bariátrica, pelo maior nível de segurança.',
          'Deve optar por engravidar a partir de 1 ano e meio após o procedimento, quando seu peso e seus níveis vitamínicos encontrarem-se mais estabilizados.',
          'Deve optar por engravidar após a cirurgia, mas nesse momento, interromper toda suplementação, pela falta de segurança do uso de suplementos durante a gestação.',
          'Deve engravidar antes da cirurgia, e após o nascimento do bebê, esperar pelo menos 3 anos para realização da cirurgia bariátrica.'
        ],
        correct: 1
      },
      {
        title: 'Quais dos nutrientes abaixo estão mais relacionados com a queda de cabelo após a cirurgia quando em falta?',
        alternatives: [
          'Ferro, zinco e proteína.',
          'Creatina, cálcio e B12.',
          'Magnésio, cálcio e B1.',
          'Ômega 3 e vitamina K.'
        ],
        correct: 0
      },
      {
        title: 'Em qual colocação o Brasil se encontra em termos de número de cirurgias bariátrica feitas por ano?',
        alternatives: [
          'Segundo lugar',
          'Primeiro lugar',
          'Sétimo lugar',
          'Terceiro lugar'
        ],
        correct: 0
      },
      {
        title: 'Quais das doenças abaixo a cirurgia bariátrica ajuda a controlar?',
        alternatives: [
          'Hipertensão arterial sistêmica, Diabetes tipo 2 e Apneia obstrutiva do sono.',
          'Doença do refluxo gastresofágico, osteoporose e diabetes tipo 2.',
          'Diabetes tipo 1, hipertensão arterial e artrite reumatoide.',
          'Diabetes tipo 3, osteopenia e lúpus.'
        ],
        correct: 0
      },
      {
        title: 'Em média, qual o percentual de brasileiros adultos que se encontram hoje aptos a realização da cirurgia?',
        alternatives: [
          '40%',
          '25%',
          '15%',
          '10%'
        ],
        correct: 2
      }
    ]
  }
];