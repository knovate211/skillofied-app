import type { ModuleData } from '../JavaCourseData';

const mod_m11: ModuleData = {
  id: 'm11',
  title: 'MODULE 11: FILE HANDLING',
  overview: 'Learn reading, writing, file structures, BufferedReader, and BufferedWriter configurations in Java.',
  outcomes: [
    'Write text strings directly to disk files.',
    'Parse large files using BufferedReader.',
    'Manage system resources using Try-with-resources.'
  ],
  lessons: [
    {
      "id": "m11-l1",
      "title": "Lesson 11.1 Introduction to Files",
      "objectives": [
        "Understand streams and the java.io package.",
        "Inspect and create files with the File class."
      ],
      "theory": "File handling lets a program keep data after it exits. Java models all input and output as **streams** — ordered sequences of data flowing to or from a source.\n\nThere are two families:\n\n- **Byte streams** (`InputStream` / `OutputStream`) move raw 8-bit data. Use these for images, PDFs, and any binary format.\n- **Character streams** (`Reader` / `Writer`) move text and handle character encoding for you. Use these for `.txt`, `.csv`, `.json`.\n\nThe `java.io.File` class does **not** hold file contents. It is a handle describing a *path*, which may or may not point at something that exists. You use it to test existence, read metadata, create empty files, and delete them.\n\nModern Java also offers `java.nio.file.Path` and `Files`, which are more capable; `File` remains the gentlest introduction and is still ubiquitous in existing codebases.",
      "syntax": "File file = new File(\"data/notes.txt\");\nboolean created = file.createNewFile();\nboolean exists  = file.exists();",
      "codeExample": "import java.io.File;\nimport java.io.IOException;\n\npublic class FileIntro {\n    public static void main(String[] args) {\n        File file = new File(\"notes.txt\");\n\n        try {\n            if (file.createNewFile()) {\n                System.out.println(\"Created: \" + file.getName());\n            } else {\n                System.out.println(\"Already exists: \" + file.getName());\n            }\n\n            System.out.println(\"Absolute path : \" + file.getAbsolutePath());\n            System.out.println(\"Writable      : \" + file.canWrite());\n            System.out.println(\"Size in bytes : \" + file.length());\n\n        } catch (IOException e) {\n            System.out.println(\"I/O error: \" + e.getMessage());\n        }\n    }\n}",
      "codeOutput": "Created: notes.txt\nAbsolute path : /home/user/project/notes.txt\nWritable      : true\nSize in bytes : 0",
      "mistakes": [
        "Assuming `new File(\"x.txt\")` creates the file. It only creates the *object*; `createNewFile()` touches the disk.",
        "Using relative paths and being surprised by the location — they resolve against the JVM working directory, not the source folder.",
        "Forgetting that every file operation can throw `IOException`, a checked exception you must handle or declare."
      ],
      "takeaways": [
        "Byte streams for binary data, character streams for text.",
        "`File` represents a path, not content.",
        "All of java.io is checked-exception based: wrap calls in try-catch or declare `throws IOException`."
      ]
    },
    {
      "id": "m11-l2",
      "title": "Lesson 11.2 Reading Files",
      "objectives": [
        "Read a text file with FileReader and Scanner.",
        "Handle the end-of-file signal correctly."
      ],
      "theory": "`FileReader` is the simplest character-stream reader. Its `read()` method returns the next character as an `int`, and returns **-1** when the stream is exhausted. That `-1` sentinel is why the return type is `int` rather than `char` — every real char value is non-negative, so -1 can unambiguously mean \"end of file\".\n\nReading one character at a time works but hits the disk constantly, so it is slow for anything sizeable. For line-oriented text most developers reach for `Scanner`, which offers the familiar `hasNextLine()` / `nextLine()` pair, or `BufferedReader` (covered in Lesson 11.4) when throughput matters.\n\nWhatever you use, the stream holds an operating-system file handle. Leaking handles will eventually exhaust the OS limit, so closing is mandatory.",
      "syntax": "FileReader reader = new FileReader(\"notes.txt\");\nint ch;\nwhile ((ch = reader.read()) != -1) { ... }\nreader.close();",
      "codeExample": "import java.io.File;\nimport java.io.FileReader;\nimport java.io.FileNotFoundException;\nimport java.io.IOException;\nimport java.util.Scanner;\n\npublic class ReadingFiles {\n    public static void main(String[] args) {\n        // Approach 1: character-by-character with FileReader\n        try (FileReader reader = new FileReader(\"notes.txt\")) {\n            int ch;\n            while ((ch = reader.read()) != -1) {\n                System.out.print((char) ch);\n            }\n        } catch (IOException e) {\n            System.out.println(\"Read failed: \" + e.getMessage());\n        }\n\n        // Approach 2: line-by-line with Scanner\n        try (Scanner scanner = new Scanner(new File(\"notes.txt\"))) {\n            int lineNumber = 1;\n            while (scanner.hasNextLine()) {\n                System.out.println(lineNumber++ + \": \" + scanner.nextLine());\n            }\n        } catch (FileNotFoundException e) {\n            System.out.println(\"File not found.\");\n        }\n    }\n}",
      "codeOutput": "Hello Java\nFile handling is useful\n1: Hello Java\n2: File handling is useful",
      "mistakes": [
        "Declaring the loop variable as `char` — the -1 sentinel then wraps around and the loop never terminates.",
        "Calling `nextLine()` without first checking `hasNextLine()`, which throws `NoSuchElementException` at the end of the file.",
        "Not closing the reader, leaking OS file handles."
      ],
      "takeaways": [
        "`read()` returns `int`; -1 means end of stream.",
        "`Scanner` is convenient for line-based reads, `FileReader` for raw character access.",
        "Always close streams — ideally with try-with-resources."
      ]
    },
    {
      "id": "m11-l3",
      "title": "Lesson 11.3 Writing Files",
      "objectives": [
        "Write text with FileWriter.",
        "Choose between overwrite and append mode.",
        "Understand flushing."
      ],
      "theory": "`FileWriter` sends characters to a file. Two details decide whether it behaves the way you expect.\n\n**Mode.** `new FileWriter(\"log.txt\")` **truncates** the file to zero length the moment it is opened — existing content is gone. Passing `true` as a second argument (`new FileWriter(\"log.txt\", true)`) opens it in **append** mode instead, adding to the end. Truncating a log file by accident is one of the most common beginner mistakes in Java I/O.\n\n**Buffering.** Writes are held in memory and only pushed to disk when the buffer fills, when you call `flush()`, or when you `close()`. If your program exits without closing, the buffered text is silently lost. Closing implies a flush, which is one more reason try-with-resources is the right default.\n\nUse `System.lineSeparator()` rather than a hard-coded `\\n` if the file must be portable across Windows and Unix.",
      "syntax": "FileWriter writer = new FileWriter(\"log.txt\", true); // true = append\nwriter.write(\"text\");\nwriter.close();  // flushes automatically",
      "codeExample": "import java.io.FileWriter;\nimport java.io.IOException;\n\npublic class WritingFiles {\n    public static void main(String[] args) {\n        // Overwrite mode: wipes any existing content\n        try (FileWriter writer = new FileWriter(\"report.txt\")) {\n            writer.write(\"Quarterly Report\\n\");\n            writer.write(\"================\\n\");\n            writer.write(\"Revenue: 1,250,000\\n\");\n            System.out.println(\"Report written.\");\n        } catch (IOException e) {\n            System.out.println(\"Write failed: \" + e.getMessage());\n        }\n\n        // Append mode: adds to the end, keeps existing content\n        try (FileWriter appender = new FileWriter(\"report.txt\", true)) {\n            appender.write(\"Growth: 12.4%\" + System.lineSeparator());\n            System.out.println(\"Footer appended.\");\n        } catch (IOException e) {\n            System.out.println(\"Append failed: \" + e.getMessage());\n        }\n    }\n}",
      "codeOutput": "Report written.\nFooter appended.",
      "mistakes": [
        "Forgetting the `true` append flag and silently destroying an existing file.",
        "Never calling `close()` or `flush()`, so buffered output never reaches disk.",
        "Hard-coding `\\n` in files that Windows tools will open — use `System.lineSeparator()`."
      ],
      "takeaways": [
        "One-argument `FileWriter` truncates; the two-argument form with `true` appends.",
        "Output is buffered — `close()` flushes it for you.",
        "`write()` accepts a String, a char array, or a single int character code."
      ]
    },
    {
      "id": "m11-l4",
      "title": "Lesson 11.4 BufferedReader",
      "objectives": [
        "Wrap a Reader for efficient line-based input.",
        "Compare BufferedReader with Scanner."
      ],
      "theory": "`BufferedReader` is a **decorator**: it wraps another `Reader` and adds an in-memory buffer, typically 8 KB. Instead of one system call per character, it fetches a large block at a time and serves your reads from memory. On a large file this is routinely an order of magnitude faster than a bare `FileReader`.\n\nIts headline method is `readLine()`, which returns the next line without its terminator, or `null` at end of file. Note the sentinel differs from `read()`: **`null`, not -1**.\n\n`BufferedReader` versus `Scanner`:\n\n- `BufferedReader` is faster, has a bigger buffer, and is synchronised (thread-safe).\n- `Scanner` parses — `nextInt()`, `nextDouble()` — and splits on regex, but is slower and not thread-safe.\n\nFor bulk reading of lines, `BufferedReader` wins. For interactive parsing of mixed types, `Scanner` is more convenient.",
      "syntax": "BufferedReader br = new BufferedReader(new FileReader(\"data.txt\"));\nString line;\nwhile ((line = br.readLine()) != null) { ... }",
      "codeExample": "import java.io.BufferedReader;\nimport java.io.FileReader;\nimport java.io.IOException;\n\npublic class BufferedReaderDemo {\n    public static void main(String[] args) {\n        try (BufferedReader br = new BufferedReader(new FileReader(\"employees.csv\"))) {\n\n            String header = br.readLine();  // consume the header row\n            System.out.println(\"Columns: \" + header);\n\n            String line;\n            int count = 0;\n            double totalSalary = 0;\n\n            while ((line = br.readLine()) != null) {\n                String[] parts = line.split(\",\");\n                String name = parts[0];\n                double salary = Double.parseDouble(parts[1]);\n\n                totalSalary += salary;\n                count++;\n                System.out.println(name + \" earns \" + salary);\n            }\n\n            System.out.println(\"Average salary: \" + (totalSalary / count));\n\n        } catch (IOException e) {\n            System.out.println(\"Error reading file: \" + e.getMessage());\n        }\n    }\n}",
      "codeOutput": "Columns: name,salary\nAsha earns 82000.0\nRavi earns 74000.0\nMeera earns 91000.0\nAverage salary: 82333.33333333333",
      "mistakes": [
        "Testing `readLine() != -1`. The end-of-file sentinel for `readLine()` is `null`.",
        "Calling `readLine()` twice inside one loop iteration, which silently skips every other line.",
        "Assuming `readLine()` keeps the newline character — it strips it."
      ],
      "takeaways": [
        "`BufferedReader` wraps another Reader and buffers it for speed.",
        "`readLine()` returns `null` at end of file.",
        "Prefer `BufferedReader` for large files, `Scanner` for typed parsing."
      ]
    },
    {
      "id": "m11-l5",
      "title": "Lesson 11.5 BufferedWriter",
      "objectives": [
        "Wrap a Writer for efficient output.",
        "Use newLine() for portable line endings.",
        "Apply try-with-resources to I/O."
      ],
      "theory": "`BufferedWriter` is the output counterpart to `BufferedReader`. It wraps a `Writer` and accumulates characters in memory, issuing one disk write per full buffer instead of one per call. Writing ten thousand short lines through a bare `FileWriter` means ten thousand system calls; through a `BufferedWriter` it means a handful.\n\nIt adds `newLine()`, which emits the platform's correct line separator — `\\r\\n` on Windows, `\\n` on Linux and macOS — so your files stay portable without you thinking about it.\n\nBecause output sits in the buffer until flushed, **closing is not optional**. `try-with-resources` is the right tool: any object implementing `AutoCloseable` declared in the parentheses is closed automatically when the block exits, even if an exception is thrown. Resources are closed in reverse order of declaration, so wrapping `new BufferedWriter(new FileWriter(...))` in a single declaration correctly closes the buffer first and the underlying file second.",
      "syntax": "try (BufferedWriter bw = new BufferedWriter(new FileWriter(\"out.txt\", true))) {\n    bw.write(\"line\");\n    bw.newLine();\n}   // flushed and closed automatically",
      "codeExample": "import java.io.BufferedWriter;\nimport java.io.FileWriter;\nimport java.io.IOException;\n\npublic class BufferedWriterDemo {\n    public static void main(String[] args) {\n        String[] transactions = {\n            \"TXN001,DEPOSIT,5000\",\n            \"TXN002,WITHDRAW,1200\",\n            \"TXN003,DEPOSIT,3400\"\n        };\n\n        // try-with-resources: no explicit close(), no leak on exception\n        try (BufferedWriter bw = new BufferedWriter(new FileWriter(\"ledger.csv\"))) {\n\n            bw.write(\"id,type,amount\");\n            bw.newLine();\n\n            for (String txn : transactions) {\n                bw.write(txn);\n                bw.newLine();\n            }\n\n            System.out.println(\"Wrote \" + transactions.length + \" transactions.\");\n\n        } catch (IOException e) {\n            System.out.println(\"Write failed: \" + e.getMessage());\n        }\n\n        // Appending an audit line later\n        try (BufferedWriter bw = new BufferedWriter(new FileWriter(\"ledger.csv\", true))) {\n            bw.write(\"# audited\");\n            bw.newLine();\n            System.out.println(\"Audit marker appended.\");\n        } catch (IOException e) {\n            System.out.println(\"Append failed: \" + e.getMessage());\n        }\n    }\n}",
      "codeOutput": "Wrote 3 transactions.\nAudit marker appended.",
      "mistakes": [
        "Exiting without closing, so the buffer is discarded and the file ends up empty.",
        "Using `write(\"\\n\")` instead of `newLine()`, producing files that look like one long line in Windows Notepad.",
        "Declaring the resource *outside* the try parentheses — it is then not managed and will not be auto-closed."
      ],
      "takeaways": [
        "`BufferedWriter` batches writes; always close it to flush.",
        "`newLine()` writes the platform-correct separator.",
        "try-with-resources closes every declared `AutoCloseable` in reverse order, even when an exception is thrown."
      ]
    }
  ],
  exercise: {
    title: 'CSV reader and writer',
    description: 'Write records to a CSV with BufferedWriter, then read them back with BufferedReader.',
    instructions: ['Write a header row followed by three data rows, using newLine() rather than "\\n".', 'Wrap both streams in try-with-resources so they always close.', 'Read the file back, skip the header, and compute the average of the numeric column.'],
    starterCode: 'import java.io.*;\n\npublic class Solution {\n    public static void main(String[] args) {\n        // TODO: write ledger.csv, then read it back and average the amounts\n    }\n}',
    expectedOutput: 'Wrote 3 rows\nAverage amount: 3200.0',
    type: 'code_sandbox'
  },
  quiz: [
    { id: 1, question: 'Which class reads files line by line?', options: ["A. BufferedReader", "B. FileReader", "C. Scanner", "D. FileInputStream"], correctAnswer: "A. BufferedReader" },
    { id: 2, question: 'Which construct automatically closes resources?', options: ['A. try catch finally', 'B. Try-with-resources', 'C. garbage collection', 'D. finalize()'], correctAnswer: 'B. Try-with-resources' },
    { id: 3, question: 'How do you check if a file exists?', options: ["A. file.has()", "B. file.check()", "C. file.exists()", "D. file.load()"], correctAnswer: "C. file.exists()" },
    { id: 4, question: 'Which FileWriter constructor appends text to an existing file?', options: ["A. new FileWriter(\"file.txt\")", "B. new FileWriter(\"file.txt\", \"append\")", "C. new FileWriter(true)", "D. new FileWriter(\"file.txt\", true)"], correctAnswer: "D. new FileWriter(\"file.txt\", true)" },
    { id: 5, question: 'Which package contains File handling classes?', options: ["A. java.io", "B. java.util", "C. java.lang", "D. java.net"], correctAnswer: "A. java.io" },
    { id: 6, question: 'Which stream family should you use for binary data such as images?', options: ['A. Reader/Writer', 'B. InputStream/OutputStream', 'C. Scanner', 'D. BufferedReader'], correctAnswer: 'B. InputStream/OutputStream' },
    { id: 7, question: 'What does `FileReader.read()` return at end of file?', options: ['A. 0', 'B. null', 'C. -1', 'D. It throws EOFException'], correctAnswer: 'C. -1' },
    { id: 8, question: 'What does `BufferedReader.readLine()` return at end of file?', options: ["A. -1", "B. \"\"", "C. It throws", "D. null"], correctAnswer: "D. null" },
    { id: 9, question: 'Which FileWriter constructor appends instead of overwriting?', options: ["A. new FileWriter(path, true)", "B. new FileWriter(path)", "C. new FileWriter(path, \"append\")", "D. FileWriter.append(path)"], correctAnswer: "A. new FileWriter(path, true)" },
    { id: 10, question: 'What does `new File("x.txt")` actually do?', options: ['A. Creates the file on disk', 'B. Creates only an object representing a path', 'C. Opens a stream', 'D. Deletes the file'], correctAnswer: 'B. Creates only an object representing a path' },
    { id: 11, question: 'Which method actually creates an empty file on disk?', options: ["A. file.create()", "B. file.mkdir()", "C. file.createNewFile()", "D. file.write()"], correctAnswer: "C. file.createNewFile()" },
    { id: 12, question: 'Why is BufferedWriter faster than a bare FileWriter?', options: ["A. It compresses data before writing it to disk", "B. It uses multiple threads", "C. It skips validation", "D. It batches writes in memory before hitting disk"], correctAnswer: "D. It batches writes in memory before hitting disk" },
    { id: 13, question: 'What does `BufferedWriter.newLine()` write?', options: ["A. The platform-specific line separator", "B. Always \\n", "C. Always \\r\\n", "D. A single space character between words"], correctAnswer: "A. The platform-specific line separator" },
    { id: 14, question: 'What happens if you never close a BufferedWriter?', options: ['A. Nothing', 'B. Buffered data may never reach disk', 'C. The file is deleted', 'D. It throws immediately'], correctAnswer: 'B. Buffered data may never reach disk' },
    { id: 15, question: 'In what order does try-with-resources close resources?', options: ["A. Declaration order", "B. Random", "C. Reverse declaration order", "D. Alphabetical"], correctAnswer: "C. Reverse declaration order" },
    { id: 16, question: 'What interface must a class implement to be used in try-with-resources?', options: ["A. Serializable", "B. Runnable", "C. Comparable", "D. AutoCloseable"], correctAnswer: "D. AutoCloseable" },
    { id: 17, question: 'Which checked exception do most java.io operations throw?', options: ['A. IOException', 'B. RuntimeException', 'C. SQLException', 'D. FileException'], correctAnswer: 'A. IOException' },
    { id: 18, question: 'Why must the loop variable for `read()` be an `int` rather than a `char`?', options: ["A. char reads are slower for large streams", "B. So the -1 end-of-stream sentinel can be represented", "C. Convention only", "D. To support Unicode"], correctAnswer: 'B. So the -1 end-of-stream sentinel can be represented' },
    { id: 19, question: 'Which is generally faster for reading many lines?', options: ["A. Scanner", "B. FileReader alone", "C. BufferedReader", "D. They are identical"], correctAnswer: "C. BufferedReader" },
    { id: 20, question: 'Against what does a relative file path resolve?', options: ["A. The source folder", "B. The user home directory", "C. The classpath root", "D. The JVM working directory"], correctAnswer: "D. The JVM working directory" }
  ],
  assignment: {
    prompts: [
      { kind: 'code', prompt: 'Write a program that copies the contents of source.txt to destination.txt using Try-with-resources.', language: 'java', starterCode: 'import java.io.*;\n\npublic class Solution {\n    public static void main(String[] args) {\n        // Write lines to a file, then read them back and print them\n    }\n}' },
      {
        kind: 'mcq',
        prompt: 'What is the primary benefit of wrapping a FileReader inside a BufferedReader in Java I/O?',
        options: [
          "A. It buffers input for efficient reading, reducing the number of costly system/disk read operations.",
          "B. It allows reading binary files (like images) instead of text files.",
          "C. It automatically compresses the file content as it reads it.",
          "D. It encrypts the stream for secure file reading.",
        ],
        correctAnswer: "A. It buffers input for efficient reading, reducing the number of costly system/disk read operations."
      }
    ]
  }
};

export default mod_m11;
