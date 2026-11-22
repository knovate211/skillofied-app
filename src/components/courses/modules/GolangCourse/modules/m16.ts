import type { ModuleData } from '../GolangCourseData';

const mod_m16: ModuleData = {
  id: 'm16',
  title: 'MODULE 16: AUTHENTICATION & SECURITY',
  overview: 'Learn bcrypt password hashing, JWT generation, CORS configurations, and token refresh mechanisms.',
  outcomes: ['Hash passwords using bcrypt algorithm', 'Validate JWT payloads'],
  lessons: [
    { id: 'm16-l1', title: 'Lesson 16.1 Password Hashing', objectives: ['Hash user passwords'], theory: 'Secure user passwords by hashing them with salt algorithms like bcrypt before storing them in your database. Never store raw, plain-text passwords.', syntax: `package main
import (
    "fmt"
    "golang.org/x/crypto/bcrypt"
)

func main() {
    pwd := []byte("securepwd123")
    hash, _ := bcrypt.GenerateFromPassword(pwd, bcrypt.DefaultCost)
    err := bcrypt.CompareHashAndPassword(hash, pwd)
    fmt.Println("Matched:", err == nil)
}`, takeaways: ['Use bcrypt to hash user passwords before database storage.', 'Never store raw, plain-text passwords.'] },
    { id: 'm16-l2', title: 'Lesson 16.2 JWT Authentication', objectives: ['Generate signed JWTs'], theory: 'Handle stateless user sessions using JSON Web Tokens (JWT). Sign tokens using private keys (RS256) or shared secrets (HS256).', takeaways: ['JWTs enable stateless session tracking.', 'Pass tokens in HTTP authorization headers or HTTPOnly cookies.'] },
    { id: 'm16-l3', title: 'Lesson 16.3 Authorization', objectives: ['Check access roles'], theory: 'Implement role-based access control (RBAC) to restrict specific routes to authorized user roles (e.g. admin or student).', takeaways: ['Validates scopes from decoded claims.', 'Ensures users only access authorized paths.'] },
    { id: 'm16-l4', title: 'Lesson 16.4 Refresh Tokens', objectives: ['Handle token lifecycles'], theory: 'Generate long-lived refresh tokens to issue new, short-lived access tokens, limiting exposure risk if an access token is compromised.', takeaways: ['Access tokens should be short-lived.', 'Use refresh tokens to renew access sessions safely.'] },
    { id: 'm16-l5', title: 'Lesson 16.5 API Security', objectives: ['Defensive headers config'], theory: 'Protect your API against common web security risks by configuring rate limiters, CORS policies, and secure HTTP headers.', takeaways: ['Rate limiters protect APIs from denial of service attacks.', 'Configure secure HTTP headers.'] },
    { id: 'm16-l6', title: 'Lesson 16.6 CORS', objectives: ['Configure CORS policies'], theory: 'Configure Cross-Origin Resource Sharing (CORS) rules to control which frontend origins are allowed to request resources from your backend API.', takeaways: ['CORS restricts cross-origin browser requests.', 'Essential for managing client-side browser connections.'] }
  ],
  quiz: [
    { id: 1, question: 'Which algorithm is commonly used for secure password hashing in Go?', options: ["md5", "sha1", "aes", "bcrypt"], correctAnswer: "bcrypt" },
    { id: 2, question: "Why must passwords be hashed rather than encrypted?", options: ["Hashing is faster to reverse", "Encryption is not available in Go", "Hashes are shorter to store", "Hashing is one-way, so a leak does not reveal them"], correctAnswer: "Hashing is one-way, so a leak does not reveal them" },
    { id: 3, question: "Which part of a JWT prevents tampering?", options: ["The signature", "The header", "The payload", "The expiry claim"], correctAnswer: "The signature" },
    { id: 4, question: "Why pair a short-lived access token with a refresh token?", options: ["It removes the need for passwords", "It limits the damage if an access token is stolen", "It makes tokens unreadable", "It avoids HTTPS"], correctAnswer: "It limits the damage if an access token is stolen" },
    { id: 5, question: "What does CORS control?", options: ["Which servers may reach your database", "How passwords are hashed", "Which browser origins may call your API", "Rate limits per user"], correctAnswer: "Which browser origins may call your API" },
    { id: 6, question: "Authentication versus authorization?", options: ["What you may do versus who you are", "Login versus logout", "Tokens versus cookies", "Who you are versus what you may do"], correctAnswer: "Who you are versus what you may do" },
  ],
  assignment: {
    prompts: [
      {
        kind: 'code',
        prompt: 'Write a login handler that verifies a bcrypt password hash and issues a signed JWT. Compare with bcrypt.CompareHashAndPassword rather than hashing the input and comparing strings — bcrypt salts every hash, so the two never match textually. Return the same generic error for unknown user and wrong password so the response cannot be used to enumerate accounts. Not runnable here: external modules need network access.',
        language: 'go',
        starterCode: 'package auth\n\nimport (\n    "errors"\n    "time"\n\n    "github.com/golang-jwt/jwt/v5"\n    "golang.org/x/crypto/bcrypt"\n)\n\nvar ErrInvalidCredentials = errors.New("invalid email or password")\n\nfunc Login(email, password, storedHash string, secret []byte) (string, error) {\n    // 1. bcrypt.CompareHashAndPassword([]byte(storedHash), []byte(password))\n    //    -> return ErrInvalidCredentials on mismatch\n    // 2. Build claims: sub = email, exp = 24h from now\n    // 3. Sign with jwt.SigningMethodHS256 and return the token string\n    _ = jwt.SigningMethodHS256\n    _ = time.Now\n    _ = bcrypt.CompareHashAndPassword\n    return "", nil\n}',
        runnable: false,
        examples: [
          { input: 'Login("aditi@example.com", "correct-horse", storedHash, secret)', output: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
          { input: 'Login("aditi@example.com", "wrong-password", storedHash, secret)', output: 'error: invalid email or password' }
        ]
      }
    ]
  }
};

export default mod_m16;
