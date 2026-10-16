import React from 'react';
import styles from '../../FrontendCoursePage.module.css';

interface Props {
  page: number;
}

interface QAItem {
  q: string;
  a: string;
}

const FAQS_DATA: Record<number, { title: string; list: QAItem[] }> = {
  1: {
    title: 'Layers and Encapsulation',
    list: [
      {
        q: 'Walk me through what happens when you type a URL and press enter.',
        a: 'Resolve the name: browser cache, OS cache, /etc/hosts, then a recursive resolver walking root → TLD → authoritative. Decide where to send the packet using the routing table, then ARP for the next hop’s MAC. TCP handshake to port 443, TLS handshake, HTTP request. The response comes back up the same stack. Every layer is a chance to be the thing that is broken — that is why the question is asked.',
      },
      {
        q: 'Why do we have both a MAC address and an IP address?',
        a: 'They answer different questions. The IP address says where the host is in the global topology, so routers can forward toward it; it changes as the host moves networks. The MAC address identifies the interface on the local link, so a frame reaches the right device on this segment. The IP addresses stay constant end to end; the MAC addresses are rewritten at every hop.',
      },
      {
        q: 'OSI has seven layers and TCP/IP has four. Which is real?',
        a: 'TCP/IP is what is implemented; OSI is the vocabulary everyone argues in. OSI’s presentation and session layers have no distinct implementation in the internet stack — TLS and session state live inside applications. Learn OSI because troubleshooting conversations are conducted in it ("that is a layer 2 problem"), and know that layers 5–7 collapse in practice.',
      },
      {
        q: 'What is encapsulation, concretely?',
        a: 'Each layer wraps the layer above in its own header. Application data becomes a TCP segment (adding ports and sequence numbers), which becomes an IP packet (adding addresses and TTL), which becomes an Ethernet frame (adding MACs and a CRC). The receiver unwraps in reverse. The practical consequence is overhead and MTU: headers consume payload, and exceeding the MTU causes fragmentation or a drop.',
      },
    ],
  },
  2: {
    title: 'IP, Subnetting and Routing',
    list: [
      {
        q: 'How many usable hosts are in a /26, and how do you get there?',
        a: '/26 leaves 32 − 26 = 6 host bits, so 2⁶ = 64 addresses, minus the network and broadcast address = 62 usable. The block size is 64, so the subnets on a /24 start at .0, .64, .128 and .192. Doing this by block size rather than by converting to binary every time is what makes it fast under interview pressure.',
      },
      {
        q: 'Given 10.1.5.130/26, what is the network and broadcast address?',
        a: 'Block size 64, so the boundaries are .128 and .191. 130 falls in the .128 block: network 10.1.5.128, broadcast 10.1.5.191, usable range .129 to .190. Mechanically: AND the address with the mask for the network, then OR with the inverted mask for the broadcast.',
      },
      {
        q: 'Two routes match a destination. Which one is used?',
        a: 'The most specific — longest prefix — always wins, regardless of protocol or metric. A /32 host route beats a /24, which beats the 0.0.0.0/0 default. Only when prefix lengths are equal does administrative distance decide between protocols, and then the metric within a protocol. Candidates routinely say "lowest metric" and miss that specificity is checked first.',
      },
      {
        q: 'What does NAT actually do, and what does it break?',
        a: 'It rewrites the source address (and port, for PAT) of outbound packets so many private hosts share one public address, keeping a translation table to send replies back. It conserves addresses and incidentally hides internal hosts. It breaks inbound connections without explicit port forwarding, protocols that embed addresses in their payload, and true end-to-end addressing — which is one of the arguments for IPv6.',
      },
      {
        q: 'Distance vector versus link state?',
        a: 'Distance vector (RIP) tells its neighbours about the whole world — each router knows only direction and hop count, converges slowly and is prone to routing loops, mitigated with split horizon and poison reverse. Link state (OSPF) tells the whole area about its neighbours — every router builds an identical topology map and runs Dijkstra itself, converging fast at the cost of CPU and memory.',
      },
    ],
  },
  3: {
    title: 'TCP, UDP and Sockets',
    list: [
      {
        q: 'Why is the TCP handshake three steps rather than two?',
        a: 'Both directions need an initial sequence number, and each must be acknowledged. SYN carries the client’s ISN; SYN-ACK acknowledges it and carries the server’s; ACK acknowledges that. Two messages could only synchronise one direction. The third also confirms the client is reachable at the address it claims, which is what makes blind spoofing hard.',
      },
      {
        q: 'What is TIME_WAIT and why does it last so long?',
        a: 'The side that closes first waits 2×MSL before releasing the socket, for two reasons: so a delayed duplicate segment from the old connection cannot be accepted by a new one on the same four-tuple, and so the final ACK can be retransmitted if lost. It is correct behaviour, not a leak — the fix for thousands of them is usually to stop opening a connection per request, not to tune the timer.',
      },
      {
        q: 'When would you choose UDP over TCP?',
        a: 'When timeliness beats completeness, or when you want to implement reliability yourself. Live audio and video — a retransmitted packet arrives too late to play. DNS — one small request and reply, cheaper than a handshake. Gaming — stale position updates are worthless. QUIC is the interesting case: UDP underneath, with reliability and congestion control rebuilt in user space.',
      },
      {
        q: 'Explain flow control versus congestion control.',
        a: 'Flow control protects the receiver: the advertised window says how much buffer it has, so a fast sender cannot overwhelm a slow reader. Congestion control protects the network: the congestion window is the sender’s own estimate of what the path can carry, grown on success and cut on loss. The sender uses the minimum of the two. Confusing them is the most common TCP mistake.',
      },
      {
        q: 'Describe slow start and congestion avoidance.',
        a: 'Slow start grows the congestion window exponentially — doubling each RTT — to find capacity fast. At the slow-start threshold it switches to congestion avoidance, growing linearly by roughly one segment per RTT. On triple duplicate ACK it halves the window and continues (fast recovery); on a timeout, which signals worse trouble, it drops to one and restarts slow start.',
      },
    ],
  },
  4: {
    title: 'DNS, HTTP and TLS',
    list: [
      {
        q: 'Explain recursive versus iterative DNS resolution.',
        a: 'Your stub resolver asks a recursive resolver one question and expects a final answer. That resolver does the iterative work: it asks a root server, which refers it to the TLD servers, which refer it to the authoritative servers, which answer. Each referral is a step it follows itself. Caching at every level, governed by TTL, is what stops the roots melting.',
      },
      {
        q: 'What actually happens in a TLS handshake?',
        a: 'The client offers versions and cipher suites; the server picks one and sends its certificate chain. The client validates that chain to a trusted root, checks the name and expiry, then both derive a shared symmetric key — in TLS 1.3 via ephemeral Diffie–Hellman, which gives forward secrecy. Everything after is symmetric encryption, because asymmetric crypto is far too slow for bulk data.',
      },
      {
        q: 'A user reports the site is slow. How do you split network from application?',
        a: 'Get the timings apart. DNS resolution time, TCP connect time, TLS handshake time and time-to-first-byte each point somewhere different: slow connect suggests the path or the SYN backlog, slow TTFB with fast connect is the server thinking, and slow transfer after a fast TTFB is bandwidth or congestion. curl -w gives you all four in one command.',
      },
      {
        q: 'What does a CDN change about the request path?',
        a: 'It moves the content to a point of presence near the user, so the TCP and TLS handshakes — which cost round trips — happen over a short path instead of a transcontinental one. Cache hits never reach your origin. The subtleties are cache invalidation, what you allow to be cached (never a personalised response), and that the origin still sees the misses.',
      },
    ],
  },
  5: {
    title: 'Troubleshooting Scenarios',
    list: [
      {
        q: '"The internet is down." Walk me through it.',
        a: 'Work up the layers and rule out halves. Is the link up (ip link)? Do you have an address and a default route (ip addr, ip route)? Can you reach the gateway by IP? Can you reach 8.8.8.8 — if yes, routing is fine and it is DNS? Does dig resolve? Each step eliminates everything below it, which is faster than guessing and is what the interviewer is scoring.',
      },
      {
        q: 'ping works but the website does not load. What is it?',
        a: 'ICMP reaching the host proves the path and the routing, so the problem is above layer 3: the service is not listening, a firewall permits ICMP but drops TCP/443, TLS is failing (expired certificate, name mismatch), or DNS pointed you at the wrong host. Check with curl -v and ss -ltnp on the server.',
      },
      {
        q: 'What does each traceroute hop actually tell you, and what does a star mean?',
        a: 'It sends packets with increasing TTL; each router that decrements TTL to zero returns an ICMP time-exceeded, revealing itself. A star means that hop did not reply — very often it is configured not to rate-limit or answer ICMP, not that it is down. Only sustained loss from a hop onward indicates a real problem; loss at one intermediate hop with later hops fine is a red herring.',
      },
      {
        q: 'Intermittent packet loss between two data centres. How do you prove where?',
        a: 'One-off tools will not show it. Run continuous bidirectional probes (mtr) from both ends, since the return path can differ from the forward path and only one may be lossy. Correlate the loss with time of day and link utilisation, and check interface error counters at each hop you control — CRC errors point at a cable or optic, output drops point at congestion.',
      },
    ],
  },
  6: {
    title: 'Cloud and Container Networking',
    list: [
      {
        q: 'How does a container get a network address?',
        a: 'The container runs in its own network namespace with its own interfaces and routing table. Docker’s default bridge mode creates a veth pair — one end in the namespace as eth0, the other attached to a host bridge — and NATs outbound traffic to the host address. That NAT is why the container can reach out freely but needs explicit port publishing to be reached.',
      },
      {
        q: 'Explain the Kubernetes networking model.',
        a: 'Every pod gets its own routable IP and can reach every other pod without NAT — that is the requirement, and the CNI plugin implements it. A Service is a stable virtual IP with load balancing across pod endpoints, implemented by kube-proxy in iptables or IPVS rules, not by a process in the path. Ingress terminates external HTTP and routes by host and path.',
      },
      {
        q: 'Security group versus network ACL?',
        a: 'A security group is stateful and attaches to an instance: allow the inbound and the reply leaves automatically, and there are no deny rules — anything unmatched is denied. A network ACL is stateless and attaches to a subnet: it evaluates numbered rules in order, supports explicit denies, and you must permit the return traffic separately. Forgetting the stateless return rule is the classic bug.',
      },
      {
        q: 'Why would you put a service behind a load balancer versus DNS round robin?',
        a: 'DNS round robin distributes names, not load: clients cache aggressively, TTLs are ignored, and a dead host keeps being handed out until the record changes and propagates. A load balancer has health checks, so it stops sending traffic to a failed backend within seconds, and it can terminate TLS, balance on real load and drain connections during a deploy.',
      },
    ],
  },
};

const InterviewPrep: React.FC<Props> = ({ page }) => {
  const section = FAQS_DATA[page];

  if (!section) {
    return <div className={styles.tabContent}>Section not found</div>;
  }

  return (
    <div className={styles.tabContent}>
      <h2 className={styles.cardTitle}>{section.title}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginTop: '18px' }}>
        {section.list.map((item, i) => (
          <div
            key={i}
            style={{
              padding: '16px',
              background: 'var(--bg-surface-2)',
              borderRadius: '10px',
              border: '1px solid var(--border)',
            }}
          >
            <p style={{ margin: '0 0 8px', fontWeight: 700, fontSize: '14px', color: 'var(--text-primary)' }}>
              {item.q}
            </p>
            <p style={{ margin: 0, fontSize: '13.5px', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
              {item.a}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterviewPrep;
