import { EventManager } from '@foundation/Toast/type';

export const eventManager: EventManager = {
  list: new Map(), // 이벤트 리스너 저장
  emitQueue: new Map(), // 이벤트 지연을 위한 큐

  // 새로운 이벤트 리스너 등록
  on(event, callback) {
    this.list.has(event)
      ? this.list.get(event)!.push(callback)
      : this.list.set(event, [callback]);

    return this;
  },

  // 콜백이 있는경우 해당하는 리스너 제거, 없는 경우 이벤트에 대한 모든 리스너 제거
  off(event, callback) {
    if (callback) {
      const cb = this.list.get(event)?.filter((cb) => cb !== callback);
      cb && this.list.set(event, cb);
      return this;
    }
    this.list.delete(event);

    return this;
  },

  //대기중인 이벤트를 취소시킬 때 필요함
  cancelEmit(event) {
    const timers = this.emitQueue.get(event);
    if (timers) {
      timers.forEach(clearTimeout);
      this.emitQueue.delete(event);
    }

    return this;
  },

  // 이벤트 발생시키기
  // 타입문제는 일단 보류중! (라이브러리 내부도 해결 안되어있음)
  emit(event, ...args: never[]) {
    this.list.has(event) &&
      this.list.get(event)!.forEach((callback) => {
        const timer = setTimeout(() => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          return callback(...args);
        }, 0);

        this.emitQueue.has(event)
          ? this.emitQueue.get(event)!.push(timer)
          : this.emitQueue.set(event, [timer]);
      });
  },
};
