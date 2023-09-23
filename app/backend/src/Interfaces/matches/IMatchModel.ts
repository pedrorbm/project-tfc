import IMatch from './IMatch';
import { UpdateMatch } from '../../types/UpdateMatch';

export default interface IMatchModel {
  findAll(): Promise<IMatch[]>;
  findById(id: number): Promise<IMatch | null>;
  updateMatchProgress(id: number): Promise<number | null>;
  updateMatchGoals(id: number, object: UpdateMatch): Promise<IMatch | null>;
}
