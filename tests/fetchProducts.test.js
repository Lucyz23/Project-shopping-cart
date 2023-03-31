const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

window.fetch = jest.fn(fetchSimulator);

describe('1 - Teste a função fecthProducts', () => {
  it('fetchProducts é uma função?', () => {
    expect(typeof fetchProducts).toEqual('function');
  });

  it('fetch foi chamado corretamente ao chamar fetchProducts', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('fetch foi chamado com o endpoint correto ao usar fetchProducts', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });

  it('fetchProducts é o mesmo valor do mock computadorSearch', async () => {
    const results = await fetchProducts('computador');
    expect(results).toEqual(computadorSearch);
  });

  it('fetchProducts return uma mensagem de erro caso não seja passado o parametro url.', async () => {
    expect(await fetchProducts()).toEqual(new Error('You must provide an url'));
  });
});
