import React from 'react'
import { NavLink } from 'react-router-dom';

function IndexInfoCards(props) {
  return (
    <section className='info-card' style={props.styles}>
      <div className='card-content-wrapper flex-row-to-col'>
        {props.contentTypeOne === 'txt' ?(
            <div className='card-text-content'>
                <h1>{props.txtHeader}</h1>
                {props.txtContentType === 'text'?(
                  <p>{props.txtContent}</p>
                ) : props.txtContent === 'list'?(
                  <ul>
                    <li>
                      {props.txtList.map((listItem) =>(
                        listItem
                      ))}
                    </li>
                  </ul>
                ):null}
                <div>
                  {props.hasButton ?(
                    <div className='card-cta-button-container'>
                      <NavLink className='card-cta-button' to={props.link}>{props.buttonTxt}</NavLink>
                    </div>
                  ): props.hasLink ?(
                    <NavLink className='card-cta-link' to={props.link}>{props.linkTxt} <span>&#8594;</span></NavLink>
                  ):null}
                </div>
            </div>
        ) : props.contentTypeOne === 'img' ?(
            <picture className='card-img-content'>
              <img src={props.contentImg} alt ={props.imgAlt} />
            </picture>
        ) : null}
        {props.contentTypeTwo === 'txt' ?(
          <div className='card-text-content'>
            <h1>{props.txtHeader}</h1>
            {props.txtContentType === 'text'?(
              <p>{props.txtContent}</p>
            ) : props.txtContent === 'list'?(
              <ul>
                <li>
                  {props.txtList.map((listItem) =>(
                    listItem
                  ))}
                </li>
              </ul>
            ):null}
            {props.hasButton ?(
                <div className='card-cta-button-container'>
                  <NavLink className='card-cta-button' to={props.link}>{props.buttonTxt}</NavLink>
                </div>
              ): props.hasLink ?(
                <a className='card-cta-link' href={props.link} >{props.linkTxt} <span>&#8594;</span></a>
              ):null}
          </div>
        ) : props.contentTypeTwo === 'img' ?(
            <picture className='card-img-content'>
              <img src={props.contentImg} alt ={props.imgAlt} />
            </picture>
        ) : null}
      </div>
    </section>
  )
}

export default IndexInfoCards
