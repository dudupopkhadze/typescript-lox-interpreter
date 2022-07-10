import readline from "readline";
import fs from "fs";
import { Interpreter } from "./Interpreter";
import { Parser } from "./Parser";
import { RuntimeError } from "./RuntimeError";
import { Scanner } from "./Scanner";
import { Token, TokenType } from "./Token";
import path from "path";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export class Lox {
  static interpreter = new Interpreter();
  static hadError: boolean = false;
  static hadRuntimeError = false;
  start() {
    console.log("Welcome to the Lox v1.0.0.");
    const fileName = process.argv.length >= 3 ? process.argv[2] : null;
    if (fileName) {
      return this.runFile(fileName);
    } else {
      this.runPrompt();
    }
  }

  private runFile(fileName: string) {
    console.log(`\nInterpreting file: ${fileName}\n`);
    try {
      const content = fs.readFileSync(path.join(__dirname, fileName), "utf8");
      this.run(content);
    } catch (error) {
      console.log(`Unable to read file: ${fileName}`);
    }

    rl.close();
  }

  private run(input: string) {
    const scanner = new Scanner(input);
    const tokens = scanner.scanTokens();
    const parser = new Parser(tokens);
    const statements = parser.parse()!;
    if (Lox.hadError) process.exit(65);
    if (Lox.hadRuntimeError) process.exit(70);

    Lox.interpreter.interpret(statements);
  }

  private runPrompt() {
    rl.question("> ", (input) => {
      if (input === "exit") return rl.close();
      this.run(input);
      this.runPrompt();
      Lox.hadError = false;
    });
  }

  static runtimeError(error: RuntimeError) {
    console.log(error.message + "\n[line " + error.token.line + "]");
    Lox.hadRuntimeError = true;
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
