import { execFile } from "node:child_process";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import test from "node:test";

test("emitted declarations type-check from a consumer's perspective", async () => {
  await promisify(execFile)(
    process.execPath,
    [
      fileURLToPath(new URL("../node_modules/typescript/bin/tsc", import.meta.url)),
      "--project",
      fileURLToPath(new URL("./types/tsconfig.json", import.meta.url))
    ]
  );
});
