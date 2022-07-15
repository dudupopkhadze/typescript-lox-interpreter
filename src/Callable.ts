import { Interpreter } from "./Interpreter";
import { LiteralValue } from "./Token";

export interface Callable {
  arity(): number;
  call(interpreter: Interpreter, args: LiteralValue[]): LiteralValue;
}
