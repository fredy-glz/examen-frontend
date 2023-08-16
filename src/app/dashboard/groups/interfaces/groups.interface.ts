export interface GroupResponse {
  code: number;
  message: string;
  dataList: GroupData[];
}

export interface GroupData {
  id: string;
  grupo: string;
  descripcion: string;
  numero: number | string;
  estatus: number;
  timeOut: number;
}

export interface SaveResponse {
  code: number;
  message: string;
  success: boolean;
}
