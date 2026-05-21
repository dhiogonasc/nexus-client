// src/data/planetas.ts

// Criamos um mapeamento simples: ID do Back-end -> Recursos Visuais do Front-end
export const PLANETAS: Record<string, { imagem: any, accentColor: string }> = {
  "1": { 
    imagem: require('../../assets/Planet1.png'), 
    accentColor: '#49d730' 
  },
  "2": { 
    imagem: require('../../assets/Planet2.png'), 
    accentColor: '#c40edc' 
  },
  "3": { 
    imagem: require('../../assets/Planet3.png'), 
    accentColor: '#3b8a95' 
  },
  "4": { 
    imagem: require('../../assets/Planet4.png'), 
    accentColor: '#406fd4' 
  },
};