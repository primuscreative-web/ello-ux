export const onboardingSlides = [
  {
    title: 'Encontre quem resolve',
    text: 'Servicos perto de voce, com profissionais reais e informacoes claras antes do primeiro contato.',
    image: 'client'
  },
  {
    title: 'Mostre seu trabalho',
    text: 'Crie reputacao com perfil, portfolio, precos e disponibilidade em um espaco feito para autonomos.',
    image: 'professional'
  },
  {
    title: 'Combine com confianca',
    text: 'Solicite orcamentos, converse, acompanhe pedidos e avalie a experiencia no mesmo fluxo.',
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
    city: 'Macae',
    neighborhood: 'Cavaleiros',
    rating: 4.9,
    jobs: 128,
    responseTime: '20 min',
    price: 'A partir de R$ 45',
    chargeType: 'por atendimento',
    keywords: ['manicure', 'unhas', 'beleza', 'alongamento'],
    bio: 'Especialista em unhas naturais, alongamento e acabamento delicado para eventos e rotina.',
    portfolio: ['Unhas gel minimalistas', 'Francesinha premium', 'Antes e depois'],
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
    city: 'Macae',
    neighborhood: 'Imbetiba',
    rating: 4.8,
    jobs: 94,
    responseTime: '1h',
    price: 'A partir de R$ 18/m2',
    chargeType: 'por metro',
    keywords: ['pintor', 'pintura', 'reparo', 'pedreiro', 'obra'],
    bio: 'Pintura residencial, pequenos reparos e acabamento limpo para apartamentos e casas.',
    portfolio: ['Sala renovada', 'Textura externa', 'Reparo de parede'],
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
    city: 'Rio das Ostras',
    neighborhood: 'Costazul',
    rating: 5,
    jobs: 76,
    responseTime: '35 min',
    price: 'A partir de R$ 120',
    chargeType: 'por diaria',
    keywords: ['limpeza', 'diarista', 'casa', 'organizacao', 'domestica'],
    bio: 'Organizacao domestica, limpeza detalhada e apoio recorrente para familias.',
    portfolio: ['Cozinha organizada', 'Lavanderia', 'Limpeza pos-obra'],
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
    city: 'Macae',
    neighborhood: 'Centro',
    rating: 4.7,
    jobs: 63,
    responseTime: '15 min',
    price: 'A combinar',
    chargeType: 'por corrida',
    keywords: ['motorista', 'transporte', 'corrida', 'aeroporto', 'executivo'],
    bio: 'Motorista particular para compromissos, aeroporto, eventos e rotas executivas.',
    portfolio: ['Carro executivo', 'Traslado aeroporto', 'Agenda recorrente'],
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

export const requests = [
  {
    id: 'REQ-1042',
    client: 'Mariana Lopes',
    service: 'Manicure para evento',
    status: 'Novo pedido',
    date: 'Hoje',
    value: 'A definir'
  },
  {
    id: 'REQ-1038',
    client: 'Rafael Moura',
    service: 'Pintura de sala',
    status: 'Orcamento enviado',
    date: 'Ontem',
    value: 'R$ 620'
  },
  {
    id: 'REQ-1031',
    client: 'Bianca Reis',
    service: 'Limpeza pos-obra',
    status: 'Em andamento',
    date: '22 jun',
    value: 'R$ 280'
  }
]
