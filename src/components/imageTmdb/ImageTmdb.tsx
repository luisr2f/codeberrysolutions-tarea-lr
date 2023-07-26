import React from 'react'

interface Props {
  img: string
  title?: string
  size: 45 | 92 | 154 | 185 | 342 | 500 | 780
}

const Comp: React.FC<Props> = ({ img, title = '', size = 92 }) => {
  /*
   "w92",
  "w154",
  "w185",
  "w342",
  "w500",
  "w780",
  */

  return (
    <>
      {img !== undefined && img !== '' && img !== null && (
        <img
          src={
            img !== ''
              ? `https://image.tmdb.org/t/p/w${size}/${img}`
              : 'https://www.movienewz.com/img/films/poster-holder.jpg'
          }
          className="card-img-top pt-3 pb-0 px-3"
          alt={title}
        />
      )}
    </>
  )
}

export default Comp
