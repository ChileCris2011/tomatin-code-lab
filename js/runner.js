function workerMain() {
  function serialize(value) {
    if (typeof value === "string") return value;
    if (typeof value === "undefined") return "undefined";
    if (typeof value === "function") return `[Function ${value.name || "anonima"}]`;

    try {
      return JSON.stringify(value);
    } catch {
      return String(value);
    }
  }

  self.onmessage = ({ data }) => {
    const { code, tests } = data;
    const logs = [];
    const consoleProxy = {
      log: (...values) => logs.push(values.map(serialize).join(" ")),
      warn: (...values) => logs.push(`[WARN] ${values.map(serialize).join(" ")}`),
      error: (...values) => logs.push(`[ERROR] ${values.map(serialize).join(" ")}`),
    };

    try {
      const testSource = tests
        .map(
          (test) => `({
            name: ${JSON.stringify(test.name)},
            passed: (() => {
              try {
                return Boolean(${test.expression});
              } catch {
                return false;
              }
            })()
          })`,
        )
        .join(",");
      const execute = new Function(
        "console",
        "__logs",
        `${code}\n; return [${testSource}];`,
      );
      const results = execute(consoleProxy, logs);
      self.postMessage({ ok: true, logs, tests: results });
    } catch (error) {
      self.postMessage({
        ok: false,
        logs,
        error: `${error.name}: ${error.message}`,
        tests: [],
      });
    }
  };
}

export function runCode(code, tests = [], timeoutMs = 1500) {
  const source = `(${workerMain.toString()})()`;
  const workerUrl = URL.createObjectURL(
    new Blob([source], { type: "text/javascript" }),
  );
  const worker = new Worker(workerUrl);

  return new Promise((resolve) => {
    const timeout = window.setTimeout(() => {
      worker.terminate();
      URL.revokeObjectURL(workerUrl);
      resolve({
        ok: false,
        logs: [],
        tests: [],
        error: `Tiempo excedido: el proceso supero ${timeoutMs} ms.`,
      });
    }, timeoutMs);

    worker.onmessage = ({ data }) => {
      window.clearTimeout(timeout);
      worker.terminate();
      URL.revokeObjectURL(workerUrl);
      resolve(data);
    };

    worker.onerror = (event) => {
      window.clearTimeout(timeout);
      worker.terminate();
      URL.revokeObjectURL(workerUrl);
      resolve({
        ok: false,
        logs: [],
        tests: [],
        error: event.message || "El proceso aislado fallo.",
      });
    };

    worker.postMessage({ code, tests });
  });
}

