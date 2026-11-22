import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './ProfileFiles.module.css';
import {
  deleteMyFileApi,
  getMyFileBlobApi,
  getMyFilesApi,
  uploadMyFileApi,
  type UserFileMeta,
} from '../../api';

const PHOTO_PX = 256;
const MAX_PHOTO_SOURCE = 10 * 1024 * 1024; // what we accept before shrinking
const MAX_RESUME = 5 * 1024 * 1024;
const PHOTO_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const RESUME_EXT = /\.(pdf|docx?)$/i;

/** Centre-crops an image to a square and shrinks it to PHOTO_PX, as JPEG. */
async function shrinkPhoto(file: File): Promise<Blob> {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const i = new Image();
      i.onload = () => resolve(i);
      i.onerror = () => reject(new Error('That file is not an image we can read.'));
      i.src = url;
    });
    const side = Math.min(img.naturalWidth, img.naturalHeight);
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = PHOTO_PX;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Your browser could not process the photo.');
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, PHOTO_PX, PHOTO_PX);
    ctx.drawImage(img, (img.naturalWidth - side) / 2, (img.naturalHeight - side) / 2, side, side, 0, 0, PHOTO_PX, PHOTO_PX);
    return await new Promise<Blob>((resolve, reject) =>
      canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('Could not prepare the photo.'))), 'image/jpeg', 0.88));
  } finally {
    URL.revokeObjectURL(url);
  }
}

const fmtSize = (n: number) => (n >= 1024 * 1024 ? `${(n / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(n / 1024))} KB`);
const fmtDate = (s: string) => new Date(s).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

/** The profile photo inside the avatar ring, with change / remove. */
export const AvatarPhoto: React.FC<{ initials: string }> = ({ initials }) => {
  const [src, setSrc] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [menu, setMenu] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  const show = useCallback((blob: Blob | null) => {
    setSrc((old) => {
      if (old) URL.revokeObjectURL(old);
      return blob ? URL.createObjectURL(blob) : null;
    });
  }, []);

  useEffect(() => {
    getMyFileBlobApi('avatar').then(show).catch(() => show(null));
  }, [show]);
  useEffect(() => () => { if (src) URL.revokeObjectURL(src); }, [src]);

  const pick = async (file: File) => {
    setError('');
    if (!PHOTO_TYPES.includes(file.type)) { setError('Use a JPG, PNG or WebP photo.'); return; }
    if (file.size > MAX_PHOTO_SOURCE) { setError('That photo is over 10 MB.'); return; }
    setBusy(true);
    try {
      const small = await shrinkPhoto(file);
      await uploadMyFileApi('avatar', small, 'photo.jpg');
      show(small);
    } catch (e: any) {
      setError(e.message || 'Upload failed');
    } finally {
      setBusy(false);
    }
  };

  const remove = async () => {
    setMenu(false);
    setBusy(true);
    try { await deleteMyFileApi('avatar'); show(null); } catch (e: any) { setError(e.message); } finally { setBusy(false); }
  };

  return (
    <div className={styles.avatarBox}>
      <button
        type="button"
        className={styles.avatarBtn}
        onClick={() => (src ? setMenu((m) => !m) : input.current?.click())}
        aria-label={src ? 'Change or remove profile photo' : 'Upload a profile photo'}
        disabled={busy}
      >
        {src ? <img src={src} alt="" className={styles.avatarImg} /> : <span className={styles.initials}>{initials}</span>}
        <span className={styles.camera} aria-hidden="true">
          {busy ? <span className={styles.spinner} /> : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" /><circle cx="12" cy="13" r="4" /></svg>
          )}
        </span>
      </button>
      {menu && (
        <div className={styles.menu} role="menu">
          <button type="button" role="menuitem" onClick={() => { setMenu(false); input.current?.click(); }}>Change photo</button>
          <button type="button" role="menuitem" className={styles.danger} onClick={remove}>Remove photo</button>
        </div>
      )}
      {error && <div className={styles.avatarError} role="alert">{error}</div>}
      <input ref={input} type="file" accept="image/jpeg,image/png,image/webp" hidden
        onChange={(e) => { const f = e.target.files?.[0]; e.target.value = ''; if (f) pick(f); }} />
    </div>
  );
};

/** The Resume card: upload, view, replace, remove. */
export const ResumeCard: React.FC<{ cardClass: string; iconClass: string; labelClass: string; valueClass: string }> = ({
  cardClass, iconClass, labelClass, valueClass,
}) => {
  const [meta, setMeta] = useState<UserFileMeta | null | undefined>(undefined);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getMyFilesApi().then((f) => setMeta(f.resume)).catch(() => setMeta(null));
  }, []);

  const pick = async (file: File) => {
    setError('');
    if (!RESUME_EXT.test(file.name)) { setError('Use a PDF, DOC or DOCX file.'); return; }
    if (file.size > MAX_RESUME) { setError('The resume must be 5 MB or smaller.'); return; }
    setBusy(true);
    try { setMeta(await uploadMyFileApi('resume', file, file.name)); } catch (e: any) { setError(e.message || 'Upload failed'); } finally { setBusy(false); }
  };

  const view = async () => {
    setError('');
    // Open the tab now (inside the click) so pop-up blockers allow it.
    const tab = window.open('', '_blank');
    try {
      const blob = await getMyFileBlobApi('resume');
      if (!blob) { tab?.close(); setMeta(null); return; }
      const url = URL.createObjectURL(blob);
      if (blob.type === 'application/pdf' && tab) {
        tab.location.href = url;
      } else {
        tab?.close();
        const a = document.createElement('a');
        a.href = url;
        a.download = meta?.name || 'resume';
        a.click();
      }
      setTimeout(() => URL.revokeObjectURL(url), 60_000);
    } catch (e: any) {
      tab?.close();
      setError(e.message || 'Could not open the resume');
    }
  };

  const remove = async () => {
    if (!window.confirm('Remove your resume?')) return;
    setBusy(true);
    try { await deleteMyFileApi('resume'); setMeta(null); } catch (e: any) { setError(e.message); } finally { setBusy(false); }
  };

  return (
    <div className={`${cardClass} ${styles.resumeCard}`}>
      <svg viewBox="0 0 24 24" fill="none" stroke="#e53e3e" strokeWidth="2" className={iconClass}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
      <div className={styles.resumeText}>
        <div className={labelClass}>Resume</div>
        <div className={valueClass} title={meta?.name}>
          {meta === undefined ? 'Loading…' : meta ? meta.name : 'Not uploaded'}
        </div>
        {meta && <div className={styles.resumeSub}>{fmtSize(meta.size)} · {fmtDate(meta.updatedAt)}</div>}
        {error && <div className={styles.resumeError} role="alert">{error}</div>}
        <div className={styles.resumeActions}>
          {meta && <button type="button" onClick={view} disabled={busy}>View</button>}
          <button type="button" onClick={() => input.current?.click()} disabled={busy}>
            {busy ? 'Uploading…' : meta ? 'Replace' : 'Upload'}
          </button>
          {meta && <button type="button" className={styles.danger} onClick={remove} disabled={busy}>Remove</button>}
        </div>
      </div>
      <input ref={input} type="file" accept=".pdf,.doc,.docx,application/pdf" hidden
        onChange={(e) => { const f = e.target.files?.[0]; e.target.value = ''; if (f) pick(f); }} />
    </div>
  );
};
