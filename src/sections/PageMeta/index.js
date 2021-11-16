import React from 'react'
import { useRouter } from 'frontend-router'
import Helmet from 'frontend-head'

const PageMeta = ({ title, description, url, image = '', noIndex, noFollow, isSearchPage }) => {
  const router = useRouter()
  const routerLocation = router.location
  const robots =
    noIndex || noFollow
      ? `${noIndex ? 'noindex' : ''}${noIndex && noFollow ? ',' : ''}${noFollow ? 'nofollow' : ''}`
      : null

  const meta = getMeta({ title, description, routerLocation, isSearchPage })

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      {robots && <meta name="robots" content={robots} />}
      <link rel="preconnect" href="https://use.typekit.net" />
      <link rel="dns-prefetch" href="https://use.typekit.net/" />
      <meta property="og:title" content={meta.pageTitle} />
      <meta property="og:description" content={description} />
      {!!image && <meta property="og:image" content={image.src} />}
      <meta property="og:url" content={url} />
      <meta name="twitter:site" content="@" />
      <meta property="twitter:title" content={meta.pageTitle} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:description" content={description} />
      <link rel="canonical" href={url} key="canonicalURL" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Helmet>
  )
}

const getMeta = ({ title, description, routerLocation, isSearchPage }) => {
  const siteName = 'Groove Life'
  const hasString = (str) => str && str !== ''
  const hasSubString = (str = '', subString = '') => str.indexOf(subString) !== -1

  const searchParam =
    isSearchPage && routerLocation.search ? new URLSearchParams(routerLocation.search) : null
  const hasSearchParam = isSearchPage && searchParam && searchParam.get('q')
  const suffix = ` – ${siteName}`
  let titleText = hasSearchParam ? searchParam.get('q') : title
  titleText = hasString(titleText) ? titleText : siteName
  const useSuffix = !hasSubString(titleText, suffix) && titleText !== siteName
  return {
    title: `${titleText}${useSuffix ? suffix : ''}`,
    pageTitle: titleText,
    description: hasSearchParam ? `Shop ${searchParam} on ${siteName}` : description,
  }
}

export default PageMeta
