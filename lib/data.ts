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

// MOCK DATA: every number here is fictional (555-01xx range) and will not connect.
// None of these placeholders reach a real agency — swap in verified hotlines before any real use.
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
    role: "Airport police, security response and incident reports. CRK Airport Police Station responds through the emergency line.",
    phone: "5550101",
    phoneLabel: "555-0101",
    hours: "24 hours",
  },
  {
    slug: "crk",
    name: "Clark International Airport",
    short: "CRK",
    logo: "/img/svc-crk.png",
    role: "Terminal operations, passenger assistance and flight information. Operated by LIPAD Corp.",
    phone: "0455550102",
    phoneLabel: "(045) 555-0102",
    hours: "24 hours",
  },
  {
    slug: "bfp",
    name: "Bureau of Fire Protection",
    short: "BFP",
    logo: "/img/svc-bfp.png",
    role: "Airport rescue and firefighting (ARFF), fire safety inspections.",
    phone: "5550103",
    phoneLabel: "555-0103",
    hours: "24 hours",
  },
];

export const governmentServices: Service[] = [
  {
    slug: "caap",
    name: "Civil Aviation Authority",
    short: "CAAP",
    logo: "/img/svc-caap.png",
    role: "Aviation safety oversight and passenger rights concerns. 24/7 Operations Center on locals 2234–2235.",
    phone: "025550104",
    phoneLabel: "(02) 555-0104",
    hours: "Mon–Fri, 8:00 – 17:00",
  },
  {
    slug: "bi",
    name: "Bureau of Immigration",
    short: "BI",
    logo: "/img/svc-bi.png",
    role: "Immigration clearance, travel document and visa questions.",
    phone: "025550105",
    phoneLabel: "(02) 555-0105",
    hours: "24 hours",
  },
  {
    slug: "dot",
    name: "Department of Tourism",
    short: "DOT",
    logo: "/img/svc-dot.png",
    role: "Tourist Assistance Call Center, 24/7 — accredited guides and destination information.",
    phone: "5550106",
    phoneLabel: "555-0106",
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

/* ------------------------------------------------------------------ */
/* Emergency alert system (research function 1)                        */
/* ------------------------------------------------------------------ */

export type AlertSeverity = "critical" | "high" | "moderate" | "info";

export const alertSeverities: { id: AlertSeverity; label: string; note: string }[] = [
  { id: "critical", label: "Critical", note: "Immediate danger to life. Full-screen alert." },
  { id: "high", label: "High", note: "Act now, avoid the affected area." },
  { id: "moderate", label: "Moderate", note: "Be aware, expect disruption." },
  { id: "info", label: "Info", note: "Routine notice, no action needed." },
];

export type AlertKind = "earthquake" | "fire" | "bomb-threat" | "security" | "medical" | "weather" | "drill";

export const alertKinds: { id: AlertKind; label: string; defaultSource: string }[] = [
  { id: "earthquake", label: "Earthquake", defaultSource: "CRK Airport Operations" },
  { id: "fire", label: "Fire / smoke", defaultSource: "Airport Rescue & Firefighting (ARFF)" },
  { id: "bomb-threat", label: "Bomb threat", defaultSource: "PNP AVSEGROUP" },
  { id: "security", label: "Security incident", defaultSource: "PNP Airport Police" },
  { id: "medical", label: "Medical emergency", defaultSource: "CRK Medical Team" },
  { id: "weather", label: "Weather / disruption", defaultSource: "CRK Terminal Operations" },
  { id: "drill", label: "Drill / test", defaultSource: "Airport Emergency Committee" },
];

export type AirportAlert = {
  id: string;
  kind: AlertKind;
  kindLabel: string;
  severity: AlertSeverity;
  headline: string;
  instructions: string;
  area: string;
  source: string;
  issuedAt: string;
  test: boolean;
  acknowledged: boolean;
  reached: number;
  ackCount: number;
};

export const seededAlerts: AirportAlert[] = [
  {
    id: "alert-drill-14",
    kind: "drill",
    kindLabel: "Drill / test",
    severity: "info",
    headline: "Scheduled evacuation drill — Terminal 3, 14:00",
    instructions:
      "Marshals will walk the red exit route for 20 minutes. Stay seated until a marshal reaches your gate, then follow the nearest red exit and gather at Assembly Area C. This is a drill only — no emergency exists and no flights are affected.",
    area: "Terminal 3 · all levels",
    source: "Airport Emergency Committee",
    issuedAt: "Today · 13:40",
    test: true,
    acknowledged: false,
    reached: 1480,
    ackCount: 612,
  },
  {
    id: "alert-weather-02",
    kind: "weather",
    kindLabel: "Weather / disruption",
    severity: "moderate",
    headline: "Thunderstorm advisory — longer immigration queues",
    instructions:
      "Pampanga is under a thunderstorm advisory until 21:00. Allow an extra 45 minutes for security and immigration, and expect ramp activity to pause during lightning. Check the status boards for gate changes.",
    area: "Terminal 3 · departures",
    source: "CRK Terminal Operations",
    issuedAt: "Today · 11:05",
    test: false,
    acknowledged: false,
    reached: 2130,
    ackCount: 1874,
  },
  {
    id: "alert-medical-01",
    kind: "medical",
    kindLabel: "Medical emergency",
    severity: "high",
    headline: "Medical response near Gate 5 — use the west corridor",
    instructions:
      "The Airport Medical Team is attending an incident outside Gate 5. Keep the west corridor clear for the stretcher team and use the central walkway instead. If you need first aid, the clinic on Level 1 near Gate 3 is open.",
    area: "Level 2 · Gate 5 corridor",
    source: "CRK Medical Team",
    issuedAt: "Yesterday · 18:22",
    test: false,
    acknowledged: true,
    reached: 980,
    ackCount: 902,
  },
];

export type AdminLogEntry = {
  id: string;
  at: string;
  actor: string;
  action: string;
  detail: string;
};

export const seededAdminLog: AdminLogEntry[] = [
  {
    id: "log-1",
    at: "Yesterday · 18:20",
    actor: "M. Santos · Alert administrator",
    action: "Published alert",
    detail: "Medical response near Gate 5 · Level 2",
  },
  {
    id: "log-2",
    at: "Yesterday · 17:58",
    actor: "M. Santos · Alert administrator",
    action: "Acknowledged delivery",
    detail: "210 recipients acknowledged within 4 minutes",
  },
  {
    id: "log-3",
    at: "Today · 13:38",
    actor: "Airport Emergency Committee",
    action: "Sent test alert",
    detail: "Evacuation drill notice · Terminal 3",
  },
];

export type Role = "passenger" | "admin";

export const demoPasscode = "AERO-DEMO";

/* ------------------------------------------------------------------ */
/* SOS assistance requests (research function 4)                       */
/* ------------------------------------------------------------------ */

export type SosCategory = {
  id: string;
  label: string;
  routedTo: string;
  desk: string;
  note: string;
};

export const sosCategories: SosCategory[] = [
  {
    id: "medical",
    label: "Medical emergency",
    routedTo: "CRK Medical Team",
    desk: "Airport clinic · Level 1 near Gate 3",
    note: "A responder brings a defibrillator and stretcher to your location.",
  },
  {
    id: "fire",
    label: "Fire or smoke",
    routedTo: "ARFF / Bureau of Fire Protection",
    desk: "Airport rescue & firefighting station",
    note: "ARFF responds from the station beside the apron within 3 minutes.",
  },
  {
    id: "security",
    label: "Security or police",
    routedTo: "PNP Airport Police",
    desk: "PNP desk · Level 2, north concourse",
    note: "Airport police handle fights, theft, threats and unruly passengers.",
  },
  {
    id: "suspicious",
    label: "Suspicious item",
    routedTo: "PNP AVSEGROUP",
    desk: "Security control room · Level 1",
    note: "Never touch or move the item — AVSEGROUP and EOD/K9 are notified.",
  },
  {
    id: "lost-person",
    label: "Lost person",
    routedTo: "Passenger Services",
    desk: "Information desk · Level 1, Arrivals",
    note: "Passenger Services start a PA page and alert the marshals on your level.",
  },
  {
    id: "other",
    label: "Something else",
    routedTo: "CRK Terminal Operations",
    desk: "Operations center · Level 1",
    note: "Operations triage the request and route it to the right desk.",
  },
];

export type SosStatus = "received" | "acknowledged" | "assigned" | "cancelled";

export const sosStatusLabels: Record<SosStatus, string> = {
  received: "Received",
  acknowledged: "Acknowledged",
  assigned: "Responder assigned",
  cancelled: "Cancelled",
};

export type SosRequest = {
  id: string;
  ref: string;
  categoryId: string;
  categoryLabel: string;
  routedTo: string;
  description: string;
  location: string;
  notifyContact: boolean;
  createdAt: string;
  status: SosStatus;
};

export const sosDefaultLocation = "Terminal 3 · Level 3 · near Gate 7";
export const emergencyContactName = "John Doe (brother)";

/* ------------------------------------------------------------------ */
/* Terminal navigation (research function 5)                           */
/* ------------------------------------------------------------------ */

export type NavGroup = "Gates" | "Check-in & immigration" | "Facilities" | "Transport";

export type NavSpot = {
  id: string;
  name: string;
  group: NavGroup;
  level: string;
  landmark: string;
  walk: string;
  directions: string[];
};

function gateSpot(gate: number): NavSpot {
  const level = gate <= 4 ? "Level 1" : gate <= 8 ? "Level 2" : "Level 3";
  const wing = gate <= 4 ? "south concourse" : gate <= 8 ? "central concourse" : "north concourse";
  const side = gate % 2 === 0 ? "right" : "left";
  return {
    id: `gate-${gate}`,
    name: `Gate ${gate}`,
    group: "Gates",
    level,
    landmark: `${wing}, ${level} departures`,
    walk: `${3 + gate} min from security screening`,
    directions: [
      `Clear security on ${level} and turn into the ${wing}.`,
      `Follow the overhead gate numbers along the corridor to Gate ${gate}.`,
      `The boarding counter and waiting seats are on the ${side} of the walkway.`,
      "To return to the main hall, use the central escalators or the lifts.",
    ],
  };
}

export const navSpots: NavSpot[] = [
  ...Array.from({ length: 12 }, (_, index) => gateSpot(index + 1)),
  {
    id: "check-in",
    name: "Check-in hall",
    group: "Check-in & immigration",
    level: "Level 1",
    landmark: "Main entrance, beside the departure ramp",
    walk: "1 min from the terminal entrance",
    directions: [
      "Enter through the main doors on Level 1 and keep the departure ramp on your left.",
      "Airline check-in counters run along the full length of the hall, numbered by airline.",
      "Bag drop and oversized baggage are at the far end, next to the eGovPH kiosks.",
    ],
  },
  {
    id: "immigration",
    name: "Immigration counters",
    group: "Check-in & immigration",
    level: "Level 3",
    landmark: "After security, before the north concourse",
    walk: "4 min from security screening",
    directions: [
      "Clear the security checkpoint on Level 3.",
      "Walk straight past the duty-free walkway to the immigration hall.",
      "Join the lane marked for your passport type — the counters are numbered 1 to 14.",
    ],
  },
  {
    id: "baggage-claim",
    name: "Baggage claim",
    group: "Check-in & immigration",
    level: "Level 1",
    landmark: "Arrivals hall, carousels 1–4",
    walk: "3 min from the arrival gate",
    directions: [
      "Follow the Arrivals signs down the escalators to Level 1.",
      "Carousel numbers are shown on the screens above the belt — check your flight number.",
      "Oversized baggage is delivered at the counter beside carousel 4.",
    ],
  },
  {
    id: "first-aid",
    name: "First aid station & clinic",
    group: "Facilities",
    level: "Level 1",
    landmark: "Near Gate 3, opposite the washrooms",
    walk: "2 min from Arrivals",
    directions: [
      "From Arrivals, walk towards the public transport bay and keep left.",
      "The clinic is the white door beside the first aid sign, next to Gate 3.",
      "Staffed 24 hours — walk in or send an SOS request from the home screen.",
    ],
  },
  {
    id: "lost-found",
    name: "Lost & Found",
    group: "Facilities",
    level: "Level 1",
    landmark: "Arrivals, beside the information desk",
    walk: "2 min from baggage claim",
    directions: [
      "Exit the baggage hall into the Arrivals concourse.",
      "The Lost & Found counter is immediately to the right of the information desk.",
      "Bring your baggage tag and a valid ID to claim an item.",
    ],
  },
  {
    id: "egovph",
    name: "eGovPH kiosk",
    group: "Facilities",
    level: "Level 1",
    landmark: "Arrivals concourse, next to the ATMs",
    walk: "3 min from the main entrance",
    directions: [
      "Walk through the main hall towards the Arrivals concourse.",
      "The eGovPH kiosks are the blue-lit units beside the ATM row.",
      "Bring a valid ID and your reference number for certificate pick-ups.",
    ],
  },
  {
    id: "prayer-room",
    name: "Prayer room",
    group: "Facilities",
    level: "Level 1",
    landmark: "Landside, near the transport bay",
    walk: "5 min from check-in",
    directions: [
      "From the check-in hall, walk towards the west exit and the transport bay.",
      "Turn right before the doors; the prayer room is signposted on the wall.",
      "Abolution areas are next door and are open 24 hours.",
    ],
  },
  {
    id: "washrooms",
    name: "Washrooms & baby care",
    group: "Facilities",
    level: "Levels 1 and 3",
    landmark: "Arrivals hall and the departure concourse",
    walk: "Under 2 min from most gates",
    directions: [
      "Level 1: beside the Arrivals information desk and next to Gate 3.",
      "Level 3: behind the central escalators and at the end of the north concourse.",
      "Baby changing is available in the Level 1 accessible washroom.",
    ],
  },
  {
    id: "info-desk",
    name: "Information desk",
    group: "Facilities",
    level: "Level 1",
    landmark: "Arrivals concourse, under the flight boards",
    walk: "1 min from baggage claim",
    directions: [
      "Leave the baggage hall and follow the signs to the Arrivals concourse.",
      "The desk sits directly under the flight information boards.",
      "Staff can page a lost companion and arrange wheelchair assistance.",
    ],
  },
  {
    id: "transport-bay",
    name: "Transport bay (taxi & bus)",
    group: "Transport",
    level: "Level 1",
    landmark: "West exit, outside the Arrivals doors",
    walk: "4 min from baggage claim",
    directions: [
      "Exit the Arrivals hall through the west doors.",
      "Metered taxis queue at bay 1; ride-hailing pick-ups are at bay 3.",
      "The provincial bus stop is across the road, past the covered walkway.",
    ],
  },
  {
    id: "parking",
    name: "Car park & rental desks",
    group: "Transport",
    level: "Level 1",
    landmark: "Opposite the main entrance",
    walk: "6 min from check-in",
    directions: [
      "Exit the terminal through the main entrance on Level 1.",
      "Cross the covered walkway to the multi-level car park.",
      "Rental car desks are on the ground floor, beside the lift lobby.",
    ],
  },
];

export const navGroups: (NavGroup | "All")[] = [
  "All",
  "Gates",
  "Check-in & immigration",
  "Facilities",
  "Transport",
];

/* ------------------------------------------------------------------ */
/* Recovery plans (research function 3, Appendix A)                    */
/* ------------------------------------------------------------------ */

export type RecoveryItem = { area: string; action: string; responsible: string };

export type RecoveryPhase = {
  id: "before" | "during" | "after";
  label: string;
  items: RecoveryItem[];
};

export type RecoveryPlan = {
  id: "earthquake" | "bomb-threat" | "medical";
  title: string;
  summary: string;
  objective: string;
  rightNow: string[];
  phases: RecoveryPhase[];
  integration: string[];
};

export const recoveryPlans: RecoveryPlan[] = [
  {
    id: "earthquake",
    title: "Earthquake",
    summary: "Drop, cover and hold on, then evacuate only when the shaking stops.",
    objective:
      "Protect passengers, personnel and stakeholders from earthquake injuries and structural hazards, evacuate safely when needed, and restore operations only after inspections.",
    rightNow: [
      "Drop, cover and hold on. Stay away from glass, windows and hanging fixtures.",
      "Do not run for the exits while the ground is still shaking.",
      "When the shaking stops, leave by the stairs if a marshal directs you and gather at Assembly Area C.",
      "Help children, older passengers and anyone with reduced mobility — do not block the exit path.",
    ],
    phases: [
      {
        id: "before",
        label: "Before — preparedness",
        items: [
          {
            area: "Risk assessment",
            action:
              "Assess terminal buildings, gates, control rooms and baggage areas for earthquake vulnerability.",
            responsible: "Airport Safety Management / Engineering",
          },
          {
            area: "Evacuation routes",
            action: "Identify and mark safe routes, exits and assembly areas so they stay accessible.",
            responsible: "Airport Operations / Safety Office",
          },
          {
            area: "Drills & equipment",
            action:
              "Run Drop, Cover and Hold On drills and maintain emergency lighting, first aid kits and radios.",
            responsible: "Safety Office / Facilities / ERT",
          },
          {
            area: "Passenger information",
            action: "Publish earthquake instructions on displays, announcements and AEROMUSTER.",
            responsible: "Airport Operations / IT",
          },
        ],
      },
      {
        id: "during",
        label: "During — response",
        items: [
          {
            area: "Immediate protection",
            action: "Instruct everyone to Drop, Cover and Hold On, away from glass and unsecured equipment.",
            responsible: "All airport personnel",
          },
          {
            area: "Announcements",
            action: "Issue safety announcements; never tell people to run towards exits mid-shake.",
            responsible: "Public Address / Operations",
          },
          {
            area: "Initial assessment",
            action: "Report visible damage, fire, electrical hazards and injuries without exposing responders.",
            responsible: "Safety / Security personnel",
          },
          {
            area: "Controlled evacuation",
            action: "Evacuate affected areas once the shaking stops, using designated safe routes.",
            responsible: "Emergency Response Team",
          },
          {
            area: "Accountability",
            action: "Headcount evacuated, missing, injured and unaccounted-for passengers by flight.",
            responsible: "Area marshals / Security",
          },
        ],
      },
      {
        id: "after",
        label: "After — recovery",
        items: [
          {
            area: "Search & rescue",
            action: "Coordinate search and rescue in damaged areas and account for missing persons.",
            responsible: "BFP / SAR teams",
          },
          {
            area: "Structural inspection",
            action:
              "Inspect terminal buildings, runways, taxiways and aprons before any reopening decision.",
            responsible: "Engineering / Airport Safety",
          },
          {
            area: "Passenger assistance",
            action: "Provide flight disruption, accommodation, baggage and onward transport information.",
            responsible: "Airline representatives / Passenger Services",
          },
          {
            area: "Operational restoration",
            action: "Resume operations only after inspections, safety assessments and approvals.",
            responsible: "Airport Management / Authorities",
          },
          {
            area: "Evaluation",
            action: "Prepare the incident report and revise procedures from the post-incident review.",
            responsible: "Safety Management Office / AEC",
          },
        ],
      },
    ],
    integration: [
      "Authorized earthquake alerts and safety instructions pushed from the Alert Center.",
      "Approved evacuation maps and assembly locations shown for the passenger's level.",
      "SOS and hotline access during the response phase.",
      "Post-earthquake service updates: cancellations, terminal closures, assistance points.",
    ],
  },
  {
    id: "bomb-threat",
    title: "Bomb threat",
    summary: "Report it, keep clear, and never touch or investigate a suspicious item.",
    objective:
      "Protect passengers and personnel during a bomb threat, restrict access to the affected area, support authorized security agencies and restore operations only after clearance.",
    rightNow: [
      "Never touch, open, move or cover a suspicious object or unattended bag.",
      "Move at least 30 metres away and tell the nearest marshal or security officer exactly where it is.",
      "Follow security directions — evacuation, sheltering or relocation is decided by the Incident Commander.",
      "Do not repeat unverified details; wait for official information in the app.",
    ],
    phases: [
      {
        id: "before",
        label: "Before — preparedness",
        items: [
          {
            area: "Security assessment",
            action: "Assess terminals, restricted areas and waiting areas for security vulnerabilities.",
            responsible: "Airport Security Office",
          },
          {
            area: "Threat reporting",
            action: "Keep an accessible reporting channel for bomb threats and suspicious objects.",
            responsible: "Airport Security Office",
          },
          {
            area: "Training & checklist",
            action:
              "Train staff on threat recognition and keep a checklist for exact words, time and caller details.",
            responsible: "Airport Security Manager",
          },
          {
            area: "Agency coordination",
            action: "Maintain secure channels with PNP AVSEGROUP, EOD/K9 and local authorities.",
            responsible: "Airport Security Manager",
          },
        ],
      },
      {
        id: "during",
        label: "During — response",
        items: [
          {
            area: "Receive & record",
            action: "If called, stay calm, keep the caller on the line and record exact words and background sounds.",
            responsible: "Employee receiving the threat",
          },
          {
            area: "Immediate reporting",
            action: "Inform the Security Manager and Operations Center through approved channels.",
            responsible: "Employee / Security personnel",
          },
          {
            area: "Threat assessment",
            action: "Authorized security and law enforcement determine the response level.",
            responsible: "Airport Security / PNP",
          },
          {
            area: "Secure the area",
            action: "Establish a perimeter and restrict access; do not investigate the object.",
            responsible: "Airport Security / PNP",
          },
          {
            area: "Evacuation decision",
            action: "Decide between evacuation, sheltering or relocation based on the assessment.",
            responsible: "Incident Commander / PNP",
          },
          {
            area: "Specialist response",
            action: "Only qualified bomb technicians examine or manage the suspected device.",
            responsible: "PNP EOD/K9",
          },
        ],
      },
      {
        id: "after",
        label: "After — recovery",
        items: [
          {
            area: "Security clearance",
            action: "Reoccupy only after authorized authorities confirm the area is cleared.",
            responsible: "PNP / Airport Security",
          },
          {
            area: "Facility inspection",
            action: "Inspect affected areas, utilities and equipment for damage or remaining hazards.",
            responsible: "Engineering / Facilities",
          },
          {
            area: "Passenger reconciliation",
            action: "Account for evacuated passengers and staff, and assist those affected.",
            responsible: "Airport Operations",
          },
          {
            area: "Flight restoration",
            action: "Coordinate resumption of operations with airlines and air traffic services.",
            responsible: "Airport Operations / ATS",
          },
          {
            area: "Evidence & review",
            action: "Preserve CCTV, logs and threat records, then revise security measures.",
            responsible: "Security / PNP / Security Committee",
          },
        ],
      },
    ],
    integration: [
      "Authorized alerts with verified passenger instructions and affected terminal areas.",
      "Approved safe locations and evacuation information shown when authorized.",
      "A reporting channel for suspicious incidents through SOS — suspicious item.",
      "Post-incident assistance and operational recovery information.",
    ],
  },
  {
    id: "medical",
    title: "Medical emergency",
    summary: "Get qualified help moving, keep the scene safe and protect the patient's privacy.",
    objective:
      "Ensure anyone who is seriously injured receives immediate medical attention, appropriate transport and continued care while keeping other airport users safe.",
    rightNow: [
      "Send an SOS request for medical help — it routes to the CRK Medical Team with your location.",
      "Do not move a seriously injured person unless there is immediate danger.",
      "Do not give food, drink or medication unless a qualified responder directs you.",
      "Keep the area clear and protect the patient's privacy while help arrives.",
    ],
    phases: [
      {
        id: "before",
        label: "Before — preparedness",
        items: [
          {
            area: "Medical facilities",
            action: "Keep an equipped first aid station or clinic accessible to passengers and staff.",
            responsible: "Airport Management",
          },
          {
            area: "Equipment",
            action: "Maintain first aid kits, AEDs, stretchers, oxygen and approved medical supplies.",
            responsible: "Airport Medical Team",
          },
          {
            area: "Training",
            action: "Provide regular first aid, CPR and AED training to designated personnel.",
            responsible: "Training Department",
          },
          {
            area: "Hospital coordination",
            action: "Keep an updated directory of ambulances, hospitals and emergency hotlines.",
            responsible: "Airport Operations / Medical Services",
          },
        ],
      },
      {
        id: "during",
        label: "During — response",
        items: [
          {
            area: "Incident reporting",
            action: "Report the injured person through the hotline, security, clinic or the SOS feature.",
            responsible: "Passenger / witness / employee",
          },
          {
            area: "Emergency notification",
            action: "Notify the medical team with exact location, injury type and number of people affected.",
            responsible: "Operations Center",
          },
          {
            area: "Scene safety",
            action: "Check for electrical, fire, vehicle and falling-object hazards before approaching.",
            responsible: "First responders / Security",
          },
          {
            area: "First aid",
            action: "Provide care within training; avoid moving suspected spinal or major trauma injuries.",
            responsible: "Trained first-aid personnel",
          },
          {
            area: "Ambulance & crowd control",
            action: "Request advanced medical help when needed and keep bystanders clear.",
            responsible: "Medical Team / Security",
          },
          {
            area: "Hospital transfer",
            action: "Coordinate handover with the receiving hospital and document the transfer.",
            responsible: "Medical Team / EMS",
          },
        ],
      },
      {
        id: "after",
        label: "After — recovery",
        items: [
          {
            area: "Continuity of care",
            action: "Follow up with the receiving hospital on handover and treatment.",
            responsible: "Airport Medical Team",
          },
          {
            area: "Family notification",
            action: "Contact the patient's family or emergency contact, subject to privacy and consent.",
            responsible: "Airport Management / Passenger Services",
          },
          {
            area: "Investigation",
            action: "Determine the cause, especially where facilities or equipment were involved.",
            responsible: "Airport Safety Office",
          },
          {
            area: "Hazard correction",
            action: "Repair facilities and remove hazards before reopening the affected area.",
            responsible: "Engineering / Facilities",
          },
          {
            area: "Evaluation",
            action: "Review response time, communication, equipment and hospital coordination.",
            responsible: "Airport Emergency Committee",
          },
        ],
      },
    ],
    integration: [
      "SOS button for immediate medical assistance with the reported location.",
      "Incident category and description carried into the request reference.",
      "Notification to designated airport emergency personnel (simulated).",
      "Nearby medical station information and post-incident recovery guidance.",
    ],
  },
];

export type AftermathStatus = "Open" | "Partial" | "Closed" | "Info";

export type AftermathUpdate = {
  id: string;
  label: string;
  status: AftermathStatus;
  title: string;
  body: string;
  updated: string;
};

export type AftermathHelp = {
  id: string;
  name: string;
  place: string;
  detail: string;
  href?: string;
  sos?: string;
};

export type RecoveryAftermath = {
  summary: string;
  rebooking: string[];
  updates: AftermathUpdate[];
  help: AftermathHelp[];
  responsible: string[];
};

export const recoveryAftermath: Record<RecoveryPlan["id"], RecoveryAftermath> = {
  earthquake: {
    summary:
      "Once the all-clear is given, recovery is about your flight, your bags and any report you need for insurance.",
    rebooking: [
      "Check the status boards or your airline app first — departures are retimed before any are cancelled.",
      "If your flight was cancelled, take your boarding pass to the airline service desk on Level 1.",
      "Stranded overnight? The Recovery Assistance Desk arranges hotel and meal assistance.",
    ],
    updates: [
      {
        id: "eq-u1",
        label: "Terminal",
        status: "Partial",
        title: "Level 3 closed for inspection",
        body: "Levels 1 and 2 are open. Level 3 stays closed until Engineering clears the ceiling panels and light fittings.",
        updated: "Updated 18 min ago",
      },
      {
        id: "eq-u2",
        label: "Flights",
        status: "Info",
        title: "Departures retimed by 15–25 minutes",
        body: "Nine flights moved while the terminal was evacuated. Airlines are updating gates on the boards now.",
        updated: "Updated 25 min ago",
      },
      {
        id: "eq-u3",
        label: "Baggage",
        status: "Open",
        title: "Reclaim at carousel 2",
        body: "Checked bags from affected flights are being moved to carousel 2 on Level 1. Ground handlers stay until 23:00.",
        updated: "Updated 40 min ago",
      },
    ],
    help: [
      {
        id: "eq-h1",
        name: "Recovery Assistance Desk",
        place: "Level 1, Arrivals",
        detail:
          "File a property or injury report, and ask for hotel or meal assistance if you are stranded.",
        sos: "other",
      },
      {
        id: "eq-h2",
        name: "Lost & Found / baggage claim",
        place: "Level 1, carousel 2",
        detail: "Claim bags left behind during the evacuation — bring your baggage tag or a photo ID.",
        href: "/navigate",
      },
      {
        id: "eq-h3",
        name: "Airport Medical Team / clinic",
        place: "Level 1, near Gate 3",
        detail:
          "Injuries, replacement medication and a medical certificate for your airline or insurer.",
        sos: "medical",
      },
      {
        id: "eq-h4",
        name: "PNP Airport Police",
        place: "Level 2, north concourse",
        detail: "Statement for an insurance claim, or a report for property lost in the evacuation.",
        href: "/services",
      },
    ],
    responsible: [
      "Airport Safety Management Office",
      "Engineering / Facilities",
      "Airport Operations Center",
      "Airline representatives",
      "Airport Medical Team",
      "PNP Airport Police",
    ],
  },
  "bomb-threat": {
    summary:
      "After security clearance, passengers are reconciled, flights resume and reports are taken before the terminal returns to normal.",
    rebooking: [
      "Wait for the clearance announcement before returning to the gate area or reclaiming bags.",
      "Check the boards for your rescheduled departure — gates are reassigned as the terminal reopens.",
      "Ask the airline desk for a disruption letter if you need it for insurance or a missed connection.",
    ],
    updates: [
      {
        id: "bt-u1",
        label: "Terminal",
        status: "Open",
        title: "Reopened after security clearance",
        body: "PNP AVSEGROUP cleared the affected area. All levels are open; expect bag re-screening at the north concourse.",
        updated: "Updated 6 min ago",
      },
      {
        id: "bt-u2",
        label: "Flights",
        status: "Info",
        title: "Departures delayed 30–90 minutes",
        body: "Airlines are re-sequencing departures after the evacuation. Check the boards before going to the gate.",
        updated: "Updated 10 min ago",
      },
      {
        id: "bt-u3",
        label: "Baggage",
        status: "Partial",
        title: "Bags held for re-screening",
        body: "Checked bags from the evacuated area are being screened again. Collect at carousel 1 once released.",
        updated: "Updated 20 min ago",
      },
    ],
    help: [
      {
        id: "bt-h1",
        name: "PNP AVSEGROUP statement desk",
        place: "Level 1, security control room",
        detail:
          "Give a statement if you saw the item or the person who left it. Security may ask for your contact details.",
        href: "/services",
      },
      {
        id: "bt-h2",
        name: "Lost & Found",
        place: "Level 1, Arrivals",
        detail: "Items abandoned during the evacuation are held here after the area is cleared.",
        href: "/navigate",
      },
      {
        id: "bt-h3",
        name: "Airline service desk",
        place: "Level 1, check-in hall",
        detail: "Recheck bags, rebook and request a written disruption notice.",
        sos: "other",
      },
      {
        id: "bt-h4",
        name: "Recovery Assistance Desk",
        place: "Level 1, Arrivals",
        detail: "Onward travel, accommodation and a record of the disruption.",
        sos: "other",
      },
    ],
    responsible: [
      "PNP AVSEGROUP / EOD-K9",
      "Airport Security Office",
      "Airport Operations Center",
      "Airline representatives",
      "Airport Emergency Committee",
    ],
  },
  medical: {
    summary:
      "Recovery covers the patient's care, their family, their belongings and the report needed for insurance.",
    rebooking: [
      "Ask the airport clinic for a medical certificate before you travel — airlines may require fitness-to-fly clearance.",
      "Contact your airline to move your flight; Passenger Services can help with the call.",
      "If you are staying in hospital, ask Passenger Services to hold your bags at Lost & Found.",
    ],
    updates: [
      {
        id: "md-u1",
        label: "Clinic",
        status: "Open",
        title: "Open 24 hours",
        body: "Follow-up care, prescriptions and medical certificates at the Level 1 clinic near Gate 3.",
        updated: "Updated 5 min ago",
      },
      {
        id: "md-u2",
        label: "Flights",
        status: "Info",
        title: "Fitness-to-fly checks",
        body: "Airlines may ask for a medical certificate before boarding; the clinic issues one after assessment.",
        updated: "Updated 15 min ago",
      },
      {
        id: "md-u3",
        label: "Baggage",
        status: "Partial",
        title: "Bags held for hospitalised passengers",
        body: "Passenger Services can hold checked bags at Lost & Found until a companion collects them.",
        updated: "Updated 30 min ago",
      },
    ],
    help: [
      {
        id: "md-h1",
        name: "Airport Medical Team / clinic",
        place: "Level 1, near Gate 3",
        detail: "Follow-up care, prescriptions and a medical certificate for your airline.",
        sos: "medical",
      },
      {
        id: "md-h2",
        name: "Receiving hospital",
        place: "Referral coordinated by the clinic",
        detail: "Continuity of care and records transfer; the airport clinic handles the handover.",
      },
      {
        id: "md-h3",
        name: "Passenger Services",
        place: "Level 1, Arrivals",
        detail: "Contact family, collect belongings and rebook with your airline.",
        href: "/navigate",
      },
      {
        id: "md-h4",
        name: "PNP Airport Police",
        place: "Level 2, north concourse",
        detail: "Statement if the injury involved equipment or another person, for insurance.",
        href: "/services",
      },
    ],
    responsible: [
      "Airport Medical Team / EMS",
      "Airport clinic",
      "Passenger Services",
      "Airline representatives",
      "Airport Safety Office",
      "PNP Airport Police",
    ],
  },
};

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
