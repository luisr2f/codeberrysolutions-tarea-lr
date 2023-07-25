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
