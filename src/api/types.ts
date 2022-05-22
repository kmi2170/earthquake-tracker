export interface RowEqData {
  type: string;
  metadata: MetaData;
  bbox: string[];
  features: Feature[];
}

export interface MetaData {
  generated: number;
  url: string;
  title: string;
  api: string;
  count: number;
  status: number;
}

export interface Feature {
  type: string;
  properties: {
    mag: number;
    place: string;
    time: number;
    updated: number;
    tz: number;
    url: string;
    detail: string;
    felt: number;
    cdi: number;
    mmi: number;
    alert: string;
    status: string;
    tsunami: number;
    sig: number;
    net: string;
    code: string;
    ids: string;
    sources: string;
    types: string;
    nst: number;
    dmin: number;
    rms: number;
    gap: number;
    magType: string;
    type: string;
  };
  geometry: {
    type: string;
    coordinates: number[];
  };
  id: string;
}

export interface DisplayEqData {
  id: string;
  mag: number;
  place: string;
  time: number;
  tz: number;
  updated: number;
  coordinates: number[];
  detail: string;
  alert: string;
  tsunami: number;
}

// tables
export type Order = 'asc' | 'desc';
