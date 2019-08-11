import { ISocketOptions } from "./interfaces/ISocketOptions";

export class ServiceBase {
  constructor(protected socketOptions: ISocketOptions) { }
}
