// https://pt-br.proxyscrape.com/lista-de-procuradores-gratuitos
export interface ProxyScape {
  alive: boolean;
  alive_since: number;
  anonymity: string;
  average_timeout: number;
  first_seen: number;
  ip_data: {
    as: string;
    asname: string;
    city: string;
    continent: string;
    continentCode: string;
    country: string;
    countryCode: string;
    district: string;
    hosting: boolean;
    isp: string;
    lat: number;
    lon: number;
    mobile: boolean;
    org: string;
    proxy: boolean;
    regionName: string;
    status: string;
    timezone: string;
    zip: string;
  };
  ip_data_last_update: number;
  last_seen: number;
  port: number;
  protocol: "http" | "https";
  proxy: string;
  ssl: boolean;
  timeout: number;
  times_alive: number;
  times_dead: number;
  uptime: number;
  ip: string;
}

export interface XMLProduct {
  prod: {
    cProd: number;
    cEAN: number;
    xProd: string;
    NCM: number;
    CEST: number;
    CFOP: number;
    uCom: string;
    qCom: number;
    vUnCom: number;
    vDesc?: number;
    vProd: number;
    cEANTrib: number;
    uTrib: string;
    qTrib: number;
    vUnTrib: number;
    indTot: number;
  };
  imposto: {
    ICMS: {
      ICMS60: {
        orig: number;
        CST: number;
      };
    };
    PIS: {
      PISAliq: {
        CST: number;
        vBC: number;
        pPIS: number;
        vPIS: number;
      };
    };
    COFINS: {
      COFINSAliq: {
        CST: number;
        vBC: number;
        pCOFINS: number;
        vCOFINS: number;
      };
    };
  };
}

export interface ProxyScapeResponse {
  shown_records: number;
  total_records: number;
  limit: number;
  skip: number;
  nextpage: boolean;
  proxies: ProxyScape[];
}
