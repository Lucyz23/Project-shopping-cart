const fetchProducts = async (query) => {
  if (!query) return new Error('You must provide an url');

  return await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`).then((response) => response.json());
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
