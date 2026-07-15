# Alchemy Aether Engine API

> Public JavaScript API for the Aether Experience Engine.

---

# Runtime

## Aether.start()

Starts the Aether runtime.

### Returns

None

### Example

```javascript
Aether.start();
```

---

## Aether.stop()

Stops the runtime.

```javascript
Aether.stop();
```

---

## Aether.pause()

Pauses the runtime.

```javascript
Aether.pause();
```

---

## Aether.resume()

Resumes the runtime.

```javascript
Aether.resume();
```

---

## Aether.getState()

Returns the current runtime state.

```javascript
const state = Aether.getState();
```

Example:

```json
{
    "started": true,
    "paused": false
}
```

---

# Event Dispatcher

## Aether.Events.on()

Register an event listener.

```javascript
Aether.Events.on("runtime:start", function (state) {
    console.log(state);
});
```

---

## Aether.Events.emit()

Emit an event.

```javascript
Aether.Events.emit("hello", {
    message: "Hello World"
});
```

---

## Aether.Events.off()

Remove an event listener.

---

## Aether.Events.once()

Register a listener that runs once.

---

# Module Registry

## Aether.Modules.register()

Registers a runtime module.

```javascript
Aether.Modules.register(MyModule);
```

---

## Aether.Modules.get()

Returns a module by name.

```javascript
const audio = Aether.Modules.get("audio");
```

---

## Aether.Modules.list()

Returns all registered modules.

---

## Aether.Modules.count()

Returns the total number of modules.