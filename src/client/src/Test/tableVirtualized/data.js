const createRow = () => ({
  CNPJ: `${Math.random()*1000000000000000}`,
  CNPJ: `${Math.random()*1000000000000000}`,
  creation: 1614528749269,
  end: 0,
  name: `${Math.random()*1000000000000000}`,
  responsavel: `${Math.random()*1000000000000000}`,
  status: 'Ativo',
});

const createData = (qty = 200) => {
  let data = [];

  for (let i = 0; i < qty; i++) {
    const row = createRow();
    data.push(row);
  }

  return data;
};

export default createData;
