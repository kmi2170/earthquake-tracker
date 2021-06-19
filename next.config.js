// const withImages = require('next-images');

// module.exports = withImages({
//   module: {
//     rules: [
//       {
//         test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/i,
//         use: [
//           {
//             loader: 'file-loader',
//           },
//         ],
//       },
//     ],
//   },
// });

// module.exports = {
//   webpack: (config, options) => {
//     config.module.rules.push({
//       test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
//       use: [
//         {
//           loader: 'babel-loader',
//         },
//         {
//           loader: '@svgr/webpack',
//           options: {
//             babel: false,
//             icon: true,
//           },
//         },
//       ],
//     });

//     return config;
//   },
// };

// module.exports = {
//   webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
//     // Important: return the modified config
//     return config;
//   },
// };

// module.exports = {
//   webpack: (config, options) => {
//     config.module.rules.push({
//       test: /\.(png|jpe?g|gif)$/i,
//       use: [
//         {
//           loader: 'url-loader',
//           options: {
//             limit: 8192,
//           },
//         },
//         // {
//         //   test: /\.(png|jpe?g|gif)$/i,
//         //   use: [
//         //     {
//         //       loader: 'file-loader',
//         //     },
//         //   ],
//         // },
//       ],
//     });
