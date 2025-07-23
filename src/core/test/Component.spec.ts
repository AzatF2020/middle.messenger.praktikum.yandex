import { expect } from 'chai';
import sinon from 'sinon';
import Component from '../Component.ts';

interface TestComponentProps {
  label: string
  click?: () => {}
}

class TestComponent extends Component<TestComponentProps> {
  constructor(props: TestComponentProps) {
    super(props);

    this.listeners = { click: props.click };
  }

  render() {
    return '<div>{{ label }}</div>';
  }
}

describe('Component', () => {
  let component: Component | null;

  beforeEach(() => {
    component = new TestComponent({ label: 'Hello world' });
  });

  afterEach(() => {
    component!.eventBus().clearAll();
    component = null;
  });

  it('Должен создать div элемент', () => {
    component?.eventBus().emit(Component.EVENTS.INIT);
    expect(component?.getElement).to.be.instanceof(global.window.HTMLDivElement);
  });

  it('Должен корректно рендерить', () => {
    component?.eventBus().emit(Component.EVENTS.INIT);
    component?.eventBus().emit(Component.EVENTS.FLOW_RENDER);

    expect(component?.getElement?.innerHTML).to.equal('Hello world');
  });

  it('Должен вызвать метод componentBeforeMount', () => {
    const spy = sinon.spy(component as unknown as { componentBeforeMount: () => void }, 'componentBeforeMount');

    component?.eventBus().emit(Component.EVENTS.INIT);
    component?.eventBus().emit(Component.EVENTS.FLOW_CBM);

    expect(spy.calledOnce).to.be.true;
  });

  it('Должен вызвать метод componentDidMount', (done) => {
    const spy = sinon.spy(component as unknown as { componentDidMount: () => void }, 'componentDidMount');

    component?.eventBus().emit(Component.EVENTS.INIT);
    component?.eventBus().emit(Component.EVENTS.FLOW_CDM);

    const timeout = setTimeout(() => {
      expect(spy.calledOnce).to.be.true;
      done();
      clearTimeout(timeout);
    }, 50);
  });

  it('Должен вызвать метод componentWillUnmount', (done) => {
    const spy = sinon.spy(component as unknown as { componentWillUnmount: () => void }, 'componentWillUnmount');

    component?.eventBus().emit(Component.EVENTS.INIT);
    component?.eventBus().emit(Component.EVENTS.FLOW_CWU);

    const timeout = setTimeout(() => {
      expect(spy.calledOnce).to.be.true;
      done();
      clearTimeout(timeout);
    }, 50);
  });

  it('Должен корректно обновить props и вызвать метод componentDidUpdate', () => {
    const spy = sinon.spy(component as unknown as { componentDidUpdate: () => void }, 'componentDidUpdate');

    component?.eventBus().emit(Component.EVENTS.INIT);
    component?.eventBus().emit(Component.EVENTS.FLOW_CDU);

    expect(spy.calledOnce).to.be.true;

    component = new TestComponent({ label: 'Foo bar' });

    expect(component.props.label).to.equal('Foo bar');
  });

  it('Должен корректно добавлять события', () => {
    const click = sinon.spy();

    component = new TestComponent({ label: 'New label', click });

    component?.eventBus().emit(Component.EVENTS.INIT);
    component?.eventBus().emit(Component.EVENTS.FLOW_RENDER);

    component.getElement?.click();
    expect(click.calledOnce).to.be.true;
  });
});
