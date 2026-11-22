import type { ModuleData } from '../GolangCourseData';

const mod_m18: ModuleData = {
  id: 'm18',
  title: 'MODULE 18: DEPLOYMENT & DEVOPS',
  overview: 'Learn building static executables, configuring compose workspaces, EC2 instances deployments and CI/CD pipelines.',
  outcomes: ['Deploy docker systems', 'Configure Github Actions workflows'],
  lessons: [
    { id: 'm18-l1', title: 'Lesson 18.1 Building Executables', objectives: ['Compile static binaries'], theory: 'Go compiles into a single, self-contained binary containing all dependency resources.', takeaways: ['No external VM/runtime installation is required on destination servers.'] },
    { id: 'm18-l2', title: 'Lesson 18.2 Environment Variables', objectives: ['Load DSN configurations'], theory: 'Configure and load environment variables at runtime instead of hardcoding credentials.', takeaways: ['Prevents sensitive secrets leaks.'] },
    { id: 'm18-l3', title: 'Lesson 18.3 Docker', objectives: ['Run docker binaries'], theory: 'Package Go executables into lightweight Docker containers.', takeaways: ['Ensures consistent behavior across staging and production.'] },
    { id: 'm18-l4', title: 'Lesson 18.4 Docker Compose', objectives: ['Manage multi-container setups'], theory: 'Orchestrate multi-container environments (e.g. API gateway, Postgres database, Redis cache) using YAML specifications.', takeaways: ['Simplifies local multi-service testing.'] },
    { id: 'm18-l5', title: 'Lesson 18.5 AWS EC2 Deployment', objectives: ['Launch cloud instances'], theory: 'Provision AWS EC2 Linux nodes and configure SSH keys to deploy Go backend binaries.', takeaways: ['Ensure port 80/443 mapping rules are active.'] },
    { id: 'm18-l6', title: 'Lesson 18.6 CI/CD Basics', objectives: ['Automate builds validation'], theory: 'Configure automated pipelines (e.g. GitHub Actions) to run test suites and lint checks on every commit.', takeaways: ['Ensures deployment reliability.'] }
  ],
  quiz: [
    { id: 1, question: 'What is the main benefit of Go compilation?', options: ["Runs on a JVM", "Generates a single self-contained binary", "Interprets code at runtime", "Automatically deploys to AWS"], correctAnswer: "Generates a single self-contained binary" },
    { id: 2, question: "How do you cross-compile a Go binary for Linux on macOS?", options: ["go build --linux", "GOOS=linux GOARCH=amd64 go build", "go cross linux", "go install -os=linux"], correctAnswer: "GOOS=linux GOARCH=amd64 go build" },
    { id: 3, question: "Why read configuration from environment variables?", options: ["Environment variables are read faster than config files", "Go cannot read config files", "The same build runs in every environment without code changes", "They encrypt secrets automatically"], correctAnswer: "The same build runs in every environment without code changes" },
    { id: 4, question: "What does a multi-stage Dockerfile give a Go service?", options: ["Faster Go compilation", "Automatic horizontal scaling", "Faster compilation, because each stage compiles in parallel", "A small runtime image without the build toolchain"], correctAnswer: "A small runtime image without the build toolchain" },
    { id: 5, question: "What is Docker Compose mainly used for?", options: ["Running several related containers together", "Building Go binaries", "Deploying to AWS directly", "Monitoring production"], correctAnswer: "Running several related containers together" },
    { id: 6, question: "What should a CI pipeline do before building?", options: ["Deploy to production first", "Run tests and fail fast on errors", "Skip tests to save time", "Delete old releases"], correctAnswer: "Run tests and fail fast on errors" },
  ],
  assignment: {
    prompts: [
      {
        kind: 'code',
        prompt: 'Write a GitHub Actions workflow that vets, tests and builds a Go project on every pull request. Use actions/setup-go with a pinned version, and run go vet and go test before go build so a broken build fails fast.',
        language: 'yaml',
        starterCode: '# .github/workflows/ci.yml\nname: CI\n\non:\n  pull_request:\n    branches: [main]\n\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      # actions/checkout\n      # actions/setup-go with go-version: "1.22"\n      # go mod download\n      # go vet ./...\n      # go test ./... -race\n      # go build ./...\n',
        runnable: false,
        examples: [
          { input: 'open a pull request against main', output: 'CI / build (pull_request) — passed in 48s' }
        ]
      }
    ]
  }
};

export default mod_m18;
