import { Interpreter } from "./Interpreter";
import { LiteralValue } from "./Token";
import { Function } from "./Statement";
import { Environment } from "./Enviroment";

export interface Callable {
  arity(): number;
  call(interpreter: Interpreter, args: LiteralValue[]): LiteralValue;
}

export class CallableFunc implements Callable {
  declaration: Function;

  constructor(dec: Function) {
    this.declaration = dec;
  }
  arity(): number {
    return this.declaration.params.length;
  }

  call(interpreter: Interpreter, args: unknown[]): unknown {
    const environment = new Environment(interpreter.global);
    for (let i = 0; i < this.declaration.params.length; i++) {
      environment.define(this.declaration.params[i]!.lexeme, args[i]);
    }
    interpreter.executeBlock(this.declaration.body, environment);
    return null;
  }
}
