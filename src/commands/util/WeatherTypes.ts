export interface BingMapsAddressRes {
  authenticationResultCode: string;
  brandLogoUri: string;
  copyright: string;
  resourceSets: Array<ResourceSet>;
  statusCode: number;
  statusDescription: string;
  traceId: `${string}|${string}|${string}|${string}`;
}
interface ResourceSet {
  estimatedTotal: number;
  resources: Array<Resource>;
}
interface Resource {
  __type: string;
  bbox: [number, number, number, number];
  name: string;
  point: {
    type: string;
    coordinates: [number, number];
  };
  address: {
    adminDistrict: string;
    adminDistrict2: string;
    countryRegion: string;
    formattedAddress: string;
    locality: string;
  };
  confidence: string;
  entityType: string;
  geocodePoints: Array<GeocodePoint>;
  matchCodes: string[];
}
interface GeocodePoint {
  type: string;
  coordinates: [number, number];
  calculationMethod: string;
  usageTypes: string[];
}
interface Geometry {
  type: string;
  coordinates: number[];
}

interface Geometry2 {
  type: string;
  coordinates: number[];
}

interface Distance {
  unitCode: string;
  value: number;
}

interface Bearing {
  unitCode: string;
  value: number;
}

interface Properties2 {
  city: string;
  state: string;
  distance: Distance;
  bearing: Bearing;
}

interface RelativeLocation {
  type: string;
  geometry: Geometry2;
  properties: Properties2;
}

interface Properties {
  '@id': string;
  '@type': string;
  cwa: string;
  forecastOffice: string;
  gridId: string;
  gridX: number;
  gridY: number;
  forecast: string;
  forecastHourly: string;
  forecastGridData: string;
  observationStations: string;
  relativeLocation: RelativeLocation;
  forecastZone: string;
  county: string;
  fireWeatherZone: string;
  timeZone: string;
  radarStation: string;
}

export interface WeatherGovPointRes {
  '@context': any[];
  id: string;
  type: string;
  geometry: Geometry;
  properties: Properties;
}
interface Geometry {
  type: string;
  coordinates: number[];
}

interface Elevation {
  unitCode: string;
  value: number;
}

interface Period {
  number: number;
  name: string;
  startTime: Date;
  endTime: Date;
  isDaytime: boolean;
  temperature: number;
  temperatureUnit: string;
  temperatureTrend?: any;
  windSpeed: string;
  windDirection: string;
  icon: string;
  shortForecast: string;
  detailedForecast: string;
}

interface Properties {
  updated: Date;
  units: string;
  forecastGenerator: string;
  generatedAt: Date;
  updateTime: Date;
  validTimes: string;
  elevation: Elevation;
  periods: Period[];
}

export interface WeatherGovGridpointHourlyForecastRes {
  '@context': any[];
  type: string;
  geometry: Geometry;
  properties: Properties;
}
