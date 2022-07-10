import { Expression } from "./Expression";
import { Token } from "./Token";

export abstract class Statement {
  abstract accept<T>(visitor: StatementVisitor<T>): T;
}

export interface StatementVisitor<T> {
  visitExpressionStatement(stmt: Expr): T;
  visitPrintStatement(stmt: Print): T;
  visitVarStatement(stmt: Var): T;
}

export class Var extends Statement {
  name: Token;
  initializer: Expression;

  constructor(name: Token, initializer: Expression) {
    super();
    this.name = name;
    this.initializer = initializer;
  }

  accept<T>(visitor: StatementVisitor<T>): T {
    return visitor.visitVarStatement(this);
  }
}

export class Expr extends Statement {
  expression: Expression;
  constructor(expression: Expression) {
    super();
    this.expression = expression;
  }

  accept<T>(visitor: StatementVisitor<T>): T {
    return visitor.visitExpressionStatement(this);
  }
}

export class Print extends Statement {
  expression: Expression;
  constructor(expression: Expression) {
    super();
    this.expression = expression;
  }

  accept<T>(visitor: StatementVisitor<T>): T {
    return visitor.visitPrintStatement(this);
  }
}
