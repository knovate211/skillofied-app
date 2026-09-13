import React from 'react';
import CoursePageShell from './shared/CoursePageShell';
import { SyllabusModule } from '../../types';

import CourseOverview from './modules/NetworkingCourse/CourseOverview';
import NetworkingModuleRenderer from './modules/NetworkingCourse/NetworkingModuleRenderer';

// Item order within a module maps directly to page numbers, so lessons must
// come first, then the quiz, then the practice set — see the renderer.
export const SYLLABUS: SyllabusModule[] = [
  {
    id: 'overview',
    title: 'COURSE OVERVIEW',
    items: [{ id: 'overview-welcome', title: 'Welcome to Computer Networks' }],
  },
  {
    id: 'm1',
    title: 'MODULE 1: NETWORKING FUNDAMENTALS',
    items: [
      { id: 'm1-l1', title: 'Lesson 1.1 What a Network Is' },
      { id: 'm1-l2', title: 'Lesson 1.2 LAN, WAN and MAN' },
      { id: 'm1-l3', title: 'Lesson 1.3 Client–Server and Peer-to-Peer' },
      { id: 'm1-l4', title: 'Lesson 1.4 Topologies' },
      { id: 'm1-l5', title: 'Lesson 1.5 Bandwidth, Throughput, Latency' },
      { id: 'm1-l6', title: 'Lesson 1.6 Packet vs Circuit Switching' },
      { id: 'm1-quiz', title: 'Module Quiz' },
      { id: 'm1-assignment', title: 'Practice: Networking Fundamentals' },
    ],
  },
  {
    id: 'm2',
    title: 'MODULE 2: OSI & TCP/IP MODELS',
    items: [
      { id: 'm2-l1', title: 'Lesson 2.1 Why Layered Models Exist' },
      { id: 'm2-l2', title: 'Lesson 2.2 The OSI Seven Layers' },
      { id: 'm2-l3', title: 'Lesson 2.3 The TCP/IP Model' },
      { id: 'm2-l4', title: 'Lesson 2.4 Encapsulation and PDUs' },
      { id: 'm2-l5', title: 'Lesson 2.5 MAC, IP and Port Together' },
      { id: 'm2-quiz', title: 'Module Quiz' },
      { id: 'm2-assignment', title: 'Practice: OSI & TCP/IP' },
    ],
  },
  {
    id: 'm3',
    title: 'MODULE 3: PHYSICAL & DATA LINK LAYER',
    items: [
      { id: 'm3-l1', title: 'Lesson 3.1 Media and Signalling' },
      { id: 'm3-l2', title: 'Lesson 3.2 Ethernet and Frames' },
      { id: 'm3-l3', title: 'Lesson 3.3 MAC Addressing and ARP' },
      { id: 'm3-l4', title: 'Lesson 3.4 Switching and Broadcast Domains' },
      { id: 'm3-l5', title: 'Lesson 3.5 Error Detection and CRC' },
      { id: 'm3-quiz', title: 'Module Quiz' },
      { id: 'm3-assignment', title: 'Practice: Data Link Layer' },
    ],
  },
  {
    id: 'm4',
    title: 'MODULE 4: NETWORK LAYER',
    items: [
      { id: 'm4-l1', title: 'Lesson 4.1 The IPv4 Header' },
      { id: 'm4-l2', title: 'Lesson 4.2 Addressing, Public vs Private' },
      { id: 'm4-l3', title: 'Lesson 4.3 Subnet Masks and CIDR' },
      { id: 'm4-l4', title: 'Lesson 4.4 Subnetting in Practice' },
      { id: 'm4-l5', title: 'Lesson 4.5 NAT and the Default Gateway' },
      { id: 'm4-l6', title: 'Lesson 4.6 IPv6' },
      { id: 'm4-quiz', title: 'Module Quiz' },
      { id: 'm4-assignment', title: 'Practice: Network Layer' },
    ],
  },
  {
    id: 'm5',
    title: 'MODULE 5: ROUTING',
    items: [
      { id: 'm5-l1', title: 'Lesson 5.1 Reading a Routing Table' },
      { id: 'm5-l2', title: 'Lesson 5.2 Static vs Dynamic Routing' },
      { id: 'm5-l3', title: 'Lesson 5.3 Distance Vector and RIP' },
      { id: 'm5-l4', title: 'Lesson 5.4 Link State and OSPF' },
      { id: 'm5-l5', title: 'Lesson 5.5 BGP and Autonomous Systems' },
      { id: 'm5-quiz', title: 'Module Quiz' },
      { id: 'm5-assignment', title: 'Practice: Routing' },
    ],
  },
  {
    id: 'm6',
    title: 'MODULE 6: TRANSPORT LAYER',
    items: [
      { id: 'm6-l1', title: 'Lesson 6.1 TCP vs UDP' },
      { id: 'm6-l2', title: 'Lesson 6.2 Ports and Sockets' },
      { id: 'm6-l3', title: 'Lesson 6.3 The Three-Way Handshake' },
      { id: 'm6-l4', title: 'Lesson 6.4 Teardown and TIME_WAIT' },
      { id: 'm6-l5', title: 'Lesson 6.5 Flow Control and the Sliding Window' },
      { id: 'm6-l6', title: 'Lesson 6.6 Congestion Control' },
      { id: 'm6-quiz', title: 'Module Quiz' },
      { id: 'm6-assignment', title: 'Practice: Transport Layer' },
    ],
  },
  {
    id: 'm7',
    title: 'MODULE 7: APPLICATION LAYER',
    items: [
      { id: 'm7-l1', title: 'Lesson 7.1 DNS' },
      { id: 'm7-l2', title: 'Lesson 7.2 DHCP' },
      { id: 'm7-l3', title: 'Lesson 7.3 HTTP and HTTPS' },
      { id: 'm7-l4', title: 'Lesson 7.4 Email: SMTP, IMAP, POP3' },
      { id: 'm7-l5', title: 'Lesson 7.5 SSH and File Transfer' },
      { id: 'm7-l6', title: 'Lesson 7.6 WebSockets and REST' },
      { id: 'm7-quiz', title: 'Module Quiz' },
      { id: 'm7-assignment', title: 'Practice: Application Layer' },
    ],
  },
  {
    id: 'm8',
    title: 'MODULE 8: NETWORK SECURITY',
    items: [
      { id: 'm8-l1', title: 'Lesson 8.1 The Threat Landscape' },
      { id: 'm8-l2', title: 'Lesson 8.2 Firewalls and Proxies' },
      { id: 'm8-l3', title: 'Lesson 8.3 TLS and Certificates' },
      { id: 'm8-l4', title: 'Lesson 8.4 VPNs' },
      { id: 'm8-l5', title: 'Lesson 8.5 IDS, IPS and Zero Trust' },
      { id: 'm8-quiz', title: 'Module Quiz' },
      { id: 'm8-assignment', title: 'Practice: Network Security' },
    ],
  },
  {
    id: 'm9',
    title: 'MODULE 9: WIRELESS NETWORKING',
    items: [
      { id: 'm9-l1', title: 'Lesson 9.1 Wi-Fi and IEEE 802.11' },
      { id: 'm9-l2', title: 'Lesson 9.2 Channels and Bands' },
      { id: 'm9-l3', title: 'Lesson 9.3 Access Points and Roaming' },
      { id: 'm9-l4', title: 'Lesson 9.4 Wireless Security' },
      { id: 'm9-l5', title: 'Lesson 9.5 Bluetooth and Cellular' },
      { id: 'm9-quiz', title: 'Module Quiz' },
      { id: 'm9-assignment', title: 'Practice: Wireless' },
    ],
  },
  {
    id: 'm10',
    title: 'MODULE 10: NETWORK TROUBLESHOOTING',
    items: [
      { id: 'm10-l1', title: 'Lesson 10.1 A Method, Not a Tool List' },
      { id: 'm10-l2', title: 'Lesson 10.2 ping and traceroute' },
      { id: 'm10-l3', title: 'Lesson 10.3 dig and nslookup' },
      { id: 'm10-l4', title: 'Lesson 10.4 ip, ss and netstat' },
      { id: 'm10-l5', title: 'Lesson 10.5 tcpdump and Wireshark' },
      { id: 'm10-l6', title: 'Lesson 10.6 Working Through a Real Outage' },
      { id: 'm10-quiz', title: 'Module Quiz' },
      { id: 'm10-assignment', title: 'Practice: Troubleshooting' },
    ],
  },
  {
    id: 'm11',
    title: 'MODULE 11: ADVANCED NETWORKING',
    items: [
      { id: 'm11-l1', title: 'Lesson 11.1 Load Balancing' },
      { id: 'm11-l2', title: 'Lesson 11.2 Reverse Proxies and CDNs' },
      { id: 'm11-l3', title: 'Lesson 11.3 SDN and Network Virtualization' },
      { id: 'm11-l4', title: 'Lesson 11.4 VPCs, Subnets, Security Groups' },
      { id: 'm11-l5', title: 'Lesson 11.5 Network Automation' },
      { id: 'm11-quiz', title: 'Module Quiz' },
      { id: 'm11-assignment', title: 'Practice: Advanced Networking' },
    ],
  },
  {
    id: 'm12',
    title: 'MODULE 12: MODERN & CLOUD NETWORKING',
    items: [
      { id: 'm12-l1', title: 'Lesson 12.1 Container Networking' },
      { id: 'm12-l2', title: 'Lesson 12.2 Kubernetes Networking' },
      { id: 'm12-l3', title: 'Lesson 12.3 Service Discovery and Ingress' },
      { id: 'm12-l4', title: 'Lesson 12.4 Microservices Traffic' },
      { id: 'm12-l5', title: 'Lesson 12.5 Observability' },
      { id: 'm12-quiz', title: 'Module Quiz' },
      { id: 'm12-assignment', title: 'Practice: Cloud Networking' },
    ],
  },
  {
    id: 'projects',
    title: 'CAPSTONE PROJECTS',
    items: [
      { id: 'proj-1', title: 'Project 1: Subnet Calculator' },
      { id: 'proj-2', title: 'Project 2: Packet Analyzer' },
      { id: 'proj-3', title: 'Project 3: Network Monitoring Dashboard' },
      { id: 'proj-4', title: 'Project 4: Design a Production Network (Capstone)' },
    ],
  },
  {
    id: 'interview',
    title: 'INTERVIEW PREPARATION',
    items: [
      { id: 'prep-models', title: 'Layers and Encapsulation' },
      { id: 'prep-ip', title: 'IP, Subnetting and Routing' },
      { id: 'prep-transport', title: 'TCP, UDP and Sockets' },
      { id: 'prep-app', title: 'DNS, HTTP and TLS' },
      { id: 'prep-debug', title: 'Troubleshooting Scenarios' },
      { id: 'prep-cloud', title: 'Cloud and Container Networking' },
    ],
  },
  {
    id: 'assessment',
    title: 'FINAL ASSESSMENT',
    items: [
      { id: 'test-theory', title: 'Theory Test' },
      { id: 'test-subnet', title: 'Subnetting Test' },
      { id: 'test-capture', title: 'Packet Capture Analysis' },
      { id: 'test-design', title: 'Network Design Interview' },
    ],
  },
  {
    id: 'certification',
    title: 'CERTIFICATION',
    items: [{ id: 'cert-view', title: 'Computer Networks Certificate' }],
  },
];

const NetworkingCoursePage: React.FC = () => (
  <CoursePageShell
    syllabus={SYLLABUS}
    courseTitle="Computer Networks"
    courseSubtitle="From Ethernet frames to cloud load balancers, with the tools to debug them"
    sidebarSubtitle="Computer Networks"
    storageKey="maxNetworkingIndexRead"
    unlockAfterModuleId="m1"
    unlockModuleName="Module 1: Networking Fundamentals"
    renderContent={(moduleId: string, page: number) => {
      if (moduleId === 'overview') return <CourseOverview />;
      return <NetworkingModuleRenderer moduleId={moduleId} page={page} />;
    }}
  />
);

export default NetworkingCoursePage;
