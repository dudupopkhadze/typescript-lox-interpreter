import readline from "readline";
import { AstPrinter } from "./AstPrinter";
import { Parser } from "./Parser";
import { Scanner } from "./Scanner";
import { Token, TokenType } from "./Token";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
export class Lox {
  static hadError: boolean = false;
  start() {
    this.runPrompt();
  }

  private run(input: string) {
    const scanner = new Scanner(input);
    const tokens = scanner.scanTokens();
    const parser = new Parser(tokens);
    const expression = parser.parse()!;
    if (Lox.hadError) return;

    console.log(new AstPrinter().print(expression));
  }

  private runPrompt() {
    rl.question("> ", (input) => {
      if (input === "exit") return rl.close();
      this.run(input);
      this.runPrompt();
      Lox.hadError = false;
    });
  }

  static error(line: number, message: string) {
    this.report(line, "", message);
  }

  private static report(line: number, where: string, message: string) {
    console.error(`[line ${line}] Error  ${where}: ${message}`);
    this.hadError = true;
  }

  static errorWithToken(token: Token, message: string) {
    if (token.type === TokenType.EOF) {
      this.report(token.line, " at end", message);
    } else {
      this.report(token.line, " at '" + token.lexeme + "'", message);
    }
  }
}
