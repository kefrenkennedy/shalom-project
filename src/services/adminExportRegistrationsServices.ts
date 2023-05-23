import { api } from './apiClient';

const PATH = '/registrations/export/event';

export const adminExportRegistrationsServices = () => ({
  export: async (event_id: string) => {
    const response = await api.get(PATH + `/${event_id}`, {
      responseType: 'blob', // Especifica o tipo de resposta como blob (dados binários)
    });

    // Cria um link temporário no documento
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `inscricoes_${event_id}.csv`); // Define o nome do arquivo
    document.body.appendChild(link);

    // Simula um clique no link para iniciar o download
    link.click();

    // Limpa o objeto URL e remove o link temporário
    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);
  },
});
