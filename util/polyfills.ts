// AbortSignal.timeout and DOMException for axiom-js
import "abortcontroller-polyfill/dist/abortsignal-polyfill-only";
if (typeof DOMException === "undefined") {
  class DOMExceptionPolyfill extends Error {
    constructor(message?: string, name?: string) {
      super(message);
      this.name = name ?? "DOMException";
    }
  }

  globalThis.DOMException = DOMExceptionPolyfill as any;
}
