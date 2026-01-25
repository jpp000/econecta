import toast from 'react-hot-toast';

const errorMessageMap: Record<string, string> = {
    'user not found': 'Usuário não encontrado.',
    'password is not valid': 'Senha inválida.',
    'email already exists': 'E-mail já cadastrado.',
    'user already exists': 'Usuário já cadastrado.',
    'internal server error': 'Erro no servidor. Tente novamente mais tarde.',
    'unauthorized': 'Usuário ou senha inválidos.',
    'forbidden': 'Acesso negado.',
    'not found': 'Recurso não encontrado.',
    'conflict': 'Conflito com dados existentes.',
    'bad request': 'Requisição inválida.',
};

export function handleApiError(error: any, fallbackMessage = 'Algo deu errado, tente novamente.') {
    const message = error?.response?.data?.message;

    if (Array.isArray(message)) {
        message.forEach((msg) => toast.error(msg));
        return;
    }

    if (typeof message === 'string') {
        const lowerMsg = message.toLowerCase();

        const customMsg =
            Object.entries(errorMessageMap).find(([key]) => lowerMsg.includes(key))?.[1];

        toast.error(customMsg || message);
    } else {
        toast.error(fallbackMessage);
    }
}
