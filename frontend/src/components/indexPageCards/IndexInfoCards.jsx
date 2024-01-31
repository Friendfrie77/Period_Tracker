import React from 'react'

function IndexInfoCards(props) {
  return (
    <section className='info-card' style={props.styles}>
      <h1 className='card-heading'>{props.heading}</h1>
      <div className='card-content-wrapper flex-row-to-col'>
        {props.contentTypeOne == 'txt' ?(
            <div className='card-text-content'>
                <h1>test</h1>
            </div>
        ) : props.contentTypeOne === 'img' ?(
            <picture className='card-img-content'>
              <img src={props.contentOne} />
            </picture>
        ) : null}
        {props.contentTypeTwo == 'txt' ?(
            <div className='card-text-content'>
                <h1>{props.txtHeader}</h1>
            </div>
        ) : props.contentTypeTwo === 'img' ?(
            <picture className='card-img-content'>
            </picture>
        ) : null}
      </div>
    </section>
  )
}

export default IndexInfoCards
