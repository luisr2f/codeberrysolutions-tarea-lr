import { useLocation, matchRoutes } from 'react-router-dom'
import routes from 'layout/routes'
import { CatalogueMenu } from '_global/constant'

export default function UseMatchedRoute(): {
  id: string
  path: string
  exact: boolean
  name: string
  element?: undefined
  extra?: any
} {
  const location = useLocation()

  const [{ route }]: any = matchRoutes(routes, location)

  const item = CatalogueMenu.filter((item) => item.path === route.path)[0]

  if (item !== undefined) {
    return { ...route, extra: item.extra }
  } else {
    return route
  }
}
