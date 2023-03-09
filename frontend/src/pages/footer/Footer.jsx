import React from 'react'

const Footer = () => {
    const year = new Date().getFullYear();
  const footer = (
    <footer>
      <span>&copy; {year} <a href='albertfriend.dev' target='_blank'>Albert Friend</a></span>
    </footer>
  )
  return footer 
}

export default Footer
