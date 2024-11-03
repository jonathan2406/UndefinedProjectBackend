// update-company.dto.ts
export class UpdateCompanyDto {
    readonly admin?: string;
    readonly groups?: string[];
    readonly meetings?: Record<string, any>;
    readonly users?: string[];
  }