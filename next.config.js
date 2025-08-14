/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
  webpack: (config, { isServer }) => {
    // Fix for multiple tldraw library instances
    config.resolve.alias = {
      ...config.resolve.alias,
      '@tldraw/utils': require.resolve('@tldraw/utils'),
      '@tldraw/state': require.resolve('@tldraw/state'),
      '@tldraw/store': require.resolve('@tldraw/store'),
      '@tldraw/validate': require.resolve('@tldraw/validate'),
      '@tldraw/tlschema': require.resolve('@tldraw/tlschema'),
    }
    
    return config
  },
}

module.exports = nextConfig
