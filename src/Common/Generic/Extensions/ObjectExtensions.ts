/// <reference path="Interfaces/Object.d.ts" />

export class ObjectExtensions
{
    public static Register()
    {
        //IMPORTANT!!!!
        //the only way to define Object prototype is using the defineProperty

        Object.defineProperty(Object.prototype, "ToArray", {
            value: function ()
            {
                let obj: Object = this;

                let array: Array<any> = [];
                for (let propertyName in obj)
                {
                    array.push(obj[propertyName]);
                }

                return array;
            },
            enumerable: false,
            configurable: true
        });

        Object.defineProperty(Object.prototype, "Is", {
            value: function (item: any)
            {
                let test = arguments.length ? [].slice.call(arguments) : null, self = this.constructor;
                return test ? !!(test.filter(function (a: any) { return a === self; }).length)
                    : (this.constructor.name ||
                        (String(self).match(/^function\s*([^\s(]+)/im)
                            || [0, "ANONYMOUS_CONSTRUCTOR"])[1]);
            }
        });

        Object.defineProperty(Object.prototype, "IsObject", {
            value: function ()
            {
                let obj: Object = this;
                return obj !== null && typeof obj === "object";
            }
        });
    }
}

//Generic.Extensions.ObjectExtensions.Register();