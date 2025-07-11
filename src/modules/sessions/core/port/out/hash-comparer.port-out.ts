export interface HashComparerPortOut {
  compare(plain: string, hash: string): Promise<boolean>;
}
