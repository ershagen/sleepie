import * as migration_20260822_155314_initial from './20260822_155314_initial';

export const migrations = [
  {
    up: migration_20260822_155314_initial.up,
    down: migration_20260822_155314_initial.down,
    name: '20260822_155314_initial'
  },
];
