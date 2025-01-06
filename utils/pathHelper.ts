export const pathHelper = {
  home: () => "/",
  notFound: () => "/_not-found",
  createQuote: () => "/create-quote",
  profile: (userId?: string) => (userId ? `/profile/${userId}` : "/profile"),
  quoteDetail: (quoteId: string) => `/quote/${quoteId}`,
  editQuote: (quoteId: string) => `/quote/${quoteId}/edit`,
  category: (categoryName: string) =>
    `/category/${encodeURIComponent(categoryName)}`,
  // Add more dynamic routes as needed
};
