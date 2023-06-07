import React from "react";
import { DocsThemeConfig } from "nextra-theme-docs";
import { useRouter } from "next/router";
import { useConfig } from "nextra-theme-docs";

const config: DocsThemeConfig = {
  logo: <span>Haxidraw</span>,
  project: {
    link: "https://github.com/hackclub/haxidraw",
  },
  docsRepositoryBase: "https://github.com/hackclub/haxidraw/blob/main/website/",
  footer: {
    text: "The Haxidraw is a project by Hack Club. Built by teenagers, for teenagers.",
  },
  head: () => {
    const { asPath, defaultLocale, locale } = useRouter();
    const { frontMatter } = useConfig();
    const url =
      "https://haxidraw.hackclub.com" +
      (defaultLocale === locale ? asPath : `/${locale}${asPath}`);

    return (
      <>
        <meta property="og:url" content={url} />
        <meta property="og:title" content={frontMatter.title || "Haxidraw"} />
        <meta
          property="og:description"
          content={frontMatter.description || "Haxidraw docs"}
        />
      </>
    );
  },
  useNextSeoProps() {
    return {
      titleTemplate: "%s - Haxidraw",
    };
  },
};

export default config;
