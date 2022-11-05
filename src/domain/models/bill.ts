export interface BillModel {
  id: string;
  clientId?: string;
  name: string;
  value: string;
  expireDate: string;
  daysBeforeExpireDateToRemember: string;
}
