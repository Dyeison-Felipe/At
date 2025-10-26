import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { BadRequestError } from 'src/shared/application/error/bad-request/bad-request.error';
import { InternalServerError } from 'src/shared/application/error/internal-server/internal-server.error';
import { Cnpj, CpjDataType } from 'src/shared/application/services/cnpj/cnpj';

export class CnpjService implements Cnpj {
  constructor(private readonly httpService: HttpService) {}

  async findDataCnpj(cnpj: string): Promise<CpjDataType> {
    try {
      // Remove caracteres não numéricos do CNPJ
      const cnpjLimpo = cnpj.replace(/\D/g, '');

      const url = `https://www.receitaws.com.br/v1/cnpj/${cnpjLimpo}`;
      const { data } = await firstValueFrom(this.httpService.get(url));

      // Verifica se houve erro na resposta da API
      if (data.status === 'ERROR') {
        throw new BadRequestError(`Erro ao consultar CNPJ: ${data.message}`);
      }

      return data;
    } catch (error) {
      console.log('🚀 ~ CnpjService ~ findDataCnpj ~ error:', error);
      throw new InternalServerError(
        error.response?.data?.message || 'Erro ao consultar CNPJ na ReceitaWS',
      );
    }
  }
}
