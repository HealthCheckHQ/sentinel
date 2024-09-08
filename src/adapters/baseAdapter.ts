import { QueueItem } from '@dtos/queueItem.dto';

export abstract class BaseAdapters {
  protected abstract validateConfig(): Promise<void>;
  public abstract exportEvents(queueItem: QueueItem): Promise<void>;
  public abstract flushData(): Promise<void>;
}
