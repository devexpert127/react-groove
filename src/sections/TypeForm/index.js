import React from 'react'
import cx from 'classnames'
import EmbedScript from 'Components/EmbedScript'

import './styles.css'

const TypeForm = ({
  id,
  pageWidth = true,
  transparency = 100,
  hideHeaders = true,
  hideFooter = true,
  styleDark,
}) => {
  const dataURL = `https://groovelife.typeform.com/to/${id}`

  return (
    <section className={cx('TypeFormEmbed', { ['TypeFormEmbed--dark']: !!styleDark })}>
      <EmbedScript
        scriptSource="https://embed.typeform.com/embed.js"
        scriptAttrs={{ id: 'typef_orm' }}
        pageWidth={pageWidth}
        nested={true}
      >
        <div
          className="typeform-widget"
          data-url={dataURL}
          data-transparency={transparency}
          data-hide-headers={hideHeaders}
          data-hide-footer={hideFooter}
          style={{ width: '100%', height: '600px' }}
        ></div>
      </EmbedScript>
    </section>
  )
}

export default TypeForm

// https://groovelife.com/pages/sizing-quiz
// <div class="typeform-widget" data-url="https://groovelife.typeform.com/to/rbKrAN" style="width: 100%; height: 600px;"></div>
// <script>// <![CDATA[
// (function() { var qs,js,q,s,d=document, gi=d.getElementById, ce=d.createElement, gt=d.getElementsByTagName, id="typef_orm", b="https://embed.typeform.com/"; if(!gi.call(d,id)) { js=ce.call(d,"script"); js.id=id; js.src=b+"embed.js"; q=gt.call(d,"script")[0]; q.parentNode.insertBefore(js,q) } })()
// // ]]></script>

// https://groovelife.com/pages/groove-custom-bulk-order-form
// <div class="typeform-widget" data-url="https://groovelife.typeform.com/to/IxtFSX" data-transparency="100" data-hide-headers="true" data-hide-footer="true" style="width: 100%; height: 600px;"></div>
// <script>// <![CDATA[
//  (function() { var qs,js,q,s,d=document, gi=d.getElementById, ce=d.createElement, gt=d.getElementsByTagName, id="typef_orm", b="https://embed.typeform.com/"; if(!gi.call(d,id)) { js=ce.call(d,"script"); js.id=id; js.src=b+"embed.js"; q=gt.call(d,"script")[0]; q.parentNode.insertBefore(js,q) } })()
// // ]]></script>
