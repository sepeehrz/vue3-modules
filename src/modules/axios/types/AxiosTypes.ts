import {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse
} from 'axios';

export interface Iparams {
  perPage?: number;
  page?: number;
  filters?: string;
  sort?: string;
}
export interface IListOption<T> {
  data: T[];
  perPage: number;
  page: number;
  lastPage: number;
  total: number;
}
export interface RequestAxiosResource {
  $get(id: number | string): Promise<AxiosResponse>;
  $save(obj: any): Promise<AxiosResponse>;
  $query(params?: any): Promise<AxiosResponse>;
  $update(id: number | string, obj: any): Promise<AxiosResponse>;
  $delete(id: number | string): Promise<AxiosResponse>;
}
export interface RequestAxiosInstance extends AxiosInstance {
  $request<T = any>(config: AxiosRequestConfig): Promise<T>;
  $get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  $delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  $head<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  $options<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  $post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T>;
  $put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T>;
  $patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T>;
  $resource<T = any>(path: string, actions?: any): RequestAxiosResource;
  setHeader(
    name: string,
    value?: string | false,
    scopes?: string | string[]
  ): void;
  setToken(
    token: string | false,
    type?: string,
    scopes?: string | string[]
  ): void;

  onRequest(callback: (config: AxiosRequestConfig) => void): void;
  onResponse<T = any>(callback: (response: AxiosResponse<T>) => void): void;
  onError(callback: (error: AxiosError) => void): void;
  onRequestError(callback: (error: AxiosError) => void): void;
  onResponseError(callback: (error: AxiosError) => void): void;
}
