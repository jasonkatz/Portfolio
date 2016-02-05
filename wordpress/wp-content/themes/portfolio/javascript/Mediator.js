module.exports = {

    modules: {}
    , getModules: function() {
        return this.modules;
    } // getModules
    , register: function register(moduleName, module) {
        var modules = this.modules;
        try {
            if (typeof modules[moduleName] !== "undefined") {
                throw "Cannot create duplicate module " + moduleName;
            }
        } catch (error) {
            console.log(error);
            return;
        }

        modules[moduleName] = module;
    } // register
    , registerMultiple: function registerMultiple(modulesHash) {
        for (var module in modulesHash) {
            register(module, modulesHash[module]);
        }
    } // registerMultiple
    , deregister: function deregister(moduleName, module) {
        var modules = this.modules;

        if (typeof modules[moduleName] === "undefined") {
            return;
        }

        delete modules[moduleName];
    } // deregister
    , send: function send(message, data, to) {
        var modules = this.modules;

        // If destination is specified sent to there
        // but if not, broadcast to all modules
        if (typeof to !== "undefined") {
            modules[to].receive(message, data);
        } else {
            for (var module in modules) {
                var current = modules[module];
                if (typeof current !== "undefined" && typeof current.receive !== "undefined") {
                    current.receive(message, data);
                }
            }
        }
    } // send

};
