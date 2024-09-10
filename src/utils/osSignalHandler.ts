export class OsSignalHandler {
  private static singletonInstance = undefined;

  occurred = { SIGTERM: false, SIGINT: false };
  process: NodeJS.Process;

  constructor(process: NodeJS.Process) {
    if (OsSignalHandler.singletonInstance) {
      throw new Error(`Can't create another instance of this class`);
    }
    this.process = process;
    OsSignalHandler.singletonInstance = this;
  }

  /**
   * @param { 'SIGTERM' | 'SIGINT' } signal
   * @returns {boolean}
   */
  private getSignalStatus(signal: 'SIGTERM' | 'SIGINT'): boolean {
    return this.occurred[signal];
  }

  /**
   * @param {} signal
   * @param {any} callback
   */
  public registerSignalHandler(signal: 'SIGTERM' | 'SIGINT', callback: () => Promise<any>) {
    process.on(signal, async () => {
      console.log(`${signal} signal received.`);
      this.occurred[signal] = true;
      if (callback) {
        await callback();
      }
    });
  }

  public getSigtermStatus(): boolean {
    return this.getSignalStatus('SIGTERM');
  }

  registerSigtermHandler(callback: () => Promise<any> = null) {
    this.registerSignalHandler('SIGTERM', callback);
  }
}

module.exports = { OsSignalHandler };
