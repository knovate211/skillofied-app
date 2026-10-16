import React from 'react';
import styles from '../../FrontendCoursePage.module.css';

interface Props {
  page: number;
}

interface ProjectData {
  title: string;
  desc: string;
  scope: string[];
  techStack: string[];
  tips: string;
}

/**
 * Four projects that build on each other: compute addresses, then read real
 * packets, then watch a live network, then design one. The scope lists the
 * decisions a reviewer will probe, not just the feature list.
 */
const PROJECTS_LIST: ProjectData[] = [
  {
    title: 'Project 1: Subnet Calculator',
    desc: 'Given an address and a prefix, produce the network address, broadcast address, usable host range, mask and host count — and split a block into equal or variable-length subnets.',
    scope: [
      'Parse both notations: 192.168.10.0/24 and 192.168.10.0 255.255.255.0.',
      'Network, broadcast, first and last usable host, total and usable host counts.',
      'Correct handling of the edge cases everyone gets wrong: /31 point-to-point links and /32 host routes.',
      'VLSM: split a block into subnets of requested sizes, smallest waste first.',
      'Binary output alongside dotted-decimal, so the masking is visible rather than magic.',
    ],
    techStack: ['Python', 'Bitwise arithmetic', 'CLI or small web UI'],
    tips: 'Do the bit manipulation yourself rather than importing ipaddress. The interview question is "how do you compute the broadcast address", and the answer is OR with the inverted mask.',
  },
  {
    title: 'Project 2: Packet Analyzer',
    desc: 'Read a capture file, decode Ethernet, IP, TCP and UDP headers by hand, and report per-protocol statistics and per-conversation summaries.',
    scope: [
      'Parse the pcap file format, then decode each frame layer by layer.',
      'Ethernet: source and destination MAC, EtherType. IPv4: version, IHL, TTL, protocol, addresses, checksum verification.',
      'TCP: ports, sequence and acknowledgement numbers, flags; reconstruct the handshake and teardown of each flow.',
      'Group packets into conversations keyed on the five-tuple, with byte and packet counts.',
      'Flag the interesting things: retransmissions, resets, and connections that never completed.',
    ],
    techStack: ['Python', 'struct / binary parsing', 'pcap fixtures', 'Wireshark for cross-checking'],
    tips: 'Verify your IPv4 checksum implementation against a real capture. Getting the one’s-complement arithmetic right — including the end-around carry — is the part that separates a parser from a guesser.',
  },
  {
    title: 'Project 3: Network Monitoring Dashboard',
    desc: 'Poll a set of hosts and services, record reachability, latency, packet loss and throughput over time, and alert when a threshold is breached.',
    scope: [
      'Reachability and round-trip time per host, with loss computed over a window, not a single probe.',
      'Service checks beyond ICMP: TCP connect time, HTTP status and TLS certificate expiry.',
      'Historical storage and a time-series view — an outage is only meaningful against a baseline.',
      'Alerting with hysteresis and de-duplication so one flapping link does not page ten times.',
      'A note on probe interval: what you can detect versus the load you add.',
    ],
    techStack: ['Python or Go', 'SQLite or a time-series store', 'Chart library', 'systemd or cron'],
    tips: 'Be ready for "your dashboard says the host is down — is it?" A monitor that cannot distinguish a dead host from a dead probe path is the classic failure.',
  },
  {
    title: 'Project 4: Design a Production Network (Capstone)',
    desc: 'The capstone: a complete network design for a fictional company — three sites, 400 staff, a public product and a compliance requirement — defended as a written document with diagrams.',
    scope: [
      'An IP addressing plan with room to grow, using VLSM and documented allocation rules.',
      'VLAN segmentation by function, and the routing between them.',
      'Internet edge: firewall policy, NAT, DMZ placement and a public DNS plan.',
      'Site-to-site and remote-access VPN, with the encryption choices stated.',
      'DHCP and internal DNS, load balancing for the public product, and a CDN decision.',
      'Cloud connectivity: VPC design, subnets, security groups, and how on-premises reaches it.',
      'Monitoring, logging and the security architecture, plus an explicit failure analysis.',
    ],
    techStack: ['Packet Tracer / GNS3 / containerlab', 'Diagramming tool', 'Written design document'],
    tips: 'This is the artefact you walk an interviewer through. Know your addressing plan cold and be able to answer "what happens when this link fails" for every link on your diagram.',
  },
];

const MajorProjects: React.FC<Props> = ({ page }) => {
  const project = PROJECTS_LIST[page - 1];

  if (!project) {
    return <div className={styles.tabContent}>Project not found</div>;
  }

  return (
    <div className={styles.tabContent}>
      <h2 className={styles.cardTitle}>{project.title}</h2>
      <p className={styles.paragraph}>{project.desc}</p>

      <h3 style={{ fontSize: '15px', fontWeight: 600, margin: '20px 0 8px' }}>Scope</h3>
      <ul style={{ paddingLeft: '20px', fontSize: '13.5px', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
        {project.scope.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <h3 style={{ fontSize: '15px', fontWeight: 600, margin: '20px 0 8px' }}>Stack</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {project.techStack.map((tech) => (
          <span
            key={tech}
            style={{
              fontSize: '12px',
              fontWeight: 600,
              padding: '4px 10px',
              borderRadius: '999px',
              background: 'var(--bg-surface-2)',
              border: '1px solid var(--border)',
              color: 'var(--text-secondary)',
            }}
          >
            {tech}
          </span>
        ))}
      </div>

      <div
        style={{
          marginTop: '20px',
          padding: '14px 16px',
          background: 'var(--bg-surface-2)',
          borderRadius: '8px',
          borderLeft: '4px solid var(--accent)',
          fontSize: '13.5px',
          lineHeight: 1.6,
          color: 'var(--text-secondary)',
        }}
      >
        <strong style={{ color: 'var(--text-primary)' }}>Interview angle: </strong>
        {project.tips}
      </div>
    </div>
  );
};

export default MajorProjects;
