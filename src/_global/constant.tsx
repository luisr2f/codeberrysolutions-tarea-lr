export const personalToken =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZjM0YjM5NDAxMWMxOWNhOTRiMmU3MDM0NGI0NjRmYyIsInN1YiI6IjY0YmZhMDQ4NmVlM2Q3MDBhYzQzMTg4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yWnPgLXMZCMWIR6pCJTF5Owhh_MPW-Vfp__E1SAz4Vk'

export const urlImgs: string = 'https://image.tmdb.org/'

export const CatalogueMenu = [
  {
    path: '/paises',
    label: 'Países',
    extra: {
      id: 'country',
      filterCountry: false,
      endpoint: 'countries',
      fieldDistinct: 'description',
      fields: [
        {
          id: 'codeCountry',
          type: 'text',
          label: 'Código',
          style: { width: 200 }
        },
        {
          id: 'description',
          type: 'text',
          label: 'Descripción'
        },
        {
          id: 'countryApplicant',
          type: 'flag',
          label: 'País solicitante'
        },
        {
          id: 'priority',
          type: 'number',
          label: 'Prioridad'
        }
      ]
    }
  },
  {
    path: '/regiones',
    label: 'Regiones',
    extra: {
      id: 'region',
      filterCountry: true,
      endpoint: 'regions',
      fieldDistinct: 'description',
      fields: [
        {
          id: 'codeRegion',
          type: 'text',
          label: 'Código',
          style: { width: 200 }
        },
        {
          id: 'description',
          type: 'text',
          label: 'Descripción'
        },
        {
          id: 'priority',
          type: 'number',
          label: 'Prioridad'
        }
      ]
    }
  }
]
