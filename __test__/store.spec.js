import { RouterModel } from '../index';

let mockHistory, routerModel;

beforeEach(() => {
  mockHistory = {
    push: jest.fn(),
    replace: jest.fn(),
    go: jest.fn(),
    goBack: jest.fn(),
    goForward: jest.fn(),
    block: jest.fn()
  };
  routerModel = RouterModel.create();
  routerModel._setHistory(mockHistory);
});

describe('store', () => {
  it('can call push() and proxy arguments through', () => {
    routerModel.push('push', 'args');
    expect(mockHistory.push.mock.calls.length).toBe(1);
    expect(mockHistory.push.mock.calls[0]).toEqual(['push', 'args']);
  });

  it('can call replace() and proxy arguments through', () => {
    routerModel.replace('replace', 'args');
    expect(mockHistory.replace.mock.calls.length).toBe(1);
    expect(mockHistory.replace.mock.calls[0]).toEqual(['replace', 'args']);
  });

  it('can call go() and proxy arguments through', () => {
    routerModel.go(-1);
    expect(mockHistory.go.mock.calls.length).toBe(1);
    expect(mockHistory.go.mock.calls[0]).toEqual([-1]);
  });

  it('can call goBack() and proxy arguments through', () => {
    routerModel.goBack();
    expect(mockHistory.goBack.mock.calls.length).toBe(1);
  });

  it('can call goForward() and proxy arguments through', () => {
    routerModel.goForward();
    expect(mockHistory.goForward.mock.calls.length).toBe(1);
  });

  it('can call block() and proxy arguments through', () => {
    routerModel.block('block', 'args');
    expect(mockHistory.block.mock.calls.length).toBe(1);
    expect(mockHistory.block.mock.calls[0]).toEqual(['block', 'args']);
  });
});
