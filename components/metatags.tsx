import Head from "next/head";

const MetaTags: React.FC = () => (
  <Head>
    {/* <!-- Primary Meta Tags --> */}

    <meta charSet="utf-8" />
    <link rel="icon" href="https://theninza.me/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#1A202C" />
    <title>🙋🏻‍♂️ Nikhil Gupta</title>
    <meta name="title" content="🙋🏻‍♂️ Nikhil Gupta" />
    <meta
      name="keywords"
      content="Nikhil, FrontEnd, Developer, TheNinza, Ninza, Ninja, ninza, theninza, web, web developer, iiit"
    />
    <meta name="robots" content="index, follow" />
    <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="language" content="English" />
    <meta name="author" content="Nikhil Gupta" />
    <meta httpEquiv="X-UA-Compatible" content="IE=7" />

    <meta
      name="description"
      content="Hey There! I am Nikhil. Meet me on the other side of this page to know more."
    />

    {/* <!-- Open Graph / Facebook --> */}
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://theninza.me/" />
    <meta property="og:title" content="🙋🏻‍♂️ Nikhil Gupta" />
    <meta
      property="og:description"
      content="Hey There! I am Nikhil. Meet me on the other side of this page to know more."
    />
    <meta property="og:image" content="https://theninza.me/metaImg.png" />
    <meta property="og:locale" content="en_GB" />

    {/* <!-- Twitter --> */}
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://theninza.me/" />
    <meta property="twitter:title" content="🙋🏻‍♂️ Nikhil Gupta" />
    <meta
      property="twitter:description"
      content="Hey There! I am Nikhil. Meet me on the other side of this page to know more."
    />
    <meta property="twitter:image" content="https://theninza.me/metaImg.png" />
  </Head>
);

export default MetaTags;
