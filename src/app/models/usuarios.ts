export interface usuarios{

    idUsuario : number;
    nombre:string;
    apPaterno : string;
    apMaterno: string | null;
    correo: string;
    password: string;
    idEstado: number;
    idRol: number;
}