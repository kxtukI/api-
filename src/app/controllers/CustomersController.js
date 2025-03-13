// Importa o array de clientes
// Esse array será usado para simular um banco de dados
let customers = [
    { id: 1, name: "Dev Samurai", site: "https://devsamurai.com.br"},
    { id: 2, name: "Google", site: "https://google.com"},
    { id: 3, name: "UOL", site: "https://uol.com.br"}    
];


class CustomersController {
    // Rotas
    index(req, res) {
        // Retorna a lista de clientes
        return res.json(customers);
    }

    // Rota para buscar um cliente pelo id
    show(req, res) {
        const id = parseInt(req.params.id);
        // Busca o cliente pelo id
        const customer = customers.find(item => item.id === id);
        //  Verifica se o cliente foi encontrado
        const status = customer ? 200 : 404;
    
        // Retorna o cliente encontrado ou o status 404
        return res.status(status).json(customer);
    }

    // Rota para criar um novo cliente
    create(req, res) {
        // Pega os dados do corpo da requisição
        const {name, site} = req.body;
        // Gera um novo id para o cliente
        const id = customers[customers.length - 1].id + 1;

        const newCustomer = { id, name, site};
        // Adiciona o novo cliente ao array
        customers.push(newCustomer);

        // Retorna o novo cliente criado
        return res.status(201).json(newCustomer);
    }

    // Rota para atualizar um cliente
    update(req, res) {
        // Pega o id do cliente a ser atualizado
        const id = parseInt(req.params.id);
        const {name, site} = req.body;

        const index = customers.findIndex(item => item.id === id);
        const status = index >= 0 ? 200 : 404;

        // Verifica se o cliente foi encontrado
        if(index >= 0){
            // Atualiza os dados do cliente
            customers[index] = { id: parseInt(id), name, site};
        }

        return res.status(status).json(customers[index]);
    }

    // Rota para deletar um cliente
    destroy(req, res) {
        const id = parseInt(req.params.id);

        const index = customers.findIndex(item => item.id === id);
        const status = index >= 0 ? 200 : 404;

        if(index >= 0){
            // Remove o cliente do array
            customers.splice(index, 1);
        }

        return res.status(status).json();
    }
}

// Exporta uma instância da classe CustomersController
module.exports = new CustomersController();