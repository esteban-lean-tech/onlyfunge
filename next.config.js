module.exports = {
  reactStrictMode: true,
  images: {
    loader: "imgix",
    path: ""
  },
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' }
    }
  },
}
