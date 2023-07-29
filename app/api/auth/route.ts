import { NextResponse } from "next/server";

// Notice the function definition:
export async function GET(request: Request) {
  // ...
  return NextResponse.json({ message: "Hello World" });
}