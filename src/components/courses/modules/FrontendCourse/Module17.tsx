import React, { useState } from 'react';
import styles from '../../FrontendCoursePage.module.css';
import CodeSnippet from '../../../common/CodeSnippet';
import ModuleQuiz from '../../shared/ModuleQuiz';
import ModuleAssignment from '../../shared/ModuleAssignment';
import { frontendAssignments } from './assignments';
import { QuizQuestion } from '../../../../types';

interface Props { page: number; }

const Module17: React.FC<Props> = ({ page }) => {

  // env sandbox state
  const [envKey, setEnvKey] = useState('');
  const [envValue, setEnvValue] = useState('');
  const [envOutput, setEnvOutput] = useState<string[]>([]);

  // SEO Checker state
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDesc, setSeoDesc] = useState('');
  const [seoScore, setSeoScore] = useState<number | null>(null);

  const quizQuestions: QuizQuestion[] = [
    { id: 1, question: 'Q1: What does the build step do to source files for production release?', options: ['A. Transpiles, minifies, and tree-shakes code files into a compact build bundle', 'B. Uploads files directly to GitHub', 'C. Runs local unit tests', 'D. Re-scaffolds the application'], correctAnswer: 'A. Transpiles, minifies, and tree-shakes code files into a compact build bundle' },
    { id: 2, question: 'Q2: How must environment variables be prefixed in Vite applications to expose them to the client?', options: ['A. REACT_APP_', 'B. VITE_', 'C. ENV_', 'D. CLIENT_'], correctAnswer: 'B. VITE_' },
    { id: 3, question: 'Q3: Which DNS records are commonly modified to point a custom domain to a cloud host?', options: ['A. TXT & MX', 'B. A & CNAME', 'C. SRV & NS', 'D. None of the above'], correctAnswer: 'B. A & CNAME' },
    { id: 4, question: 'Q4: What is the optimal length of an SEO Meta Description tag?', options: ['A. Under 20 characters', 'B. Between 50 to 160 characters', 'C. Over 500 characters', 'D. Length does not matter'], correctAnswer: 'B. Between 50 to 160 characters' },
    { id: 5, question: 'Q5: Which hosting service is best known for seamless integration with Next.js/React frameworks via Git push hooks?', options: ['A. GoDaddy', 'B. Vercel', 'C. WordPress', 'D. MySQL'], correctAnswer: 'B. Vercel' },
  ];

  const handleAddEnv = () => {
    if (envKey.trim() && envValue.trim()) {
      const formattedKey = envKey.trim().toUpperCase().replace(/[^A-Z0-9_]/g, '_');
      const prefix = formattedKey.startsWith('VITE_') ? '' : 'VITE_';
      setEnvOutput(p => [...p, `${prefix}${formattedKey}=${envValue.trim()}`]);
      setEnvKey('');
      setEnvValue('');
    }
  };

  const handleCheckSEO = () => {
    let score = 0;
    if (seoTitle.length >= 10 && seoTitle.length <= 60) score += 40;
    else if (seoTitle.length > 0) score += 15;

    if (seoDesc.length >= 50 && seoDesc.length <= 160) score += 40;
    else if (seoDesc.length > 0) score += 15;

    // Check for common words
    if (seoTitle.toLowerCase().includes('react') || seoTitle.toLowerCase().includes('frontend') || seoTitle.toLowerCase().includes('course')) score += 20;

    setSeoScore(score);
  };

  switch (page) {
    case 1:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 17.1: Build Process</h2>
          <p className={styles.paragraph}>During development, React source code files remain un-optimized for debugging visibility. For production releases, files must run through a build bundler.</p>
          
          <h3 className={styles.subtitle}>Build Actions:</h3>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '20px', fontSize: '13.5px', color: 'var(--text-secondary)' }}>
            <li><strong>Minification</strong>: Removing comments, white space, and renaming long variable names to single letters to compress file size.</li>
            <li><strong>Transpilation</strong>: Compiling modern JavaScript/TS (ES6+) into backward-compatible versions compatible with older browsers.</li>
            <li><strong>Tree-Shaking</strong>: Analyzing dependencies maps and stripping away unused dead code imports.</li>
          </ul>

          <div className={styles.codeLabel}>Vite Build Command</div>
          <CodeSnippet isRunnable={true} language="Bash" code={`# Compile files and output bundles to "dist/" directory
npm run build`} />
        </div>
      );

    case 2:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 17.2: Environment Variables</h2>
          <p className={styles.paragraph}>Never hardcode private credentials (e.g. database keys, API endpoints, payment secrets) directly inside code files that get pushed to GitHub.</p>
          <p className={styles.paragraph}>Instead, store them in `.env` files locally and reference them dynamically inside your code.</p>

          <div className={styles.codeLabel}>Vite .env prefixing</div>
          <CodeSnippet isRunnable={true} language="Bash" code={`# Local environment file (.env.local)
# Variables MUST be prefixed with VITE_ to be exposed to client code
VITE_API_URL=https://api.myserver.com

# Accessing variable inside React:
const endpoint = import.meta.env.VITE_API_URL;`} />

          <h3 className={styles.subtitle}>Env Config Builder</h3>
          <div style={{ background: 'var(--bg-surface-2)', padding: '16px', borderRadius: '8px' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
              <input className={styles.inputField} placeholder="Key (e.g. API_URL)" value={envKey} onChange={e => setEnvKey(e.target.value)} />
              <input className={styles.inputField} placeholder="Value" value={envValue} onChange={e => setEnvValue(e.target.value)} />
              <button className={styles.saveBtn} onClick={handleAddEnv}>Add to .env</button>
            </div>
            {envOutput.length > 0 && (
              <pre className={styles.codeBlock} style={{ margin: 0 }}><code>{envOutput.join('\n')}</code></pre>
            )}
          </div>
        </div>
      );

    case 3:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 17.3: Deploying on Vercel</h2>
          <p className={styles.paragraph}><strong>Vercel</strong> is a cloud platform for static sites and Serverless Functions, and is the creators of Next.js.</p>
          
          <h3 className={styles.subtitle}>Vercel Git Integration Deployment:</h3>
          <ol style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '6px', paddingLeft: '20px' }}>
            <li>1. Push your local React code repository to GitHub.</li>
            <li>2. Create a free account on Vercel using your GitHub login.</li>
            <li>3. Click "Add New" → "Project" on Vercel Dashboard.</li>
            <li>4. Select your GitHub repository and click "Import".</li>
            <li>5. Input any Environment Variables if required, and click "Deploy".</li>
            <li>6. Every future git push to the main branch will trigger automatic production rebuilds!</li>
          </ol>
        </div>
      );

    case 4:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 17.4: Deploying on Netlify</h2>
          <p className={styles.paragraph}><strong>Netlify</strong> is another popular web developer hosting platform featuring automated git pipelines.</p>
          
          <h3 className={styles.subtitle}>Netlify Deployment Steps:</h3>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '20px', fontSize: '13.5px', color: 'var(--text-secondary)' }}>
            <li>Connect your Netlify dashboard to your GitHub account.</li>
            <li>Select your project repository, specify build command as <code>npm run build</code> and publish directory as <code>dist</code> (or <code>build</code>).</li>
            <li>Configure redirect rules in a <code>_redirects</code> file inside the public directory for React Router SPA path matches to resolve correctly: <code>/* /index.html 200</code></li>
          </ul>
        </div>
      );

    case 5:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 17.5: Custom Domain Setup</h2>
          <p className={styles.paragraph}>To point a custom domain (e.g. <code>www.myportfolio.com</code>) to your cloud hosting deployment, modify domain name registrar DNS settings.</p>
          
          <h3 className={styles.subtitle}>DNS Settings Configuration:</h3>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '20px', fontSize: '13.5px', color: 'var(--text-secondary)' }}>
            <li><strong>A Record</strong>: Points the root domain (<code>myportfolio.com</code>) to the host server IP address.</li>
            <li><strong>CNAME Record</strong>: Points subdomains (<code>www.myportfolio.com</code>) to the host distribution domain (e.g. <code>myproject.vercel.app</code>).</li>
          </ul>
        </div>
      );

    case 6:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 17.6: SEO Basics</h2>
          <p className={styles.paragraph}><strong>Search Engine Optimization (SEO)</strong> is the practice of increasing the quantity and quality of traffic to your website through organic search engine results.</p>
          
          <h3 className={styles.subtitle}>SEO Optimization Checklist:</h3>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '20px', fontSize: '13.5px', color: 'var(--text-secondary)' }}>
            <li><strong>Title Tags</strong>: Unique descriptive page titles, optimally between 50 to 60 characters.</li>
            <li><strong>Meta Description</strong>: Summarize page content, optimally between 50 to 160 characters.</li>
            <li><strong>Semantic HTML</strong>: Use elements like <code>&lt;header&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;footer&gt;</code>, and single <code>&lt;h1&gt;</code> tags.</li>
            <li><strong>Sitemaps & Robots</strong>: Provide index maps to help crawlers catalog your site pages.</li>
          </ul>

          <h3 className={styles.subtitle}>SEO Metadata Analyzer Simulator</h3>
          <div style={{ background: 'var(--bg-surface-2)', padding: '16px', borderRadius: '8px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
              <input className={styles.inputField} placeholder="Title tag text" value={seoTitle} onChange={e => setSeoTitle(e.target.value)} />
              <textarea className={styles.assignmentBox} style={{ height: '60px' }} placeholder="Meta description text" value={seoDesc} onChange={e => setSeoDesc(e.target.value)} />
              <button className={styles.saveBtn} onClick={handleCheckSEO}>Analyze SEO Tags</button>
            </div>
            {seoScore !== null && (
              <div style={{ background: 'var(--bg-surface-1)', padding: '12px', borderRadius: '6px' }}>
                <p style={{ margin: 0, fontSize: '13.5px' }}>Calculated SEO Score: <strong style={{ color: seoScore > 70 ? '#10b981' : seoScore > 40 ? '#f59e0b' : '#ef4444' }}>{seoScore} / 100</strong></p>
                <ul style={{ fontSize: '12px', margin: '6px 0 0 0', paddingLeft: '16px', color: 'var(--text-secondary)' }}>
                  <li>Title length check ({seoTitle.length} chars): {seoTitle.length >= 10 && seoTitle.length <= 60 ? '✅ Ideal' : '❌ Needs to be 10-60 characters'}</li>
                  <li>Description length check ({seoDesc.length} chars): {seoDesc.length >= 50 && seoDesc.length <= 160 ? '✅ Ideal' : '❌ Needs to be 50-160 characters'}</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      );

    case 7:
      return <ModuleQuiz moduleId="frontend-m17" title="Module 17 Quiz" questions={quizQuestions} />;

    case 8:
      return (
        <ModuleAssignment
          moduleId="frontend-m17"
          title="Module 17 Assignment"
          questions={frontendAssignments.m17}
        />
      );

    default:
      return null;
  }
};

export default Module17;
