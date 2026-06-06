export const onboardingSlides = [
  {
    title: 'Encontre quem resolve',
    text: 'Servicos em todo o Brasil, com profissionais reais e informacoes claras antes do primeiro contato.',
    image: 'client'
  },
  {
    title: 'Mostre seu trabalho',
    text: 'Crie reputacao nacional com perfil, portfolio, precos e disponibilidade em um espaco feito para autonomos.',
    image: 'professional'
  },
  {
    title: 'Combine com confianca',
    text: 'Solicite orcamentos, converse, acompanhe pedidos e avalie a experiencia no mesmo fluxo, onde voce estiver.',
    image: 'trust'
  }
]

export const categories = [
  'Todos',
  'Beleza',
  'Casa',
  'Construcao',
  'Mobilidade',
  'Seguranca',
  'Saude',
  'Eventos'
]

export const professionals = [
  {
    id: 'ana-martins',
    name: 'Ana Martins',
    category: 'Beleza',
    city: 'Sao Paulo',
    neighborhood: 'Pinheiros',
    rating: 4.9,
    jobs: 128,
    responseTime: '20 min',
    price: 'A partir de R$ 45',
    chargeType: 'por atendimento',
    keywords: ['manicure', 'unhas', 'beleza', 'alongamento'],
    bio: 'Especialista em unhas naturais, alongamento e acabamento delicado para eventos e rotina.',
    portfolio: ['Unhas gel minimalistas', 'Francesinha premium', 'Antes e depois'],
    reviewCount: 48,
    verified: true,
    completedJobsLabel: '128 servicos',
    trustSignals: ['Documento verificado', 'Resposta rapida', 'Portfolio revisado'],
    recentWork: [
      { title: 'Alongamento natural', result: 'Finalizacao em 1h40', tone: 'brand' },
      { title: 'Evento de casamento', result: 'Agenda e material incluidos', tone: 'gold' },
      { title: 'Manutencao express', result: 'Atendimento no mesmo dia', tone: 'sky' }
    ],
    availability: 'Hoje, 14h as 19h',
    avatar: 'AM',
    accent: 'from-[#FFE4DF] via-white to-[#D9F4F4]',
    chips: ['Unhas em gel', 'Evento', 'Agenda hoje'],
    profileHealth: 92
  },
  {
    id: 'bruno-azevedo',
    name: 'Bruno Azevedo',
    category: 'Construcao',
    city: 'Belo Horizonte',
    neighborhood: 'Savassi',
    rating: 4.8,
    jobs: 94,
    responseTime: '1h',
    price: 'A partir de R$ 18/m2',
    chargeType: 'por metro',
    keywords: ['pintor', 'pintura', 'reparo', 'pedreiro', 'obra'],
    bio: 'Pintura residencial, pequenos reparos e acabamento limpo para apartamentos e casas.',
    portfolio: ['Sala renovada', 'Textura externa', 'Reparo de parede'],
    reviewCount: 31,
    verified: true,
    completedJobsLabel: '94 servicos',
    trustSignals: ['CPF verificado', 'Fotos de obra', 'Orcamento por escrito'],
    recentWork: [
      { title: 'Sala renovada', result: 'Parede reparada e pintura fosca', tone: 'sky' },
      { title: 'Textura externa', result: 'Equipe de 2 pessoas', tone: 'gold' },
      { title: 'Reparo de parede', result: 'Acabamento antes da entrega', tone: 'brand' }
    ],
    availability: 'Amanha, 8h as 17h',
    avatar: 'BA',
    accent: 'from-[#DDF3FF] via-white to-[#FFF1D6]',
    chips: ['Pintura fina', 'Reparos', 'Orcamento rapido'],
    profileHealth: 88
  },
  {
    id: 'carla-santos',
    name: 'Carla Santos',
    category: 'Casa',
    city: 'Salvador',
    neighborhood: 'Pituba',
    rating: 5,
    jobs: 76,
    responseTime: '35 min',
    price: 'A partir de R$ 120',
    chargeType: 'por diaria',
    keywords: ['limpeza', 'diarista', 'casa', 'organizacao', 'domestica'],
    bio: 'Organizacao domestica, limpeza detalhada e apoio recorrente para familias.',
    portfolio: ['Cozinha organizada', 'Lavanderia', 'Limpeza pos-obra'],
    reviewCount: 27,
    verified: true,
    completedJobsLabel: '76 servicos',
    trustSignals: ['Identidade verificada', 'Recorrencia ativa', 'Clientes frequentes'],
    recentWork: [
      { title: 'Cozinha organizada', result: 'Antes e depois documentado', tone: 'brand' },
      { title: 'Lavanderia funcional', result: 'Organizacao por rotina', tone: 'sky' },
      { title: 'Limpeza pos-obra', result: 'Entrega em diaria unica', tone: 'gold' }
    ],
    availability: 'Esta semana',
    avatar: 'CS',
    accent: 'from-[#E8FFF7] via-white to-[#DDF3FF]',
    chips: ['Diarista', 'Organizacao', 'Pos-obra'],
    profileHealth: 95
  },
  {
    id: 'diego-motorista',
    name: 'Diego Nunes',
    category: 'Mobilidade',
    city: 'Curitiba',
    neighborhood: 'Batel',
    rating: 4.7,
    jobs: 63,
    responseTime: '15 min',
    price: 'A combinar',
    chargeType: 'por corrida',
    keywords: ['motorista', 'transporte', 'corrida', 'aeroporto', 'executivo'],
    bio: 'Motorista particular para compromissos, aeroporto, eventos e rotas executivas.',
    portfolio: ['Carro executivo', 'Traslado aeroporto', 'Agenda recorrente'],
    reviewCount: 19,
    verified: true,
    completedJobsLabel: '63 servicos',
    trustSignals: ['CNH verificada', 'Veiculo informado', 'Rotas recorrentes'],
    recentWork: [
      { title: 'Traslado aeroporto', result: 'Chegada monitorada', tone: 'sky' },
      { title: 'Agenda executiva', result: 'Atendimento recorrente', tone: 'brand' },
      { title: 'Evento corporativo', result: 'Rota combinada no app', tone: 'gold' }
    ],
    availability: 'Hoje',
    avatar: 'DN',
    accent: 'from-[#E9EDF7] via-white to-[#D9F4F4]',
    chips: ['Executivo', 'Aeroporto', 'Hoje'],
    profileHealth: 86
  }
]

export const professionalStats = [
  { label: 'Pedidos novos', value: '8' },
  { label: 'Orcamentos enviados', value: '14' },
  { label: 'Servicos ativos', value: '3' },
  { label: 'Avaliacao media', value: '4.9' }
]

export const trustChecklist = [
  { label: 'Documento enviado', done: true },
  { label: 'Preco e cobertura claros', done: true },
  { label: 'Portfolio com 3 exemplos', done: true },
  { label: 'Agenda atualizada', done: false },
  { label: 'Chave de pagamento revisada', done: false }
]

export const requests = [
  {
    id: 'REQ-1042',
    professionalId: 'ana-martins',
    professionalName: 'Ana Martins',
    client: 'Mariana Lopes',
    service: 'Manicure para evento',
    status: 'Novo pedido',
    date: 'Hoje',
    value: 'A definir'
  },
  {
    id: 'REQ-1038',
    professionalId: 'bruno-azevedo',
    professionalName: 'Bruno Azevedo',
    client: 'Rafael Moura',
    service: 'Pintura de sala',
    status: 'Orcamento enviado',
    date: 'Ontem',
    value: 'R$ 620'
  },
  {
    id: 'REQ-1031',
    professionalId: 'carla-santos',
    professionalName: 'Carla Santos',
    client: 'Bianca Reis',
    service: 'Limpeza pos-obra',
    status: 'Em andamento',
    date: '22 jun',
    value: 'R$ 280'
  }
]
