/* eslint-disable import/no-default-export */

export default new Proxy(
  {},
  {
    get() {
      return {}
    },
  },
)
