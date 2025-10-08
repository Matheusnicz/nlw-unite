let participantes = [
  {
    nome: "Diego Fernandes",
    email: "diego@gmail.com",
    dataInscricao: new Date(2025, 2, 1, 19, 23),
    dataCheckIn: null
  },
  {
    nome: "Mayk Brito",
    email: "mayk@gmail.com",
    dataInscricao: new Date(2025, 1, 2, 19, 23),
    dataCheckIn: null
  },
  {
    nome: "Ana Souza",
    email: "ana@gmail.com",
    dataInscricao: new Date(2025, 2, 3, 14, 45),
    dataCheckIn: new Date(2025, 2, 4, 10, 10)
  },
  {
    nome: "Carlos Silva",
    email: "carlos@gmail.com",
    dataInscricao: new Date(2025, 3, 4, 9, 30),
    dataCheckIn: null
  },
  {
    nome: "Juliana Lima",
    email: "juliana@gmail.com",
    dataInscricao: new Date(2025, 4, 5, 16, 0),
    dataCheckIn: new Date(2025, 4, 6, 14, 30)
  },
  {
    nome: "Pedro Henrique",
    email: "pedro@gmail.com",
    dataInscricao: new Date(2025, 5, 6, 13, 15),
    dataCheckIn: null
  },
  {
    nome: "Larissa Alves",
    email: "larissa@gmail.com",
    dataInscricao: new Date(2025, 6, 7, 17, 20),
    dataCheckIn: new Date(2025, 6, 8, 15, 10)
  },
  {
    nome: "Rafael Costa",
    email: "rafael@gmail.com",
    dataInscricao: new Date(2025, 7, 8, 10, 0),
    dataCheckIn: null
  },
  {
    nome: "Fernanda Dias",
    email: "fernanda@gmail.com",
    dataInscricao: new Date(2025, 8, 9, 11, 50),
    dataCheckIn: new Date(2025, 8, 10, 10, 30)
  },
  {
    nome: "Lucas Martins",
    email: "lucas@gmail.com",
    dataInscricao: new Date(2025, 9, 10, 8, 15),
    dataCheckIn: new Date(2025, 9, 11, 7, 45)
  }
];

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now())
  .to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now())
  .to(participante.dataCheckIn)

  // condicional
  if(participante.dataCheckIn == null) {
    dataCheckIn = `
     <button
       data-email="${participante.email}"
       onclick="fazerChekIn(event)"
     >
       Confirmar check-in 
      </button>
     `
  }

  return `
  <tr>
      <td>
        <strong>
         ${participante.nome}
        </strong>
        <br>
        <small>
          ${participante.email}
        </small>
      </td>
      <td>${dataInscricao}</td>
      <td>${dataCheckIn}</td>
    </tr>
  `
}

const atualizarLista = (participantes) => {
  let output = ""
 // estrutura de repetição - loop
 for(let participante of participantes) {
   output = output + criarNovoParticipante(participante)
  }
 // substituir informação do HTML
 document
 .querySelector('tbody')
 .innerHTML = output
}

atualizarLista(participantes) 

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  // verificar se o participante já existe
  const participanteExiste = participantes.find(
    (p) => {
      return p.email == participante.email
    }
  )

  if(participanteExiste) {
    alert('Email já cadastrado!')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  //limpar o formulario
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""

}

const fazerChekIn = (event) => {
  // confirmar se realmente quer o check-in
  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'

  if(confirm(mensagemConfirmacao) == false) {
    return
  }

  // encontrar o participante dentro da lista
  const participante = participantes.find((p) => {
    return p.email == event.target.dataset.email
  })
  // atualizar o check-in do participante
  participante.dataCheckIn = new Date()

  // atualizar a lista de participantes
  atualizarLista(participantes)
}