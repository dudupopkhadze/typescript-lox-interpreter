# TSLox -> TypeScript Lox Interpreter

 Lox is a simple dynamically typed programming language with a static scope, built-in clock and many more good features. 
 
 TSLox is a simple  interpreter built from scratch using TS.

# Running Lox

- clone this repo
- run `npm install`
- run `npm run build` or `npm run build test.lox" if you want to interpret code from a file

# Lox Description

**Rules**:
  - just use semicolons, otherwise ur golden :)

Lox can print anything you want

      print 5;
      // outputs 5


Full support of arithmetic operations

      print 5 + 3;
      // outputs 8

***Variables***


      var a;
      var b = "string";
      var c = 5;
      var d = a;


***Functions***

      fun add(a, b) {
        return a + b;
      }

      var x = 5;
      var y = 10;

      print add(x, y); // 15
      
***For Loop***

      for (var i = 0; i < 20; i = i + 1) {
        print i;
      }
     
 ***While Loop***

      var i = 0;
      while(i < 20){
        print i;
        i = i + 1;
      }
      
 ***Branches***
 
      fun sayHello(name){
        if(name == "kevin"){
            print "Not to you kevin";
        } else {
            print "Hey " + name;
        }
      }

      sayHello("Lebron");
      // outputs "Hey Lebron"
      sayHello("kevin");
      // outputs "Not to you kevin"
     
***Recursion***

      fun fib(n) {
          if (n <= 1) return n;
          return fib(n - 2) + fib(n - 1);
      }

      for (var i = 0; i < 20; i = i + 1) {
        print fib(i);
      }   

***Clock***

      var time = clock();
      print time;
      //outputs same as Date.now()

***Closures***

      fun makeCounter() {
        var i = 0;
        fun count() {
            i = i + 1;
            print i; 
        }
        return count;
      }

      var counter = makeCounter();
      counter(); // "1".
      counter(); // "2"
      counter(); // "3"
      counter(); // "4"

