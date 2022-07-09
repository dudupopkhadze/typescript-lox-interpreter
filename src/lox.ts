import readline from "readline";
import { AstPrinter } from "./AstPrinter";
import { Binary, Grouping, Literal, Unary } from "./Expression";
import { Scanner } from "./Scanner";
import { Token, TokenType } from "./Token";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
export class Lox {
  static hadError: boolean = false;
  start() {
    const expression = new Binary(
      new Unary(new Literal(123), new Token(TokenType.MINUS, "-", null, 1)),
      new Grouping(new Literal(45.67)),
      new Token(TokenType.STAR, "*", null, 1)
    );
    console.log(new AstPrinter().print(expression));
    // this.runPrompt();
  }

  private run(input: string) {
    const scanner = new Scanner(input);
    const tokens = scanner.scanTokens();
    tokens.forEach((token) => console.log(token));
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
}
