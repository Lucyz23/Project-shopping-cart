const fetchSimulator = require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

window.fetch = jest.fn(fetchSimulator);

describe('2 - Teste a função fecthItem', () => {
  it('fetchItem é uma função?', () => {
    expect(typeof fetchItem).toEqual('function');
  });

  it('fetch foi chamado corretamente ao chamar fetchItem', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });

  it('fetch foi chamado com o endpoint correto ao usar fetchItem', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  });

  it('fetchItem é o mesmo valor do mock item', async () => {
    const results = await fetchItem('MLB1615760527');
    expect(results).toEqual(item);
  });

  it('fetchItem return uma mensagem de erro caso não seja passado o parametro id.', async () => {
    expect(await fetchItem()).toEqual(new Error('You must provide an url'));
  });
});
