// src/typewriter-effect.d.ts
declare module "typewriter-effect/dist/core" {
  interface Options {
    strings: string[];
    autoStart: boolean;
    // Add other options as needed
  }

  class Typewriter {
    constructor(selector: string, options: Options);
    // Add other methods as needed
  }

  export default Typewriter;
}
