export type ThemeRatios = '1:1' | '9:16' | '1:69';

export type ThemeGridSizes = '3x3' | '5x5' | '10x10';

export type ThemeProps = {
  theme: string;
  user: {
    image: string;
    name: string;
  };
  ranking: {
    image: string;
    title: string;
    artist: string;
  }[];
  fields: {
    // ratios: ThemeRatios;
    size?: ThemeGridSizes;
    showLabels?: boolean;
  };
}
