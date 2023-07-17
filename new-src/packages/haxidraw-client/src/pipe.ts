export const _ = Symbol();

type ExtendTupleTypes<T extends any[], G> = T extends [
    infer First,
    ...infer Rest
]
    ? [First | G, ...ExtendTupleTypes<Rest, G>]
    : [];

type FnArgsCondUnderscore<
    T extends (...args: any) => any,
    ParamMap extends ExtendTupleTypes<Parameters<T>, typeof _>,
    MeansInclude extends boolean,
    _depth extends unknown[] = []
> = _depth["length"] extends Parameters<T>["length"]
    ? []
    : [
          ...(ParamMap[_depth["length"]] extends typeof _
              ? MeansInclude extends true
                  ? [Parameters<T>[_depth["length"]]]
                  : []
              : MeansInclude extends true
              ? []
              : [Parameters<T>[_depth["length"]]]),
          ...FnArgsCondUnderscore<T, ParamMap, MeansInclude, [..._depth, any]>
      ];

export const C = <T extends (...args: any) => any, TArgs extends ExtendTupleTypes<Parameters<T>, typeof _>>(
    f: T,
    ...args: TArgs
): ((...a: FnArgsCondUnderscore<T, TArgs, true>) => ReturnType<T>) => 
    (...a) => { let j = 0; return f(...args.map(v => v === _ ? a[j++] : v)); };

export const I = <T>(a: T) => () => a;

export const pipe = <TFirst extends (...args: any) => any, TLast extends (...args: any) => any>(...args: [TFirst, ...((...args: any) => any)[], TLast]): ((...args: Parameters<TFirst>) => ReturnType<TLast>) => {
    const [first, ...rest] = args;
    return (...a) => rest.reduce((acc, f) => f(acc), first(...a as any));
};