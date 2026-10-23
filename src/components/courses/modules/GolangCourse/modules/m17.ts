import type { ModuleData } from '../GolangCourseData';

const mod_m17: ModuleData = {
  id: 'm17',
  title: 'MODULE 17: MICROSERVICES BASICS',
  overview: 'Learn service communication patterns, gRPC RPC calls, Docker container setups, and message queue connections.',
  outcomes: ['Construct Protobuf service schemas', 'Dockerize backend executables'],
  lessons: [
    { id: 'm17-l1', title: 'Lesson 17.1 What are Microservices?', objectives: ['Decoupled architectures'], theory: 'Split monolithic systems into independent, single-responsibility microservices. Each service runs in its own process and handles a specific business domain.', takeaways: ['Microservices isolate business domains.', 'Simplifies scaling and independent deployments.'] },
    { id: 'm17-l2', title: 'Lesson 17.2 Service Communication', objectives: ['Sync vs Async calls'], theory: 'Connect microservices using synchronous RPC protocols like gRPC, or asynchronous message brokers like NATS, RabbitMQ, and Kafka.', takeaways: ['Sync communication is useful for immediate dependency queries.', 'Async messaging decouples service execution paths.'] },
    { id: 'm17-l3', title: 'Lesson 17.3 gRPC Basics', objectives: ['Configure Protocol Buffers'], theory: 'gRPC is a high-performance RPC framework developed by Google. It uses Protocol Buffers (protobuf) to define service contracts and serialize structured data.', syntax: `syntax = "proto3";
package user;

service UserService {
    rpc GetUser (UserRequest) returns (UserResponse);
}

message UserRequest {
    string id = 1;
}

message UserResponse {
    string email = 1;
}`, takeaways: ['gRPC uses Protocol Buffers for service definitions.', 'Offers faster serialization and lower latency than REST JSON APIs.'] },
    { id: 'm17-l4', title: 'Lesson 17.4 Message Queues', objectives: ['Publish event notifications'], theory: 'Decouple services using event-driven architectures. Publish events to message brokers like NATS, which routes them to subscribing services.', takeaways: ['Message brokers enable event-driven architectures.', 'Guarantees message delivery across services.'] },
    { id: 'm17-l5', title: 'Lesson 17.5 Dockerizing Services', objectives: ['Write multi-stage Dockerfiles'], theory: 'Containerize Go applications using multi-stage Dockerfiles. Build the Go binary in a builder image, then copy it to a minimal scratch or alpine image for production.', syntax: `# Build Stage
FROM golang:1.21-alpine AS builder
WORKDIR /app
COPY . .
RUN go build -o main .

# Run Stage
FROM alpine:3.18
COPY --from=builder /app/main /main
CMD ["/main"]`, takeaways: ['Multi-stage Dockerfiles build minimal production images.', 'Scratch or alpine base images reduce the container size.'] },
    { id: 'm17-l6', title: 'Lesson 17.6 Service Discovery', objectives: ['Route network addresses'], theory: 'Track and route traffic to dynamically scaled microservice instances using service registries like Consul or Kubernetes DNS.', takeaways: ['Service discovery resolves dynamic IP addresses.', 'Simplifies horizontal service scaling.'] }
  ],
  quiz: [
    { id: 1, question: 'Which serialization format is used by gRPC?', options: ['Protocol Buffers', 'JSON', 'XML', 'YAML'], correctAnswer: 'Protocol Buffers' },
    { id: 2, question: "What is a key trade-off of microservices?", options: ["Simpler debugging than a monolith", "Simpler debugging, since each service is small and isolated", "Independent deployment at the cost of network complexity", "Fewer moving parts to operate"], correctAnswer: "Independent deployment at the cost of network complexity" },
    { id: 3, question: "Why use a message queue between services?", options: ["It stores messages permanently, replacing the database", "It makes calls synchronous", "It removes the need for retries", "It decouples them and absorbs spikes asynchronously"], correctAnswer: "It decouples them and absorbs spikes asynchronously" },
    { id: 4, question: "What file defines a gRPC service and its messages?", options: ["A .proto file", "A go.mod file", "A Dockerfile", "A .yaml route file"], correctAnswer: "A .proto file" },
    { id: 5, question: "Why build Go services into minimal container images?", options: ["Go needs a full OS to execute", "Static binaries need almost nothing else to run", "It speeds up compilation", "Containers require Go runtime"], correctAnswer: "Static binaries need almost nothing else to run" },
    { id: 6, question: "What problem does service discovery solve?", options: ["Encrypting traffic between services", "Versioning the database", "Finding the current address of a service instance", "Formatting logs"], correctAnswer: "Finding the current address of a service instance" },
  ],
  assignment: {
    prompts: [
      {
        kind: 'code',
        prompt: 'Write the Protobuf schema for a catalog service: a CatalogService with GetProduct and ListProducts RPCs, plus the Product, request and response messages. Field numbers are part of the wire format — they must be unique within a message and must never be reused once shipped.',
        language: 'protobuf',
        starterCode: 'syntax = "proto3";\n\npackage catalog.v1;\n\noption go_package = "github.com/yourname/catalog/gen/catalog/v1;catalogv1";\n\n// service CatalogService with GetProduct and ListProducts\n\n// message Product { id, name, price_cents, in_stock }\n\n// message GetProductRequest / GetProductResponse\n// message ListProductsRequest / ListProductsResponse\n',
        runnable: false,
        examples: [
          { input: 'protoc --go_out=. --go-grpc_out=. catalog.proto', output: 'generates catalog.pb.go and catalog_grpc.pb.go' }
        ]
      },
      {
        kind: 'code',
        prompt: 'Write a multi-stage Dockerfile packaging this Go microservice. Build with the golang:1.22 image, then copy only the compiled binary into a minimal final stage. Set CGO_ENABLED=0 so the binary is statically linked and actually runs in a scratch/alpine image.',
        language: 'dockerfile',
        starterCode: '# Stage 1: build\n# FROM golang:1.22 AS builder\n# ... go mod download, then build with CGO_ENABLED=0\n\n# Stage 2: minimal runtime\n# FROM alpine:3.20 (or scratch)\n# COPY the binary from the builder stage, EXPOSE the port, set ENTRYPOINT\n',
        runnable: false,
        examples: [
          { input: 'docker build -t catalog . && docker run -p 8080:8080 catalog', output: 'listening on :8080' }
        ]
      }
    ]
  }
};

export default mod_m17;
