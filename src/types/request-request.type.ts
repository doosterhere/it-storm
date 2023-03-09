export type RequestRequestType = {
  name: string,
  phone: string,
  service?: string,
  type: RequestType
}

export enum RequestType {
  order = 'order',
  consultation = 'consultation'
}
