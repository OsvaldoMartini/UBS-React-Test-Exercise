export interface DataPayload {
  id: string;
  name: string;
  spend: number;
  BCAP1: string,
  BCAP2: string,
  BCAP3: string
}

export async function getAll(): Promise<DataPayload[]> {
  return fetch("/data").then((resp) => resp.json());
}
