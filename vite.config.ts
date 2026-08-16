import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { stripQuizAnswers } from './plugins/stripQuizAnswers';

export default defineConfig(({ mode }) => {
  // Load env variables from the current directory
  const env = loadEnv(mode, process.cwd(), '');

  // Fallback to the remote server IP or local depending on VITE_API_TARGET env var
  const apiTarget = env.VITE_API_TARGET || 'http://13.127.192.103:8080';

  return {
    // stripQuizAnswers removes the quiz answer key from production builds.
    // Quizzes are graded server-side, so the client never needs it.
    plugins: [stripQuizAnswers(), react()],
    base: '/',
    server: {
      proxy: {
        '/api/graphql': {
          target: apiTarget,
          changeOrigin: true,
        },
        '/api/login': {
          target: apiTarget,
          changeOrigin: true,
        },
        // Public endpoints behind the login page's "Forgot password?" flow.
        '/api/password-reset': {
          target: apiTarget,
          changeOrigin: true,
        },
        '/api/anthropic': {
          target: 'https://api.anthropic.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/anthropic/, ''),
        },
        '/api/openai': {
          target: 'https://api.openai.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/openai/, ''),
        },
      },
    },
  };
});

