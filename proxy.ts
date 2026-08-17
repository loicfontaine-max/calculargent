import { NextResponse } from "next/server";

export function proxy(request: Request) {
  const url = new URL(request.url);
  if (url.hostname === "www.calculargent.fr") {
    url.hostname = "calculargent.fr";
    url.protocol = "https:";
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = { matcher: "/:path*" };
