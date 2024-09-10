import { QueueItem } from '@dtos/queueItem.dto';

export abstract class BaseAdapter {
  public abstract validateConfig(): Promise<void>;
  public abstract exportEvents(queueItem: QueueItem): Promise<void>;
  public abstract flushData(): Promise<void>;
  public abstract shutdown(): Promise<void>;
}
