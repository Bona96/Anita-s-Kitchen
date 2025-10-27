// Type declarations for importing styles and assets in a TypeScript React project
// Keeps imports like `import './App.css'` from causing errors

declare module '*.css';
declare module '*.scss';
declare module '*.sass';

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.webp';

declare module '*.svg' {
  import * as React from 'react';
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>;
  export default ReactComponent;
}
