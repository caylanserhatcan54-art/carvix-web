import { NextResponse } from "next/server";

export async function POST() {
  const jobId = "ANALYSIS_" + Date.now();

  return NextResponse.json({
    success: true,
    jobId,
  });
}
