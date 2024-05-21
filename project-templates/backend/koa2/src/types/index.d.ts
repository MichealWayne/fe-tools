/**
 * @author Wayne
 * @Date 2023-02-15 15:18:59
 * @LastEditTime 2023-05-18 10:27:02
 */
declare namespace NodeJS {
  interface Global {
    // rome-ignore lint/suspicious/noExplicitAny: <explanation>
    log: any;
  }
}

export interface globalLog {
  [propName: string]: (info: string, ...args: string[]) => void;
}

// rome-ignore lint/suspicious/noExplicitAny: <explanation>
export type nextInstance = () => Promise<any>;

export type ContentMsg = {
  role: string;
  content: string;
  // rome-ignore lint/suspicious/noExplicitAny: <explanation>
  [key: string]: any;
};
