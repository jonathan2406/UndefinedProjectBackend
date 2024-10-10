export class CreateCompanyDto {
    readonly id: string;
    readonly name: string;
    readonly admin: string[];  // Lista de IDs de administradores
    readonly groups: Record<string, unknown>;  // Grupos relacionados a la empresa
    readonly meetings: Record<string, unknown>;  // Reuniones de la empresa
    readonly users: Record<string, unknown>;  // Usuarios de la empresa
  }
  