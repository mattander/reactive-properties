const watch = function (propsToWatch) {
    /*
        Expects to receive an argument with this structure:
        {
            watchVarName: {
                initialValue: YOUR_INITIAL_VALUE, (required)
                setter: ANONYMOUS_CALLBACK_FUNCTION (optional, will be called with the value passed to the setter)
                If there is no setter callback provided, it defaults to assigning the passed value to the var, like normal assignment
                Also, don't use arrow functions, we need the this property to be available.,
                target: TARGET_NAMESPACE (optional, if you don't provide a target then it will default to the window object)
            },
            watchVar2Name: watchVar2InitialValue (optional),
            ... 
        }
        Each object will be initialized on the targetObj object and attached to a reactive watcher
        Make the object in however you like, spread an array of vars, define it, etc. Key is var name. Value is initial value.
        You can then add functions to its watcher with targetObj.$watchers.YOUR_VAR_NAME.push(FUNCTION_TO_FIRE_ON_CHANGE)
        The function will also check to see if the watcher object has been created yet. If not, it adds it. 
        If you want a local property to be watched, assign it as var x = watch({x: xValue}); You'll get a pointer to the global
    */


    if (!propsToWatch) return; // No args, do nothing.

    const watchedVars = Object.keys(propsToWatch).map(key => {
        const targetObj = propsToWatch[key].target ? propsToWatch[key].target : window;
        if (typeof targetObj.$watchers !== 'object') targetObj.$watchers = {}; // Set up the watcher obj if it doesn't exist

        // Register the data storage variable
        targetObj.$watchers['_' + key] = propsToWatch[key].initialValue;

        // Register the watcher functions array
        targetObj.$watchers[key] = [];

        if (propsToWatch[key].setter) {
            // If a setter cb was provided, define with that
            Object.defineProperty(targetObj, key, {
                get: () => {
                    return targetObj.$watchers['_' + key];
                },
                set: (val) => {
                    // Update the value
                    targetObj.$watchers['_' + key] = propsToWatch[key].setter.call(targetObj.$watchers['_' + key], val);

                    // Call any functions placed on this watcher
                    targetObj.$watchers[key].forEach(callback => {
                        callback.call(targetObj.$watchers['_' + key], val, targetObj, key);
                    });

                    return targetObj.$watchers['_' + key];
                }
            });
        } else {
            // Simple assignment setter
            Object.defineProperty(targetObj, key, {
                get: () => {
                    return targetObj.$watchers['_' + key];
                },
                set: (val) => {
                    // Update the value
                    targetObj.$watchers['_' + key] = val;

                    // Call any functions placed on this watcher
                    targetObj.$watchers[key].forEach(callback => {
                        callback.call(targetObj.$watchers['_' + key], val, targetObj, key);
                    });

                    return targetObj.$watchers['_' + key];
                }
            });
        }
        return targetObj[key];
    });
    return watchedVars;
}

export {
    watch
}
