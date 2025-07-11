export interface EncrypterPortOut {
  encrypt(
    payload: Record<string, unknown>,
    options?: {
      expiresIn?: string | number;
    },
  ): Promise<string>;
}
