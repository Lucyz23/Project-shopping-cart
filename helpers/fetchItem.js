const fetchItem = async (id) => {
  if (!id) return new Error('You must provide an url');

  return await fetch(`https://api.mercadolibre.com/items/${id}`).then((response) => response.json());
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
