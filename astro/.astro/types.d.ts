declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	export { z } from 'astro/zod';

	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;
	export type CollectionEntry<C extends keyof AnyEntryMap> = Flatten<AnyEntryMap[C]>;

	// TODO: Remove this when having this fallback is no longer relevant. 2.3? 3.0? - erika, 2023-04-04
	/**
	 * @deprecated
	 * `astro:content` no longer provide `image()`.
	 *
	 * Please use it through `schema`, like such:
	 * ```ts
	 * import { defineCollection, z } from "astro:content";
	 *
	 * defineCollection({
	 *   schema: ({ image }) =>
	 *     z.object({
	 *       image: image(),
	 *     }),
	 * });
	 * ```
	 */
	export const image: never;

	// This needs to be in sync with ImageMetadata
	export type ImageFunction = () => import('astro/zod').ZodObject<{
		src: import('astro/zod').ZodString;
		width: import('astro/zod').ZodNumber;
		height: import('astro/zod').ZodNumber;
		format: import('astro/zod').ZodUnion<
			[
				import('astro/zod').ZodLiteral<'png'>,
				import('astro/zod').ZodLiteral<'jpg'>,
				import('astro/zod').ZodLiteral<'jpeg'>,
				import('astro/zod').ZodLiteral<'tiff'>,
				import('astro/zod').ZodLiteral<'webp'>,
				import('astro/zod').ZodLiteral<'gif'>,
				import('astro/zod').ZodLiteral<'svg'>
			]
		>;
	}>;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<
				import('astro/zod').AnyZodObject,
				import('astro/zod').AnyZodObject
		  >;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	export type SchemaContext = { image: ImageFunction };

	type DataCollectionConfig<S extends BaseSchema> = {
		type: 'data';
		schema?: S | ((context: SchemaContext) => S);
	};

	type ContentCollectionConfig<S extends BaseSchema> = {
		type?: 'content';
		schema?: S | ((context: SchemaContext) => S);
	};

	type CollectionConfig<S> = ContentCollectionConfig<S> | DataCollectionConfig<S>;

	export function defineCollection<S extends BaseSchema>(
		input: CollectionConfig<S>
	): CollectionConfig<S>;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {})
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {})
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {})
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {})
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {})
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
			  }
			: {
					collection: C;
					id: keyof DataEntryMap[C];
			  }
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"workshops": {
"10PRINT.md": {
	id: "10PRINT.md";
  slug: "10print";
  body: string;
  collection: "workshops";
  data: any
} & { render(): Render[".md"] };
"10PRINT.mdx": {
	id: "10PRINT.mdx";
  slug: "10print";
  body: string;
  collection: "workshops";
  data: any
} & { render(): Render[".mdx"] };
"10PRINT2.md": {
	id: "10PRINT2.md";
  slug: "10print2";
  body: string;
  collection: "workshops";
  data: any
} & { render(): Render[".md"] };
"10PRINT2.mdx": {
	id: "10PRINT2.mdx";
  slug: "10print2";
  body: string;
  collection: "workshops";
  data: any
} & { render(): Render[".mdx"] };
"cubic_disarray.md": {
	id: "cubic_disarray.md";
  slug: "cubic_disarray";
  body: string;
  collection: "workshops";
  data: any
} & { render(): Render[".md"] };
"cubic_disarray.mdx": {
	id: "cubic_disarray.mdx";
  slug: "cubic_disarray";
  body: string;
  collection: "workshops";
  data: any
} & { render(): Render[".mdx"] };
"eca.md": {
	id: "eca.md";
  slug: "eca";
  body: string;
  collection: "workshops";
  data: any
} & { render(): Render[".md"] };
"eca.mdx": {
	id: "eca.mdx";
  slug: "eca";
  body: string;
  collection: "workshops";
  data: any
} & { render(): Render[".mdx"] };
"joydivision.md": {
	id: "joydivision.md";
  slug: "joydivision";
  body: string;
  collection: "workshops";
  data: any
} & { render(): Render[".md"] };
"joydivision.mdx": {
	id: "joydivision.mdx";
  slug: "joydivision";
  body: string;
  collection: "workshops";
  data: any
} & { render(): Render[".mdx"] };
"landscape.md": {
	id: "landscape.md";
  slug: "landscape";
  body: string;
  collection: "workshops";
  data: any
} & { render(): Render[".md"] };
"landscape.mdx": {
	id: "landscape.mdx";
  slug: "landscape";
  body: string;
  collection: "workshops";
  data: any
} & { render(): Render[".mdx"] };
"leaf.md": {
	id: "leaf.md";
  slug: "leaf";
  body: string;
  collection: "workshops";
  data: any
} & { render(): Render[".md"] };
"leaf.mdx": {
	id: "leaf.mdx";
  slug: "leaf";
  body: string;
  collection: "workshops";
  data: any
} & { render(): Render[".mdx"] };
"mesh.md": {
	id: "mesh.md";
  slug: "mesh";
  body: string;
  collection: "workshops";
  data: any
} & { render(): Render[".md"] };
"mesh.mdx": {
	id: "mesh.mdx";
  slug: "mesh";
  body: string;
  collection: "workshops";
  data: any
} & { render(): Render[".mdx"] };
"raymarching.md": {
	id: "raymarching.md";
  slug: "raymarching";
  body: string;
  collection: "workshops";
  data: any
} & { render(): Render[".md"] };
"raymarching.mdx": {
	id: "raymarching.mdx";
  slug: "raymarching";
  body: string;
  collection: "workshops";
  data: any
} & { render(): Render[".mdx"] };
"roots.md": {
	id: "roots.md";
  slug: "roots";
  body: string;
  collection: "workshops";
  data: any
} & { render(): Render[".md"] };
"roots.mdx": {
	id: "roots.mdx";
  slug: "roots";
  body: string;
  collection: "workshops";
  data: any
} & { render(): Render[".mdx"] };
"square-disarray.md": {
	id: "square-disarray.md";
  slug: "square-disarray";
  body: string;
  collection: "workshops";
  data: any
} & { render(): Render[".md"] };
"square-disarray.mdx": {
	id: "square-disarray.mdx";
  slug: "square-disarray";
  body: string;
  collection: "workshops";
  data: any
} & { render(): Render[".mdx"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	type ContentConfig = never;
}
