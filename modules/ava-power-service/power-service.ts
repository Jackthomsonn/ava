import { ISocketOptions } from "../interfaces/ISocketOptions";
import { ServiceBase } from "./../serviceBase";

export class PowerService extends ServiceBase {
  constructor(socketOptions: ISocketOptions) {
    super(socketOptions);
  }
}
