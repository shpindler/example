# Plugins.

You should place user-specific code here and then import it dynamically
depends on currently active user (this info is stored in window.userKey).

For example you have an username `shpindler` with mapped key (see
`@/utils/user-key.ts`) to it - `hero` and you have specific Logo component. To
implement it you need to create here a directory `hero` and directory
`components` in it. Then create a Logo component with the exact same path as
base Logo component relatively to components directory. And import it
dynamically with fallback to base Logo:

```js
import React from 'react'

const SiteLogo = React.lazy(
    () => import(`@/plugins/${window.userKey}/components/SiteLogo.tsx`)
        .catch(() => import('@/components/SiteLogo.tsx'))
)
```

So that if another one user have a specific Logo as well this import would work
for him too.

