[indent=4]

namespace Entitas

    delegate OnEntityChanged(e : IEntity, index : int, component : IComponent)

    class EntityChanged : Object

        class Listener : Object
            prop event : unowned OnEntityChanged
            construct(event : OnEntityChanged)
                _event = event

        _listeners : list of Listener = new list of Listener

        def add(event : OnEntityChanged)
            _listeners.add(new Listener(event))

        def remove(event : OnEntityChanged)
            for var listener in _listeners
                if listener.event == event
                    _listeners.remove(listener)
                    return

        def clear()
            _listeners = new list of Listener

        def dispatch(e : IEntity, index : int, component : IComponent)
            for var listener in _listeners
                listener.event(e, index, component)

// From https://github.com/darkoverlordofdata/libentitas/blob/master/src/Events/EntityChanged.gs
