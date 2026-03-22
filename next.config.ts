import type { NextConfig } from "next";
import { ENV } from "./lib/schema";

ENV.parse(process.env);

const nextConfig: NextConfig = {
  typedRoutes: true,
  devIndicators: {
    position: "bottom-right",
  },
};

export default nextConfig;
