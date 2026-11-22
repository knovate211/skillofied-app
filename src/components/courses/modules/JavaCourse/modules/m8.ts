import type { ModuleData } from '../JavaCourseData';

const mod_m8: ModuleData = {
  id: 'm8',
  title: 'MODULE 8: OBJECT-ORIENTED PROGRAMMING (OOP)',
  overview: 'Master Java Object-Oriented paradigms: Classes, Objects, Constructors, Encapsulation, Inheritance, Polymorphism, Abstraction, and Interfaces.',
  outcomes: [
    'Write encapsulated classes using private variables and getters/setters.',
    'Differentiate abstract classes vs interfaces.',
    'Implement polymorphism using method overriding.'
  ],
  lessons: [
    {
      id: 'm8-l1',
      title: 'Lesson 8.1 Introduction to OOP',
      objectives: [
        'Understand paradigm shifts from procedural programming.',
        'Memorize the four pillars of Object-Oriented logic.'
      ],
      theory: 'Object-Oriented Programming (OOP) is a paradigm that models software components as real-world "objects" that contain both data (state) and methods (behavior). This is vastly different from procedural programming (like C) which separates data from functions. The four core pillars of OOP that organize architecture are: Encapsulation, Inheritance, Polymorphism, and Abstraction.',
      syntax: '// Object Oriented Design models Entities\nclass BankAccount {\n    double balance;\n    void deposit(double amt) { ... }\n}',
      codeExample: 'public class OOPConcept {\n    public static void main(String[] args) {\n        System.out.println("OOP builds modular, reusable software mapped to business logic.");\n    }\n}',
      codeOutput: 'OOP builds modular, reusable software mapped to business logic.',
      takeaways: [
        'OOP makes large codebases vastly easier to maintain, scale, and debug.',
        'An object is self-contained: it knows its own data and how to manipulate it.',
        'Everything in Java revolves around OOP; you cannot write code outside of a Class.'
      ]
    },
    {
      id: 'm8-l2',
      title: 'Lesson 8.2 Classes and Objects',
      objectives: [
        'Define class blueprints.',
        'Instantiate objects into heap memory.'
      ],
      theory: 'A **Class** is a blueprint or template. It defines what attributes and behaviors an entity will have, but it consumes no data memory itself. An **Object** is a concrete instance of that class. You create objects using the `new` keyword, which allocates space in heap memory and returns a reference address back to your variable.',
      syntax: 'ClassName objectName = new ClassName();',
      codeExample: 'class Car {\n    String color;\n    void honk() { System.out.println("Beep!"); }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Car myCar = new Car(); // Instantiation\n        myCar.color = "Red";\n        myCar.honk();\n    }\n}',
      codeOutput: 'Beep!',
      takeaways: [
        'You can create thousands of unique Objects from a single Class blueprint.',
        'Object variables act as remote controls pointing to the data in heap memory.',
        'A class should typically define fields at the top, and methods below.'
      ]
    },
    {
      id: 'm8-l3',
      title: 'Lesson 8.3 Constructors',
      objectives: [
        'Initialize objects with startup data.',
        'Differentiate constructors from standard methods.'
      ],
      theory: 'A Constructor is a special block of code called automatically the exact moment an object is instantiated with `new`. Its purpose is to initialize the object\'s fields. Constructors have two strict rules: they must have the exact same name as the Class, and they absolutely cannot have a return type (not even void).',
      syntax: 'public ClassName(parameters) {\n    // Setup code\n}',
      codeExample: 'class User {\n    String role;\n    // Constructor\n    public User(String assignedRole) {\n        role = assignedRole;\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        User admin = new User("Admin");\n        System.out.println("Role: " + admin.role);\n    }\n}',
      codeOutput: 'Role: Admin',
      takeaways: [
        'If you write zero constructors, Java quietly inserts an empty Default Constructor for you.',
        'If you write any custom constructor, Java removes the default one.',
        'Constructors can be overloaded just like methods.'
      ]
    },
    {
      id: 'm8-l4',
      title: 'Lesson 8.4 this Keyword',
      objectives: [
        'Resolve variable naming collisions.',
        'Reference the current active instance.'
      ],
      theory: 'Inside class methods, the `this` keyword is a reference variable that points to the current object instance executing the method. It is most heavily used in constructors and setter methods to resolve variable shadowing (when a method parameter has the exact same name as a class attribute).',
      syntax: 'public void setAge(int age) {\n    this.age = age; // this.age refers to the class field\n}',
      codeExample: 'class Person {\n    String name;\n    public Person(String name) {\n        // Without `this`, the parameter assigns to itself, doing nothing\n        this.name = name;\n    }\n    public void display() {\n        System.out.println("I am " + this.name);\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Person p = new Person("John");\n        p.display();\n    }\n}',
      codeOutput: 'I am John',
      takeaways: [
        'Using `this.field` clarifies that you are modifying the object state, not a local variable.',
        'You can also use `this()` to call other constructors within the same class.',
        '`this` cannot be used inside static methods, because static methods belong to the class, not an object instance.'
      ]
    },
    {
      id: 'm8-l5',
      title: 'Lesson 8.5 Encapsulation',
      objectives: [
        'Implement data hiding using private modifiers.',
        'Write robust Getter and Setter architectures.'
      ],
      theory: 'Encapsulation is the OOP mechanism of wrapping data (variables) and code acting on the data (methods) together as a single unit. In practice, this means declaring class variables as `private` to lock them away from direct outside access, and providing `public` Getters (to read) and Setters (to write) to enforce validation logic.',
      syntax: 'private int field;\npublic int getField() { return field; }\npublic void setField(int val) { field = val; }',
      codeExample: 'class Bank {\n    private double balance = 1000;\n    \n    public double getBalance() { return balance; }\n    \n    public void withdraw(double amt) {\n        if (amt > 0 && amt <= balance) {\n            balance -= amt;\n        }\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Bank b = new Bank();\n        b.withdraw(400);\n        System.out.println("Remaining: " + b.getBalance());\n    }\n}',
      codeOutput: 'Remaining: 600.0',
      takeaways: [
        'Encapsulation prevents other developers from injecting bad data (e.g. setting health to -500).',
        'It allows you to change internal logic without breaking external code that relies on your class.',
        'Almost all fields in professional Java applications should be private.'
      ]
    },
    {
      id: 'm8-l6',
      title: 'Lesson 8.6 Inheritance',
      objectives: [
        'Establish Is-A hierarchical relationships.',
        'Extend classes to inherit attributes and methods.'
      ],
      theory: 'Inheritance allows a new class (Child/Subclass) to acquire the properties and methods of an existing class (Parent/Superclass) using the `extends` keyword. This promotes massive code reusability. A Dog "Is-A" Animal, so Dog can extend Animal and inherit walking and eating methods, while adding its own barking methods.',
      syntax: 'class ChildClass extends ParentClass {\n    // Additional features\n}',
      codeExample: 'class Animal {\n    void eat() { System.out.println("Eating..."); }\n}\nclass Dog extends Animal {\n    void bark() { System.out.println("Barking!"); }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Dog d = new Dog();\n        d.eat(); // Inherited method\n        d.bark(); // Specific method\n    }\n}',
      codeOutput: 'Eating...\nBarking!',
      takeaways: [
        'Private fields and methods of a parent class are NOT accessible to the child class.',
        'Java supports Multi-level inheritance (A->B->C) but absolutely forbids Multiple inheritance (A extending B and C simultaneously).',
        'The `super` keyword is used in subclasses to access parent constructors and overridden methods.'
      ]
    },
    {
      id: 'm8-l7',
      title: 'Lesson 8.7 Polymorphism',
      objectives: [
        'Implement dynamic method dispatch.',
        'Override parent methods to customize behaviors.'
      ],
      theory: 'Polymorphism ("many forms") allows objects of different classes to be treated as objects of a common superclass. The most powerful form is Method Overriding (Runtime Polymorphism). If a child class provides a specific implementation of a method already defined in its parent, calling that method executes the child\'s version, even if the variable type is the parent class.',
      syntax: '@Override\npublic void parentMethod() {\n    // New logic\n}',
      codeExample: 'class Bird {\n    void sing() { System.out.println("Bird song"); }\n}\nclass Crow extends Bird {\n    @Override\n    void sing() { System.out.println("Caw caw!"); }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Bird myBird = new Crow(); // Parent reference, Child object\n        myBird.sing(); // Calls Crow\'s version dynamically\n    }\n}',
      codeOutput: 'Caw caw!',
      takeaways: [
        'The `@Override` annotation is highly recommended to let the compiler check for spelling mistakes.',
        'Polymorphism allows you to write one method that can accept hundreds of different child object types.',
        'Overloading is compile-time polymorphism; overriding is runtime polymorphism.'
      ]
    },
    {
      id: 'm8-l8',
      title: 'Lesson 8.8 Abstraction',
      objectives: [
        'Hide implementation complexities.',
        'Define abstract classes and methods.'
      ],
      theory: 'Abstraction focuses on hiding complex implementation details and showing only the essential features of an object. You achieve this using the `abstract` keyword. An abstract class acts as a rigid template: it cannot be instantiated itself, and it forces any child class to write the code for its abstract methods.',
      syntax: 'abstract class Vehicle {\n    abstract void startEngine(); // No body allowed!\n}',
      codeExample: 'abstract class Shape {\n    abstract void draw(); // Must be overridden\n}\nclass Circle extends Shape {\n    void draw() {\n        System.out.println("Drawing a circle.");\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Shape s = new Circle();\n        s.draw();\n    }\n}',
      codeOutput: 'Drawing a circle.',
      takeaways: [
        'You can NEVER use `new` to instantiate an abstract class directly.',
        'Abstract classes can contain both abstract methods (no body) and normal methods (with bodies).',
        'It forces subclasses to adhere to a strict structural design.'
      ]
    },
    {
      id: 'm8-l9',
      title: 'Lesson 8.9 Interfaces',
      objectives: [
        'Implement 100% abstract contracts.',
        'Bypass multiple inheritance limitations.'
      ],
      theory: 'An Interface is a completely abstract "contract" that classes can agree to follow using the `implements` keyword. Because Java blocks a class from extending multiple parents, interfaces are the solution. A class can implement infinite interfaces. By default, all methods inside an interface are implicitly public and abstract.',
      syntax: 'interface Playable {\n    void play();\n}\nclass Video implements Playable {\n    public void play() { ... }\n}',
      codeExample: 'interface Drivable {\n    void drive();\n}\nclass Truck implements Drivable {\n    public void drive() {\n        System.out.println("Truck driving heavily.");\n    }\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        Drivable t = new Truck();\n        t.drive();\n    }\n}',
      codeOutput: 'Truck driving heavily.',
      takeaways: [
        'Fields in interfaces are always implicitly `public static final` (constants).',
        'A class must implement every single method defined in the interface, or declare itself abstract.',
        'Modern Java (8+) allows `default` and `static` methods with bodies inside interfaces, but the primary use is still abstract contracts.'
      ]
    }
  ],
  exercise: {
    title: 'Bank account hierarchy',
    description: 'Model encapsulation, inheritance and polymorphism with a small account hierarchy.',
    instructions: ['Create an abstract Account with a private balance and public deposit/withdraw methods.', 'Derive SavingsAccount and CurrentAccount, each overriding calculateInterest().', 'Store both in an Account[] and call the overridden method to demonstrate runtime polymorphism.'],
    starterCode: 'abstract class Account {\n    private double balance;\n    abstract double calculateInterest();\n    // TODO: encapsulated deposit and withdraw\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        // TODO: build an Account[] and print each interest value\n    }\n}',
    expectedOutput: 'Savings interest: 400.0\nCurrent interest: 0.0',
    type: 'code_sandbox'
  },
  quiz: [
    { id: 1, question: 'Which pillar hides implementation details and exposes only functionality?', options: ["A. Encapsulation", "B. Abstraction", "C. Inheritance", "D. Polymorphism"], correctAnswer: "B. Abstraction" },
    { id: 2, question: 'Which keyword points to the current object instance?', options: ["A. super", "B. base", "C. this", "D. current"], correctAnswer: "C. this" },
    { id: 3, question: 'Can a Java class extend multiple parent classes?', options: ["A. Yes", "B. Only abstract classes", "C. Only in interfaces", "D. No"], correctAnswer: "D. No" },
    { id: 4, question: 'Which keyword implements an interface contract?', options: ["A. implements", "B. extends", "C. inherits", "D. uses"], correctAnswer: "A. implements" },
    { id: 5, question: 'What is compile-time polymorphism?', options: ['A. Method Overriding', 'B. Method Overloading', 'C. Garbage Collection', 'D. Inheritance'], correctAnswer: 'B. Method Overloading' },
    { id: 6, question: 'Which OOP pillar hides internal state behind methods?', options: ["A. Inheritance", "B. Polymorphism", "C. Encapsulation", "D. Abstraction"], correctAnswer: "C. Encapsulation" },
    { id: 7, question: 'What is the purpose of a constructor?', options: ["A. To destroy objects", "B. To return a value", "C. To declare a class", "D. To initialise a new object"], correctAnswer: "D. To initialise a new object" },
    { id: 8, question: 'What does a constructor return?', options: ["A. Nothing, it has no return type", "B. void", "C. The class type", "D. null"], correctAnswer: "A. Nothing, it has no return type" },
    { id: 9, question: 'What happens if you define no constructor at all?', options: ['A. Compile error', 'B. Java provides a default no-arg constructor', 'C. The class cannot be instantiated', 'D. All fields become final'], correctAnswer: 'B. Java provides a default no-arg constructor' },
    { id: 10, question: 'What does the `this` keyword refer to?', options: ["A. The superclass", "B. A static context", "C. The current object instance", "D. The class itself"], correctAnswer: "C. The current object instance" },
    { id: 11, question: 'Which keyword is used to inherit from a class?', options: ["A. implements", "B. inherits", "C. super", "D. extends"], correctAnswer: "D. extends" },
    { id: 12, question: 'How many classes can a Java class extend directly?', options: ['A. One', 'B. Two', 'C. Unlimited', 'D. Zero'], correctAnswer: 'A. One' },
    { id: 13, question: 'Which enables multiple inheritance of type in Java?', options: ['A. Abstract classes', 'B. Interfaces', 'C. Inner classes', 'D. Static classes'], correctAnswer: 'B. Interfaces' },
    { id: 14, question: 'Compile-time polymorphism is achieved through:', options: ["A. Overriding", "B. Inheritance", "C. Overloading", "D. Encapsulation"], correctAnswer: "C. Overloading" },
    { id: 15, question: 'Runtime polymorphism is achieved through:', options: ["A. Overloading", "B. Static methods", "C. Constructors", "D. Method overriding"], correctAnswer: "D. Method overriding" },
    { id: 16, question: 'Can an abstract class have a constructor?', options: ['A. Yes', 'B. No', 'C. Only if it has no abstract methods', 'D. Only a private one'], correctAnswer: 'A. Yes' },
    { id: 17, question: 'Can you instantiate an abstract class directly?', options: ['A. Yes', 'B. No', 'C. Only with new', 'D. Only in the same package'], correctAnswer: 'B. No' },
    { id: 18, question: 'Which access modifier allows access in subclasses and the same package?', options: ["A. private", "B. public", "C. protected", "D. default"], correctAnswer: "C. protected" },
    { id: 19, question: 'What does `super()` do?', options: ["A. Creates a new object", "B. Calls a static method", "C. Returns the parent class", "D. Calls the superclass constructor"], correctAnswer: "D. Calls the superclass constructor" },
    { id: 20, question: 'Since Java 8, what can an interface contain besides abstract methods?', options: ["A. default and static methods", "B. Nothing else", "C. Constructors", "D. Instance fields"], correctAnswer: "A. default and static methods" }
  ],
  assignment: {
    prompts: [
      { kind: 'code', prompt: 'Design a Class structure representing a Bank Account with encapsulation.', language: 'java', starterCode: 'class BankAccount {\n    // Private fields, public deposit/withdraw, no direct balance access\n}\n\npublic class Solution {\n    public static void main(String[] args) {\n        // Demonstrate deposit, withdraw and a rejected overdraft\n    }\n}' },
      {
        kind: 'mcq',
        prompt: 'Which of the following is a key difference between abstract classes and interfaces in Java 8 and later?',
        options: [
          "A. An interface can have instance fields; an abstract class cannot.",
          "B. An abstract class can have instance fields and constructors; an interface cannot have instance fields or constructors.",
          "C. A class can extend multiple abstract classes but can implement only one interface.",
          "D. Interfaces cannot have any method implementations.",
        ],
        correctAnswer: "B. An abstract class can have instance fields and constructors; an interface cannot have instance fields or constructors."
      }
    ]
  }
};

export default mod_m8;
