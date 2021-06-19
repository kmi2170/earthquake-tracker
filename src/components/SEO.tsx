import Head from 'next/head';

const SEO = () => {
  const title = config.title;
  const siteTitle = config.title;
  const author = config.author;
  const description = config.description;
  const keywords = config.keywords;

  return (
    <Head>
      <title>{`${siteTitle}`}</title>
      <meta name="author" content={author} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="twitter:card" content="summary" />
      <meta property="twitter:creator" content={config.social.twitter} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
    </Head>
  );
};

export default SEO;

const config = {
  title: 'Earthquake Tracker',
  author: 'Kmi, Web developer/programmer',
  // author: {
  //   name: 'Kmi',
  //   summary: 'Web developer/programmer',
  // },
  description:
    'Simple earthquake track application, created by Next.js. React-QUery, React-Leaflet, Material-UI. The latest earthquake information, the last day, 3 days, 7 days 14 days and 30days, can be viewd on Leaflet Map and lists in Material-UI Table. Earthquake data is retrieved from USGS with React-Query',
  keywords:
    'Earthquake, Tracker, Web Application, Next.js, React.js, React-Query, React-Leaflet, Material-UI',
  social: {
    twitter: '',
  },
};
