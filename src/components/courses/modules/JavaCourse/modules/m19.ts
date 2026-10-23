import type { ModuleData } from '../JavaCourseData';

const mod_m19: ModuleData = {
  id: 'm19',
  title: 'MODULE 19: DEPLOYMENT',
  overview: 'Deploy Spring Boot applications to production: building JAR files, configuring environment variables, Dockerizing, and hosting on AWS or Render.',
  outcomes: [
    'Compile executable JAR files.',
    'Dockerize Spring Boot apps.',
    'Deploy backend APIs to cloud hosting platforms.'
  ],
  lessons: [
    {
      "id": "m19-l1",
      "title": "Lesson 19.1 Building JAR Files",
      "objectives": [
        "Package an application as an executable JAR.",
        "Understand the fat-JAR layout."
      ],
      "theory": "A **JAR** is a ZIP archive of compiled classes and resources. Spring Boot produces a special kind: an **executable (fat, or uber) JAR** that contains your code, every dependency, and an embedded Tomcat. One file, `java -jar app.jar`, and the application is running. No application server to install, which is exactly what makes containerised deployment simple.\n\nThe `spring-boot-maven-plugin` performs the repackaging. `mvn package` first produces an ordinary JAR, then the plugin rewrites it into the Boot layout:\n\n```\napp.jar\n├── META-INF/MANIFEST.MF        <- Main-Class: JarLauncher\n├── org/springframework/boot/loader/   <- the launcher\n└── BOOT-INF/\n    ├── classes/                <- your code\n    └── lib/                    <- every dependency JAR\n```\n\nNested JARs are not something standard Java can load, which is why Boot ships its own `JarLauncher` as the manifest's `Main-Class`. It sets up a classloader that can read them, then calls your real main class.\n\nUseful commands: `mvn clean package` builds, `-DskipTests` skips tests (fine locally, never in CI), and `mvn spring-boot:build-image` produces an OCI container image with no Dockerfile at all.\n\nOne practical note: the plugin also keeps the pre-repackaging artefact as `app.jar.original`. If you deploy that by mistake you get \"no main manifest attribute\" — a confusing error with a simple cause.\n\nFor Docker, consider a **layered JAR** (enabled by default in recent versions), which splits dependencies from application code so image layers cache well and rebuilds stay small.",
      "syntax": "mvn clean package              # build\njava -jar target/app-1.0.0.jar # run\n\nmvn clean package -DskipTests  # skip tests (not in CI)",
      "codeExample": "<!-- The plugin that produces the executable JAR -->\n<build>\n    <finalName>student-api</finalName>\n    <plugins>\n        <plugin>\n            <groupId>org.springframework.boot</groupId>\n            <artifactId>spring-boot-maven-plugin</artifactId>\n            <configuration>\n                <!-- Split into layers so Docker caches dependencies separately -->\n                <layers>\n                    <enabled>true</enabled>\n                </layers>\n                <excludes>\n                    <exclude>\n                        <groupId>org.springframework.boot</groupId>\n                        <artifactId>spring-boot-devtools</artifactId>\n                    </exclude>\n                </excludes>\n            </configuration>\n        </plugin>\n    </plugins>\n</build>\n\n<!-- ============ Build and run ============\n\n$ ./mvnw clean package\n[INFO] Building jar: /project/target/student-api.jar\n[INFO] Replacing main artifact with repackaged archive\n[INFO] BUILD SUCCESS\n\n$ ls -lh target/\n  student-api.jar            42M   <- executable fat JAR\n  student-api.jar.original  180K   <- plain JAR, do NOT deploy this\n\n$ java -jar target/student-api.jar\nStarted Application in 2.31 seconds\n\n# Override configuration at launch\n$ java -jar target/student-api.jar --server.port=9090\n$ java -jar target/student-api.jar --spring.profiles.active=prod\n\n# Tune the JVM\n$ java -Xmx512m -jar target/student-api.jar\n\n# Inspect the layers Docker will cache\n$ java -Djarmode=layertools -jar target/student-api.jar list\n  dependencies\n  spring-boot-loader\n  snapshot-dependencies\n  application\n\n============ -->",
      "codeOutput": "$ java -jar target/student-api.jar\n\n  .   ____          _            __ _ _\n Spring Boot :: (v3.2.0)\n\nStarting Application v1.0.0 using Java 17\nThe following 1 profile is active: \"default\"\nTomcat initialized with port(s): 8080 (http)\nStarted Application in 2.314 seconds (process running for 2.61)",
      "mistakes": [
        "Omitting `spring-boot-maven-plugin`, so `mvn package` yields a plain JAR that fails with \"no main manifest attribute\".",
        "Deploying `app.jar.original` by mistake.",
        "Running `-DskipTests` in CI, defeating the point of the pipeline.",
        "Shipping DevTools in the production JAR.",
        "A Java version mismatch between build and runtime, producing `UnsupportedClassVersionError`."
      ],
      "takeaways": [
        "Boot produces a fat JAR containing dependencies and an embedded server.",
        "`spring-boot-maven-plugin` does the repackaging — it is required.",
        "Command-line arguments override `application.properties`.",
        "Layered JARs make Docker rebuilds much faster."
      ]
    },
    {
      "id": "m19-l2",
      "title": "Lesson 19.2 Environment Variables",
      "objectives": [
        "Externalise configuration.",
        "Understand property precedence.",
        "Use profiles."
      ],
      "theory": "The **twelve-factor** principle here is simple: **build once, deploy anywhere**. The same JAR should run in dev, staging and production, with only the environment differing. That means configuration must live outside the artefact.\n\nSpring Boot resolves properties from many sources in a defined **order of precedence**, highest first:\n\n1. Command-line arguments — `--server.port=9090`\n2. `SPRING_APPLICATION_JSON`\n3. OS environment variables\n4. `application-{profile}.properties`\n5. `application.properties`\n6. Defaults in code\n\nHigher sources override lower ones, which is what makes the pattern work: commit sensible defaults, override them per environment.\n\n**The naming translation** trips everyone up once. An environment variable maps to a property by upper-casing and replacing dots and dashes with underscores. `spring.datasource.url` becomes `SPRING_DATASOURCE_URL`. This *relaxed binding* is why cloud platforms can configure Spring apps with nothing but environment variables.\n\nIn a properties file, reference them with `${VAR}` and supply a fallback with `${VAR:default}`.\n\n**Profiles** group environment-specific configuration. Put values in `application-dev.properties` and `application-prod.properties`, activate with `--spring.profiles.active=prod`, and Boot layers the profile file over the base one. `@Profile(\"prod\")` on a bean restricts it to that environment.\n\nFor type-safe access to a group of related properties, prefer **`@ConfigurationProperties`** over scattered `@Value` annotations — it validates at startup rather than failing at first use.\n\nThe security rule underneath all of this: **secrets never go in the repository**. Use environment variables, or a secret manager in production.",
      "syntax": "# In a properties file\nspring.datasource.url=${DATABASE_URL:jdbc:h2:mem:testdb}\n\n# As an environment variable\nexport SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/school\n\n# As a command-line argument (highest precedence)\njava -jar app.jar --spring.datasource.url=...",
      "codeExample": "# ================= application.properties (defaults, committed) =================\nspring.application.name=student-api\nserver.port=${PORT:8080}\n\n# ${VAR:fallback} - works locally, overridden in production\nspring.datasource.url=${DATABASE_URL:jdbc:h2:mem:devdb}\nspring.datasource.username=${DATABASE_USER:sa}\nspring.datasource.password=${DATABASE_PASSWORD:}\n\napp.jwt.secret=${JWT_SECRET:dev-only-secret-change-me}\napp.jwt.expiration-ms=${JWT_EXPIRATION:900000}\napp.cors.allowed-origins=${CORS_ORIGINS:http://localhost:5173}\n\n\n# ================= application-prod.properties =================\nspring.jpa.hibernate.ddl-auto=validate\nspring.jpa.show-sql=false\nlogging.level.root=WARN\nlogging.level.com.skillofied=INFO\nserver.error.include-stacktrace=never\n\n\n// ================= Type-safe configuration =================\npackage com.skillofied.demo.config;\n\nimport jakarta.validation.constraints.*;\nimport org.springframework.boot.context.properties.ConfigurationProperties;\nimport org.springframework.context.annotation.*;\nimport org.springframework.stereotype.Component;\nimport org.springframework.validation.annotation.Validated;\n\nimport java.util.List;\n\n// Fails fast at startup if a required value is missing or invalid\n@Component\n@Validated\n@ConfigurationProperties(prefix = \"app.jwt\")\npublic class JwtProperties {\n\n    @NotBlank(message = \"JWT_SECRET must be set\")\n    @Size(min = 32, message = \"JWT secret must be at least 32 characters\")\n    private String secret;\n\n    @Positive\n    private long expirationMs = 900_000;\n\n    public String getSecret() { return secret; }\n    public void setSecret(String secret) { this.secret = secret; }\n    public long getExpirationMs() { return expirationMs; }\n    public void setExpirationMs(long expirationMs) { this.expirationMs = expirationMs; }\n}\n\n@Component\n@ConfigurationProperties(prefix = \"app.cors\")\nclass CorsProperties {\n    private List<String> allowedOrigins = List.of();\n    public List<String> getAllowedOrigins() { return allowedOrigins; }\n    public void setAllowedOrigins(List<String> o) { this.allowedOrigins = o; }\n}\n\n// Profile-scoped beans\n@Configuration\nclass EnvironmentBeans {\n\n    @Bean\n    @Profile(\"dev\")\n    public String devBanner() { return \"Running in DEVELOPMENT\"; }\n\n    @Bean\n    @Profile(\"prod\")\n    public String prodBanner() { return \"Running in PRODUCTION\"; }\n}",
      "codeOutput": "# Local run - defaults apply\n$ java -jar app.jar\nUsing H2 in-memory database, port 8080\n\n# Production - environment variables win\n$ export DATABASE_URL=jdbc:postgresql://db.internal:5432/school\n$ export DATABASE_USER=api_user\n$ export DATABASE_PASSWORD=s3cr3t\n$ export JWT_SECRET=a-very-long-random-production-secret-value\n$ java -jar app.jar --spring.profiles.active=prod\n\nThe following 1 profile is active: \"prod\"\nHikariPool-1 - Added connection org.postgresql.jdbc.PgConnection@1f2a\nStarted Application in 3.02 seconds\n\n# A missing required secret fails at startup, not at first login\n$ unset JWT_SECRET && java -jar app.jar --spring.profiles.active=prod\nAPPLICATION FAILED TO START\nProperty: app.jwt.secret\nReason: JWT secret must be at least 32 characters",
      "mistakes": [
        "Committing production secrets to `application.properties`.",
        "Getting the variable name wrong — `spring.datasource.url` is `SPRING_DATASOURCE_URL`, with underscores.",
        "Building a separate JAR per environment instead of one artefact plus configuration.",
        "Not setting `spring.profiles.active` in production, so development defaults silently apply.",
        "Scattering `@Value` everywhere instead of grouping with `@ConfigurationProperties`, losing startup validation."
      ],
      "takeaways": [
        "One artefact, many environments — configuration comes from outside.",
        "Precedence: CLI args > env vars > profile file > base file > code defaults.",
        "Environment variable names upper-case and replace dots with underscores.",
        "`@ConfigurationProperties` with `@Validated` fails fast on bad configuration."
      ]
    },
    {
      "id": "m19-l3",
      "title": "Lesson 19.3 Deploying on AWS",
      "objectives": [
        "Compare AWS deployment options.",
        "Deploy to Elastic Beanstalk.",
        "Follow production practices."
      ],
      "theory": "AWS offers several ways to run a Spring Boot JAR, and choosing well matters more than the mechanics.\n\n- **EC2** — a raw virtual machine. Maximum control, maximum operational burden: you patch the OS, configure the service, manage scaling.\n- **Elastic Beanstalk** — a managed platform. Upload the JAR and it provisions EC2, a load balancer, auto-scaling and health checks. **The best starting point.**\n- **ECS / Fargate** — run containers, with Fargate removing server management. The standard choice once you are containerised.\n- **Elastic Kubernetes Service** — full Kubernetes. Powerful, and overkill for a single service.\n- **Lambda** — serverless. Poorly suited to Spring Boot, whose startup time makes cold starts painful.\n\nA typical Beanstalk deployment is: build the JAR, create an application and environment on the *Corretto* platform, upload, and set environment variables in the console. Beanstalk expects your app on **port 5000**, so set `SERVER_PORT=5000` — missing this is the classic first-deployment failure, showing as a health check that never goes green.\n\nThe database belongs on **RDS**, provisioned separately rather than inside the Beanstalk environment, so that tearing down the environment does not destroy your data. Lock the RDS security group so it accepts connections only from your application's security group, never from the internet.\n\nProduction practices that are not optional: secrets in **Secrets Manager** or **Parameter Store**, not environment variables in the console; HTTPS terminated at the load balancer with an **ACM** certificate; logs shipped to **CloudWatch**; health checks pointed at `/actuator/health`; and auto-scaling configured on CPU.",
      "syntax": "# Build\nmvn clean package -DskipTests\n\n# Deploy with the EB CLI\neb init -p corretto-17 student-api --region ap-south-1\neb create student-api-prod --instance-type t3.small\neb setenv SERVER_PORT=5000 SPRING_PROFILES_ACTIVE=prod\neb deploy",
      "codeExample": "# ============ 1. Build the artefact ============\n$ ./mvnw clean package -DskipTests\n$ ls target/student-api.jar\n\n\n# ============ 2. Configure Beanstalk ============\n# .ebextensions/01-environment.config\noption_settings:\n  aws:elasticbeanstalk:application:environment:\n    SERVER_PORT: 5000              # Beanstalk proxies to 5000, not 8080\n    SPRING_PROFILES_ACTIVE: prod\n    JAVA_TOOL_OPTIONS: \"-Xmx512m\"\n\n  aws:elasticbeanstalk:environment:proxy:\n    ProxyServer: nginx\n\n  aws:elasticbeanstalk:environment:process:default:\n    HealthCheckPath: /actuator/health\n    MatcherHTTPCode: 200\n\n  aws:autoscaling:asg:\n    MinSize: 2                     # two instances for availability\n    MaxSize: 6\n\n\n# ============ 3. Provision RDS separately ============\n$ aws rds create-db-instance \\\n    --db-instance-identifier student-db \\\n    --db-instance-class db.t3.micro \\\n    --engine postgres \\\n    --allocated-storage 20 \\\n    --master-username apiuser \\\n    --manage-master-user-password \\\n    --no-publicly-accessible          # reachable only from the VPC\n\n\n# ============ 4. Store secrets properly ============\n$ aws secretsmanager create-secret \\\n    --name student-api/prod \\\n    --secret-string '{\"JWT_SECRET\":\"...\",\"DATABASE_PASSWORD\":\"...\"}'\n\n\n# ============ 5. Deploy ============\n$ eb init -p corretto-17 student-api --region ap-south-1\n$ eb create student-api-prod --instance-type t3.small --elb-type application\n$ eb setenv SPRING_PROFILES_ACTIVE=prod \\\n            SERVER_PORT=5000 \\\n            DATABASE_URL=jdbc:postgresql://student-db.xxxx.rds.amazonaws.com:5432/school\n$ eb deploy\n$ eb status\n$ eb logs\n\n\n# ============ 6. Expose the health endpoint ============\n# application-prod.properties\nmanagement.endpoints.web.exposure.include=health,info,metrics\nmanagement.endpoint.health.show-details=never\nmanagement.endpoint.health.probes.enabled=true",
      "codeOutput": "$ eb create student-api-prod\nCreating application version archive \"app-250730_1104\".\nUploading student-api/app-250730_1104.zip to S3...\nEnvironment details for: student-api-prod\n  Application name: student-api\n  Region: ap-south-1\n  CNAME: student-api-prod.ap-south-1.elasticbeanstalk.com\n\nPrinting Status:\n  INFO: Created load balancer named: awseb-AWSEB-1A2B3C\n  INFO: Successfully launched environment: student-api-prod\n\n$ eb status\n  Health: Green\n  Status: Ready\n  Running Version: app-250730_1104\n\n$ curl https://student-api-prod.ap-south-1.elasticbeanstalk.com/actuator/health\n{\"status\":\"UP\"}",
      "mistakes": [
        "Leaving the port at 8080. Beanstalk proxies to 5000, so health checks fail and the environment stays red.",
        "Running the database inside the Beanstalk environment, so terminating it destroys your data.",
        "Making the RDS instance publicly accessible instead of restricting it to the app security group.",
        "Storing secrets as plain environment variables in the console rather than Secrets Manager.",
        "Serving traffic over HTTP with no ACM certificate.",
        "A single instance with no auto-scaling, so any instance failure is an outage."
      ],
      "takeaways": [
        "Beanstalk is the easiest managed start; ECS/Fargate is the container-native choice.",
        "Set `SERVER_PORT=5000` for Beanstalk.",
        "Provision RDS separately and keep it private.",
        "Secrets Manager, ACM for HTTPS, CloudWatch for logs, `/actuator/health` for checks."
      ]
    },
    {
      "id": "m19-l4",
      "title": "Lesson 19.4 Deploying on Render",
      "objectives": [
        "Deploy a Spring Boot app to Render.",
        "Configure a managed database and health checks."
      ],
      "theory": "**Render** is a platform-as-a-service that connects to a Git repository, builds on push, and runs the result. Compared with AWS it trades fine-grained control for a dramatically shorter path to a running application — which makes it ideal for student projects, portfolios and MVPs.\n\nThe deployment model is straightforward. Connect your GitHub repository, choose a **Web Service**, and give Render two commands:\n\n- **Build command** — `./mvnw clean package -DskipTests`\n- **Start command** — `java -jar target/student-api.jar`\n\nRender then builds on every push to the tracked branch, giving you continuous deployment for free.\n\nThe one platform-specific detail that matters: **Render assigns the port through a `PORT` environment variable**, and your service must bind to it. Set `server.port=${PORT:8080}` and you work both locally and on Render. Binding to a hard-coded 8080 means the health check never passes and the deploy is marked failed — this is the single most common Render mistake, and it is the same class of error as Beanstalk's port 5000.\n\nRender offers **managed PostgreSQL**. Create the database, then reference its internal connection string from the web service. Use the *internal* URL — it does not traverse the public internet and is faster.\n\nTwo caveats to plan around. The **free tier spins down after inactivity**, so the next request pays a cold start of thirty seconds or more; use a paid instance for anything real. And the filesystem is **ephemeral** — anything written to disk disappears on redeploy, so uploads belong in S3 or an equivalent, never on local disk.\n\nAll of this can be committed as a `render.yaml` blueprint, which makes the infrastructure reproducible and reviewable.",
      "syntax": "# Build command\n./mvnw clean package -DskipTests\n\n# Start command\njava -jar target/student-api.jar\n\n# Essential: bind to the port Render assigns\nserver.port=${PORT:8080}",
      "codeExample": "# ============ render.yaml - infrastructure as code ============\nservices:\n  - type: web\n    name: student-api\n    runtime: docker              # or \"java\" for a buildpack deploy\n    plan: starter                # free tier spins down when idle\n    region: singapore\n    branch: main\n    healthCheckPath: /actuator/health\n\n    buildCommand: ./mvnw clean package -DskipTests\n    startCommand: java -Xmx400m -jar target/student-api.jar\n\n    envVars:\n      - key: SPRING_PROFILES_ACTIVE\n        value: prod\n\n      # Pulled from the managed database below\n      - key: DATABASE_URL\n        fromDatabase:\n          name: student-db\n          property: connectionString\n\n      # Generated once by Render and kept secret\n      - key: JWT_SECRET\n        generateValue: true\n\n      - key: CORS_ORIGINS\n        value: https://student-app.onrender.com\n\ndatabases:\n  - name: student-db\n    databaseName: school\n    user: apiuser\n    plan: starter\n    region: singapore\n\n\n# ============ application-prod.properties ============\n\n# CRITICAL: Render injects PORT. Binding to a fixed 8080 fails the health check.\nserver.port=${PORT:8080}\n\nspring.datasource.url=${DATABASE_URL}\nspring.jpa.hibernate.ddl-auto=validate\nspring.jpa.show-sql=false\n\nmanagement.endpoints.web.exposure.include=health\nmanagement.endpoint.health.probes.enabled=true\n\n# Free instances have little memory - keep the pool small\nspring.datasource.hikari.maximum-pool-size=5\n\n\n# ============ Optional Dockerfile for full control ============\n# Multi-stage: build with Maven, run on a slim JRE\nFROM maven:3.9-eclipse-temurin-17 AS build\nWORKDIR /app\nCOPY pom.xml .\nRUN mvn dependency:go-offline          # cached layer\nCOPY src ./src\nRUN mvn clean package -DskipTests\n\nFROM eclipse-temurin:17-jre-alpine\nWORKDIR /app\nCOPY --from=build /app/target/student-api.jar app.jar\nEXPOSE 8080\nENTRYPOINT [\"sh\", \"-c\", \"java -Xmx400m -jar app.jar --server.port=${PORT:-8080}\"]",
      "codeOutput": "==> Cloning from https://github.com/user/student-api\n==> Checking out commit 4f2a9c1 in branch main\n==> Running build command './mvnw clean package -DskipTests'\n    [INFO] BUILD SUCCESS\n    [INFO] Total time: 47.203 s\n==> Uploading build...\n==> Deploying...\n==> Running 'java -Xmx400m -jar target/student-api.jar'\n\n    Started Application in 4.112 seconds\n    Tomcat started on port 10000 (http)      <- Render assigned PORT=10000\n\n==> Your service is live at https://student-api.onrender.com\n\n$ curl https://student-api.onrender.com/actuator/health\n{\"status\":\"UP\"}",
      "mistakes": [
        "Hard-coding `server.port=8080`. Render assigns `PORT`, the health check fails, and the deploy is marked failed.",
        "Using the external database URL instead of the internal one, adding latency and public exposure.",
        "Writing uploads to the local filesystem, which is wiped on every redeploy.",
        "Expecting the free tier to stay warm — it spins down and cold-starts.",
        "Leaving `ddl-auto=update` on against a managed production database.",
        "Setting a large heap or connection pool that a small instance cannot support."
      ],
      "takeaways": [
        "Render builds from Git on push — connect the repo and give it build and start commands.",
        "`server.port=${PORT:8080}` is mandatory.",
        "Use the managed PostgreSQL internal connection string.",
        "The filesystem is ephemeral and the free tier sleeps."
      ]
    },
    {
      "id": "m19-l5",
      "title": "Lesson 19.5 Deploying with Docker",
      "objectives": [
        "Containerise a Spring Boot application.",
        "Write an efficient multi-stage Dockerfile.",
        "Orchestrate with Docker Compose."
      ],
      "theory": "**Docker** packages your application together with its runtime and dependencies into an **image**. A running instance of that image is a **container**. Because the image contains everything, it behaves identically on your laptop, in CI, and in production — the definitive answer to \"it works on my machine\".\n\nA container is not a virtual machine. It shares the host kernel and isolates only the process and filesystem, which is why it starts in milliseconds and costs megabytes rather than gigabytes.\n\n**Write a multi-stage Dockerfile.** The build stage needs Maven and the full JDK; the runtime stage needs only a JRE. Copying just the JAR from the build stage into a slim base image typically takes the result from ~700 MB down to under 200 MB. Smaller images pull faster, start faster, and expose less attack surface.\n\n**Order layers for caching.** Docker caches each instruction and invalidates everything after the first change. Copy `pom.xml` and download dependencies *before* copying `src`. Then a source-only change reuses the cached dependency layer, turning a three-minute rebuild into fifteen seconds.\n\n**Do not run as root.** Create an unprivileged user and switch to it with `USER`. If the container is compromised, the attacker inherits that user's limited rights.\n\n**Never bake secrets into an image.** Every `ENV` and every build argument is visible in the image history to anyone who can pull it. Pass secrets at runtime.\n\nA `.dockerignore` keeps `target/`, `.git/` and IDE files out of the build context — often shrinking it by an order of magnitude.\n\n**Docker Compose** then runs the whole stack — application plus database — with one command, using `depends_on` with a health condition so the app waits for the database to be genuinely ready rather than merely started.",
      "syntax": "docker build -t student-api:1.0 .\ndocker run -p 8080:8080 -e DATABASE_URL=... student-api:1.0\ndocker compose up -d",
      "codeExample": "# ==================== Dockerfile ====================\n# ---------- Stage 1: build (needs the full JDK + Maven) ----------\nFROM maven:3.9-eclipse-temurin-17 AS build\nWORKDIR /app\n\n# Copy the POM first so the dependency layer caches independently of source changes\nCOPY pom.xml .\nRUN mvn dependency:go-offline -B\n\n# Now the source - only this layer rebuilds when code changes\nCOPY src ./src\nRUN mvn clean package -DskipTests -B\n\n\n# ---------- Stage 2: runtime (JRE only - much smaller) ----------\nFROM eclipse-temurin:17-jre-alpine\n\n# Never run as root\nRUN addgroup -S spring && adduser -S spring -G spring\n\nWORKDIR /app\nCOPY --from=build --chown=spring:spring /app/target/*.jar app.jar\n\nUSER spring\n\nEXPOSE 8080\n\nHEALTHCHECK --interval=30s --timeout=3s --start-period=40s \\\n  CMD wget -qO- http://localhost:8080/actuator/health || exit 1\n\n# Container-aware memory settings\nENTRYPOINT [\"java\", \\\n            \"-XX:MaxRAMPercentage=75.0\", \\\n            \"-XX:+UseContainerSupport\", \\\n            \"-jar\", \"app.jar\"]\n\n\n# ==================== .dockerignore ====================\n# target/\n# .git/\n# .idea/\n# *.md\n# .env\n\n\n# ==================== docker-compose.yml ====================\nservices:\n  db:\n    image: postgres:16-alpine\n    environment:\n      POSTGRES_DB: school\n      POSTGRES_USER: apiuser\n      POSTGRES_PASSWORD: ${DB_PASSWORD}     # from .env, never committed\n    volumes:\n      - pgdata:/var/lib/postgresql/data     # survives container restarts\n    healthcheck:\n      test: [\"CMD-SHELL\", \"pg_isready -U apiuser -d school\"]\n      interval: 5s\n      retries: 5\n\n  api:\n    build: .\n    ports:\n      - \"8080:8080\"\n    environment:\n      SPRING_PROFILES_ACTIVE: prod\n      DATABASE_URL: jdbc:postgresql://db:5432/school   # \"db\" = the service name\n      DATABASE_USER: apiuser\n      DATABASE_PASSWORD: ${DB_PASSWORD}\n      JWT_SECRET: ${JWT_SECRET}\n    depends_on:\n      db:\n        condition: service_healthy          # wait for READY, not just started\n    restart: unless-stopped\n\nvolumes:\n  pgdata:",
      "codeOutput": "$ docker build -t student-api:1.0 .\n[+] Building 52.4s\n => [build 4/6] RUN mvn dependency:go-offline    38.2s\n => CACHED [build 5/6] COPY src ./src\n => [runtime 4/4] COPY --from=build /app/target/*.jar    0.4s\n => exporting to image\nSuccessfully tagged student-api:1.0\n\n$ docker images student-api\nREPOSITORY    TAG   SIZE\nstudent-api   1.0   187MB          # single-stage would be ~720MB\n\n$ docker compose up -d\n [+] Running 3/3\n  Network app_default   Created\n  Container app-db-1    Healthy\n  Container app-api-1   Started\n\n$ curl localhost:8080/actuator/health\n{\"status\":\"UP\",\"components\":{\"db\":{\"status\":\"UP\"}}}\n\n# A source-only change now rebuilds in seconds, not minutes\n$ docker build -t student-api:1.1 .\n[+] Building 14.1s   (dependency layer reused from cache)",
      "mistakes": [
        "A single-stage build shipping the whole JDK and Maven cache — several times larger than necessary.",
        "Copying `src` before running the dependency download, so every code change re-downloads everything.",
        "Running as root because no `USER` was set.",
        "Baking secrets in with `ENV`; they are permanently visible in the image history.",
        "Omitting `.dockerignore`, sending `target/` and `.git/` into the build context.",
        "Using `localhost` instead of the Compose service name to reach the database from the app container.",
        "Not using a volume for Postgres data, so the database is wiped whenever the container is recreated."
      ],
      "takeaways": [
        "Multi-stage builds keep the runtime image small.",
        "Copy `pom.xml` and resolve dependencies before copying source, for layer caching.",
        "Run as a non-root user and pass secrets at runtime.",
        "Compose with `depends_on: condition: service_healthy` and a named volume for data."
      ]
    }
  ],
  exercise: {
    title: 'Containerise and deploy the API',
    description: 'Write a multi-stage Dockerfile and externalise every environment-specific value.',
    instructions: ['Build with a JDK stage and run on a slim JRE stage to keep the image small.', 'Copy pom.xml and resolve dependencies before copying src so the layer caches.', 'Bind to ${PORT:8080}, run as a non-root user, and pass secrets at runtime.'],
    starterCode: '# TODO: stage 1 - build with maven:3.9-eclipse-temurin-17\n\n# TODO: stage 2 - run on eclipse-temurin:17-jre-alpine\n#       add a non-root user, EXPOSE 8080, ENTRYPOINT java -jar app.jar',
    expectedOutput: 'Image size: 187MB\nHealth check: {"status":"UP"}',
    type: 'code_sandbox'
  },
  quiz: [
    { id: 1, question: 'Which Maven command packages applications into executable JAR files?', options: ["A. mvn clean compile", "B. mvn execute", "C. mvn build", "D. mvn clean package"], correctAnswer: "D. mvn clean package" },
    { id: 2, question: 'Which keyword executes compiled JAR files?', options: ["A. java -jar app.jar", "B. execute app.jar", "C. run app.jar", "D. start java app.jar"], correctAnswer: "A. java -jar app.jar" },
    { id: 3, question: 'What docker command builds container images?', options: ["A. docker run", "B. docker build", "C. docker compile", "D. docker images"], correctAnswer: "B. docker build" },
    { id: 4, question: 'Where does Maven build compiled outputs?', options: ["A. src/main/bin", "B. out/", "C. target/", "D. dist/"], correctAnswer: "C. target/" },
    { id: 5, question: 'How are sensitive parameters passed to production environments?', options: ["A. Hardcoded inside classes", "B. Committed in application.properties", "C. Compiled into the JAR as constants", "D. Passed via Environment Variables"], correctAnswer: "D. Passed via Environment Variables" },
    { id: 6, question: 'What does the Spring Boot Maven plugin produce?', options: ["A. An executable fat JAR with dependencies and an embedded server", "B. A WAR file only", "C. A Docker image only", "D. Source archives for publishing to Maven Central"], correctAnswer: "A. An executable fat JAR with dependencies and an embedded server" },
    { id: 7, question: 'What error appears if you run a JAR built without the Boot plugin?', options: ['A. ClassNotFoundException', 'B. no main manifest attribute', 'C. OutOfMemoryError', 'D. NoSuchMethodError'], correctAnswer: 'B. no main manifest attribute' },
    { id: 8, question: 'Which command runs a Spring Boot JAR?', options: ["A. java app.jar", "B. run app.jar", "C. java -jar app.jar", "D. mvn app.jar"], correctAnswer: "C. java -jar app.jar" },
    { id: 9, question: 'Which configuration source has the highest precedence?', options: ["A. application.properties", "B. Environment variables", "C. Code defaults", "D. Command-line arguments"], correctAnswer: "D. Command-line arguments" },
    { id: 10, question: 'How does `spring.datasource.url` map to an environment variable?', options: ['A. SPRING_DATASOURCE_URL', 'B. spring-datasource-url', 'C. SPRING.DATASOURCE.URL', 'D. springDatasourceUrl'], correctAnswer: 'A. SPRING_DATASOURCE_URL' },
    { id: 11, question: 'What does `${DB_URL:jdbc:h2:mem:test}` mean?', options: ["A. A syntax error", "B. Use DB_URL, or the H2 URL as a fallback", "C. Always use the H2 URL, ignoring DB_URL", "D. Concatenate both"], correctAnswer: 'B. Use DB_URL, or the H2 URL as a fallback' },
    { id: 12, question: 'How do you activate a Spring profile at launch?', options: ["A. --profile=prod", "B. -Dprofile=prod", "C. --spring.profiles.active=prod", "D. --env=prod"], correctAnswer: "C. --spring.profiles.active=prod" },
    { id: 13, question: 'Which port does AWS Elastic Beanstalk expect a Java app to bind to?', options: ["A. 8080", "B. 80", "C. 3000", "D. 5000"], correctAnswer: "D. 5000" },
    { id: 14, question: 'How does Render tell your app which port to use?', options: ["A. Through the PORT environment variable", "B. Always 8080", "C. In render.yaml only", "D. It does not"], correctAnswer: "A. Through the PORT environment variable" },
    { id: 15, question: 'Why should the Render filesystem not be used for uploads?', options: ["A. It is read-only for application processes", "B. It is ephemeral and wiped on redeploy", "C. It is too small", "D. It is encrypted"], correctAnswer: 'B. It is ephemeral and wiped on redeploy' },
    { id: 16, question: 'What is the main benefit of a multi-stage Dockerfile?', options: ["A. Faster compilation", "B. Better security scanning", "C. A much smaller runtime image containing only the JRE and JAR", "D. Automatic scaling of the running containers"], correctAnswer: "C. A much smaller runtime image containing only the JRE and JAR" },
    { id: 17, question: 'Why copy pom.xml and resolve dependencies before copying src?', options: ["A. Maven requires it", "B. To reduce image size", "C. No reason — layer order does not affect caching", "D. So the dependency layer stays cached when only source changes"], correctAnswer: "D. So the dependency layer stays cached when only source changes" },
    { id: 18, question: 'Why should a container not run as root?', options: ["A. A compromise would inherit full privileges", "B. It is slower, since root bypasses the cgroup scheduler", "C. Docker forbids it", "D. It uses more memory"], correctAnswer: "A. A compromise would inherit full privileges" },
    { id: 19, question: 'Why must secrets never be set with ENV in a Dockerfile?', options: ["A. ENV values are unavailable at runtime", "B. They are permanently visible in the image history", "C. They are too long", "D. They get encrypted"], correctAnswer: 'B. They are permanently visible in the image history' },
    { id: 20, question: 'In Docker Compose, how does the app container reach the database?', options: ["A. localhost, since both containers share the host", "B. 127.0.0.1", "C. By the service name, e.g. jdbc:postgresql://db:5432/...", "D. The host IP"], correctAnswer: "C. By the service name, e.g. jdbc:postgresql://db:5432/..." }
  ],
  assignment: {
    prompts: [
      { kind: 'code', prompt: 'Write a complete Dockerfile packaging a Spring Boot app using OpenJDK 17.', language: 'dockerfile', starterCode: '# Multi-stage build for a Spring Boot app on OpenJDK 17\n\n', runnable: false },
      {
        kind: 'mcq',
        prompt: 'What is the role of the clean lifecycle phase in Apache Maven?',
        options: [
          "A. It deletes unused source code files from the project directory.",
          "B. It formats the source code according to style rules.",
          "C. It purges the local Maven repository (~/.m2) of all dependencies.",
          "D. It removes the target directory (compiled classes, packaged files) to ensure a fresh, full build.",
        ],
        correctAnswer: "D. It removes the target directory (compiled classes, packaged files) to ensure a fresh, full build."
      }
    ]
  }
};

export default mod_m19;
