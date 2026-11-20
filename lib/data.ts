export type Notice = {
  id: string;
  title: string;
  body: string;
  time: string;
  category: "Emergency" | "Advisory" | "Notice";
  read: boolean;
};

export const initialNotices: Notice[] = [
  {
    id: "n1",
    title: "Terminal 3 evacuation drill at 14:00",
    body: "A scheduled evacuation drill will run for 20 minutes. Follow the marshals and the red exit route on the emergency map. This is only a drill.",
    time: "2 min ago",
    category: "Emergency",
    read: false,
  },
  {
    id: "n2",
    title: "Heavy rain advisory — allow extra time",
    body: "Pampanga is under a thunderstorm advisory. Immigration and security queues may be longer than usual. Departing passengers should be at the terminal 3 hours before their flight.",
    time: "32 min ago",
    category: "Advisory",
    read: false,
  },
  {
    id: "n3",
    title: "Lost item turned over at Gate 7",
    body: "A black trolley bag was turned over to the Lost & Found counter on Level 1, Arrivals. Present your baggage tag and a valid ID to claim it.",
    time: "1 hr ago",
    category: "Notice",
    read: false,
  },
  {
    id: "n4",
    title: "Runway maintenance 22:00 – 04:00",
    body: "Runway 02/20 will be closed for scheduled maintenance tonight. Some flights may be retimed; check with your airline for the latest schedule.",
    time: "Yesterday",
    category: "Advisory",
    read: true,
  },
];

export const announcements = [
  {
    id: "a1",
    title: "Free Wi-Fi in all terminals",
    body: "Connect to “CRK Free Wi-Fi” and sign in with your mobile number. Airport staff will never ask for a one-time PIN.",
  },
  {
    id: "a2",
    title: "eGovPH service kiosks are open",
    body: "National certificates, travel clearances and other government services are available at the eGovPH kiosks on Level 1.",
  },
  {
    id: "a3",
    title: "Wheelchair and special assistance",
    body: "Request assistance at any information desk or through your airline at least 48 hours before departure.",
  },
];

export type Service = {
  slug: string;
  name: string;
  short: string;
  logo: string;
  role: string;
  phone: string;
  phoneLabel: string;
  hours: string;
};

export const emergencyServices: Service[] = [
  {
    slug: "pnp",
    name: "Philippine National Police",
    short: "PNP",
    logo: "/img/svc-pnp.png",
    role: "Airport police, security response and incident reports.",
    phone: "117",
    phoneLabel: "117 / 911",
    hours: "24 hours",
  },
  {
    slug: "crk",
    name: "Clark International Airport",
    short: "CRK",
    logo: "/img/svc-crk.png",
    role: "Terminal operations, passenger assistance and flight information.",
    phone: "(045) 599-2888",
    phoneLabel: "(045) 599-2888",
    hours: "24 hours",
  },
  {
    slug: "bfp",
    name: "Bureau of Fire Protection",
    short: "BFP",
    logo: "/img/svc-bfp.png",
    role: "Airport rescue and firefighting (ARFF), fire safety inspections.",
    phone: "911",
    phoneLabel: "911",
    hours: "24 hours",
  },
];

export const governmentServices: Service[] = [
  {
    slug: "caap",
    name: "Civil Aviation Authority",
    short: "CAAP",
    logo: "/img/svc-caap.png",
    role: "Aviation safety oversight and passenger rights concerns.",
    phone: "(02) 8244-9200",
    phoneLabel: "(02) 8244-9200",
    hours: "Mon–Fri, 8:00 – 17:00",
  },
  {
    slug: "bi",
    name: "Bureau of Immigration",
    short: "BI",
    logo: "/img/svc-bi.png",
    role: "Immigration clearance, travel document and visa questions.",
    phone: "(02) 8465-2400",
    phoneLabel: "(02) 8465-2400",
    hours: "24 hours",
  },
  {
    slug: "dot",
    name: "Department of Tourism",
    short: "DOT",
    logo: "/img/svc-dot.png",
    role: "Tourist assistance, accredited guides and destination information.",
    phone: "(02) 8523-8419",
    phoneLabel: "(02) 8523-8419",
    hours: "24 hours",
  },
];

export const evacuationSteps = [
  {
    title: "Stop and stay calm",
    body: "Pause what you are doing, stay low and listen for instructions from airport marshals and the public address system.",
  },
  {
    title: "Leave everything behind",
    body: "Do not collect bags, duty-free items or check-in luggage. Carry only your phone and travel documents if they are already with you.",
  },
  {
    title: "Follow the red route",
    body: "Use the signed emergency exits shown in red on the airport emergency map. Never use lifts or escalators.",
  },
  {
    title: "Help others carefully",
    body: "Assist children and passengers with reduced mobility, but do not block the exit path. Airport staff will handle medical cases.",
  },
  {
    title: "Report to the assembly point",
    body: "Proceed to Assembly Area C — the open car park across from the main terminal entrance — and stay clear of the apron.",
  },
  {
    title: "Wait for the all-clear",
    body: "Do not return to the terminal until airport security and the ARFF team announce that it is safe. Follow posted updates in the app.",
  },
];

export const recoverySteps = [
  {
    title: "Report to the assistance desk",
    body: "Go to the Recovery Assistance Desk on Level 1, Arrivals. Staff will log your name, flight and what happened.",
  },
  {
    title: "Get medical attention first",
    body: "The first aid station and the airport clinic are on Level 1 near Gate 3. Emergency treatment is free of charge.",
  },
  {
    title: "File a property or baggage report",
    body: "Complete a property incident report for anything lost or damaged. Keep the reference number for your airline and insurer.",
  },
  {
    title: "Coordinate with your airline",
    body: "Ask your airline for rebooking, hotel or meal assistance if your trip was disrupted. Keep your boarding pass and receipts.",
  },
  {
    title: "Replace travel documents",
    body: "For a lost passport or travel document, contact the Bureau of Immigration desk and your embassy or consulate.",
  },
  {
    title: "Follow up in eGovPH",
    body: "Track certificates, assistance requests and government services from the eGovPH section of your profile.",
  },
];

export type ExploreSpot = {
  id: string;
  label: string;
  x: number;
  y: number;
  description: string;
  href?: string;
};

export const exploreSpots: ExploreSpot[] = [
  {
    id: "terminal",
    label: "Terminal 3",
    x: 52,
    y: 46,
    description: "Departures on the upper level, arrivals on Level 1. Emergency map and exits available offline.",
    href: "/map",
  },
  {
    id: "arff",
    label: "ARFF station",
    x: 63,
    y: 53,
    description: "Airport rescue and firefighting station. Responds to apron and runway incidents within 3 minutes.",
  },
  {
    id: "clinic",
    label: "Airport clinic",
    x: 43,
    y: 58,
    description: "Walk-in clinic and first aid station next to the public transport bay.",
  },
  {
    id: "assembly",
    label: "Assembly Area C",
    x: 34,
    y: 66,
    description: "Primary evacuation assembly point across from the terminal entrance.",
    href: "/evacuation",
  },
];
