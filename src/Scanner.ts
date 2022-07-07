import { Token } from "./Token";

export class Scanner {
  source: string;
  constructor(source: string) {
    this.source = source;
  }

  scanTokens(): Token[] {
    return [];
  }
}
