const registrationStatus = {
  waiting: 'Aguardando pagamento',
  sent: 'Enviado',
  approved: 'Aprovado',
  refused: 'Recusado',
};

type StatusType = keyof typeof registrationStatus;

export function translateRegistrationStatus(
  originalStatus: string = 'waiting',
) {
  return registrationStatus[originalStatus as StatusType];
}
