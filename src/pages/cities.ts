
export interface City {
  id: string;
  name: string;
  countyId: string;
  countyName: string;
  circuit: string;
  description: string;
}

export const cities: City[] = [
  { 
    id: 'potosi', 
    name: 'Potosi', 
    countyId: 'washington', 
    countyName: 'Washington County', 
    circuit: 'Circuit 24', 
    description: 'Fast, professional bail bond services in Potosi, MO. Expert local knowledge to secure immediate jail release in Washington County.' 
  },
  { 
    id: 'farmington', 
    name: 'Farmington', 
    countyId: 'st-francois', 
    countyName: 'St. Francois County', 
    circuit: 'Circuit 24', 
    description: 'Serving Farmington and all of St. Francois County. We provide 24/7 bail support to bring your loved ones home quickly.' 
  },
  { 
    id: 'hillsboro', 
    name: 'Hillsboro', 
    countyId: 'jefferson', 
    countyName: 'Jefferson County', 
    circuit: 'Circuit 23', 
    description: 'Professional bail bondsman serving the Hillsboro community and Jefferson County courts with discretion and speed.' 
  },
  { 
    id: 'sedalia', 
    name: 'Sedalia', 
    countyId: 'pettis', 
    countyName: 'Pettis County', 
    circuit: 'Circuit 18', 
    description: 'Reliable 24-hour bail services in Sedalia, Missouri. We specialize in Pettis County judicial procedures for fast release.' 
  },
  { 
    id: 'poplar-bluff', 
    name: 'Poplar Bluff', 
    countyId: 'butler', 
    countyName: 'Butler County', 
    circuit: 'Circuit 36', 
    description: 'Expert bail assistance in Poplar Bluff and Butler County. One call away from setting you free in Southeast Missouri.' 
  },
  { 
    id: 'west-plains', 
    name: 'West Plains', 
    countyId: 'howell', 
    countyName: 'Howell County', 
    circuit: 'Circuit 37', 
    description: 'Serving the West Plains area with decades of bail bond experience. Proven results in Howell County jail releases.' 
  },
  { 
    id: 'bolivar', 
    name: 'Bolivar', 
    countyId: 'polk', 
    countyName: 'Polk County', 
    circuit: 'Circuit 30', 
    description: 'Fast, confidential bail bonds in Bolivar and Polk County. Available any time, day or night, to help your family.' 
  },
  { 
    id: 'festus', 
    name: 'Festus', 
    countyId: 'jefferson', 
    countyName: 'Jefferson County', 
    circuit: 'Circuit 23', 
    description: 'Serving the Festus/Crystal City area for all bail bond needs. Expert assistance in Jefferson County cases.' 
  },
  { 
    id: 'park-hills', 
    name: 'Park Hills', 
    countyId: 'st-francois', 
    countyName: 'St. Francois County', 
    circuit: 'Circuit 24', 
    description: 'Reliable bail bonds in Park Hills and the Lead Belt area. Rapid response for St. Francois County jail releases.' 
  },
  { 
    id: 'marshfield', 
    name: 'Marshfield', 
    countyId: 'webster', 
    countyName: 'Webster County', 
    circuit: 'Circuit 30', 
    description: 'Serving Marshfield and Webster County with professional bail services. Specialized knowledge of Circuit 30 courts.' 
  },
  {
    id: 'bonne-terre',
    name: 'Bonne Terre',
    countyId: 'st-francois',
    countyName: 'St. Francois County',
    circuit: 'Circuit 24',
    description: 'Reliable bail bonds in Bonne Terre. Rapid response for St. Francois County jail releases and comprehensive 24/7 support.'
  },
  {
    id: 'ironton',
    name: 'Ironton',
    countyId: 'iron',
    countyName: 'Iron County',
    circuit: 'Circuit 42',
    description: 'Expert bail services in Ironton and surrounding areas. Fast 24/7 jail release support for Iron County cases.'
  }
];
