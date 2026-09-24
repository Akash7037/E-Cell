import { NextResponse } from "next/server";

export async function GET() {
  const prospectusData = {
    title: "E-CELL 2026 FOUNDER PROSPECTUS",
    organization: "Entrepreneurship & Venture Cell",
    cohort: "2026 - 2027",
    pillars: [
      {
        name: "Pre-Seed Prototyping Capital",
        grant: "Up to ₹5,00,000 non-dilutive grant",
        milestones: "3 tranches based on technical validation",
      },
      {
        name: "DeepTech Prototyping Sandbox",
        facilities: "3D printing, PCB milling, GPU workstations, Oscilloscopes",
        access: "24/7 keycard access for incubated teams",
      },
      {
        name: "Patent & Intellectual Property Advisory",
        support: "Institutional funding for prior-art search & patent filing",
        trackRecord: "22 patents filed to date",
      },
      {
        name: "Angel Syndicate & VC Demo Day",
        network: "40+ active angels & micro-VC partners",
        investmentPool: "Up to ₹50,00,000 syndicated seed allocation",
      },
    ],
    timeline: {
      applicationsOpen: "OCTOBER 01, 2026",
      earlyDeadline: "OCTOBER 15, 2026",
      cohortInduction: "NOVEMBER 01, 2026",
      demoDay: "FEBRUARY 20, 2027",
    },
    inquiries: "ventures@ecell.org",
  };

  return NextResponse.json(prospectusData, {
    status: 200,
    headers: {
      "Cache-Control": "public, max-age=3600",
    },
  });
}
