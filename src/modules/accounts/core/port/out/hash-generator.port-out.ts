export interface HashGeneratorPortOut {
  hash(plain: string): Promise<string>;
}
