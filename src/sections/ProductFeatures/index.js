import React from 'react'
import ResponsiveImage from 'frontend-ui/ResponsiveImage'
import RichText from 'frontend-ui/RichText'
import PageWidth from 'Components/PageWidth'
import Accordion from 'Components/Accordion'
import UIIcon from 'Components/UIIcon'
import './styles.css'

const ProductFeatures = ({ typeCollection }) => {
  if (!typeCollection || !typeCollection.productFeatures || !typeCollection.productFeatures.length)
    return null

  const title =
    typeCollection.productFeaturesTitle && typeCollection.productFeaturesTitle !== ''
      ? typeCollection.productFeaturesTitle
      : 'No Stretch,<br>No Shrivel,<br>No Compromise'
  const contents = typeCollection.productFeatures.map((productFeature, i) => ({
    name: i + 1 + '. ' + productFeature.title,
    content: <RichText source={productFeature.description} />,
  }))


  return (
    <section className="ProductFeatures">
      <PageWidth className="ProductFeatures-grid">
        <div className="ProductFeatures-featuresContainer">
          <h2 className="ProductFeatures-title" dangerouslySetInnerHTML={{ __html: title }} />
          <Accordion items={contents} isGrid={false} expandOnLarge={false} icon={UIIcon.Icons.PlusMinus} />
        </div>

        {typeCollection.productFeaturesImageOne && (
          <div className="ProductFeatures-imagesContainer">
            <ResponsiveImage
              className="ProductFeatures-image"
              src={typeCollection.productFeaturesImageOne.src}
              alt={typeCollection.productFeaturesImageOne.alt || ''}
              sizes="(min-width: 960px) 40vw, 50vw"
            />
            {typeCollection.productFeaturesImageTwo && (
              <ResponsiveImage
                className="ProductFeatures-image"
                src={typeCollection.productFeaturesImageTwo.src}
                alt={typeCollection.productFeaturesImageTwo.alt || ''}
                sizes="(min-width: 960px) 40vw, 50vw"
              />
            )}
          </div>
        )}
      </PageWidth>
    </section>
  )
}

export default ProductFeatures
