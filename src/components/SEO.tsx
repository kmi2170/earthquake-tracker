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
    'Simple earthquake track application, created with Next.js. React-QUery, React-Leaflet, Material-UI. The latest earthquake event information (the last day, 3 days, 7 days 14 days and 30days) can be viewd on Leaflet Map andin lists in Material-UI Table. Earthquake data is retrieved from USGS with React-Query. Earthquake events appear on the map as circles, colored according to magnitude. Hovering cursor over a circle trigger a pop-up window that contains the detailed information of the earthquake event. The table shows magnitude, place, date-time of each event, and sortable by magnitude and time. It also has pagination function. By clicking each event in the table, the view of the map shifts to and zooms in, with animation effect, the palce (epicenter) where the eqrthquake event happed',
  keywords:
    'Earthquake Tracker, Web Application, Next.js, React.js, React-Query, React-Leaflet, Material-UI',
  social: {
    twitter: '',
  },
};
