const Cadastro = require('../cadastro');

describe('Cadastro', () => {
    // Testes para o método validarEmail
    describe('validarEmail', () => {
        it('deve validar um email válido', () => {
            const cadastro = new Cadastro('João', 'joao@example.com', 'senha123');
            expect(cadastro.validarEmail()).toBe(true);
        });

        it('deve rejeitar um email inválido', () => {
            const cadastro = new Cadastro('Maria', 'emailinvalido@', 'outrasenha');
            expect(cadastro.validarEmail()).toBe(false);
        });
    });

    // Testes para o método validarSenha
    describe('validarSenha', () => {
        it('deve validar uma senha com mais de 6 caracteres', () => {
            const cadastro = new Cadastro('Pedro', 'pedro@example.com', 'senhavalida123');
            expect(cadastro.validarSenha()).toBe(true);
        });

        it('deve rejeitar uma senha com menos de 6 caracteres', () => {
            const cadastro = new Cadastro('Ana', 'ana@example.com', 'curta');
            expect(cadastro.validarSenha()).toBe(false);
        });
    });

    // Testes para o método realizarCadastro
    describe('realizarCadastro', () => {
        it('deve realizar o cadastro com sucesso quando email e senha são válidos', () => {
            const cadastro = new Cadastro('José', 'jose@example.com', 'senha12345');
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {}); // Espionar console.log
            cadastro.realizarCadastro();
            expect(consoleSpy).toHaveBeenCalledWith('Cadastro realizado com sucesso!');
        });

        it('não deve realizar o cadastro quando o email é inválido', () => {
            const cadastro = new Cadastro('Carla', 'emailinvalido@', 'senha123');
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {}); // Espionar console.log
            cadastro.realizarCadastro();
            expect(consoleSpy).toHaveBeenCalledWith('Cadastro não realizado. Verifique seus dados.');
        });

        it('não deve realizar o cadastro quando a senha é curta', () => {
            const cadastro = new Cadastro('Carlos', 'carlos@example.com', 'curta');
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {}); // Espionar console.log
            cadastro.realizarCadastro();
            expect(consoleSpy).toHaveBeenCalledWith('Cadastro não realizado. Verifique seus dados.');
        });
    });

    // Testes para o método alterarEmail
    describe('alterarEmail', () => {
        it('deve alterar o email corretamente', () => {
            const cadastro = new Cadastro('Juliana', 'juliana@example.com', 'outrasenha');
            cadastro.alterarEmail('novoemail@example.com');
            expect(cadastro.email).toBe('novoemail@example.com');
        });
    });

    // Testes para o método alterarSenha
    describe('alterarSenha', () => {
        it('deve alterar a senha corretamente', () => {
            const cadastro = new Cadastro('Fernando', 'fernando@example.com', 'senhaantiga');
            cadastro.alterarSenha('novasenha123');
            expect(cadastro.senha).toBe('novasenha123');
        });
    });
});