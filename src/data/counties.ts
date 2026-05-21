
export interface County {
  id: string;
  name: string;
  circuit: string;
  description: string;
  courts?: string[];
  lat: number;
  lng: number;
}

export const counties: County[] = [
  { id: 'pettis', name: 'Pettis County', circuit: 'Circuit 18', description: 'Expert bail assistance in Sedalia and across Pettis County.', lat: 38.70, lng: -93.22 },
  { id: 'cooper', name: 'Cooper County', circuit: 'Circuit 18', description: 'Serving Boonville and Cooper County with 24/7 bail support.', lat: 38.97, lng: -92.74 },
  { id: 'benton', name: 'Benton County', circuit: 'Circuit 30', description: 'Fast judicial release in Warsaw and Benton County.', lat: 38.24, lng: -93.37 },
  { id: 'hickory', name: 'Hickory County', circuit: 'Circuit 30', description: 'Professional bail bondsman serving Hermitage and Hickory County.', lat: 37.94, lng: -93.31 },
  { id: 'dallas', name: 'Dallas County', circuit: 'Circuit 30', description: 'Securing release in Buffalo and Dallas County area.', lat: 37.64, lng: -93.09 },
  { id: 'polk', name: 'Polk County', circuit: 'Circuit 30', description: 'Serving Bolivar and Polk County with discretion and speed.', lat: 37.61, lng: -93.41 },
  { id: 'webster', name: 'Webster County', circuit: 'Circuit 30', description: 'Bail services in Marshfield and across Webster County.', lat: 37.33, lng: -92.90 },
  { id: 'st-charles', name: 'St. Charles County', circuit: 'Circuit 11', description: 'Comprehensive bail support for St. Charles and surrounding area.', lat: 38.78, lng: -90.48 },
  { id: 'jefferson', name: 'Jefferson County', circuit: 'Circuit 23', description: 'Reliable bail bonds in Hillsboro and all of Jefferson County.', lat: 38.23, lng: -90.56 },
  { id: 'washington', name: 'Washington County', circuit: 'Circuit 24', description: 'Primary service in Potosi and Washington County courts.', lat: 37.93, lng: -90.78 },
  { id: 'st-francois', name: 'St. Francois County', circuit: 'Circuit 24', description: 'Fast release services in Farmington and St. Francois County.', lat: 37.78, lng: -90.42 },
  { id: 'ste-genevieve', name: 'Ste. Genevieve County', circuit: 'Circuit 24', description: 'Serving Ste. Genevieve with integrity and speed.', lat: 37.97, lng: -90.04 },
  { id: 'madison', name: 'Madison County', circuit: 'Circuit 24', description: 'Providing bail assistance in Fredericktown and Madison County.', lat: 37.55, lng: -90.29 },
  { id: 'crawford', name: 'Crawford County', circuit: 'Circuit 42', description: 'Courts in Steelville and across Crawford County served 24/7.', lat: 37.96, lng: -91.35 },
  { id: 'iron', name: 'Iron County', circuit: 'Circuit 42', description: 'Expert bail services in Ironton and all of Iron County.', lat: 37.59, lng: -90.62 },
  { id: 'reynolds', name: 'Reynolds County', circuit: 'Circuit 42', description: 'Serving Centerville and Reynolds County with professional care.', lat: 37.44, lng: -90.95 },
  { id: 'dent', name: 'Dent County', circuit: 'Circuit 42', description: 'Bail bonds in Salem and throughout Dent County.', lat: 37.64, lng: -91.53 },
  { id: 'wayne', name: 'Wayne County', circuit: 'Circuit 42', description: 'Securing release in Greenville and Wayne County courts.', lat: 37.12, lng: -90.45 },
  { id: 'howell', name: 'Howell County', circuit: 'Circuit 37', description: 'Serving West Plains and Howell County since the beginning.', lat: 36.72, lng: -91.85 },
  { id: 'oregon', name: 'Oregon County', circuit: 'Circuit 37', description: 'Judicial assistance in Alton and Oregon County.', lat: 36.69, lng: -91.39 },
  { id: 'shannon', name: 'Shannon County', circuit: 'Circuit 37', description: 'Fast bail release in Eminence and across Shannon County.', lat: 37.18, lng: -91.35 },
  { id: 'carter', name: 'Carter County', circuit: 'Circuit 37', description: 'Serving Van Buren and all of Carter County 24/7.', lat: 36.99, lng: -91.01 },
  { id: 'ripley', name: 'Ripley County', circuit: 'Circuit 36', description: 'Professional bail services in Doniphan and Ripley County.', lat: 36.61, lng: -90.82 },
  { id: 'butler', name: 'Butler County', circuit: 'Circuit 36', description: 'Serving Poplar Bluff and Butler County with rapid response.', lat: 36.75, lng: -90.39 },
  { id: 'franklin', name: 'Franklin County', circuit: 'Circuit 20', description: 'Fast jail release and bail assistance in Union and Franklin County area.', lat: 38.41, lng: -90.98 },
];
