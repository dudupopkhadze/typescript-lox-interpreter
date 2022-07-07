import readline from "readline";
import { Scanner } from "./Scanner";

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
