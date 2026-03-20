import type { NextConfig } from "next";
import { ENV } from "./lib/schema";

ENV.parse(process.env);

const nextConfig: NextConfig = {
  typedRoutes: true,
};

export default nextConfig;
