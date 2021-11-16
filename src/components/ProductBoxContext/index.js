import { createContext, useContext } from 'react'
export const ProductBoxContext = createContext()
export const useProductBoxContext = () => {
  const context = useContext(ProductBoxContext)
  // ----------
  // Commented out
  // Due to the shogun displaying each component on its own inside the Sections area.
  // Having the contexy check that it is being used in the correct context will throw an error so commenting out for now
  // ----------
  // if (!context) {
  // 	throw new Error(
  // 		"This component must be used within a <ProductBox> component."
  // 	);
  // }
  return context
}

export default { ProductBoxContext, useProductBoxContext }
