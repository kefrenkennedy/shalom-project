const paymentStatus = {
  waiting: 'Aguardando',
  sent: 'Enviado',
  approved: 'Aprovado',
  refused: 'Recusado',
};

type StatusType = keyof typeof paymentStatus;

export function translatePaymentStatus(originalStatus: string = 'waiting') {
  return paymentStatus[originalStatus as StatusType];
}
