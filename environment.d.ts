import z from "zod";
import { ENV } from "./lib/schema";

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof ENV> {}
  }
}
