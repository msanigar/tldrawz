/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
  webpack: (config, { isServer }) => {
    // Fix for multiple tldraw library instances
    config.resolve.alias = {
      ...config.resolve.alias,
      'tldraw': require.resolve('tldraw'),
      '@tldraw/utils': require.resolve('@tldraw/utils'),
      '@tldraw/state': require.resolve('@tldraw/state'),
      '@tldraw/state-react': require.resolve('@tldraw/state-react'),
      '@tldraw/store': require.resolve('@tldraw/store'),
      '@tldraw/validate': require.resolve('@tldraw/validate'),
      '@tldraw/tlschema': require.resolve('@tldraw/tlschema'),
      '@tldraw/editor': require.resolve('@tldraw/editor'),
      '@tldraw/sync-core': require.resolve('@tldraw/sync-core'),
      '@tldraw/sync': require.resolve('@tldraw/sync'),
      '@tldraw/assets': require.resolve('@tldraw/assets'),
      '@tldraw/vec': require.resolve('@tldraw/vec'),
    }
    
    // Additional optimization to prevent duplicate modules
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...config.optimization.splitChunks.cacheGroups,
          tldraw: {
            test: /[\\/]node_modules[\\/]@tldraw[\\/]/,
            name: 'tldraw',
            chunks: 'all',
            priority: 10,
          },
        },
      },
    }
    
    return config
  },
}

module.exports = nextConfig
