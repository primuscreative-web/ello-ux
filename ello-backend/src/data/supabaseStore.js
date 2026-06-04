function notConfigured() {
  const error = new Error('Supabase store ainda nao foi conectado. Configure SUPABASE_URL, SUPABASE_ANON_KEY e SUPABASE_SERVICE_ROLE_KEY no proximo bloco.')
  error.code = 'STORE_NOT_CONFIGURED'
  throw error
}

module.exports = {
  createClientSignup: notConfigured,
  createProfessionalSignup: notConfigured,
  createQuote: notConfigured,
  createQuoteMessage: notConfigured,
  getUserByToken: notConfigured,
  getStoreSummary: notConfigured,
  listQuoteMessages: notConfigured,
  loginUser: notConfigured,
  listQuotes: notConfigured,
  listQuotesForUser: notConfigured,
  readState: notConfigured,
  respondToQuote: notConfigured,
  updateQuoteStatus: notConfigured
}
