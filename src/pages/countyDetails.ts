import { tier1Data } from './tier1Content';

export interface DetailedCountyInfo {
  id: string;
  name: string;
  countySeat: string;
  jailName: string;
  jailAddress: string;
  sheriffOffice: string;
  highways: string;
  nearbyStreets: string;
  localCourts: string[];
  majorCities: string[];
  customIntro: string;
  localProcedures: string;
  extendedContent?: {
    overview: string;
    jailInfo: string;
    courtInfo: string;
    localBondProcess: string;
    faqs: { question: string; answer: string }[];
  };
}

export const countyDetailsMap: Record<string, DetailedCountyInfo> = {
  pettis: {
    id: 'pettis',
    name: 'Pettis County',
    countySeat: 'Sedalia',
    jailName: 'Pettis County Jail',
    jailAddress: '319 S Lamine Ave, Sedalia, MO 65301',
    sheriffOffice: "Pettis County Sheriff's Department",
    highways: 'U.S. Highway 50, U.S. Highway 65, and Missouri Route 127',
    nearbyStreets: 'S Lamine Ave, E Main St, E Broadway Blvd, and N Ohio Ave',
    localCourts: ['Pettis County Circuit Court - 18th Judicial Circuit', 'Sedalia Municipal Court'],
    majorCities: ['Sedalia', 'Green Ridge', 'La Monte', 'Smithton', 'Houstonia'],
    customIntro: 'For fast jail release in Sedalia and across Pettis County, Jody Story offers direct 24/7 bail bonds. We understand the stress of having an arrest in the Sedalia municipal area or rural Pettis County townships. Our deep knowledge of the 18th Judicial Circuit courthouse protocols and Pettis County detention workflows ensures prompt, secure release processes with zero hassle.',
    localProcedures: 'Bail bonds are processed 24/7 at the Pettis County Jail in Sedalia. After the magistrate sets a bond amount, a Missouri licensed bondsman must submit the collateral surety or 10% cash equivalent to secure immediate discharge.'
  },
  cooper: {
    id: 'cooper',
    name: 'Cooper County',
    countySeat: 'Boonville',
    jailName: 'Cooper County Detention Center',
    jailAddress: '200 Main St, Boonville, MO 65233',
    sheriffOffice: "Cooper County Sheriff's Office",
    highways: 'Interstate 70, U.S. Route 40, Missouri Route 5, and Missouri Route 87',
    nearbyStreets: 'Main St, High St, Spring St, and Bingham Rd',
    localCourts: ['Cooper County Circuit Court - 18th Judicial Circuit', 'Boonville Municipal Court'],
    majorCities: ['Boonville', 'Pilot Grove', 'Otterville', 'Bunceton', 'Wooldridge'],
    customIntro: 'If your loved one is locked up at the Cooper County Detention Center in Boonville, Jody Story provides immediate, confidential assistance. Positioned right along the I-70 corridor, Cooper County has strict legal processing guidelines, but our experienced agents know exactly how to expedited county paperwork for a speedier discharge.',
    localProcedures: 'In Cooper County, bonds can be posted directly at the main detention facility in Boonville. The Sheriff\'s department processes paperwork within 1 to 3 hours from when the bondsman secures court filings.'
  },
  benton: {
    id: 'benton',
    name: 'Benton County',
    countySeat: 'Warsaw',
    jailName: 'Benton County Jail',
    jailAddress: '116 E Washington St, Warsaw, MO 65355',
    sheriffOffice: "Benton County Sheriff's Office",
    highways: 'U.S. Highway 65, Missouri Route 7, and Missouri Route 52',
    nearbyStreets: 'E Washington St, Main St, Jasper St, and Harrison St',
    localCourts: ['Benton County Circuit Court - Court Circuit 30', 'Warsaw Court'],
    majorCities: ['Warsaw', 'Lincoln', 'Cole Camp', 'Ionia'],
    customIntro: 'Benton County, covering Warsaw and the scenic Lake of the Ozarks area, handles dynamic caseloads. Jody Story is on-call 24 hours a day to assist families. Whether you\'re dealing with minor boating violations, recreation-related citations, or felony charges in the 30th Judicial Circuit, we dispatch agents immediately to secure Warsaw jail releases.',
    localProcedures: 'Bondsmen must verify bond validity with the Benton County Clerk before posting, particularly in off-hours. We coordinate directly with the jailers in Warsaw so you don\'t have to deal with complex jail phone queues.'
  },
  hickory: {
    id: 'hickory',
    name: 'Hickory County',
    countySeat: 'Hermitage',
    jailName: 'Hickory County Jail',
    jailAddress: '116 EE Hwy, Hermitage, MO 65668',
    sheriffOffice: "Hickory County Sheriff's Office",
    highways: 'U.S. Highway 54, Missouri Route 64, and Missouri Route 254',
    nearbyStreets: 'EE Hwy, Dallas St, and Polk St',
    localCourts: ['Hickory County Circuit Court - Circuit 30', 'Hermitage Court'],
    majorCities: ['Hermitage', 'Wheatland', 'Preston', 'Cross Timbers'],
    customIntro: 'Hickory County is a small but critical district serving Hermitage, Wheatland, and local communities. A family arrest here requires local, professional know-how to navigate the local court systems efficiently. Jody Story acts fast, working closely with local coordinators in Pomme de Terre region to deliver highly reliable and confidential services.',
    localProcedures: 'The Hickory County Sheriff\'s Department administers the jail facility in Hermitage. Cash or surety bonds must be approved by the duty deputy before releasing physical custody.'
  },
  dallas: {
    id: 'dallas',
    name: 'Dallas County',
    countySeat: 'Buffalo',
    jailName: 'Dallas County Jail',
    jailAddress: '204 S Pine St, Buffalo, MO 65622',
    sheriffOffice: "Dallas County Sheriff's Department",
    highways: 'U.S. Highway 65, Missouri Route 32, and Missouri Route 64',
    nearbyStreets: 'S Pine St, Main St, and W Madison St',
    localCourts: ['Dallas County Circuit Court - Circuit 30', 'Buffalo Municipal Court'],
    majorCities: ['Buffalo', 'Urbana', 'Louisburg', 'Plad'],
    customIntro: 'Getting a bail bond issued in Buffalo, Missouri is simple and direct with Jody Story. We service Dallas County around the clock, providing compassionate guidance through difficult situations. We expedite jail releases on Hwy 65 corridor so you can bring your family member back home without long wait times.',
    localProcedures: 'Bail postings are accepted at the Dallas County Jail on S Pine Street in Buffalo. The booking clerk processes local circuit court orders and issues releases shortly after security check verification.'
  },
  polk: {
    id: 'polk',
    name: 'Polk County',
    countySeat: 'Bolivar',
    jailName: 'Polk County Jail',
    jailAddress: '113 E Jefferson St, Bolivar, MO 65613',
    sheriffOffice: "Polk County Sheriff's Office",
    highways: 'Missouri Route 13, Missouri Route 32, and U.S. Highway 54',
    nearbyStreets: 'E Jefferson St, S Springfield Ave, and Broadway St',
    localCourts: ['Polk County Circuit Court - Circuit 30', 'Bolivar Municipal Court'],
    majorCities: ['Bolivar', 'Pleasant Hope', 'Fair Play', 'Humansville', 'Morrisville', 'Aldrich'],
    customIntro: 'Polk County bail bond services in Bolivar, Missouri demand local familiarity and high discretion. Jody Story has built outstanding trust serving Circuit 30, assisting families throughout Bolivar, Pleasant Hope, and Humansville. Call 573-854-9264 for immediately secure and highly confidential bail postings.',
    localProcedures: 'The Polk County Sheriff\'s Department handles physical custody in Bolivar. Surety bindings must be recorded properly with the court clerk, or cleared through active duty jail staff after business hours.'
  },
  webster: {
    id: 'webster',
    name: 'Webster County',
    countySeat: 'Marshfield',
    jailName: 'Webster County Jail',
    jailAddress: '101 S Crittenden St, Marshfield, MO 65706',
    sheriffOffice: "Webster County Sheriff's Department",
    highways: 'Interstate 44, U.S. Route 60, and Missouri Route 38',
    nearbyStreets: 'S Crittenden St, E Washington St, and Jefferson St',
    localCourts: ['Webster County Circuit Court - Circuit 30', 'Marshfield Municipal Court'],
    majorCities: ['Marshfield', 'Seymour', 'Rogersville', 'Niangua', 'Diggins'],
    customIntro: 'If you require professional bail bond assistance in Marshfield or throughout Webster County, Jody Story is your best call. We specialize in fast judicial releases for individuals held on the I-44 corridor or Marshfield municipal jail. We offer 24/7 custom payment installments to fit any home budget.',
    localProcedures: 'Webster County Jail in Marshfield welcomes approved bondsmen at any hour. Proper personal identification, court circuit case files, and active MO licensing are mandatory to start the discharge processing.'
  },
  'st-charles': {
    id: 'st-charles',
    name: 'St. Charles County',
    countySeat: 'St. Charles',
    jailName: 'St. Charles County Department of Corrections',
    jailAddress: '301 N Second St, St. Charles, MO 63301',
    sheriffOffice: "St. Charles County Police Department & Sheriff",
    highways: 'Interstate 70, Interstate 64, Route 364, and U.S. Route 61',
    nearbyStreets: 'N Second St, First Capitol Dr, Jefferson St, and Kingshighway',
    localCourts: ['11th Judicial Circuit Court of Missouri', 'St. Charles Municipal Court'],
    majorCities: ['St. Charles', 'O\'Fallon', 'St. Peters', 'Wentzville', 'Lake St. Louis', 'Cottleville', 'Weldon Spring'],
    customIntro: 'As one of eastern Missouri\'s largest and busiest districts, St. Charles County maintains a major corrections facility. Jody Story delivers 24-hour highly professional bail services for St. Charles, O\'Fallon, Wentzville, and St. Peters. We navigate the intricate procedures of the 11th Judicial Circuit with unmatched speed and confidence.',
    localProcedures: 'Work with Jody Story to post modern surety documents directly at the Department of Corrections on North Second Street. Given size constraints, booking and processing times can vary, but specialized agents will coordinate to avoid delays.'
  },
  jefferson: {
    id: 'jefferson',
    name: 'Jefferson County',
    countySeat: 'Hillsboro',
    jailName: 'Jefferson County Jail',
    jailAddress: '510 1st St, Hillsboro, MO 63050',
    sheriffOffice: "Jefferson County Sheriff's Office",
    highways: 'Interstate 55, U.S. Route 67, Missouri Route 21, and Missouri Route 141',
    nearbyStreets: '1st St, Maple St, Business 21, and Main St',
    localCourts: ['Jefferson County Courthouse - 23rd Judicial Circuit', 'Hillsboro Municipal Court'],
    majorCities: ['Hillsboro', 'Festus', 'Arnold', 'Herculaneum', 'Crystal City', 'De Soto', 'House Springs'],
    customIntro: 'For reliable, quick, and highly confidential bail bonds in Hillsboro, Festus, or Arnold, Jody Story is the chosen expert. Jefferson County contains some of our primary response zones along Route 21 and Interstate 55. We offer 24/7 localized dispatch directly to the Hillsboro legal complex to secure immediate releases.',
    localProcedures: 'The Jefferson County Detention Center operates in Hillsboro, MO. Bonds must conform to the 23rd Circuit Court standard templates and must be presented directly to the main booking desk.'
  },
  washington: {
    id: 'washington',
    name: 'Washington County',
    countySeat: 'Potosi',
    jailName: 'Washington County Jail',
    jailAddress: '116 W High St, Potosi, MO 63664',
    sheriffOffice: "Washington County Sheriff's Department",
    highways: 'Missouri Route 21, Missouri Route 8, and Missouri Route 32',
    nearbyStreets: 'W High St, N Missouri St, and Route 8',
    localCourts: ['Washington County Circuit Court - 24th Judicial Circuit', 'Potosi Municipal Court'],
    majorCities: ['Potosi', 'Mineral Point', 'Caledonia', 'Irondale', 'Belgrade'],
    customIntro: 'Washington County is our absolute home base. Jody Story provides unparalleled local bail bonding services in Potosi and all surrounding communities. We have spent years serving the Circuit 24 legal network, keeping relationships strong and understanding every detailed requirement used by Washington County Sheriff deputies.',
    localProcedures: 'Postings can be made directly with the Washington County Jail in Potosi. Jail booking and administrative releases are quick and smooth because of our direct proximity and constant professional presence.'
  },
  'st-francois': {
    id: 'st-francois',
    name: 'St. Francois County',
    countySeat: 'Farmington',
    jailName: 'St. Francois County Detention Center',
    jailAddress: '1550 Doubet Rd, Farmington, MO 64040',
    sheriffOffice: "St. Francois County Sheriff's Department",
    highways: 'U.S. Route 67, Missouri Route 32, and Missouri Route 8',
    nearbyStreets: 'Doubet Rd, Flat River Dr, Pine St, and Weber Rd',
    localCourts: ['St. Francois County Courthouse - 24th Judicial Circuit', 'Farmington Court'],
    majorCities: ['Farmington', 'Park Hills', 'Bonne Terre', 'Desloge', 'Leadington', 'Iron Mountain Lake'],
    customIntro: 'If a family member is arrested in Farmington, Park Hills, or Bonne Terre, you need a local expert who can act immediately. Jody Story is the premier bail bonds provider across St. Francois County. We service the Doubet Road detention center day and night, ensuring our neighbors have access to professional and discreet bail services.',
    localProcedures: 'At the St. Francois County Detention Center, our agents submit electronic or physical surety filings, working collaboratively with local jailers to complete releases in a safe, timely manner.'
  },
  'ste-genevieve': {
    id: 'ste-genevieve',
    name: 'Ste. Genevieve County',
    countySeat: 'Ste. Genevieve',
    jailName: 'Ste. Genevieve County Detention Center',
    jailAddress: '119 N 3rd St, Ste. Genevieve, MO 63670',
    sheriffOffice: "Ste. Genevieve County Sheriff's Office",
    highways: 'Interstate 55, U.S. Route 61, and Missouri Route 32',
    nearbyStreets: 'N 3rd St, Merchant St, and Main St',
    localCourts: ['Ste. Genevieve County Court - 24th Judicial Circuit', 'Bloomsdale Court'],
    majorCities: ['Ste. Genevieve', 'Bloomsdale', 'St. Mary', 'Weingarten'],
    customIntro: 'Ste. Genevieve County combines a rich historic French heritage with strict local law enforcement. For immediate bail bonds in Ste. Genevieve or Bloomsdale, Jody Story is the highly trusted choice. We offer responsive local support near the I-55 corridor, assuring you constant 24/7 service when you need it most.',
    localProcedures: 'The local jail facility in Ste. Genevieve processes bonds around the clock. Your bondsman coordinates directly with the duty officers to expedite release codes.'
  },
  madison: {
    id: 'madison',
    name: 'Madison County',
    countySeat: 'Fredericktown',
    jailName: 'Madison County Jail',
    jailAddress: '124 S Market St, Fredericktown, MO 63645',
    sheriffOffice: "Madison County Sheriff's Department",
    highways: 'U.S. Route 67, U.S. Route 72, and Missouri Route 51',
    nearbyStreets: 'S Market St, W Main St, and S Main St',
    localCourts: ['Madison County Circuit Court - 24th Judicial Circuit', 'Fredericktown Municipal Court'],
    majorCities: ['Fredericktown', 'Marquand', 'Junction City'],
    customIntro: 'Madison County arrests are handled at the historic square area in Fredericktown. Jody Story ensures that families have an experienced agent available 24 hours to post bail. Our familiarity with Circuit 24 judicial clerks eliminates delays and helps you understand the local Fredericktown court schedule completely.',
    localProcedures: 'Bail postings are received at the Sheriff\'s office on Market Street in Fredericktown. After collateral or premium verification, release procedures generally take less than two hours.'
  },
  crawford: {
    id: 'crawford',
    name: 'Crawford County',
    countySeat: 'Steelville',
    jailName: 'Crawford County Jail',
    jailAddress: '212 S Main St, Steelville, MO 65565',
    sheriffOffice: "Crawford County Sheriff's Department",
    highways: 'Interstate 44, U.S. Route 19, and Missouri Route 8',
    nearbyStreets: 'S Main St, W Main St, and Cherry St',
    localCourts: ['Crawford County Circuit Court - 42nd Judicial Circuit', 'Steelville Municipal Court'],
    majorCities: ['Steelville', 'Cuba', 'Bourbon', 'West Sullivan'],
    customIntro: 'Crawford County, encompassing Steelville, Cuba, and Bourbon, requires an active, competent bondsman on the Hwy 19 and I-44 corridor. Jody Story provides 24-hour rapid response bail bonds for all Crawford County courts. We maintain close service availability near Steelville to post bond forms at the county jail instantly.',
    localProcedures: 'Bands are posted directly with the Crawford County Jail staff in Steelville. Due to 42nd circuit regulations, standard processing rules apply, which our agents handle on your behalf.'
  },
  iron: {
    id: 'iron',
    name: 'Iron County',
    countySeat: 'Ironton',
    jailName: 'Iron County Jail',
    jailAddress: '220 S Main St, Ironton, MO 63650',
    sheriffOffice: "Iron County Sheriff's Department",
    highways: 'Missouri Route 21, Missouri Route 72, and Missouri Route 32',
    nearbyStreets: 'S Main St, Shepherd St, and Knob St',
    localCourts: ['Iron County Courthouse - 42nd Judicial Circuit', 'Ironton Municipal Court'],
    majorCities: ['Ironton', 'Pilot Knob', 'Arcadia', 'Viburnum', 'Belleview'],
    customIntro: 'If someone you care about has been arrested in Ironton, Pilot Knob, or elsewhere in the Arcadia Valley of Iron County, Jody Story is here to help. We understand the specific municipal rules in Arcadia and the county procedures at the Ironton courthouse. Let our office coordinate your 10% premium payment plan securely.',
    localProcedures: 'Bail bonds are accepted on a 24/7 schedule at the Iron County Jail on South Main Street in Ironton. Releases are processed immediately by the duty deputy Sheriff.'
  },
  reynolds: {
    id: 'reynolds',
    name: 'Reynolds County',
    countySeat: 'Centerville',
    jailName: 'Reynolds County Jail',
    jailAddress: '2510 S Highway 21, Centerville, MO 63633',
    sheriffOffice: "Reynolds County Sheriff's Office",
    highways: 'Missouri Route 21, Missouri Route 72, and Missouri Route 106',
    nearbyStreets: 'S Highway 21, Pine St, and Elm St',
    localCourts: ['Reynolds County Circuit Court - 42nd Judicial Circuit', 'Centerville Municipal Court'],
    majorCities: ['Centerville', 'Ellington', 'Bunker'],
    customIntro: 'Reynolds County jail releases in Centerville demand a professional bondsman with direct local knowledge. Jody Story serves Centerville, Ellington, and Bunker 24/7 with total discretion. We know how the local 42nd circuit courtroom functions and will handle all structural paperwork to facilitate quick, proper releases.',
    localProcedures: 'Bail can be completed directly at the Reynolds County Jail in Centerville on Highway 21. Processing occurs immediately upon verification of court documents.'
  },
  dent: {
    id: 'dent',
    name: 'Dent County',
    countySeat: 'Salem',
    jailName: 'Dent County Jail',
    jailAddress: '112 E 5th St, Salem, MO 65559',
    sheriffOffice: "Dent County Sheriff's Department",
    highways: 'Missouri Route 32, Missouri Route 19, and Missouri Route 72',
    nearbyStreets: 'E 5th St, S Main St, and MacArthur Ave',
    localCourts: ['Dent County Circuit Court - 42nd Judicial Circuit', 'Salem Court'],
    majorCities: ['Salem', 'Bunker', 'Gladden'],
    customIntro: 'For 24/7 bail bonds in Salem or rural Dent County, Jody Story is always the premier choice. Tucked in the heart of the Ozarks, Dent County courts require professional bondsmen who understand local judicial expectations. Our office offers immediate dispatch and simple payment terms for Dent County cases.',
    localProcedures: 'The Dent County Jail is located in Salem, MO. To post a bond, our agent presents specific certified state licenses directly to jailers, coordinating quick release processing.'
  },
  wayne: {
    id: 'wayne',
    name: 'Wayne County',
    countySeat: 'Greenville',
    jailName: 'Wayne County Jail',
    jailAddress: '200 Walnut St, Greenville, MO 63944',
    sheriffOffice: "Wayne County Sheriff's Office",
    highways: 'U.S. Highway 67, Missouri Route 34, and Missouri Route 49',
    nearbyStreets: 'Walnut St, Main St, and Court St',
    localCourts: ['Wayne County Circuit Court - 42nd Judicial Circuit', 'Piedmont Court'],
    majorCities: ['Greenville', 'Piedmont', 'Williamsville', 'Mill Spring'],
    customIntro: 'Arranging bail bonds in Greenville, Piedmont, or rural Wayne County near Lake Wappapello shouldn\'t add extra stress. Jody Story has years of dedicated service under the 42nd judicial circuit. We assist you with setting affordable collateral, processing jail releases, and securing quick travel home.',
    localProcedures: 'Bail transactions are handled at the Wayne County Sheriff\'s Department and jail facility in Greenville. Our agents navigate local circuit guidelines to ensure prompt releases.'
  },
  howell: {
    id: 'howell',
    name: 'Howell County',
    countySeat: 'West Plains',
    jailName: 'Howell County Jail',
    jailAddress: '1106 Missouri Ave, West Plains, MO 65775',
    sheriffOffice: "Howell County Sheriff's Department",
    highways: 'U.S. Route 63, U.S. Route 160, and Missouri Route 17',
    nearbyStreets: 'Missouri Ave, West Plains Blvd, and Washington Ave',
    localCourts: ['Howell County Courthouse - 37th Judicial Circuit', 'West Plains Court'],
    majorCities: ['West Plains', 'Willow Springs', 'Mountain View', 'Brandsville'],
    customIntro: 'For professional bail bonds in West Plains, Willow Springs, or Mountain View, turn to Jody Story. Howell County is the cornerstone of Missouri\'s southern border area. We serve the 37th Judicial Circuit with fast, highly professional, 24-hour local support, minimizing wait times at the West Plains facility.',
    localProcedures: 'Howell County Jail is situated in West Plains, Missouri. A surety bondsman must register local filings before the booking office clears the inmate for discharge.'
  },
  oregon: {
    id: 'oregon',
    name: 'Oregon County',
    countySeat: 'Alton',
    jailName: 'Oregon County Jail',
    jailAddress: 'Court Square, Alton, MO 65606',
    sheriffOffice: "Oregon County Sheriff's Department",
    highways: 'U.S. Route 160, Missouri Route 19, and Missouri Route 142',
    nearbyStreets: 'Court Square, Main St, and Pine St',
    localCourts: ['Oregon County Circuit Court - 37th Judicial Circuit', 'Thayer Court'],
    majorCities: ['Alton', 'Thayer', 'Koshkonong'],
    customIntro: 'Oregon County covers beautiful expanses near Eleven Point River and Alton. If a friend or family member is held near Thayer or Alton municipal lines, Jody Story is ready. We deliver complete, compassionate 24-hour bail services to secure reliable, fast jail release in Oregon County.',
    localProcedures: 'The Oregon County Sheriff\'s Office manages jail bookings in the center of Alton. We post bond materials directly with duty deputies, organizing quick releases.'
  },
  shannon: {
    id: 'shannon',
    name: 'Shannon County',
    countySeat: 'Eminence',
    jailName: 'Shannon County Jail',
    jailAddress: 'Main St, Eminence, MO 65466',
    sheriffOffice: "Shannon County Sheriff's Department",
    highways: 'Missouri Route 19, Missouri Route 106, and U.S. Route 60',
    nearbyStreets: 'Main St, Jacks Fork Rd, and Court St',
    localCourts: ['Shannon County Courthouse - 37th Judicial Circuit', 'Winona Court'],
    majorCities: ['Eminence', 'Winona', 'Birch Tree'],
    customIntro: 'For direct 24/7 bail bonds in Eminence and local Shannon County communities, Jody Story provides specialized, prompt assistance. Whether it\'s a river recreation incident, driving-related charge, or criminal citation, we support families with quick and confidential bond services in Eminence.',
    localProcedures: 'Bail is posted directly at the Shannon County Jail booking office in Eminence. We verify cell assignments and coordinates to prevent delays.'
  },
  carter: {
    id: 'carter',
    name: 'Carter County',
    countySeat: 'Van Buren',
    jailName: 'Carter County Jail',
    jailAddress: '105 Court St, Van Buren, MO 63965',
    sheriffOffice: "Carter County Sheriff's Office",
    highways: 'U.S. Route 60, Missouri Route 21, and Missouri Route 103',
    nearbyStreets: 'Court St, Main St, and Hwy 60',
    localCourts: ['Carter County Circuit Court - 37th Judicial Circuit', 'Van Buren Court'],
    majorCities: ['Van Buren', 'Ellsinore', 'Hunter'],
    customIntro: 'If you require professional bail bond assistance in Van Buren, Ellsinore, or Carter County, trust Jody Story. We service the local jail facility right off the beautiful Current River region, bringing local judicial wisdom to secure the fastest possible jail releases.',
    localProcedures: 'Surety documents are accepted 24/7 at the Carter County Jail in Van Buren. Our agent submits files and ensures the detainee is freed without unnecessary hold times.'
  },
  ripley: {
    id: 'ripley',
    name: 'Ripley County',
    countySeat: 'Doniphan',
    jailName: 'Ripley County Jail',
    jailAddress: '110 Capitol Ave, Doniphan, MO 63935',
    sheriffOffice: "Ripley County Sheriff's Office",
    highways: 'U.S. Route 160, Missouri Route 21, and Missouri Route 142',
    nearbyStreets: 'Capitol Ave, Jefferson St, and Washington St',
    localCourts: ['Ripley County Circuit Court - 36th Judicial Circuit', 'Doniphan Court'],
    majorCities: ['Doniphan', 'Naylor', 'Fairdealing'],
    customIntro: 'Navigating Ripley County bail bonds in Doniphan requires a professional bondsman with years of local experience. Jody Story stands ready to help 24/7. We represent families in Doniphan, Naylor, and Fairdealing, providing affordable 10% premium payment structures for immediate support.',
    localProcedures: 'The Ripley County Jail is located in Doniphan, MO. All bonds must be processed through local booking agents, which our office manages from start to finish.'
  },
  butler: {
    id: 'butler',
    name: 'Butler County',
    countySeat: 'Poplar Bluff',
    jailName: 'Butler County Jail',
    jailAddress: '200 Oak St, Poplar Bluff, MO 63901',
    sheriffOffice: "Butler County Sheriff's Department",
    highways: 'U.S. Route 67, U.S. Route 60, and Missouri Route 53',
    nearbyStreets: 'Oak St, S Broadway St, and Maple St',
    localCourts: ['Butler County Courthouse - 36th Judicial Circuit', 'Poplar Bluff Court'],
    majorCities: ['Poplar Bluff', 'Qulin', 'Fisk', 'Neelyville'],
    customIntro: 'If you need standard or serious bail bonds in Poplar Bluff or throughout Butler County, Jody Story is the premier choice. Serving as the primary hub of Southeast Missouri, Butler County courts maintain strict administrative rules, but our years of on-ground service enable fast on-site jail releases.',
    localProcedures: 'Surety bonds must be processed with the Butler County Jail desk on Oak Street in Poplar Bluff. Our local agents act immediately to fast-track municipal and county bookings.'
  },
  franklin: {
    id: 'franklin',
    name: 'Franklin County',
    countySeat: 'Union',
    jailName: 'Franklin County Detention Center',
    jailAddress: '1 Bruns Ln, Union, MO 63084',
    sheriffOffice: "Franklin County Sheriff's Office",
    highways: 'Interstate 44, U.S. Route 50, Missouri Route 47, and Missouri Route 100',
    nearbyStreets: 'Bruns Ln, Washington St, and Locust St',
    localCourts: ['Franklin County Courthouse - 20th Judicial Circuit', 'Union Municipal Court', 'Washington Court'],
    majorCities: ['Union', 'Washington', 'Pacific', 'Sullivan', 'Villa Ridge', 'St. Clair', 'Gerald', 'New Haven'],
    customIntro: 'Franklin County is a major, active jurisdiction on the St. Louis metropolitan fringe. Jody Story delivers expert, rapid, 24/7 bail bond support for Union, Washington, Pacific, and Sullivan. We help you post bond smoothly at the Bruns Lane facility and support you throughout the 20th Judicial Circuit schedule to guarantee complete security.',
    localProcedures: 'Postings must be finalized at the Franklin County Adult Detention Center on Bruns Lane in Union. Standard automated security clearances are done, and our agents accompany families for a highly prompt and legal release.'
  }
};

Object.keys(tier1Data).forEach(key => {
  if (countyDetailsMap[key]) {
    countyDetailsMap[key].extendedContent = tier1Data[key];
  }
});