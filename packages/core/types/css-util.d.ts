import type * as CSS from './css'
import type * as Default from './default'
import type * as Util from './util'

/** CSS style declaration object. */
export interface CSSProperties extends CSS.StandardLonghandProperties, CSS.StandardShorthandProperties, CSS.SvgProperties {}

type HasKey<T, K> = K extends keyof T ? true : false

type ValueByPropertyName<PropertyName> = PropertyName extends keyof CSSProperties ? CSSProperties[PropertyName] : never

type TokenByPropertyName<PropertyName, Theme, ThemeMap> = PropertyName extends keyof ThemeMap ? TokenByScaleName<ThemeMap[PropertyName], Theme> : never

type TokenByScaleName<ScaleName, Theme> = ScaleName extends keyof Theme ? Util.Prefixed<'$', keyof Theme[ScaleName]> : never

/** Returns a Style interface, leveraging the given media and style map. */
export type Style<
	Media = Default.Media,
	Theme = {},
	ThemeMap = Default.ThemeMap,
	Utils = {}
> = (
	// nested at-rule css styles
	& {
		[K in Util.Prefixed<'@', keyof Media>]?: Style<Media, Theme, ThemeMap, Utils>
	}
	// known property styles
	& {
		[K in keyof CSSProperties]?: (
			| ValueByPropertyName<K>
			| TokenByPropertyName<K, Theme, ThemeMap>
			| CSS.Globals
			| Util.String
		)
	}
	// known utility styles
	& {
		[K in keyof Utils]?: (
			K extends keyof CSSProperties
				? unknown
			: (
				| (
					Utils[K] extends (arg: infer P) => any
						? $$PropertyValue extends keyof P
							? (
								| ValueByPropertyName<P[$$PropertyValue]>
								| TokenByPropertyName<P[$$PropertyValue], Theme, ThemeMap>
								| CSS.Globals
								| Util.String
							)
						: $$ScaleValue extends keyof P
							? (
								| TokenByScaleName<P[$$ScaleValue], Theme>
								| Util.String
							)
						: never
					: never
				)
			)
		)
	}
	// known theme styles
	& {
		[K in keyof ThemeMap]?: (
			K extends keyof CSSProperties
				? unknown
			: K extends keyof CSSProperties
				? unknown
			: K extends keyof Utils
				? unknown
			: (
				| CSS.Globals
				| Util.String
			)
		)
	}
	// unknown css declaration styles
	& {
		[K in string]: (
			K extends Util.Prefixed<'@', keyof Media>
				? unknown
			: K extends keyof CSSProperties
				? unknown
			: K extends keyof Utils
				? unknown
			: K extends keyof ThemeMap
				? unknown
			: (
				| Style<Media, Theme, ThemeMap, Utils>
				| CSS.Globals
				| Util.String
			)
		)
	}
)

/** Unique symbol used to reference a property value. */
export declare const $$PropertyValue: unique symbol

/** Unique symbol used to reference a property value. */
export type $$PropertyValue = typeof $$PropertyValue

/** Unique symbol used to reference a token value. */
export declare const $$ScaleValue: unique symbol

/** Unique symbol used to reference a token value. */
export type $$ScaleValue = typeof $$ScaleValue

export declare const $$ThemeValue: unique symbol

export type $$ThemeValue = typeof $$ThemeValue