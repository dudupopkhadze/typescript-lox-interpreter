import { LiteralValue, Token } from "./Token";

export abstract class Expression {
  abstract accept<T>(visitor: Visitor<T>): T;
}

export interface Visitor<T> {
  visitBinaryExpr(expr: Binary): T;
  visitUnaryExpr(expr: Unary): T;
  visitGroupingExpr(expr: Grouping): T;
  visitLiteralExpr(expr: Literal): T;
}

class Binary extends Expression {
  left: Expression;
  right: Expression;
  operator: Token;

  constructor(left: Expression, right: Expression, operator: Token) {
    super();
    this.left = left;
    this.right = right;
    this.operator = operator;
  }

  accept<T>(visitor: Visitor<T>): T {
    return visitor.visitBinaryExpr(this);
  }
}

class Unary extends Expression {
  right: Expression;
  operator: Token;

  constructor(right: Expression, operator: Token) {
    super();
    this.right = right;
    this.operator = operator;
  }

  accept<T>(visitor: Visitor<T>): T {
    return visitor.visitUnaryExpr(this);
  }
}

class Grouping extends Expression {
  expression: Expression;

  constructor(expression: Expression) {
    super();
    this.expression = expression;
  }

  accept<T>(visitor: Visitor<T>): T {
    return visitor.visitGroupingExpr(this);
  }
}

class Literal extends Expression {
  value: LiteralValue;

  constructor(value: LiteralValue) {
    super();
    this.value = value;
  }

  accept<T>(visitor: Visitor<T>): T {
    return visitor.visitLiteralExpr(this);
  }
}
