export interface UsersResponse {
  code: number;
  message: string;
  dataList: UsersData[];
}

export interface UsersData {
  id: number;
  apellidoMaterno: string;
  apellidoPaterno: string;
  comentarios: null;
  correo: string;
  departamento: null;
  estatus: number;
  fechaDesactivacion: null;
  fechaModificacion: string;
  fechaRegistro: string;
  lote: null;
  nombre: string;
  nombreCompleto: string;
  password: string;
  fechaUltAcceso: string;
  usuario: string;
  usuarioModificacion: null;
  usuarioRegistro: null;
  modificacion: null;
  grupoFk: number;
  puesto: number;
  sucursal: number;
  nombreGrupo: string;
  numeroGrupo: number;
  descripcionGrupo: string;
  estatusGrupo: number;
  puestoNombre: string;
  isAdmin: null;
  grupo: null;
  op: number;
  idAc: number;
}

export interface NewUser {
  id: number;
  usuario: string;
  nombre: string;
  nombreCompleto: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  correo: string;
  grupoFk: string;
  puesto: string;
  departamento: string;
  sucursal: string;
  estatus: string;
  lote: string;
  fechaDesactivacion: string;
  fechaUltAcceso: string;
  comentarios: string;
  modificacion: string;
  fechaModificacion: string;
  password: string;
}
