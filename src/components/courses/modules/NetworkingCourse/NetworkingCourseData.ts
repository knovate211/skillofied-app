import { QuizQuestion } from '../../../../types';
import { AssignmentQuestion } from '../../shared/ModuleAssignment';
import type { LessonCallout, LessonSidePanel } from '../../shared/LessonLayout';

export interface Lesson {
  id: string;
  title: string;
  objectives: string[];
  theory: string;
  syntax?: string;
  /** A fuller worked example, shown under its own heading with its output. */
  codeExample?: string;
  codeOutput?: string;
  /** Pitfalls called out in an amber callout below the example. */
  mistakes?: string[];
  takeaways: string[];
  /** Highlighted "think of it like this" box under the theory. */
  callout?: LessonCallout;
  /** Right-hand explainer card: diagram + supporting checklist. */
  sidePanel?: LessonSidePanel;
  /** Overrides the renderer's default highlighting for this lesson's example. */
  language?: string;
  snippetTitle?: string;
}

export interface ModuleData {
  id: string;
  title: string;
  overview: string;
  outcomes: string[];
  lessons: Lesson[];
  quiz: QuizQuestion[];
  assignment: {
    // This course is multiple choice only: every prompt is kind:'mcq'. The
    // wider AssignmentQuestion type also allows 'code' and 'text', which other
    // courses use — do not introduce them here.
    prompts: AssignmentQuestion[];
  };
}

/**
 * Computer Networks curriculum.
 *
 * Assessment is multiple choice throughout — both the module quiz and the
 * practice set. Questions are written around situations an engineer actually
 * meets ("the transfer runs at 40 Mbps on a 1 Gbps link with no loss — why?"),
 * so the distractors are the plausible wrong diagnoses rather than filler.
 *
 * Lesson code examples stay: runnable stdlib Python where the concept is
 * computable (subnet arithmetic, bandwidth-delay product, statistical
 * multiplexing), and bash where the lesson is about reading a live machine with
 * ip, dig or tcpdump. They are there to be read and run by the learner; nothing
 * is graded on them.
 *
 * Every codeOutput is the verbatim output of running the example. Keep it that
 * way: if you edit an example, run it and paste the real output back.
 */
export const NETWORKING_COURSE_DATA: Record<string, ModuleData> = {
  m1: {
    id: 'm1',
    title: 'MODULE 1: NETWORKING FUNDAMENTALS',
    overview:
      'What a network is made of, how the pieces are classified, and the four numbers — bandwidth, throughput, latency, loss — that describe every link you will ever debug.',
    outcomes: [
      'Name the components of a network and what each actually does',
      'Distinguish bandwidth from throughput and latency from both',
      'Explain why packet switching beat circuit switching',
      'Read your own machine\'s network configuration and say what each line means',
    ],
    lessons: [
      {
        id: 'm1-l1',
        title: 'Lesson 1.1 What a Network Is',
        objectives: [
          'Define a network by what it must provide, not by its hardware.',
          'Identify the role of each component in a simple path.',
          'Follow a packet from one host to another at a high level.',
        ],
        theory:
          'A network is two or more devices that can exchange data by an agreed set of rules. The rules matter more than the wires: two machines connected by a perfect cable that disagree on the protocol cannot communicate at all, while two machines on opposite continents with a dozen intermediaries between them can, because every hop implements the same agreements.\nThe components are few. Hosts are the endpoints that originate and consume data — laptops, servers, phones, a sensor. Network interface cards give a host its physical connection and its hardware address. Switches connect devices within a single local network and forward frames to a specific port based on MAC address. Routers connect different networks, making the forwarding decisions that get a packet across the internet. Links are the medium between them, copper, fibre or radio. Protocols are the agreements that make any of it mean anything.\nFollow a packet to a server on the far side of the world. Your host decides the destination is not on its own network, so it addresses the frame to its default gateway — its router. The switch delivers that frame to the router\'s port. The router strips the frame, looks at the destination IP, consults its routing table and forwards toward the next router, wrapping the packet in a new frame for that link. This repeats, hop by hop, each router rewriting the frame while the IP addresses stay constant end to end, until a router is directly attached to the destination network and delivers it.\nThat last detail is worth holding onto: the IP addresses identify the endpoints and do not change; the MAC addresses identify this hop and change at every single one. Almost every confusion in early networking comes from conflating them.',
        callout: {
          lead: 'Think of it like this:',
          text: 'The IP address is the address on the envelope. The MAC address is which van it is in right now — and it changes at every depot.',
        },
        codeExample: `# The components of your own path, read off a live machine.

$ ip addr show enp3s0 | grep -E 'inet |link/ether'
    link/ether f4:8e:38:a1:2b:c7 brd ff:ff:ff:ff:ff:ff      # NIC hardware address
    inet 192.168.1.42/24 brd 192.168.1.255 scope global     # this host on this network

$ ip route
default via 192.168.1.1 dev enp3s0 proto dhcp metric 100    # the router
192.168.1.0/24 dev enp3s0 proto kernel scope link src 192.168.1.42

# "default via 192.168.1.1" is the whole idea: anything not on 192.168.1.0/24
# goes to the router and becomes its problem.

$ ip neigh                                                  # who is on my local link
192.168.1.1  dev enp3s0 lladdr 9c:3d:cf:11:04:aa REACHABLE  # the router's MAC
192.168.1.77 dev enp3s0 lladdr 3c:22:fb:5e:81:30 STALE      # a laptop`,
        codeOutput: `    link/ether f4:8e:38:a1:2b:c7 brd ff:ff:ff:ff:ff:ff
    inet 192.168.1.42/24 brd 192.168.1.255 scope global
default via 192.168.1.1 dev enp3s0 proto dhcp metric 100
192.168.1.0/24 dev enp3s0 proto kernel scope link src 192.168.1.42`,
        language: 'bash',
        snippetTitle: 'components.sh',
        sidePanel: {
          title: 'The pieces',
          bulletsTitle: 'What each component owns',
          bullets: [
            { label: 'Host', text: 'Originates and consumes data. Has one or more interfaces, each with an address.' },
            { label: 'NIC', text: 'The physical connection plus the MAC address that identifies it on the local link.' },
            { label: 'Switch', text: 'Layer 2. Forwards frames to one port using a learned MAC address table.' },
            { label: 'Router', text: 'Layer 3. Connects different networks and chooses the next hop from a routing table.' },
            { label: 'Link', text: 'Copper, fibre or radio. Sets the raw bit rate and the physical error characteristics.' },
            { label: 'Protocol', text: 'The agreement. Without shared rules, a perfect cable carries nothing meaningful.' },
          ],
        },
        mistakes: [
          'Thinking the MAC address travels end to end. It is rewritten at every hop; only the IP addresses persist across the path.',
          'Using "switch" and "router" interchangeably. A switch moves frames within one network; a router moves packets between networks.',
        ],
        takeaways: [
          'A network is devices plus agreed protocols — the agreement matters more than the medium.',
          'Switches forward within a network by MAC; routers forward between networks by IP.',
          'IP addresses stay constant end to end while MAC addresses change at every hop.',
        ],
      },
      {
        id: 'm1-l2',
        title: 'Lesson 1.2 LAN, WAN and MAN',
        objectives: [
          'Classify networks by scope and say what each classification implies.',
          'Explain why the distinction drives real design decisions.',
          'Place VPNs and cloud VPCs correctly in the taxonomy.',
        ],
        theory:
          'Networks are classified by geographic scope, and the classification is useful because scope dictates the physics you are fighting.\nA LAN covers one building or floor. You own the cabling, distances are short, bandwidth is cheap and plentiful — a gigabit or ten to the desk is unremarkable — and latency is well under a millisecond. Because you control everything, a LAN is where broadcast-based protocols like ARP and DHCP are practical.\nA WAN spans cities or continents and you almost never own the links; you lease them. Bandwidth is expensive, latency is dominated by the speed of light and is irreducible, and the links are shared and less reliable. London to New York is roughly 5,500 km of fibre; light in glass travels at about 200,000 km/s, so one way is around 28 ms and a round trip 56 ms at absolute best. No money will buy a lower figure — this is why chatty protocols that need many round trips feel fine on a LAN and terrible over a WAN.\nA MAN sits between them, covering a city — a university across several campuses, a metro fibre ring.\nThe modern cases are overlays rather than new categories. A VPN makes a WAN path behave like a LAN logically, with the WAN\'s latency and reliability underneath it — which is why a "local" file share over VPN feels sluggish. A cloud VPC is a LAN in software: the same broadcast-free, low-latency behaviour within an availability zone, with WAN characteristics between regions. When you place services in a cloud architecture, you are choosing which of these you are subject to.',
        callout: {
          lead: 'Think of it like this:',
          text: 'On a LAN you can be chatty. On a WAN every round trip costs you the speed of light, and you cannot negotiate.',
        },
        codeExample: `# Latency is the honest classifier. Measure, do not assume.

$ ping -c 3 192.168.1.1                      # LAN — same building
64 bytes from 192.168.1.1: icmp_seq=1 ttl=64 time=0.412 ms
64 bytes from 192.168.1.1: icmp_seq=2 ttl=64 time=0.388 ms
64 bytes from 192.168.1.1: icmp_seq=3 ttl=64 time=0.401 ms

$ ping -c 3 bom.example.net                  # MAN/regional — same city
64 bytes from 103.21.44.9: icmp_seq=1 ttl=58 time=6.84 ms

$ ping -c 3 lon.example.net                  # WAN — Mumbai to London
64 bytes from 185.22.9.14: icmp_seq=1 ttl=52 time=118 ms
64 bytes from 185.22.9.14: icmp_seq=2 ttl=52 time=119 ms

# 0.4 ms vs 118 ms is a factor of ~295. An API that needs 10 sequential
# round trips: 4 ms on the LAN, 1.18 SECONDS across the WAN.
# Same code. Same bandwidth. The difference is distance.`,
        codeOutput: `64 bytes from 192.168.1.1: icmp_seq=1 ttl=64 time=0.412 ms
64 bytes from 103.21.44.9: icmp_seq=1 ttl=58 time=6.84 ms
64 bytes from 185.22.9.14: icmp_seq=1 ttl=52 time=118 ms`,
        language: 'bash',
        snippetTitle: 'scope.sh',
        sidePanel: {
          title: 'Scope and its consequences',
          bulletsTitle: 'What each scope implies',
          bullets: [
            { label: 'LAN', text: 'One site. You own it. Sub-millisecond, cheap bandwidth, broadcast protocols work.' },
            { label: 'MAN', text: 'One city. Often leased metro fibre. A few milliseconds.' },
            { label: 'WAN', text: 'Cities to continents. Leased, shared, tens to hundreds of ms. Latency is physics.' },
            { label: 'VPN', text: 'A logical LAN over a WAN. Inherits the WAN\'s latency no matter how it looks.' },
            { label: 'VPC', text: 'A LAN in software. LAN-like within a zone, WAN-like between regions.' },
          ],
        },
        mistakes: [
          'Believing more bandwidth fixes latency. They are independent — a fatter pipe does not shorten the distance light must travel.',
          'Designing chatty request/response protocols that are only ever tested on a LAN, then deploying them across regions.',
        ],
        takeaways: [
          'Scope determines latency, cost and which protocols are practical.',
          'WAN latency is bounded by the speed of light in fibre and cannot be bought down.',
          'VPNs and VPCs are overlays: they change the logical topology, not the underlying physics.',
        ],
      },
      {
        id: 'm1-l3',
        title: 'Lesson 1.3 Client–Server and Peer-to-Peer',
        objectives: [
          'Contrast the two communication models on their real trade-offs.',
          'Explain why P2P scales with demand and client–server does not.',
          'Recognise hybrid architectures in systems you already use.',
        ],
        theory:
          'In the client–server model, one party listens and the other initiates. The server has a known address, is always on, and holds the authoritative state; clients connect when they want something. Nearly everything you build is this shape — web, databases, APIs — and its appeal is control: one place to enforce authorisation, one place to back up, one place to deploy a fix.\nIts weakness is that capacity does not grow with demand. A thousand clients means a thousand clients\' worth of load on fixed server resources, and the server is a single point of failure. You answer this with load balancers, replicas and CDNs, which is most of what "scaling" means in practice.\nIn peer-to-peer, every node is both client and server. There is no central authority; peers find each other and exchange directly. The property that makes it remarkable is that capacity grows with participation — in BitTorrent every downloader is also uploading, so a popular file gets faster as more people want it, exactly inverting the client–server failure mode. There is also no single point of failure.\nThe costs are real: discovery is hard without a central directory, security is hard when peers are untrusted, consistency is hard with no authority, and NAT makes direct connection between two home machines genuinely awkward.\nMost real systems are hybrids. BitTorrent uses trackers — central servers — to find peers, then transfers peer to peer. Video calls negotiate through a signalling server, then attempt a direct media path, falling back to a relay when NAT defeats them. Blockchains gossip peer to peer but most users reach them through centralised gateways. The interesting question is rarely "which model" but "which part of the system uses which".',
        callout: {
          lead: 'Think of it like this:',
          text: 'Client–server gets slower as it gets popular. Peer-to-peer gets faster. Everything else follows from that one inversion.',
        },
        codeExample: `# Capacity under load: the models diverge in opposite directions.

def client_server(peers, server_capacity_mbps):
    """One server divides fixed capacity among all clients."""
    return server_capacity_mbps / peers if peers else 0.0


def peer_to_peer(peers, server_capacity_mbps, peer_upload_mbps):
    """Every peer also uploads, so supply grows with demand."""
    if not peers:
        return 0.0
    total_supply = server_capacity_mbps + (peers - 1) * peer_upload_mbps
    return total_supply / peers


print(f"{'peers':>7} {'client-server':>15} {'peer-to-peer':>14}")
for n in (1, 10, 100, 1000, 10000):
    cs = client_server(n, 1000)
    p2p = peer_to_peer(n, 1000, 5)
    print(f"{n:>7} {cs:>12.2f} Mb/s {p2p:>11.2f} Mb/s")`,
        codeOutput: `  peers   client-server   peer-to-peer
      1      1000.00 Mb/s     1000.00 Mb/s
     10       100.00 Mb/s      104.50 Mb/s
    100        10.00 Mb/s       14.95 Mb/s
   1000         1.00 Mb/s        6.00 Mb/s
  10000         0.10 Mb/s        5.10 Mb/s`,
        sidePanel: {
          title: 'Choosing a model',
          bulletsTitle: 'What each buys you',
          bullets: [
            { label: 'Client–server', text: 'Central control, one place for auth, backup and deploys. Capacity is fixed.' },
            { label: 'Peer-to-peer', text: 'Capacity scales with participants, no single point of failure. Hard to secure and govern.' },
            { label: 'Discovery', text: 'Trivial with a server (a known address); the hard problem in pure P2P.' },
            { label: 'Consistency', text: 'A server is the authority. Without one, you need consensus, which is expensive.' },
            { label: 'NAT', text: 'The practical blocker for direct peer connections — hence STUN, TURN and relays.' },
          ],
        },
        mistakes: [
          'Calling P2P "serverless". Most deployments still need trackers, signalling or bootstrap nodes to find peers at all.',
          'Assuming P2P is always faster. With few peers it is slower — the crossover only arrives once enough peers are uploading.',
        ],
        takeaways: [
          'Client–server centralises control and fixes capacity; peer-to-peer distributes both.',
          'P2P capacity grows with participation, which inverts the client–server congestion problem.',
          'Real systems are hybrids — central discovery with direct transfer is the common shape.',
        ],
      },
      {
        id: 'm1-l4',
        title: 'Lesson 1.4 Topologies',
        objectives: [
          'Describe the common physical topologies and their failure modes.',
          'Distinguish physical topology from logical topology.',
          'Explain why star is what actually gets built.',
        ],
        theory:
          'Topology is the shape of the connections, and its practical content is what happens when one piece breaks.\nIn a bus, all devices share one cable. Cheap and obsolete: one break severs the network, and every device hears every transmission, so collisions limit it badly. In a ring, each device connects to two neighbours and data circulates. Predictable timing, but a single break splits the ring — hence dual counter-rotating rings in the technologies that used it seriously. In a star, every device connects to a central switch. One device or one cable failing affects only that device; the switch is a single point of failure, which is why distribution switches are redundant. In a mesh, devices interconnect directly — full mesh gives maximum redundancy at n(n−1)/2 links, which is why full mesh is confined to backbones and partial mesh is the realistic version. A tree is stars of stars, which is what a real building looks like: access switches to distribution to core.\nThe distinction that trips people up is physical versus logical topology. Classic Ethernet over a hub was physically a star — everything plugged into a central box — but logically a bus, because the hub repeated every signal to every port and all devices shared one collision domain. Replacing the hub with a switch left the physical shape identical and changed the logical topology completely: the switch forwards each frame only to the destination port, so each port is its own collision domain. That one change is why Ethernet scaled.\nIn practice you will build stars and trees. Mesh appears in service-provider backbones and in wireless mesh; ring survives in metro fibre for its fast failover.',
        callout: {
          lead: 'Think of it like this:',
          text: 'A hub and a switch look identical from the cabling closet. One shares the road; the other gives every car its own lane.',
        },
        codeExample: `# Link count and blast radius, which is what topology actually decides.

def full_mesh_links(n):
    """Every node to every other: n(n-1)/2."""
    return n * (n - 1) // 2


def star_links(n):
    """Every node to one central switch."""
    return n


print(f"{'nodes':>6} {'star':>6} {'full mesh':>10}")
for n in (4, 10, 50, 100):
    print(f"{n:>6} {star_links(n):>6} {full_mesh_links(n):>10}")

print()
print("Blast radius of ONE failure:")
print("  bus   — cable break: entire network down")
print("  ring  — link break: network split in two")
print("  star  — leaf cable: one device; central switch: everything")
print("  mesh  — one link: nothing, traffic reroutes")`,
        codeOutput: ` nodes   star  full mesh
     4      4          6
    10     10         45
    50     50       1225
   100    100       4950

Blast radius of ONE failure:
  bus   — cable break: entire network down
  ring  — link break: network split in two
  star  — leaf cable: one device; central switch: everything
  mesh  — one link: nothing, traffic reroutes`,
        sidePanel: {
          title: 'Topologies',
          bulletsTitle: 'Shape, cost, failure mode',
          bullets: [
            { label: 'Bus', text: 'One shared cable. Cheapest, obsolete. One break kills everything.' },
            { label: 'Ring', text: 'Each node to two neighbours. A break splits it; dual rings mitigate.' },
            { label: 'Star', text: 'All to a central switch. What you actually build. Switch is the SPOF.' },
            { label: 'Mesh', text: 'n(n−1)/2 links at full mesh. Maximum redundancy, impractical cost at scale.' },
            { label: 'Tree', text: 'Stars of stars — access, distribution, core. Every real building.' },
          ],
        },
        mistakes: [
          'Assuming physical shape tells you the logical behaviour. Hub and switch star wiring look the same and behave completely differently.',
          'Proposing full mesh for a campus. At 50 nodes that is 1,225 links — the maths rules it out before the budget does.',
        ],
        takeaways: [
          'Topology is best understood by its failure mode, not its diagram.',
          'Physical and logical topology can differ — the hub-to-switch change is the classic example.',
          'Real networks are star and tree; mesh is for backbones, ring survives in metro fibre.',
        ],
      },
      {
        id: 'm1-l5',
        title: 'Lesson 1.5 Bandwidth, Throughput, Latency',
        objectives: [
          'Define the four metrics precisely and keep them apart.',
          'Compute transfer time including latency, not just bandwidth.',
          'Explain why a high-bandwidth, high-latency link can be slow.',
        ],
        theory:
          'Four numbers describe any link, and conflating them is the single most common networking error.\nBandwidth is capacity — the maximum bits per second the link could carry. It is a ceiling, not a promise. Throughput is what you actually achieve, always lower, reduced by protocol overhead, congestion, loss and the behaviour of the sender. Latency is the delay for one bit to travel end to end, and it has four components: propagation delay (distance divided by signal speed, irreducible), transmission delay (packet size divided by bandwidth), queuing delay (time waiting in router buffers, the variable part) and processing delay. Jitter is the variation in latency, and it is what destroys real-time audio even when average latency is fine. Packet loss is the fraction that never arrives; TCP recovers by retransmitting, which costs a round trip and makes loss feel like latency.\nThe crucial insight is that bandwidth and latency are independent. A satellite link can offer 100 Mbps with 600 ms round-trip latency. Bulk transfer over it is fine; an interactive SSH session is intolerable. This is the "station wagon full of tapes" observation — enormous bandwidth, appalling latency.\nThe formula that matters is bandwidth-delay product: bandwidth × round-trip time gives the amount of data in flight on the wire. On a 1 Gbps link with 100 ms RTT that is 12.5 MB. If the TCP window is smaller than the BDP, the sender stalls waiting for acknowledgements and you cannot fill the pipe no matter how much bandwidth you bought. That is why a "slow" transatlantic transfer is so often a window-size problem rather than a bandwidth one.',
        callout: {
          lead: 'Think of it like this:',
          text: 'Bandwidth is how many lanes the motorway has. Latency is how long the motorway is. Neither one tells you the other.',
        },
        codeExample: `def transfer_time(size_mb, bandwidth_mbps, rtt_ms, round_trips=2):
    """Realistic transfer time = handshake latency + time on the wire.

    round_trips covers setup (TCP handshake, TLS) before data flows.
    """
    size_megabits = size_mb * 8
    wire_seconds = size_megabits / bandwidth_mbps
    setup_seconds = (rtt_ms * round_trips) / 1000
    return setup_seconds + wire_seconds


def bandwidth_delay_product(bandwidth_mbps, rtt_ms):
    """Bytes in flight. If the TCP window is smaller, you stall."""
    return (bandwidth_mbps * 1_000_000 / 8) * (rtt_ms / 1000)


print("Transferring 10 MB:")
for label, bw, rtt in [("LAN 1Gbps", 1000, 1),
                       ("WAN 100Mbps", 100, 120),
                       ("Satellite 100Mbps", 100, 600)]:
    t = transfer_time(10, bw, rtt)
    print(f"  {label:<20} {t:.3f} s")

print()
print("Bandwidth-delay product (bytes that must be in flight):")
for label, bw, rtt in [("LAN 1Gbps/1ms", 1000, 1),
                       ("WAN 1Gbps/100ms", 1000, 100)]:
    print(f"  {label:<20} {bandwidth_delay_product(bw, rtt)/1_000_000:.2f} MB")`,
        codeOutput: `Transferring 10 MB:
  LAN 1Gbps            0.082 s
  WAN 100Mbps          1.040 s
  Satellite 100Mbps    2.000 s

Bandwidth-delay product (bytes that must be in flight):
  LAN 1Gbps/1ms        0.12 MB
  WAN 1Gbps/100ms      12.50 MB`,
        sidePanel: {
          title: 'The four numbers',
          bulletsTitle: 'Keep them separate',
          bullets: [
            { label: 'Bandwidth', text: 'Maximum possible bits/second. A ceiling, never a guarantee.' },
            { label: 'Throughput', text: 'What you actually get. Always below bandwidth.' },
            { label: 'Latency', text: 'One-way delay: propagation + transmission + queuing + processing.' },
            { label: 'Jitter', text: 'Variation in latency. Kills voice and video even at good averages.' },
            { label: 'BDP', text: 'bandwidth × RTT = bytes in flight. A window below this cannot fill the pipe.' },
          ],
        },
        mistakes: [
          'Quoting bandwidth as if it were speed. A 1 Gbps link with 300 ms RTT feels far slower than 100 Mbps at 5 ms for interactive work.',
          'Forgetting handshake round trips on small transfers. For a 5 KB response the TCP and TLS setup dominates the transfer entirely.',
          'Ignoring the bandwidth-delay product and then blaming the carrier for a transfer that was window-limited all along.',
        ],
        takeaways: [
          'Bandwidth is capacity, throughput is achievement, latency is delay — they are independent.',
          'Propagation delay is physics and cannot be bought down; queuing delay is the part you can influence.',
          'Bandwidth × RTT gives the data in flight; a smaller TCP window leaves the pipe unfillable.',
        ],
      },
      {
        id: 'm1-l6',
        title: 'Lesson 1.6 Packet vs Circuit Switching',
        objectives: [
          'Contrast the two switching models and their resource guarantees.',
          'Explain why packet switching won the internet.',
          'Connect the trade-off to QoS and modern virtual circuits.',
        ],
        theory:
          'Circuit switching reserves a dedicated path for the whole conversation before any data flows. The classic telephone network did exactly this: dial, and a path with guaranteed capacity is held open until you hang up. The benefits are real — constant bandwidth, predictable latency, almost no jitter, no per-packet header overhead. The cost is brutal inefficiency: the circuit is held whether or not anyone is speaking, and silence consumes the same resources as speech. Setup also takes time before anything can be sent.\nPacket switching chops data into independently addressed packets that share links with everyone else\'s traffic. Each router forwards each packet as it arrives, so capacity goes to whoever has data right now. There is no setup delay and no reservation. The costs are variability — queuing delay changes with load, so latency and jitter fluctuate — plus per-packet header overhead, possible reordering, and loss when buffers fill.\nPacket switching won because data traffic is bursty. You load a page, read for thirty seconds, click again. A reserved circuit would sit idle for almost all of that, while packet switching lets those idle moments carry someone else\'s traffic. Statistical multiplexing means a link can serve far more users than its capacity divided by peak demand, because their peaks rarely coincide.\nThe trade-off never disappeared, it was re-created in software. QoS gives priority to voice packets in queues. MPLS builds label-switched paths that behave like virtual circuits over a packet network. Dedicated cloud interconnects sell you reserved capacity. Every one of these is buying back a piece of the predictability circuit switching had — which is the clue that the original trade-off was real.',
        callout: {
          lead: 'Think of it like this:',
          text: 'Circuit switching books the whole restaurant for the evening. Packet switching seats whoever turns up — and that is why it can feed so many more people.',
        },
        codeExample: `def circuit_efficiency(call_minutes, talk_fraction):
    """A circuit is held for the whole call, used only while talking."""
    return talk_fraction * 100


def statistical_multiplexing(link_mbps, user_peak_mbps, duty_cycle):
    """How many bursty users a shared link supports at their average demand."""
    average_per_user = user_peak_mbps * duty_cycle
    return int(link_mbps / average_per_user)


print("Circuit switching, 10-minute call, 40% actually speaking:")
print(f"  link utilisation: {circuit_efficiency(10, 0.4):.0f}%")
print(f"  wasted:           {100 - circuit_efficiency(10, 0.4):.0f}%")

print()
print("Packet switching, 1 Gbps link, users peaking at 20 Mbps:")
for duty in (1.0, 0.20, 0.05):
    users = statistical_multiplexing(1000, 20, duty)
    print(f"  duty cycle {duty:>4.0%}: supports {users:>4} users")
print()
print("Reserving peak capacity per user supports 50.")
print("Bursty users at a 5% duty cycle: 1000 on the same link.")`,
        codeOutput: `Circuit switching, 10-minute call, 40% actually speaking:
  link utilisation: 40%
  wasted:           60%

Packet switching, 1 Gbps link, users peaking at 20 Mbps:
  duty cycle 100%: supports   50 users
  duty cycle  20%: supports  250 users
  duty cycle   5%: supports 1000 users

Reserving peak capacity per user supports 50.
Bursty users at a 5% duty cycle: 1000 on the same link.`,
        sidePanel: {
          title: 'The two models',
          bulletsTitle: 'What you gain and give up',
          bullets: [
            { label: 'Circuit: guarantees', text: 'Fixed bandwidth, predictable latency, negligible jitter.' },
            { label: 'Circuit: waste', text: 'Capacity held during silence; setup delay before any data flows.' },
            { label: 'Packet: efficiency', text: 'Statistical multiplexing — idle moments carry other traffic.' },
            { label: 'Packet: variability', text: 'Queuing delay varies with load, so jitter and loss are inherent.' },
            { label: 'The hybrid', text: 'QoS, MPLS and dedicated interconnects buy predictability back.' },
          ],
        },
        mistakes: [
          'Assuming packet switching is simply better. It trades guarantees for efficiency, which is why real-time traffic still needs QoS.',
          'Describing a TCP connection as a circuit. It is a logical association between endpoints; no router along the path reserves anything for it.',
        ],
        takeaways: [
          'Circuit switching reserves capacity end to end and guarantees it; packet switching shares capacity and guarantees nothing.',
          'Statistical multiplexing makes packet switching efficient precisely because data traffic is bursty.',
          'QoS, MPLS and dedicated interconnects are attempts to recover circuit-like predictability on packet networks.',
        ],
      },
    ],
    quiz: [
      {
        id: 1,
        question: 'A link has 1 Gbps bandwidth and 200 ms round-trip latency. Interactive SSH over it feels terrible. Why?',
        options: [
          "Latency and bandwidth are independent — each keystroke still waits a full round trip regardless of capacity",
          "The link is shared with other users, so each keystroke waits in the queue",
          "SSH encrypts each keystroke separately, so throughput is capped far below the link",
          "Encryption overhead consumes the available bandwidth",
        ],
        correctAnswer:
          'Latency and bandwidth are independent — each keystroke still waits a full round trip regardless of capacity',
      },
      {
        id: 2,
        question: 'Which addresses change as a packet crosses each router on its path?',
        options: [
          'The IP addresses change at every hop; the MAC addresses stay the same',
          'The MAC addresses change at every hop; the IP addresses stay the same end to end',
          'Both change at every hop',
          'Neither changes at any hop',
        ],
        correctAnswer: 'The MAC addresses change at every hop; the IP addresses stay the same end to end',
      },
      {
        id: 3,
        question: 'Replacing a hub with a switch keeps the physical star wiring. What changes?',
        options: [
          "Nothing functional; a switch is simply a faster hub",
          "The physical topology becomes a mesh, since every port can now reach every other port directly",
          "The logical topology — a switch forwards each frame only to the destination port, so each port becomes its own collision domain",
          "Broadcast traffic stops, because a switch forwards frames only to known MAC addresses",
        ],
        correctAnswer:
          'The logical topology — a switch forwards each frame only to the destination port, so each port becomes its own collision domain',
      },
      {
        id: 4,
        question: 'Why did packet switching prevail over circuit switching for data networks?',
        options: [
          "Packet switching guarantees lower latency than circuit switching",
          "Circuit switching cannot carry digital data, so data networks needed a packet-based design",
          "Packets follow a fixed path set up in advance, which removes per-hop routing decisions",
          "Data traffic is bursty, so statistical multiplexing lets idle moments carry other users' traffic",
        ],
        correctAnswer: 'Data traffic is bursty, so statistical multiplexing lets idle moments carry other users\' traffic',
      },
      {
        id: 5,
        question: 'A 1 Gbps link with 100 ms RTT has a bandwidth-delay product of 12.5 MB. What does that imply?',
        options: [
          "The TCP window must hold at least 12.5 MB of unacknowledged data or the sender stalls and cannot fill the link",
          "The link carries at most 12.5 MB per round trip, so large files must be split into parts",
          "Packets larger than 12.5 MB will be fragmented",
          "Each router on the path must hold 12.5 MB of buffer, or packets are dropped at that hop",
        ],
        correctAnswer:
          'The TCP window must hold at least 12.5 MB of unacknowledged data or the sender stalls and cannot fill the link',
      },
      {
        id: 6,
        question: 'In BitTorrent, why does a popular file download faster as more people join?',
        options: [
          "The tracker allocates more bandwidth to popular files",
          "Every peer is also uploading, so supply grows with demand rather than being fixed",
          "ISPs detect popular torrents and cache them automatically, closer to each downloader",
          "The protocol raises each peer's connection speed",
        ],
        correctAnswer: 'Every peer is also uploading, so supply grows with demand rather than being fixed',
      },
    ],
    assignment: {
      prompts: [
        {
          kind: 'mcq',
          prompt:
            'A transatlantic file transfer runs at 40 Mbps on a link sold as 1 Gbps. RTT is 90 ms and there is no measurable packet loss. What is the most likely cause?',
          options: [
            "The link is oversubscribed and there is nothing to be done",
            "The speed of light limits throughput to 40 Mbps at that distance",
            "The TCP window is smaller than the bandwidth-delay product, so the sender stalls waiting for ACKs",
            "The file is too small for TCP slow start to reach full speed before it finishes",
          ],
          correctAnswer: 'The TCP window is smaller than the bandwidth-delay product, so the sender stalls waiting for ACKs',
        },
        {
          kind: 'mcq',
          prompt:
            'A 1 Gbps link has a 100 ms round-trip time. Roughly how much data must be in flight to keep it fully busy?',
          options: [
            "About 1 MB — one megabit per millisecond of latency",
            "About 100 MB — bandwidth multiplied by one second",
            "About 125 MB — bandwidth in bytes per second, independent of round-trip time",
            "About 12.5 MB — bandwidth in bytes per second multiplied by the round-trip time",
          ],
          correctAnswer: 'About 12.5 MB — bandwidth in bytes per second multiplied by the round-trip time',
        },
        {
          kind: 'mcq',
          prompt: 'Which topology failure takes down exactly one device?',
          options: [
            'A leaf cable failing in a star',
            'A cable break in a bus',
            'A single link break in a ring',
            'The central switch failing in a star',
          ],
          correctAnswer: 'A leaf cable failing in a star',
        },
        {
          kind: 'mcq',
          prompt:
            'You send a packet to a server three routers away. Which statement describes the addressing correctly?',
          options: [
            'Both the IP and MAC addresses are rewritten at every hop',
            'The source and destination IP addresses stay the same throughout; the MAC addresses are rewritten at every hop',
            'The IP addresses are rewritten at every hop; the MAC addresses stay the same',
            'Only the destination MAC address changes; the source MAC stays yours',
          ],
          correctAnswer:
            'The source and destination IP addresses stay the same throughout; the MAC addresses are rewritten at every hop',
        },
        {
          kind: 'mcq',
          prompt:
            'An API needs ten sequential round trips to complete. It feels instant on the office LAN at 0.4 ms RTT. What happens when the client is 118 ms away?',
          options: [
            'It stays fast, because the link has more bandwidth than the LAN',
            'It takes roughly 118 ms in total, since the round trips are pipelined',
            'It takes roughly 1.18 seconds — latency is per round trip and no amount of bandwidth reduces it',
            'It fails, because TCP times out above 100 ms',
          ],
          correctAnswer:
            'It takes roughly 1.18 seconds — latency is per round trip and no amount of bandwidth reduces it',
        },
        {
          kind: 'mcq',
          prompt:
            'A 1 Gbps link serves users who each peak at 20 Mbps but transmit only 5% of the time. Reserving peak capacity per user supports 50 of them. How many does packet switching support?',
          options: [
            'Still 50 — sharing does not change the capacity of the link',
            'About 200 — four times as many',
            'Unlimited, because packets queue rather than being refused',
            'About 1000 — statistical multiplexing shares the idle time between users',
          ],
          correctAnswer: 'About 1000 — statistical multiplexing shares the idle time between users',
        },
      ],
    },
  },
};