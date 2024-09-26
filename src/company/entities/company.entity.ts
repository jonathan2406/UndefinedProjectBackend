export class Company {
  id: string;
  name: string;
  admin: string; // Referencia a un documento de admin (por ejemplo, `/admin/123`)
  groups: string[]; // Array con grupos de usuarios (por ejemplo, `["userid1", "userid2"]`)
  meetings: Record<string, Meeting>; // Mapa que contiene objetos con campos como `attendants`, `biography`, `datetime`, y `name`
  users: string[]; // Array con referencias a usuarios (por ejemplo, `/user/user1`)

  constructor(partial: Partial<Company>) {
    Object.assign(this, partial);
  }
}

export class Meeting {
  attendants: string[]; // Array de asistentes
  biography: string; // Biografía
  datetime: Date; // Fecha y hora
  name: string; // Nombre
}