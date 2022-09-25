# TSLox -> TypeScript Lox Interpreter

Lox is a simple dynamically typed programming language with a static scope, built-in clock and many more good features.

TSLox is a simple interpreter built from scratch using TS.

# Running Lox

- clone this repo
- run `npm install`
- run `npm run start` or `npm run start FULL/PATH/TO/test.lox" if you want to interpret code from a file

# Lox Description

**Rules**:

- just use semicolons, otherwise ur golden :)

Lox can print anything you want

      print 5;
      // outputs 5

Full support of arithmetic operations

      print 5 + 3;
      // outputs 8

**_Variables_**

      var a;
      var b = "string";
      var c = 5;
      var d = a;

**_Functions_**

      fun add(a, b) {
        return a + b;
      }

      var x = 5;
      var y = 10;

      print add(x, y); // 15

**_For Loop_**

      for (var i = 0; i < 20; i = i + 1) {
        print i;
      }

**_While Loop_**

      var i = 0;
      while(i < 20){
        print i;
        i = i + 1;
      }

**_Branches_**

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

**_Recursion_**

      fun fib(n) {
          if (n <= 1) return n;
          return fib(n - 2) + fib(n - 1);
      }

      for (var i = 0; i < 20; i = i + 1) {
        print fib(i);
      }

**_Clock_**

      var time = clock();
      print time;
      //outputs same as Date.now()

**_Closures_**

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
