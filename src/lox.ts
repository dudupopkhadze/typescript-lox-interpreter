import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
export class Lox {
  start() {
    this.runPrompt();
  }

  private handleInput(input: string) {
    console.log(input);
  }

  private runPrompt() {
    rl.question("> ", (input) => {
      if (input === "exit") return rl.close();
      this.handleInput(input);
      this.runPrompt();
    });
  }
}
