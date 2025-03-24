declare module 'leader-line' {
  interface PointAnchorOptions {
    x: string | number;
    y: string | number;
  }

  interface LeaderLineOptions {
    color?: string;
    size?: number;
    path?: 'straight' | 'arc' | 'fluid' | 'magnet' | 'grid';
    startPlug?: 'disc' | 'square' | 'arrow1' | 'arrow2' | 'arrow3' | 'hand' | 'crosshair' | 'behind';
    endPlug?: 'disc' | 'square' | 'arrow1' | 'arrow2' | 'arrow3' | 'hand' | 'crosshair' | 'behind';
    startPlugSize?: number;
    endPlugSize?: number;
    startSocket?: string;
    endSocket?: string;
    dash?: boolean | { len?: number; gap?: number };
    dropShadow?: boolean | { dx?: number; dy?: number; blur?: number; color?: string };
  }

  interface LeaderLine {
    new(start: HTMLElement | any, end: HTMLElement | any, options?: LeaderLineOptions): LeaderLine;
    remove(): void;
    position(): void;
    static pointAnchor(element: HTMLElement, options: PointAnchorOptions): any;
  }

  const LeaderLine: LeaderLine;
  export default LeaderLine;
} 