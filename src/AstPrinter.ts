import {
  Binary,
  Expression,
  ExpressionVisitor,
  Grouping,
  Literal,
  Unary,
} from "./Expression";

export class AstPrinter implements ExpressionVisitor<string> {
  print(expr: Expression) {
    return expr.accept(this);
  }

  visitBinaryExpr(expr: Binary): string {
    return this.parenthesize(expr.operator.lexeme, expr.left, expr.right);
  }

  visitGroupingExpr(expr: Grouping): string {
    return this.parenthesize("group", expr.expression);
  }

  visitLiteralExpr(expr: Literal): string {
    if (expr.value === null) return "nil";
    return expr.value as string;
  }

  visitUnaryExpr(expr: Unary): string {
    return this.parenthesize(expr.operator.lexeme, expr.right);
  }

  private parenthesize(name: string, ...exprs: Expression[]) {
    let str = "";
    str += `( ${name}`;

    exprs.forEach((expr) => {
      str += ` ${expr.accept(this)}`;
    });
    str += ")";

    return str;
  }
}
