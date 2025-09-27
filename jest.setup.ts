import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";

// 型キャストして global に代入
if (typeof global.TextEncoder === "undefined") {
  (global as any).TextEncoder = TextEncoder;
}

if (typeof global.TextDecoder === "undefined") {
  (global as any).TextDecoder = TextDecoder;
}