export const formatDate = (d: string) =>
  new Date(d).toLocaleDateString('ru-RU');

export const formatPrice = (v: number) =>
  new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(v);
