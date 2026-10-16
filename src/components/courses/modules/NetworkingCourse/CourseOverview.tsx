import React from 'react';

const CourseOverview: React.FC = () => {
  return (
    <div style={{ maxWidth: '850px', margin: '0 auto', padding: '0 16px' }}>
      <div style={{ padding: '24px 0', color: 'var(--text)' }}>
        <h1 style={{ fontSize: '28px', marginBottom: '16px', color: 'var(--heading)' }}>
          Welcome to Computer Networks
        </h1>
        <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '24px' }}>
          &quot;It works on my machine&quot; is almost always a networking statement. This course follows a
          single request all the way down — through DNS, the socket, the TCP handshake, the routing
          table, the switch, the wire — and back up again, so that when something breaks you know which
          layer to interrogate and which command will tell you.
        </p>

        <h2 style={{ fontSize: '22px', marginBottom: '12px', color: 'var(--heading)' }}>Learning Outcomes</h2>
        <ul style={{ paddingLeft: '20px', fontSize: '16px', lineHeight: '1.6', marginBottom: '24px' }}>
          <li>Subnet confidently — CIDR, masks and address plans, by hand and in code</li>
          <li>Explain TCP&apos;s handshake, windows and congestion control from a real capture</li>
          <li>Read a routing table and predict which route wins, and why</li>
          <li>Debug a live outage methodically with ping, dig, ss, traceroute and tcpdump</li>
          <li>Reason about modern networking: load balancers, VPCs, containers and Kubernetes</li>
        </ul>

        <h2 style={{ fontSize: '22px', marginBottom: '12px', color: 'var(--heading)' }}>How the Course Runs</h2>
        <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '16px' }}>
          Twelve modules, each with lessons, a module quiz and a practice set. Both the quiz and the
          practice set are multiple choice, and both are graded. Questions are drawn from real
          diagnoses — why a transfer is slow on a fast link, which route wins, what a capture is
          telling you — so the wrong options are the plausible misreadings rather than filler.
        </p>

        <h2 style={{ fontSize: '22px', marginBottom: '12px', color: 'var(--heading)' }}>Prerequisites</h2>
        <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
          A terminal and a willingness to do arithmetic in binary. Binary and hexadecimal are used
          heavily from Module 4 onward; Lesson 4.3 covers what you need. Lessons include runnable Python
          and shell examples, but nothing is graded on writing code, and no prior networking knowledge
          is assumed.
        </p>
      </div>
    </div>
  );
};

export default CourseOverview;
