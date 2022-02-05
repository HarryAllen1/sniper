declare module 'mathjax' {
  declare function init(options: MathJaxInitOptions): Promise<any>;
}
interface MathJaxInitOptions {
  loader: {
    load: string[];
  };
}
