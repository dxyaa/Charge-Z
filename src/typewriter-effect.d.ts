declare module "typewriter-effect/dist/core" {
  interface Options {
    strings: string[];
    autoStart: boolean;
  }

  class Typewriter {
    constructor(selector: string, options: Options);
  }

  export default Typewriter;
}
