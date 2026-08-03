export interface CountryData {
  name: string
  abbreviation: string
  flag: string
  flagImage: string
}

// Lista de países disponibles con su información
export const AVAILABLE_COUNTRIES: CountryData[] = [
  { 
    name: 'Argentina', 
    abbreviation: 'AR', 
    flag: '🇦🇷',
    flagImage: 'https://flagcdn.com/28x21/ar.png'
  },
  { 
    name: 'España', 
    abbreviation: 'ES', 
    flag: '🇪🇸',
    flagImage: 'https://flagcdn.com/28x21/es.png'
  },
  { 
    name: 'USA', 
    abbreviation: 'US', 
    flag: '🇺🇸',
    flagImage: 'https://flagcdn.com/28x21/us.png'
  },
  { 
    name: 'Bélgica', 
    abbreviation: 'BE', 
    flag: '🇧🇪',
    flagImage: 'https://flagcdn.com/28x21/be.png'
  },
  { 
    name: 'Japón', 
    abbreviation: 'JP', 
    flag: '🇯🇵',
    flagImage: 'https://flagcdn.com/28x21/jp.png'
  }
] 