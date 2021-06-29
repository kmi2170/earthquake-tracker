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
    'Earthquake track application, created with Next.js, React-QUery, React-Leaflet, Material-UI. This app is d      esigned to catch the latest earthquake event information (the last day, 3, 7, 14 and 30days) as simply and easily       as possible. Earthquake data is retrieved from USGS with React-Query and displayed on Map and in lists in Table.         Each earthquake events appear on the map as circles, colored according to magnitude. Hovering cursor over a ci      rcle trigger a pop-up window that shows a bit more detail information of the event. The table shows magnitude, pl      ace, date-time of events, sortable by magnitude or time, and also has pagination function. By clicking each event       in the table, the view of the map shifts and zooms in to the epicenter, with animation effect.',
  keywords:
    'Earthquake Tracker, Web Application, Next.js, React.js, React-Query, React-Leaflet, Material-UI',
  social: {
    twitter: '',
  },
};
