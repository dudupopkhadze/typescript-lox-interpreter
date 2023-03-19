import { InputSource, InputSourceFactory } from "./InputSource";
import { Lox } from "./core/lox";
import { LOX_VERSION } from "./util/constants";

const executeFileCommands = (lox: Lox, fileName: string) => {
  const inputSource: InputSource =
    InputSourceFactory.createFileInputSource(fileName);
  const input = inputSource.getInput();
  input && lox.run(input);
};

const executeCliCommands = (lox: Lox) => {
  const inputSource: InputSource = InputSourceFactory.createCliInputSource();
  while (true) {
    const input = inputSource.getInput();
    if (!input) {
      break;
    }
    lox.run(input);
  }
};

const runLoxInterpreter = () => {
  const fileName = process.argv.length >= 3 ? process.argv[2] : null;
  const lox: Lox = new Lox();
  if (fileName) {
    executeFileCommands(lox, fileName);
  } else {
    executeCliCommands(lox);
  }
};

console.log(`Welcome to the Lox ${LOX_VERSION}`);
runLoxInterpreter();
