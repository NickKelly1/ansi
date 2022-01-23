export interface CSPair {
  /**
   * The ANSI terminal control sequence for starting this style
   */
  readonly open: string;

  /**
   * The ANSI terminal control sequence for ending this style
   */
  readonly close: string;
}

export interface ColorBase {
  /**
   * The ANSI terminal control sequence for ending this color
   */
  readonly close: string;

  ansi(code: number): string;

  ansi256(code: number): string;

  ansi16m(red: number, green: number, blue: number): string;
}

export interface Modifier {
  /**
   * Resets the current color chain
   */
  readonly reset: CSPair;

  /**
   * Make text bold
   */
  readonly bold: CSPair;

  /**
   * Emitting only a small amount of light
   */
  readonly dim: CSPair;

  /**
   * Make text italic. (Not widely supported)
   */
  readonly italic: CSPair;

  /**
   * Make text underline. (Not widely supported)
   */
  readonly underline: CSPair;

  /**
   * Make text overline
   *
   * Supported on VTE-based terminals, the GNOME terminal, mintty, and Git Bash
   */
  readonly overline: CSPair;

  /**
   * Inverse background and foreground colors
   */
  readonly inverse: CSPair;

  /**
   * Prints the text, but makes it invisible
   */
  readonly hidden: CSPair;

  /**
   * Puts a horizontal line through the center of the text. (Not widely
   * supported)
   */
  readonly strikethrough: CSPair;
}

export type ModifierName = keyof Modifier;

export interface ForegroundColor {
  readonly black: CSPair;
  readonly red: CSPair;
  readonly green: CSPair;
  readonly yellow: CSPair;
  readonly blue: CSPair;
  readonly cyan: CSPair;
  readonly magenta: CSPair;
  readonly white: CSPair;

  /**
   * Alias for `blackBright`
   */
  readonly gray: CSPair;

  /**
   * Alias for `blackBright`
   */
  readonly grey: CSPair;

  readonly blackBright: CSPair;
  readonly redBright: CSPair;
  readonly greenBright: CSPair;
  readonly yellowBright: CSPair;
  readonly blueBright: CSPair;
  readonly cyanBright: CSPair;
  readonly magentaBright: CSPair;
  readonly whiteBright: CSPair;
}

export type ForegroundColorName = keyof ForegroundColor;

export interface BackgroundColor {
  readonly bgBlack: CSPair;
  readonly bgRed: CSPair;
  readonly bgGreen: CSPair;
  readonly bgYellow: CSPair;
  readonly bgBlue: CSPair;
  readonly bgCyan: CSPair;
  readonly bgMagenta: CSPair;
  readonly bgWhite: CSPair;

  /** Alias for `bgBlackBright` */
  readonly bgGray: CSPair;

  /** Alias for `bgBlackBright` */
  readonly bgGrey: CSPair;

  readonly bgBlackBright: CSPair;
  readonly bgRedBright: CSPair;
  readonly bgGreenBright: CSPair;
  readonly bgYellowBright: CSPair;
  readonly bgBlueBright: CSPair;
  readonly bgCyanBright: CSPair;
  readonly bgMagentaBright: CSPair;
  readonly bgWhiteBright: CSPair;
}

export type BackgroundColorName = keyof BackgroundColor;

export interface ConvertColor {
  /**
   * Convert from the RGB color space to the ANSI 256 color space
   *
   * @param red    (`0...255`)
   * @param green  (`0...255`)
   * @param blue   (`0...255`)
   */
  rgbToAnsi256(red: number, green: number, blue: number): number;

  /**
   * Convert from the RGB HEX color space to the RGB color space
   *
   * @param hex   hexadecimal string containing RGB data
   */
  hexToRgb(hex: string | number): [red: number, green: number, blue: number];

  /**
   * Convert from the RGB HEX color space to the ANSI 256 color space
   *
   * @param hex   hexadecimal string containing RGB data
   */
  hexToAnsi256(hex: string): number;

  /**
   * Convert from the ANSI 256 color space to the ANSI 16 color space
   *
   * @param code  number representing the ANSI 256 color
  */
  ansi256ToAnsi(code: number): number;

  /**
   * Convert from the RGB color space to the ANSI 16 color space
   *
   * @param red     (`0...255`)
   * @param green   (`0...255`)
   * @param blue    (`0...255`)
   */
  rgbToAnsi(red: number, green: number, blue: number): number;

  /**
   * Convert from the RGB HEX color space to the ANSI 16 color space
   *
   * @param hex   hexadecimal string containing RGB data
   */
  hexToAnsi(hex: string): number;
}

const ANSI_BACKGROUND_OFFSET = 10;

/**
 * Create an ansi16 text wrapper
 *
 * @param offset
 * @returns
 */
export function wrapAnsi16(offset = 0): ColorBase['ansi'] {
  return function doWrapAnsi16(code: number) {
    return `\u001B[${code + offset}m`;
  };
}

/**
 * Create an ansi256 text wrapper
 *
 * @param offset
 * @returns
 */
export function wrapAnsi256(offset = 0): ColorBase['ansi256'] {
  return function doWrapAnsi256(code: number) {
    return `\u001B[${38 + offset};5;${code}m`;
  };
}

/**
 * Create an ansi16m text wrapper
 *
 * @param offset
 * @returns
 */
export function wrapAnsi16m(offset = 0): ColorBase['ansi16m'] {
  return function doWrapAnsi16m(red: number, green: number, blue: number) {
    return `\u001B[${38 + offset};2;${red};${green};${blue}m`;
  };
}

type AnsiStyleDefinition = [open: number, close: number];

const modifierDefinitions: Record<ModifierName, AnsiStyleDefinition> = {
  reset: [0, 0,],
  // 21 isn't widely supported and 22 does the same thing
  bold: [1, 22,],
  dim: [2, 22,],
  italic: [3, 23,],
  underline: [4, 24,],
  overline: [53, 55,],
  inverse: [7, 27,],
  hidden: [8, 28,],
  strikethrough: [9, 29,],
};

const colorDefinitions: Record<ForegroundColorName, AnsiStyleDefinition> = {
  black: [30, 39,],
  red: [31, 39,],
  green: [32, 39,],
  yellow: [33, 39,],
  blue: [34, 39,],
  magenta: [35, 39,],
  cyan: [36, 39,],
  white: [37, 39,],

  // Bright color
  blackBright: [90, 39,],
  redBright: [91, 39,],
  greenBright: [92, 39,],
  yellowBright: [93, 39,],
  blueBright: [94, 39,],
  magentaBright: [95, 39,],
  cyanBright: [96, 39,],
  whiteBright: [97, 39,],

  // aliases
  gray: [90, 39,], // for blackBright
  grey: [90, 39,], // for blackBright
};

const bgColorDefinitions: Record<BackgroundColorName, AnsiStyleDefinition> = {
  bgBlack: [40, 49,],
  bgRed: [41, 49,],
  bgGreen: [42, 49,],
  bgYellow: [43, 49,],
  bgBlue: [44, 49,],
  bgMagenta: [45, 49,],
  bgCyan: [46, 49,],
  bgWhite: [47, 49,],

  // Bright color
  bgBlackBright: [100, 49,],
  bgRedBright: [101, 49,],
  bgGreenBright: [102, 49,],
  bgYellowBright: [103, 49,],
  bgBlueBright: [104, 49,],
  bgMagentaBright: [105, 49,],
  bgCyanBright: [106, 49,],
  bgWhiteBright: [107, 49,],

  // aliases
  bgGray: [100, 49,], // for bgBlackBright
  bgGrey: [100, 49,], // for bgBlackBright
};

export type Ansi =
  & {
    readonly modifier: Modifier;
    readonly color: ColorBase & ForegroundColor;
    readonly bgColor: ColorBase & BackgroundColor;
    readonly codes: ReadonlyMap<number, number>;
  }
  & ForegroundColor
  & BackgroundColor
  & Modifier
  & ConvertColor;

const codes = new Map<number, number>();
Object.values(modifierDefinitions).forEach(([open, close,]) => codes.set(open, close));
Object.values(colorDefinitions).forEach(([open, close,]) => codes.set(open, close));
Object.values(bgColorDefinitions).forEach(([open, close,]) => codes.set(open, close));

const modifiers: Record<ModifierName, CSPair> = mapObject(modifierDefinitions, toCSPair);
const colors: Record<ForegroundColorName, CSPair> = mapObject(colorDefinitions, toCSPair);
const bgColors: Record<BackgroundColorName, CSPair> = mapObject(bgColorDefinitions, toCSPair);

const ansi: Ansi = {
  codes,
  color: {
    ...colors,
    ansi: wrapAnsi16(),
    ansi256: wrapAnsi256(),
    ansi16m: wrapAnsi16m(),
    close: '\u001B[39m',
  },
  bgColor: {
    ...bgColors,
    ansi: wrapAnsi16(ANSI_BACKGROUND_OFFSET),
    ansi256: wrapAnsi256(ANSI_BACKGROUND_OFFSET),
    ansi16m: wrapAnsi16m(ANSI_BACKGROUND_OFFSET),
    close: '\u001B[49m',
  },
  modifier: modifiers,
  ...colors,
  ...modifiers,
  ...bgColors,

  /**
   * @inheritdoc
   */
  ansi256ToAnsi(code: number) {
    if (code < 8) {
      return 30 + code;
    }

    if (code < 16) {
      return 90 + (code - 8);
    }

    let red;
    let green;
    let blue;

    if (code >= 232) {
      red = (((code - 232) * 10) + 8) / 255;
      green = red;
      blue = red;
    } else {
      code -= 16;

      const remainder = code % 36;

      red = Math.floor(code / 36) / 5;
      green = Math.floor(remainder / 6) / 5;
      blue = (remainder % 6) / 5;
    }

    const value = Math.max(red, green, blue) * 2;

    if (value === 0) {
      return 30;
    }

    // eslint-disable-next-line no-bitwise
    let result = 30 + ((Math.round(blue) << 2) | (Math.round(green) << 1) | Math.round(red));

    if (value === 2) {
      result += 60;
    }

    return result;
  },

  /**
   * @inheritdoc
   */
  hexToAnsi(hex: string) {
    return ansi.ansi256ToAnsi(ansi.hexToAnsi256(hex));
  },

  /**
   * @inheritdoc
   */
  hexToAnsi256(hex: string) {
    const rgb = ansi.hexToRgb(hex);
    return ansi.rgbToAnsi256(...rgb);
  },

  /**
   * @inheritdoc
   */
  hexToRgb(hex: string | number): [red: number, green: number, blue: number] {
    const matches = /(?<colorString>[a-f\d]{6}|[a-f\d]{3})/i.exec(hex.toString(16));
    if (!matches) {
      return [0, 0, 0,];
    }

    let {colorString,} = matches.groups!;

    if (colorString!.length === 3) {
      colorString = [...colorString!,].map(character => character + character).join('');
    }

    const integer = Number.parseInt(colorString!, 16);

    return [
      /* eslint-disable no-bitwise */
      (integer >> 16) & 0xFF,
      (integer >> 8) & 0xFF,
      integer & 0xFF,
      /* eslint-enable no-bitwise */
    ];
  },

  /**
   * @inheritdoc
   */
  rgbToAnsi(red: number, green: number, blue: number) {
    return ansi.ansi256ToAnsi(ansi.rgbToAnsi256(red, green, blue));
  },

  /**
   * @inheritdoc
   */
  rgbToAnsi256(red: number, green: number, blue: number) {
    // We use the extended greyscale palette here, with the exception of
    // black and white. normal palette only has 4 greyscale shades.
    if (red === green && green === blue) {
      if (red < 8) {
        return 16;
      }

      if (red > 248) {
        return 231;
      }

      return Math.round(((red - 8) / 247) * 24) + 232;
    }

    return 16
      + (36 * Math.round(red / 255 * 5))
      + (6 * Math.round(green / 255 * 5))
      + Math.round(blue / 255 * 5);
  },
};

// modify certain property to become non-enumerable for backwards compatibility
nonEnumerable(ansi, 'modifier');
nonEnumerable(ansi, 'color');
nonEnumerable(ansi, 'bgColor');
nonEnumerable(ansi, 'codes');
nonEnumerable(ansi, 'rgbToAnsi256');
nonEnumerable(ansi, 'hexToRgb');
nonEnumerable(ansi, 'hexToAnsi256');
nonEnumerable(ansi, 'ansi256ToAnsi');
nonEnumerable(ansi, 'rgbToAnsi');
nonEnumerable(ansi, 'hexToAnsi');


export default ansi;

/**
 * Re-define a value as non-enumerable
 *
 * @param object
 * @param prop
 */
function nonEnumerable<T>(object: T, prop: keyof T) {
  Object.defineProperty(object, prop, { value: object[prop], enumerable: false, });
}


// /**
//  * Recursively find all function properties of the object and its children
//  * and make them non-enumerable
//  *
//  * @param object
//  */
// function makeFnsNonEnumearble(object: Record<PropertyKey, any>) {
//   const keys = Object.keys(object);
//   for (const key of keys) {
//     const value = object[key];
//     if (typeof value === 'function') {
//       // override the value to make it non-enumerable
//       Object.defineProperty(value, key, {
//         value: value,
//         enumerable: false,
//       });
//     }
//     else if (value && typeof value === 'object') {
//       // recurse
//       makeFnsNonEnumearble(value);
//     }
//   }
// }

function mapObject<T extends Record<PropertyKey, any>, U>(
  object: T,
  callbackfn: (value: T[keyof T], key: keyof T) => U
): { [K in keyof T]: U } {
  const keys = Object.keys(object);
  const out = {} as { [K in keyof T]: U };
  for (const key of keys) {
    const value = object[key];
    out[key as keyof T] = callbackfn(value, key);
  }
  return out;
}

function toCSPair([open, close,]: AnsiStyleDefinition): CSPair {
  return {
    open: `\u001B[${open}m`,
    close: `\u001B[${close}m`,
  };
}