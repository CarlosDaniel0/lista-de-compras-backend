import { networkInterfaces } from "os";
import { DEBUG, MAX_REQUEST_TIMEOUT } from "./constants";
import { format } from 'date-fns'
import { ProxyScape, ProxyScapeResponse } from "./types";

export type HTTPMethods = 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD'

export const getIPv4 = () => {
  const nets = networkInterfaces();
  const results = Object.create(null); // Or just '{}', an empty object

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]!) {
      // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
      // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
      const familyV4Value = typeof net.family === "string" ? "IPv4" : 4;
      if (net.family === familyV4Value && !net.internal) {
        if (!results[name]) {
          results[name] = [];
        }
        results[name].push(net.address);
      }
    }
  }

  return Object.values(results)[0];
};

const print =
  () =>
  (
    type: 'req' | 'res',
    message: string | Record<string, unknown>,
    url: string = '',
    method: HTTPMethods = 'GET'
  ) => {
    if (!DEBUG) return
    const now = format(new Date(), 'dd/MM/yyyy, HH:mm:ss')
    const header = `${url !== '' ? `\n${method}` : ''}:${
      url !== '' ? `${url}\n` : ''
    }`
    console.log(
      `${type === 'req' ? 'Requisição' : 'Resposta'}${' '.repeat(
        5
      )}${now}${header}`
    )
    if (!message) return
    console.log(`Body: ${message}`)
  }

export const log = {
  error: print(), // 'error'
  info: print(), // 'info'
  warn: print(), // 'warn'
}

export const request = async <T = never, K = unknown>(
  url: string,
  body?: K,
  method?: HTTPMethods
): Promise<T> => {
  const controller = new AbortController()
  setTimeout(() => controller.abort(), MAX_REQUEST_TIMEOUT)
  log.info('req', body ? body : '', url, method)
  return fetch(url, {
    method: method ?? 'GET',
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
    signal: controller.signal,
  })
    .then((res) => {
      switch (res.status) {
        case 401:
          throw new Error('Usuário não autorizado')
        case 404:
          throw new Error('Rota não encontrada')
        case 200:
          return res.text()
        default:
          throw new Error(
            `Ocorreu um erro inesperado: Status Code: ${res.status}`
          )
      }
    })
    .then((res) => {
      let json = {}
      try {
        json = JSON.parse(res)
      } catch (e) {
        return res as T
      }
      log.info('res', json)
      return json as T
    })
}

export const getProxies = async () => {
  const url = 'https://api.proxyscrape.com/v4/free-proxy-list/get?request=display_proxies&country=br&proxy_format=protocolipport&format=json&timeout=20000'
  const proxies = await request<ProxyScapeResponse>(url)
  return proxies
}

/**
 * Somar valores decimais sem erro na precisão decimal
 *
 * Ex: (regular) 1.03 + 1.33 => 2.3600000000000003
 *
 * Ex: (função) decimalSum(1.03, 1.33) => 2.36
 * @param numbers (n1, n2, nk...)
 * @returns  sum
 */
export const decimalSum = (...numbers: number[]): number =>
  numbers.reduce((sum, curr, i, arr) => {
    if (i === arr.length) return sum;
    const n1: number = !Number.isNaN(Number(sum ?? 0)) ? Number(sum ?? 0) : 0;
    const n2: number = !Number.isNaN(Number(curr ?? 0)) ? Number(curr ?? 0) : 0;

    const [intA, decA] =
      n1 % 1 === 0 ? [String(n1), "0"] : String(n1).split(".");
    const [intB, decB] =
      n2 % 1 === 0 ? [String(n2), "0"] : String(n2).split(".");

    if (decA === "0" && decB === "0") return n1 + n2;
    const decimals = decA.length > decB.length ? decA.length : decB.length;
    return (
      (parseInt(intA + decA.padEnd(decimals, "0")) +
        parseInt(intB + decB.padEnd(decimals, "0"))) /
      Math.pow(10, decimals)
    );
  }, 0);

export const sum = <T,>(arr: T[], field: keyof T) => {
  return arr.reduce((tot, item) => decimalSum(tot, Number(item?.[field] ?? 0)), 0)
}

export const trunc = (num: number, decimals: number = 2) => Math.trunc(num * Math.pow(10, decimals)) / Math.pow(10, decimals)

export const parseCurrencyToNumber = (value: string) =>
  Number(value.replace(/\./g, "").replace(/,/g, "."));

export const aggregateByKey = <T>(arr: T[], field: keyof T) => {
  const map = new Map<string, any>();
  arr.forEach((item) => map.set(String(item[field]), item));
  return Array.from(map.values()) as T[];
};