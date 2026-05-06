import { Layer } from "effect";
import { v0 } from "@/http/versions/v0/http";

export const makeHttpApi = () => Layer.mergeAll(v0);
