import React, { useState, useRef, useEffect, useCallback } from 'react';
import styles from './ProfilePage.module.css';
import Modal from '../common/Modal';
import { getProfileApi, upsertProfileApi } from '../../api';
import ReferralSection from './ReferralSection';
import CertificateSection from './CertificateSection';

/* ─────────────────────────────── types ─────────────────────────────── */
type ProfileTab = 'Profile' | 'Attendance' | 'Subscription' | 'Referral' | 'Certificate';
type ModalKey = 'personal' | 'generic' | 'edu10' | 'edu12' | 'ugDetail' | 'pgDetail' | null;

const TABS: ProfileTab[] = ['Profile', 'Attendance', 'Subscription', 'Referral', 'Certificate'];

const WORK_EXP_OPTIONS = ['No Experience - Fresher', '< 1 Year', '1 Year', '2 Years', '3 Years', '4 Years', '5+ Years'];
const CAREER_GAP_OPTIONS = ['0', '1', '2', '3', '4', '5+'];
const GENDER_OPTIONS = ['Male', 'Female', 'Other', 'Prefer not to say'];
const BACKLOG_OPTIONS = ['No Backlogs', '1', '2', '3', '4', '5+'];

/* ─────────────────────────────── state shape ─────────────────────────── */
interface PersonalData { name: string; email: string; gender: string; dob: string; whatsapp: string; phone: string; experience: string; }
interface GenericData { workExperience: string; careerGap: string; currentState: string; currentCity: string; preferredLocations: string[]; githubLink: string; linkedinLink: string; isWorkingPro: string; resumeName: string; }
interface Edu10Data { schoolName: string; yearOfPassout: string; marksPercent: string; }
interface Edu12Data { schoolName: string; yearOfPassout: string; marksPercent: string; }
interface UGData { universityRollNo: string; collegeName: string; courseName: string; branch: string; yearOfPassout: string; marksPercent: string; cgpa: string; activeBacklogs: string; }
interface PGData { hasCertificate: string; }

/* ─────────────────── small reusable form helpers ────────────────────── */
const FG: React.FC<{ label: string; req?: boolean; children: React.ReactNode }> = ({ label, req, children }) => (
  <div className="formGroup">
    <label className="formLabel">{label}{req && <span>*</span>}</label>
    {children}
  </div>
);

const TxtInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input className="formInput" {...props} />
);

const SelInput: React.FC<React.SelectHTMLAttributes<HTMLSelectElement> & { opts: string[] }> = ({ opts, ...props }) => (
  <select className="formSelect" {...props}>
    <option value="">-- Select --</option>
    {opts.map(o => <option key={o} value={o}>{o}</option>)}
  </select>
);

/* ── Tag input ── */
const TagInput: React.FC<{ tags: string[]; onChange: (t: string[]) => void; placeholder?: string }> = ({ tags, onChange, placeholder }) => {
  const [input, setInput] = useState('');
  const addTag = (val: string) => {
    const v = val.trim();
    if (v && !tags.includes(v)) onChange([...tags, v]);
    setInput('');
  };
  return (
    <div className="tagInput" onClick={(e) => (e.currentTarget.querySelector('input') as HTMLInputElement)?.focus()}>
      {tags.map(t => (
        <span key={t} className="tag">
          {t}
          <button className="tagRemove" onClick={() => onChange(tags.filter(x => x !== t))} type="button">×</button>
        </span>
      ))}
      <input
        className="tagInputField"
        value={input}
        placeholder={tags.length === 0 ? placeholder : ''}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addTag(input); } if (e.key === 'Backspace' && !input) onChange(tags.slice(0, -1)); }}
        onBlur={() => { if (input.trim()) addTag(input); }}
      />
    </div>
  );
};

/* ── circular progress ring ── */
const CircleProgress: React.FC<{ pct: number }> = ({ pct }) => {
  const r = 44; const circ = 2 * Math.PI * r; const dash = (pct / 100) * circ;
  return (
    <svg className={styles.progressRing} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r={r} className={styles.ringBg} />
      <circle cx="50" cy="50" r={r} className={styles.ringFill} strokeDasharray={`${dash} ${circ}`} strokeDashoffset="0" transform="rotate(-90 50 50)" />
      <text x="50" y="55" textAnchor="middle" className={styles.ringText}>{pct}%</text>
    </svg>
  );
};

const InfoRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className={styles.infoRow}>
    <span className={styles.infoLabel}>{label}</span>
    <span className={styles.infoValue}>{value || <span className={styles.emptyVal}>—</span>}</span>
  </div>
);

interface SectionCardProps { title: string; badge?: string; onEdit: () => void; children: React.ReactNode; }
const SectionCard: React.FC<SectionCardProps> = ({ title, badge, onEdit, children }) => (
  <div className={styles.sectionCard}>
    <div className={styles.sectionHeader}>
      <div className={styles.sectionTitleRow}>
        <span className={styles.sectionBar} />
        <h2 className={styles.sectionTitle}>{title}</h2>
        {badge && <span className={styles.badge}>{badge}</span>}
      </div>
      <button className={styles.editBtn} onClick={onEdit}>Edit</button>
    </div>
    {children}
  </div>
);

/* ── Coming soon ── */
const ComingSoon: React.FC<{ tab: string }> = ({ tab }) => (
  <div className={styles.comingSoon}>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
    <p>{tab} section coming soon</p>
  </div>
);

/* ═══════════════════════════ Main Component ════════════════════════════ */
const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ProfileTab>('Profile');
  const [openModal, setOpenModal] = useState<ModalKey>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // name comes from the users table (set at login), profile fields come from user_profiles
  const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
  const userName: string = storedUser.name || '';

  /* ── live data state ── */
  const [personal, setPersonal] = useState<PersonalData>({ name: userName, email: storedUser.email || '', gender: '', dob: '', whatsapp: '', phone: '', experience: '' });
  const [generic, setGeneric] = useState<GenericData>({ workExperience: '', careerGap: '', currentState: '', currentCity: '', preferredLocations: [], githubLink: '', linkedinLink: '', isWorkingPro: 'No', resumeName: '' });
  const [edu10, setEdu10] = useState<Edu10Data>({ schoolName: '', yearOfPassout: '', marksPercent: '' });
  const [edu12, setEdu12] = useState<Edu12Data>({ schoolName: '', yearOfPassout: '', marksPercent: '' });
  const [ug, setUg] = useState<UGData>({ universityRollNo: '', collegeName: '', courseName: '', branch: '', yearOfPassout: '', marksPercent: '', cgpa: '', activeBacklogs: '' });
  const [pg, setPg] = useState<PGData>({ hasCertificate: 'No' });

  /* ── draft state (edits before save) ── */
  const [dPersonal, setDPersonal] = useState<PersonalData>(personal);
  const [dGeneric, setDGeneric] = useState<GenericData>(generic);
  const [dEdu10, setDEdu10] = useState<Edu10Data>(edu10);
  const [dEdu12, setDEdu12] = useState<Edu12Data>(edu12);
  const [dUg, setDUg] = useState<UGData>(ug);
  const [dPg, setDPg] = useState<PGData>(pg);

  /* ── Load profile from backend on mount ── */
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getProfileApi()
      .then((p) => {
        if (cancelled) return;
        setPersonal(prev => ({
          ...prev,
          gender: p.gender || '',
          dob: p.dob || '',
          whatsapp: p.whatsapp || '',
          phone: p.phone || '',
          experience: p.experience || '',
        }));
        setGeneric({
          workExperience: p.workExperience || '',
          careerGap: p.careerGap || '',
          currentState: p.currentState || '',
          currentCity: p.currentCity || '',
          preferredLocations: p.preferredLocations || [],
          githubLink: p.githubLink || '',
          linkedinLink: p.linkedinLink || '',
          isWorkingPro: p.isWorkingProfessional ? 'Yes' : 'No',
          resumeName: p.resumeName || '',
        });
        setEdu10({ schoolName: p.edu10SchoolName || '', yearOfPassout: p.edu10YearOfPassout || '', marksPercent: p.edu10MarksPercent || '' });
        setEdu12({ schoolName: p.edu12SchoolName || '', yearOfPassout: p.edu12YearOfPassout || '', marksPercent: p.edu12MarksPercent || '' });
        setUg({
          universityRollNo: p.ugUniversityRollNo || '',
          collegeName: p.ugCollegeName || '',
          courseName: p.ugCourseName || '',
          branch: p.ugBranch || '',
          yearOfPassout: p.ugYearOfPassout || '',
          marksPercent: p.ugMarksPercent || '',
          cgpa: p.ugCgpa || '',
          activeBacklogs: p.ugActiveBacklogs || '',
        });
        setPg({ hasCertificate: p.pgHasCertificate ? 'Yes' : 'No' });
      })
      .catch((err) => {
        if (!cancelled) setApiError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  /* ── Build API payload from current state ── */
  const buildPayload = useCallback((
    nextPersonal: PersonalData,
    nextGeneric: GenericData,
    nextEdu10: Edu10Data,
    nextEdu12: Edu12Data,
    nextUg: UGData,
    nextPg: PGData,
  ) => ({
    gender: nextPersonal.gender,
    dob: nextPersonal.dob,
    whatsapp: nextPersonal.whatsapp,
    phone: nextPersonal.phone,
    experience: nextPersonal.experience,
    workExperience: nextGeneric.workExperience,
    careerGap: nextGeneric.careerGap,
    currentState: nextGeneric.currentState,
    currentCity: nextGeneric.currentCity,
    preferredLocations: nextGeneric.preferredLocations,
    githubLink: nextGeneric.githubLink,
    linkedinLink: nextGeneric.linkedinLink,
    isWorkingProfessional: nextGeneric.isWorkingPro === 'Yes',
    resumeName: nextGeneric.resumeName,
    edu10SchoolName: nextEdu10.schoolName,
    edu10YearOfPassout: nextEdu10.yearOfPassout,
    edu10MarksPercent: nextEdu10.marksPercent,
    edu12SchoolName: nextEdu12.schoolName,
    edu12YearOfPassout: nextEdu12.yearOfPassout,
    edu12MarksPercent: nextEdu12.marksPercent,
    ugUniversityRollNo: nextUg.universityRollNo,
    ugCollegeName: nextUg.collegeName,
    ugCourseName: nextUg.courseName,
    ugBranch: nextUg.branch,
    ugYearOfPassout: nextUg.yearOfPassout,
    ugMarksPercent: nextUg.marksPercent,
    ugCgpa: nextUg.cgpa,
    ugActiveBacklogs: nextUg.activeBacklogs,
    pgHasCertificate: nextPg.hasCertificate === 'Yes',
  }), []);

  const open = (key: ModalKey) => {
    /* copy current saved data into draft before opening */
    if (key === 'personal') setDPersonal({ ...personal });
    if (key === 'generic') setDGeneric({ ...generic });
    if (key === 'edu10') setDEdu10({ ...edu10 });
    if (key === 'edu12') setDEdu12({ ...edu12 });
    if (key === 'ugDetail') setDUg({ ...ug });
    if (key === 'pgDetail') setDPg({ ...pg });
    setOpenModal(key);
  };

  const save = async () => {
    // Compute the next committed state
    const nextPersonal = openModal === 'personal' ? { ...dPersonal } : personal;
    const nextGeneric  = openModal === 'generic'  ? { ...dGeneric  } : generic;
    const nextEdu10    = openModal === 'edu10'    ? { ...dEdu10    } : edu10;
    const nextEdu12    = openModal === 'edu12'    ? { ...dEdu12    } : edu12;
    const nextUg       = openModal === 'ugDetail' ? { ...dUg       } : ug;
    const nextPg       = openModal === 'pgDetail' ? { ...dPg       } : pg;

    // Optimistically update local state
    if (openModal === 'personal') setPersonal(nextPersonal);
    if (openModal === 'generic')  setGeneric(nextGeneric);
    if (openModal === 'edu10')    setEdu10(nextEdu10);
    if (openModal === 'edu12')    setEdu12(nextEdu12);
    if (openModal === 'ugDetail') setUg(nextUg);
    if (openModal === 'pgDetail') setPg(nextPg);

    setOpenModal(null);
    setApiError(null);
    setSaving(true);
    try {
      await upsertProfileApi(buildPayload(nextPersonal, nextGeneric, nextEdu10, nextEdu12, nextUg, nextPg));
    } catch (err: any) {
      setApiError(err.message || 'Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  /* profile completion calculation */
  const filled = [
    personal.name, personal.email, personal.gender, personal.dob, personal.phone,
    generic.workExperience, generic.currentState, generic.currentCity,
    edu10.schoolName, edu12.schoolName,
    ug.collegeName, ug.branch,
  ].filter(Boolean).length;
  const profileCompletion = Math.round((filled / 12) * 100);
  const initials = personal.name ? personal.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : '?';

  return (
    <div className={styles.page}>

      {/* ── Loading skeleton ── */}
      {loading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.spinner} />
          <span>Loading profile…</span>
        </div>
      )}

      {/* ── Saving banner ── */}
      {saving && (
        <div className={styles.savingBanner}>
          <div className={styles.savingDot} />
          Saving…
        </div>
      )}

      {/* ── API error toast ── */}
      {apiError && (
        <div className={styles.errorToast}>
          <span>⚠ {apiError}</span>
          <button onClick={() => setApiError(null)}>✕</button>
        </div>
      )}

      {/* tab bar */}

      <div className={styles.tabBar}>
        {TABS.map(tab => (
          <button key={tab} id={`profile-tab-${tab.toLowerCase()}`}
            className={`${styles.tabBtn} ${activeTab === tab ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(tab)}>{tab}</button>
        ))}
      </div>

      {/* tab content */}
      <div className={styles.tabContent}>
        {activeTab === 'Referral' && <ReferralSection />}
        {activeTab === 'Certificate' && <CertificateSection />}
        {activeTab !== 'Profile' && activeTab !== 'Referral' && activeTab !== 'Certificate' && <ComingSoon tab={activeTab} />}
        {activeTab === 'Profile' && (
          <div className={styles.profileContent}>

            {/* ── User header ── */}
            <div className={styles.userHeader}>
              <div className={styles.avatarWrap}>
                <div className={styles.avatarCircle}>
                  <CircleProgress pct={profileCompletion} />
                  <div className={styles.avatarInner}><span className={styles.avatarInitials}>{initials}</span></div>
                </div>
              </div>
              <div className={styles.userInfo}>
                <div className={styles.userNameRow}>
                  <h1 className={styles.userName}>{personal.name || <span className={styles.emptyVal}>Your Name</span>}</h1>
                  <span className={styles.idBadge}>Knovate ID: <strong>SKLO1V59</strong></span>
                  <button className={styles.editBtn} onClick={() => open('personal')}>Edit</button>
                </div>
                <div className={styles.userMeta}>
                  <span className={styles.metaItem}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>{personal.email || '—'}</span>
                  <span className={styles.metaItem}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" /></svg>{personal.gender || '—'}</span>
                  <span className={styles.metaItem}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>{personal.dob || '—'}</span>
                </div>
                <div className={styles.userMeta}>
                  <span className={styles.metaItem}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.02 1.18 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14v2.92z" /></svg>{personal.whatsapp || '—'}</span>
                  <span className={styles.metaItem}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.02 1.18 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14v2.92z" /></svg>{personal.phone || '—'}</span>
                  <span className={styles.metaItem}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>{personal.experience || '—'}</span>
                </div>
              </div>
            </div>

            {/* ── Generic Details ── */}
            <SectionCard title="Generic Details" onEdit={() => open('generic')}>
              <div className={styles.grid2}>
                <InfoRow label="Work Experience" value={generic.workExperience} />
                <InfoRow label="Career Gap" value={generic.careerGap} />
                <InfoRow label="Current State" value={generic.currentState} />
                <InfoRow label="Current City" value={generic.currentCity} />
                <div className={styles.fullSpan}>
                  <InfoRow label="Preferred Location" value={generic.preferredLocations.join(', ')} />
                </div>
              </div>
              <div className={styles.linkCards}>
                <a href={generic.githubLink || '#'} target="_blank" rel="noreferrer" className={styles.linkCard}>
                  <svg viewBox="0 0 24 24" fill="currentColor" className={styles.linkIcon}><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
                  <div><div className={styles.linkCardLabel}>Github profile</div><div className={styles.linkCardVal}>{generic.githubLink || 'Not added'}</div></div>
                </a>
                <a href={generic.linkedinLink || '#'} target="_blank" rel="noreferrer" className={styles.linkCard}>
                  <svg viewBox="0 0 24 24" fill="#0077b5" className={styles.linkIcon}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                  <div><div className={styles.linkCardLabel}>LinkedIn profile</div><div className={styles.linkCardVal}>{generic.linkedinLink || 'Not added'}</div></div>
                </a>
                <div className={styles.linkCard}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#e53e3e" strokeWidth="2" className={styles.linkIcon}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                  <div><div className={styles.linkCardLabel}>Resume</div><div className={styles.linkCardVal}>{generic.resumeName || 'Not uploaded'}</div></div>
                </div>
              </div>
            </SectionCard>

            {/* ── 10th Grade ── */}
            <SectionCard title="10th Grade" badge="①" onEdit={() => open('edu10')}>
              <div className={styles.grid2}>
                <InfoRow label="School Name" value={edu10.schoolName} />
                <InfoRow label="Year of Passout" value={edu10.yearOfPassout} />
                <InfoRow label="Marks in %" value={edu10.marksPercent} />
              </div>
            </SectionCard>

            {/* ── 12th ── */}
            <SectionCard title="12th / PUC / Intermediate / Diploma" badge="②" onEdit={() => open('edu12')}>
              <div className={styles.grid2}>
                <InfoRow label="School Name" value={edu12.schoolName} />
                <InfoRow label="Year of Passout" value={edu12.yearOfPassout} />
                <InfoRow label="Marks in %" value={edu12.marksPercent} />
              </div>
            </SectionCard>

            {/* ── UG Detail ── */}
            <SectionCard title="UG Detail" badge="③" onEdit={() => open('ugDetail')}>
              <div className={styles.grid2}>
                <InfoRow label="University Roll No." value={ug.universityRollNo} />
                <InfoRow label="College Name" value={ug.collegeName} />
                <InfoRow label="Course Name" value={ug.courseName} />
                <InfoRow label="Branch" value={ug.branch} />
                <InfoRow label="Year of Passout" value={ug.yearOfPassout} />
                <InfoRow label="Marks in %" value={ug.marksPercent} />
                <InfoRow label="CGPA" value={ug.cgpa} />
                <InfoRow label="Active Backlogs" value={ug.activeBacklogs} />
              </div>
            </SectionCard>

            {/* ── PG Detail ── */}
            <div className={styles.sectionCard}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionTitleRow}>
                  <span className={styles.sectionBar} /><h2 className={styles.sectionTitle}>PG Detail</h2>
                </div>
                <button className={styles.editBtn} onClick={() => open('pgDetail')}>Edit</button>
              </div>
              <div className={styles.pgRow}>
                <span className={styles.infoLabel}>Do you have Post Graduation Certificate?</span>
                <span className={pg.hasCertificate === 'Yes' ? styles.pillYes : styles.pillNo}>{pg.hasCertificate || '—'}</span>
              </div>
            </div>

          </div>
        )}
      </div>

      {/* ════════════ MODALS ════════════ */}

      {/* ── Personal Info Modal ── */}
      <Modal isOpen={openModal === 'personal'} title="Personal Information" onClose={() => setOpenModal(null)} onSave={save}>
        <FG label="Full Name" req><TxtInput placeholder="Enter your full name" value={dPersonal.name} onChange={e => setDPersonal(p => ({ ...p, name: e.target.value }))} /></FG>
        <FG label="Email Address" req><TxtInput type="email" placeholder="Enter email" value={dPersonal.email} onChange={e => setDPersonal(p => ({ ...p, email: e.target.value }))} /></FG>
        <div className="formGrid2">
          <FG label="Gender" req><SelInput opts={GENDER_OPTIONS} value={dPersonal.gender} onChange={e => setDPersonal(p => ({ ...p, gender: e.target.value }))} /></FG>
          <FG label="Date of Birth" req><TxtInput type="date" value={dPersonal.dob} onChange={e => setDPersonal(p => ({ ...p, dob: e.target.value }))} /></FG>
        </div>
        <div className="formGrid2">
          <FG label="WhatsApp Number"><TxtInput placeholder="WhatsApp no." value={dPersonal.whatsapp} onChange={e => setDPersonal(p => ({ ...p, whatsapp: e.target.value }))} /></FG>
          <FG label="Phone Number"><TxtInput placeholder="Phone no." value={dPersonal.phone} onChange={e => setDPersonal(p => ({ ...p, phone: e.target.value }))} /></FG>
        </div>
        <FG label="Work Experience" req><SelInput opts={WORK_EXP_OPTIONS} value={dPersonal.experience} onChange={e => setDPersonal(p => ({ ...p, experience: e.target.value }))} /></FG>
      </Modal>

      {/* ── Generic Details Modal ── */}
      <Modal isOpen={openModal === 'generic'} title="Generic Details" onClose={() => setOpenModal(null)} onSave={save}>
        <FG label="Work Experience" req><SelInput opts={WORK_EXP_OPTIONS} value={dGeneric.workExperience} onChange={e => setDGeneric(g => ({ ...g, workExperience: e.target.value }))} /></FG>
        <FG label="Career gap in years" req><SelInput opts={CAREER_GAP_OPTIONS} value={dGeneric.careerGap} onChange={e => setDGeneric(g => ({ ...g, careerGap: e.target.value }))} /></FG>
        <FG label="Current State" req><TxtInput placeholder="e.g. Karnataka" value={dGeneric.currentState} onChange={e => setDGeneric(g => ({ ...g, currentState: e.target.value }))} /></FG>
        <FG label="Current City" req><TxtInput placeholder="e.g. Bengaluru" value={dGeneric.currentCity} onChange={e => setDGeneric(g => ({ ...g, currentCity: e.target.value }))} /></FG>
        <FG label="Preferred Location" req>
          <TagInput tags={dGeneric.preferredLocations} onChange={t => setDGeneric(g => ({ ...g, preferredLocations: t }))} placeholder="Type a city and press Enter" />
        </FG>
        <div className="sectionDivider" />
        <FG label="Github Link" req><TxtInput placeholder="https://github.com/username" value={dGeneric.githubLink} onChange={e => setDGeneric(g => ({ ...g, githubLink: e.target.value }))} /></FG>
        <FG label="Linkedin Link" req><TxtInput placeholder="https://linkedin.com/in/username" value={dGeneric.linkedinLink} onChange={e => setDGeneric(g => ({ ...g, linkedinLink: e.target.value }))} /></FG>
        <FG label="Are you working professional?" req>
          <div className="radioGroup">
            <label className="radioLabel"><input type="radio" name="workingPro" value="Yes" checked={dGeneric.isWorkingPro === 'Yes'} onChange={() => setDGeneric(g => ({ ...g, isWorkingPro: 'Yes' }))} /> Yes</label>
            <label className="radioLabel"><input type="radio" name="workingPro" value="No" checked={dGeneric.isWorkingPro === 'No'} onChange={() => setDGeneric(g => ({ ...g, isWorkingPro: 'No' }))} /> No</label>
          </div>
        </FG>
        <FG label="Upload Resume">
          <div className="fileUpload" onClick={() => fileInputRef.current?.click()}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
            <span className="fileUploadText">{dGeneric.resumeName || 'Click to upload PDF / DOC'}</span>
          </div>
          <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx" style={{ display: 'none' }}
            onChange={e => { if (e.target.files?.[0]) setDGeneric(g => ({ ...g, resumeName: e.target.files![0].name })); }} />
        </FG>
      </Modal>

      {/* ── 10th Grade Modal ── */}
      <Modal isOpen={openModal === 'edu10'} title="10th Grade Details" onClose={() => setOpenModal(null)} onSave={save}>
        <FG label="School Name" req><TxtInput placeholder="Enter school name" value={dEdu10.schoolName} onChange={e => setDEdu10(d => ({ ...d, schoolName: e.target.value }))} /></FG>
        <div className="formGrid2">
          <FG label="Year of Passout" req><TxtInput placeholder="e.g. 2018" value={dEdu10.yearOfPassout} onChange={e => setDEdu10(d => ({ ...d, yearOfPassout: e.target.value }))} /></FG>
          <FG label="Marks in %" req><TxtInput placeholder="e.g. 85.5" value={dEdu10.marksPercent} onChange={e => setDEdu10(d => ({ ...d, marksPercent: e.target.value }))} /></FG>
        </div>
      </Modal>

      {/* ── 12th Grade Modal ── */}
      <Modal isOpen={openModal === 'edu12'} title="12th / PUC / Intermediate / Diploma" onClose={() => setOpenModal(null)} onSave={save}>
        <FG label="School / College Name" req><TxtInput placeholder="Enter school or college name" value={dEdu12.schoolName} onChange={e => setDEdu12(d => ({ ...d, schoolName: e.target.value }))} /></FG>
        <div className="formGrid2">
          <FG label="Year of Passout" req><TxtInput placeholder="e.g. 2020" value={dEdu12.yearOfPassout} onChange={e => setDEdu12(d => ({ ...d, yearOfPassout: e.target.value }))} /></FG>
          <FG label="Marks in %" req><TxtInput placeholder="e.g. 78.0" value={dEdu12.marksPercent} onChange={e => setDEdu12(d => ({ ...d, marksPercent: e.target.value }))} /></FG>
        </div>
      </Modal>

      {/* ── UG Detail Modal ── */}
      <Modal isOpen={openModal === 'ugDetail'} title="UG Detail" onClose={() => setOpenModal(null)} onSave={save}>
        <div className="formGrid2">
          <FG label="University Roll No." req><TxtInput placeholder="Roll number" value={dUg.universityRollNo} onChange={e => setDUg(d => ({ ...d, universityRollNo: e.target.value }))} /></FG>
          <FG label="College Name" req><TxtInput placeholder="College name" value={dUg.collegeName} onChange={e => setDUg(d => ({ ...d, collegeName: e.target.value }))} /></FG>
        </div>
        <FG label="Course Name" req><TxtInput placeholder="e.g. B.Tech" value={dUg.courseName} onChange={e => setDUg(d => ({ ...d, courseName: e.target.value }))} /></FG>
        <FG label="Branch" req><TxtInput placeholder="e.g. Computer Science" value={dUg.branch} onChange={e => setDUg(d => ({ ...d, branch: e.target.value }))} /></FG>
        <div className="formGrid2">
          <FG label="Year of Passout" req><TxtInput placeholder="e.g. 2024" value={dUg.yearOfPassout} onChange={e => setDUg(d => ({ ...d, yearOfPassout: e.target.value }))} /></FG>
          <FG label="Marks in %" req><TxtInput placeholder="e.g. 72.5" value={dUg.marksPercent} onChange={e => setDUg(d => ({ ...d, marksPercent: e.target.value }))} /></FG>
        </div>
        <div className="formGrid2">
          <FG label="CGPA"><TxtInput placeholder="e.g. 7.5" value={dUg.cgpa} onChange={e => setDUg(d => ({ ...d, cgpa: e.target.value }))} /></FG>
          <FG label="Active Backlogs"><SelInput opts={BACKLOG_OPTIONS} value={dUg.activeBacklogs} onChange={e => setDUg(d => ({ ...d, activeBacklogs: e.target.value }))} /></FG>
        </div>
      </Modal>

      {/* ── PG Detail Modal ── */}
      <Modal isOpen={openModal === 'pgDetail'} title="PG Detail" onClose={() => setOpenModal(null)} onSave={save}>
        <FG label="Do you have Post Graduation Certificate?" req>
          <div className="radioGroup">
            <label className="radioLabel"><input type="radio" name="pgCert" value="Yes" checked={dPg.hasCertificate === 'Yes'} onChange={() => setDPg({ hasCertificate: 'Yes' })} /> Yes</label>
            <label className="radioLabel"><input type="radio" name="pgCert" value="No" checked={dPg.hasCertificate === 'No'} onChange={() => setDPg({ hasCertificate: 'No' })} /> No</label>
          </div>
        </FG>
      </Modal>

    </div>
  );
};

export default ProfilePage;
