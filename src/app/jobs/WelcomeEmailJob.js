import Mail from '../../lib/Mail.js';


class WelcomeEmailJob {
    get key() {
        return "WelcomeEmail";
    }

    async handle(data) {
        const { email, name } = data;

        Mail.send({
            to: email,
            subject: "Bem-vindo(a)",
            text: `Olá ${name} bem-vindo(a) ao sistema!`
        }).catch(err => {
            console.error('Erro ao enviar e-mail:', err);
        });
    }
}

export default new WelcomeEmailJob()