import { UnitOfWork } from 'src/shared/application/unit-of-work/unit-of-work';
import { Transactional } from '../database/typeorm/decorators/transactional.decorator';

export class UnitOfWorkService implements UnitOfWork {
  @Transactional()
  async execute<T>(work: () => Promise<T>): Promise<T> {
    return work();
  }
}
