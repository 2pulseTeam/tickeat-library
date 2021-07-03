export enum OrderStatus {
  CREATED = 'created',
  COOKING = 'cooking',
  COOKED = 'cooked',
  DELIVERING = 'delivering',
  DELIVERED = 'delivered',
  CLOSED = 'closed',
  CANCELLED = 'cancelled',
}

export enum OrderMode {
  DELIVERY = 'DELIVERY',
  TAKEAWAY = 'TAKEAWAY',
  ONSPOT   = 'ONSPOT',
}

export enum OrderChannel {
  WEBSITE = 'website',
  TICKEAT_OS = 'tickeat_os',
  UBER = 'uber',
  DELIVEROO = 'deliveroo',
}