import { IStatus } from 'types/constants/status';

export enum StatusId {
  Active = 1,
  InProgress,
  Pending,
  Disabled,
  Banned,
  Deleted,
}

export const status: Array<IStatus> = [
  { id: StatusId.Active, rank: 1, langKey: 'active' },
  { id: StatusId.InProgress, rank: 2, langKey: 'inProgress' },
  { id: StatusId.Pending, rank: 3, langKey: 'pending' },
  { id: StatusId.Disabled, rank: 4, langKey: 'disabled' },
  { id: StatusId.Banned, rank: 5, langKey: 'banned' },
  { id: StatusId.Deleted, rank: 6, langKey: 'deleted' },
];
