module.exports = {
  // distDir: "/pages/posts",
  async rewrites() {
    return [
      {
        source: "/django/:path*",
        destination: "http://127.0.0.1:8000/:path*",
      },
    ];
  },

  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
};
