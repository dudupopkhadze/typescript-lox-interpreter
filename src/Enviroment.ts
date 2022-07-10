import { RuntimeError } from "./RuntimeError";
import { LiteralValue, Token } from "./Token";

export class Environment {
  values: Record<string, LiteralValue>;
  constructor() {
    this.values = {};
  }

  define(name: string, value: LiteralValue) {
    this.values[name] = value;
  }

  assign(name: Token, value: LiteralValue) {
    const curValue = this.values[name.lexeme];
    if (curValue === undefined) {
      throw new RuntimeError(
        name,
        "Undefined variable '" + name.lexeme + "' ."
      );
    }

    this.values[name.lexeme] = value;
  }

  get(name: Token) {
    const curValue = this.values[name.lexeme];
    if (curValue !== undefined) {
      return curValue;
    }

    throw new RuntimeError(name, "Undefined variable '" + name.lexeme + "' .");
  }
}
