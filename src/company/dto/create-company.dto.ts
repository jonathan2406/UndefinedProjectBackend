export class CreateCompanyDto {
  readonly name: string; 
  readonly admin: string;
  readonly groups: string[];
  readonly meetings: Record<string, any>;
  readonly users: string[];
}
