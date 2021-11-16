import React from 'react'
import cx from 'classnames'
import UIIcon from 'Components/UIIcon'
import slugify from 'Components/Slugify'
import Link from 'frontend-link'

import './styles.css'

const ArticleShare = ({  article = null, blog = 'blog' }) => {
  if (!article) return null;

  let socialLink = '#'
  // note we could

  const socialChannels = {
    Facebook: 'Facebook',
    Twitter: 'Twitter',
    Reddit: 'Reddit',
    LinkedIn: 'LinkedIn',
    GooglePlus: 'GooglePlus',
    GPlus: 'GPlus',
    Google: 'Google',
    Pinterest: 'Pinterest',
  }

  const shareLinks = [
    {
      platform: socialChannels.Facebook,
      icon: UIIcon.Icons.FacebookF,
      shareUrl: 'https://facebook.com/sharer/sharer.php?u='
    },
    {
      platform: socialChannels.Twitter,
      icon: UIIcon.Icons.Twitter,
      shareUrl: 'https://twitter.com/intent/tweet?url='
    },
    {
      platform: socialChannels.Reddit,
      icon: UIIcon.Icons.Reddit,
      shareUrl: 'https://reddit.com/submit/?url='
    },
    {
      platform: socialChannels.LinkedIn,
      icon: UIIcon.Icons.LinkedIn,
      shareUrl: 'https://www.linkedin.com/shareArticle?mini=true&url='
    },
    {
      platform: socialChannels.GooglePlus,
      icon: UIIcon.Icons.GooglePlus,
      shareUrl: 'https://plus.google.com/share?url=$'
    },
    {
      platform: socialChannels.Pinterest,
      icon: UIIcon.Icons.Pinterest,
      shareUrl: 'https://pinterest.com/pin/create/button/?url='
    }
  ]
  const { name, featureImage = { src: ''}, summary = '' } = article;
  const articleRoot = 'https://groovelife.com'
  const articleName = `${name}`;
  const articleSummary = `${summary}`;
  const articleImage = `${featureImage.src}`;

  let articleSlug

  if (article.slug && article.slug !== undefined) {
    articleSlug = article.slug
  } else {
    articleSlug = slugify(name);
  }

  socialLink = ({platform, shareUrl}) => {
    let url = `${shareUrl}${articleRoot}/${blog}/${articleSlug}`;
    switch (platform) {
      case socialChannels.Facebook:
        url = `${url}`
        break;
      case socialChannels.Twitter:
        url = `${url}&text=${articleName}`
        break;
      case socialChannels.Reddit:
        url = `${url}`
        break;
      case socialChannels.LinkedIn:
        url = `${url}&title=${articleName}&summary=${articleSummary}&source=`
        break;
      case socialChannels.Google:
      case socialChannels.GPlus:
      case socialChannels.Google:
        url = `${url}`
        break;
      case socialChannels.Pinterest:
        url = `${url}&media=${articleImage}&description=${articleSummary}`
        break;
      default:
        url = `#`;
    }
    return url;
  }

  return (
    <section className="Article-share">
      <span>SHARE</span>
      <div className="blog-post-share">
        {shareLinks.map((shareLink) => {
          const { platform = null, icon = null, shareUrl = null} = shareLink;
          // console.log({shareLink})
          if (!platform || !icon || !shareUrl) return null
          return (
            <Link
              key={`${platform}`}
              target="_blank"
              rel="noopener noreferrer"
              to={socialLink(shareLink)}
              className={`Article-share-button Article-share-button--${slugify(platform)}`}
            >
              <UIIcon icon={icon} textHidden isSpan>{platform}</UIIcon>
            </Link>
          )
        }
      )}
    </div>
  </section>
  )
}

export default ArticleShare
