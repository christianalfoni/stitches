import type { PropertyValue, ScaleValue, CreateCss } from './create-css'
import type { Stitches } from './stitches'
import type { ThemeMap as DefaultThemeMap } from './default'

export type { PropertyValue, ScaleValue, CreateCss, Stitches, DefaultThemeMap }

/** Returns a library used to create styles. */
export declare const createCss: CreateCss

/** Map of CSS properties to token scales. */
export declare const defaultThemeMap: DefaultThemeMap

/** Returns a function that applies global styles. */
export declare const global: Stitches['global']

/** Returns an object that applies `@keyframes` styles. */
export declare const keyframes: Stitches['keyframes']

/** Returns a function that applies styles and variants for a specific class. */
export declare const css: Stitches['css']

/** Returns a function that applies styles and variants for a specific class. */
export declare const styled: Stitches['styled']
