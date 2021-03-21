
function createData(user, id, email, type, creation, employer, admin, status) {
  return { user, id, email, type, creation, employer, admin, status };
}

export const rows = [
  createData('Rodrigo B. Anselmo',1,'rodrigobanselmo@gmail.com', 'Administrador', '26/08/21', 'Simple SST', 'Realiza', 'Ativo'),
  createData('Alex B. Anselmo',2,'alex@realizaconsultoria.com.br', 'Funcionario', '26/08/68', 'Realiza Corporation S.', 'Universidade de São Paulo', 'Ativo'),
  createData('Leticia B. Anselmo',3,'alex@realizagrandedemaismaismais.com.br', 'Engenheiro de Segegurança', '26/08/19', 'Simple SST', 'Simple SST', 'Férias'),
  createData('Muriel B. Anselmo',4,'alex@realizaconsultoria.com.br', 'Tecnico de Segeguranca', '26/08/19', 'Simple SST', 'Universidade de São Paulo', 'Desligado'),
  createData('Joao B. Anselmo',5,'alex@realizaconsultoria.com.br', 'Administrativo', '26/08/21', 'Simple SST', 'Universidade de São Paulo', 'Inativo'),
  createData('Leticia B. Anselmo',33,'alex@realizagrandedemaismaismais.com.br', 'Engenheiro de Segegurança', '26/08/19', 'Simple SST', 'Simple SST', 'Férias'),
  createData('Muriel B. Anselmo',44,'alex@realizaconsultoria.com.br', 'Tecnico de Segeguranca', '26/08/19', 'Simple SST', 'Universidade de São Paulo', 'Desligado'),
  createData('Joao B. Anselmo',55,'alex@realizaconsultoria.com.br', 'Administrativo', '26/08/21', 'Simple SST', 'Universidade de São Paulo', 'Inativo'),
  createData('Leticia B. Anselmo',36,'alex@realizagrandedemaismaismais.com.br', 'Engenheiro de Segegurança', '26/08/19', 'Simple SST', 'Simple SST', 'Férias'),
  createData('Muriel B. Anselmo',47,'alex@realizaconsultoria.com.br', 'Tecnico de Segeguranca', '26/08/19', 'Simple SST', 'Universidade de São Paulo', 'Desligado'),
  createData('Joao B. Anselmo',58,'alex@realizaconsultoria.com.br', 'Administrativo', '26/08/21', 'Simple SST', 'Universidade de São Paulo', 'Inativo'),
];

export const headCells = [
  { id: 'name', disablePadding: true, label: 'Usuário' },
  { id: 'type', disablePadding: false, label: 'Tipo' },
  { id: 'creation', disablePadding: false, label: 'Criação' },
/*   { id: 'company', disablePadding: false, label: 'Empresa' },
  { id: 'admin', disablePadding: false, label: 'Administrador' }, */
  { id: 'status', align:true, disablePadding: false, label: 'Status' },
];

export const userTypes = [
  { name: 'Administrador',icon:'Admin',access:'admin'},
  { name: 'Administrativo',icon:'Administrative',access:'admin'},
  { name: 'Tecnico de Segunrança',icon:'Technician',access:'admin'},
  { name: 'Engenheiro de Segurança',icon:'Engineer',access:'admin'},
  { name: 'Médico do Trabalho',icon:'Person',access:'admin'},
  { name: 'Enfermeiro do Trabalho',icon:'Person',access:'admin'},
  { name: 'Enfermeiro',icon:'Person',access:'admin'},
  { name: 'Auxiliar de Infermagem',icon:'Person',access:'admin'},
  { name: 'Enfermeiro',icon:'Person',access:'admin'},
  { name: 'R.H.',icon:'RH',access:'admin'},
  { name: 'Funcionário',icon:'Person',access:'admin'},
];

