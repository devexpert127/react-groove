import React from 'react'
import ProductOptionSelectors from 'Components/ProductOptionSelectors'
import slugify from 'Components/Slugify'
import './styles.css'

const ProductBundleOptionSelectors = ({ formId = 'form', bundle = null, bundleIncludesText, scrolledPastForm, floating }) => {
  if (!bundle) return null
  const { products, variants } = bundle
  return (
    <React.Fragment>
      {products.map((product, i) => (
        <div className="ProductBundle-bundledItem" key={product.externalId}>
          <h3 className="ProductBundle-bundledItemTitle">
            <span className="ProductBundle-bundledItemTitleLabel">{bundleIncludesText}: </span>
            <span>{product.name}</span>
          </h3>
          <ProductOptionSelectors
            options={variants[i].optionSelectors}
            scrolledPastForm={scrolledPastForm}
            floating={floating}
            formId={`${formId}_${slugify(product.name)}`}
          />
        </div>
      ))}
    </React.Fragment>
  )
}
export default ProductBundleOptionSelectors
