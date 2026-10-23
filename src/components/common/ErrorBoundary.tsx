import React from 'react';

interface Props {
  children: React.ReactNode;
  /** When this changes (e.g. the route), a shown error is cleared. */
  resetKey?: string;
}

interface State {
  error: Error | null;
}

/** A lazily loaded file could not be fetched — typically a tab left open across a deploy. */
const isChunkLoadError = (error: Error) =>
  /Failed to fetch dynamically imported module|Importing a module script failed|error loading dynamically imported module|ChunkLoadError/i.test(
    `${error.name} ${error.message}`,
  );

const RELOADED_KEY = 'errorBoundary.reloadedFor';

/**
 * Catches an error while rendering a page, so one broken screen shows a way out
 * instead of blanking the whole app.
 *
 * The usual cause in production is a deploy: a tab opened before it still asks
 * for the old build's lazily loaded files, which no longer exist. Reloading
 * fetches the new build, so that case reloads by itself — once per page, so a
 * genuinely missing file cannot loop.
 */
class ErrorBoundary extends React.Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error) {
    console.error('Page failed to render:', error);
    if (isChunkLoadError(error)) {
      let reloaded: string | null = null;
      try {
        reloaded = sessionStorage.getItem(RELOADED_KEY);
      } catch {
        // Storage unavailable: fall through to the manual button.
      }
      if (reloaded !== window.location.pathname) {
        try {
          sessionStorage.setItem(RELOADED_KEY, window.location.pathname);
        } catch {
          return;
        }
        window.location.reload();
      }
    }
  }

  componentDidUpdate(prev: Props) {
    if (this.state.error && prev.resetKey !== this.props.resetKey) {
      this.setState({ error: null });
    }
  }

  render() {
    if (!this.state.error) return this.props.children;
    const chunk = isChunkLoadError(this.state.error);
    return (
      <div
        role="alert"
        style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: 14, minHeight: '50vh', padding: 24, textAlign: 'center',
          background: 'var(--bg-page)', color: 'var(--text-primary)',
        }}
      >
        <h2 style={{ margin: 0, fontSize: 20 }}>
          {chunk ? 'A new version of the app is available' : 'Something went wrong on this page'}
        </h2>
        <p style={{ margin: 0, color: 'var(--text-secondary)', maxWidth: 420 }}>
          {chunk
            ? 'Reload to continue. Your progress is saved.'
            : 'Reloading usually fixes it. If it keeps happening, let us know which page you were on.'}
        </p>
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={() => window.location.reload()}
            style={{ padding: '9px 18px', borderRadius: 8, border: 'none', background: 'var(--accent)', color: '#fff', fontWeight: 700, cursor: 'pointer' }}
          >
            Reload
          </button>
          <button
            onClick={() => window.location.assign('/')}
            style={{ padding: '9px 18px', borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-primary)', fontWeight: 600, cursor: 'pointer' }}
          >
            Go to dashboard
          </button>
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;
