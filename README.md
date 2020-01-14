# Reactive properties
Liteweight reaction engine I wrote to get an understanding of getters and setters.

I wanted a better understanding of how Vue works under the hood. So I wrote a lightweight, stripped down version. It was very interesting and taught me a lot about objects and how they work.

Expects to receive an argument with this structure:
        {
            watchVarName: {
                initialValue: YOUR_INITIAL_VALUE, (required)
                setter: ANONYMOUS_CALLBACK_FUNCTION (optional, will be called with the value passed to the setter)
                If there is no setter callback provided, it defaults to assigning the passed value to the var, 
                like normal assignment
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
        If you want a local property to be watched, assign it as var x = watch({x: xValue}); You'll get a pointer to the global.
        
        
## Why I did this
When I started out doing web development, I learned jQuery. I naively thought it was part of Javascript (ouch) and that stunted my growth as a dev for awhile when I realized I needed to relearn what I thought of as Javascript. 

I decided that from that point forward, when I use development tools like frameworks, I would be using them thoughtfully and with a basic understanding at least of what they were doing for me. I think this is important because it helps me use the tools at my disposal in a more effective manner and also helps me understand their limits.

In this case, I built this framework to use in places like this https://web.mississauga.ca/recreation-and-sports/locations/ where I needed a variable change to both update the app and change the url query string. I could have just imported React or Vue but that felt like overkill to me. So I built this and another little module for getting/setting URL query strings (needed IE11 support so I couldn't use the web api).

Now that more and more of the website is becoming reactive, I'm going to switch to using Vue so I can have templating as well (I prefer Vue templates to JSX, althought I don't dislike React). However, I don't consider it time wasted. I now have a better understanding of how reaction engines work and it helped me learn a lot about the Javascript engine.

Anyways, if you have a small project that just needs plain reaction and you don't want a whole framework, feel free to use this. Just import watch into your file and you're good to go.
