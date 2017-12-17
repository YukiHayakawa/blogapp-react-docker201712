module.exports = {
  webpack (config, {dev}) {
    if (dev) {
        config.watchOptions = {
            poll: true
        }
    }
    return config
  }
}
