/// <reference path='interfaces/array.d.ts' />

export class ArrayExtensions
{
    public static Register()
    {
        Array.prototype.Add = function (item: any): void
        {
            let array: Array<any> = this;
            array.push(item);
        };

        Array.prototype.AddIfNotExists = function (item: any, propertySelector?: (value: any) => void): void
        {
            let array: Array<any> = this;
            if (propertySelector == null)
            {
                if (!array.Contains(item))
                {
                    array.Add(item);
                }
            }
            else
            {
                let object: any = array.filter(i =>
                    propertySelector(i) == propertySelector(item)).FirstOrDefault();
                if (object == null)
                {
                    array.Add(item);
                }
            }
        };

        Array.prototype.AddIfNotNull = function (item: any): void
        {
            let array: Array<any> = this;
            if (item != null)
            {
                array.Add(item);
            }
        };

        Array.prototype.AddRange = function (items: Array<any>): void
        {
            let array: Array<any> = this;
            for (let item of items)
            {
                array.Add(item);
            }
        };

        Array.prototype.Any = function (): boolean
        {
            let array: Array<any> = this;
            return (array != null && array.length > 0);
        };

        Array.prototype.AreEquals = function (arrayToCompare: Array<any>): boolean
        {
            let array: Array<any> = this;
            if (array.length !== arrayToCompare.length)
            {
                return false;
            }
            for (let i = array.length; i--;)
            {
                if (array[i] !== arrayToCompare[i])
                {
                    return false;
                }
            }

            return true;
        };

        Array.prototype.Clear = function ()
        {
            let array: Array<any> = this;
            return array.length = 0;
        };

        Array.prototype.Contains = function (item: any): boolean
        {
            return this.indexOf(item) >= 0;
        };

        Array.prototype.Count = function (): number
        {
            let array: Array<any> = this;
            return array.length;
        };

        Array.prototype.FirstOrDefault = function (): any
        {
            let array: Array<any> = this;
            return (array.length > 0) ? array[0] : null;
        };

        Array.prototype.GetValueByKey = function (key: string): any
        {
            let array: Array<{ Key: string, Value: number }> = this;
            let arrayValue = null;
            let arr = array.Where(x => x.Key == key).FirstOrDefault();

            if (arr != null)
            {
                arrayValue = arr.Value;
            }

            return arrayValue;
        };

        Array.prototype.Insert = function (item: any, index: number): any
        {
            let array: Array<any> = this;
            array.splice(index, 0, item);
        };

        Array.prototype.InsertRange = function (items: Array<any>, index: number): any
        {
            let array: Array<any> = this;
            let indexToInsert: number = index;
            for (let item of items)
            {
                array.Insert(item, indexToInsert);
                indexToInsert++;
            }
        };

        Array.prototype.LastOrDefault = function (): any
        {
            let array: Array<any> = this;
            let lastItem: any = null;

            if (array.length > 0)
            {
                let lastItemIndex: number = array.length - 1;
                lastItem = array[lastItemIndex];
            }

            return lastItem;
        };

        Array.prototype.OrderByAscending = function (propertySelector?: (value: any) => void): Array<any>
        {
            let array: Array<any> = this;
            let sortedArray: Array<any> = array.ToArray().sort((a, b) =>
            {
                let aValue: any = propertySelector != null ? propertySelector(a) : a;
                let bValue: any = propertySelector != null ? propertySelector(b) : b;
                let comparisonResult: number = aValue < bValue
                    ? -1
                    : (aValue > bValue ? 1 : 0);
                return comparisonResult;
            });
            return sortedArray;
        };

        Array.prototype.OrderByDescending = function (propertySelector?: (value: any) => void): Array<any>
        {
            let array: Array<any> = this;
            let sortedArray: Array<any> = array.ToArray().sort((a, b) =>
            {
                let aValue: any = propertySelector != null ? propertySelector(a) : a;
                let bValue: any = propertySelector != null ? propertySelector(b) : b;
                let comparisonResult: number = aValue < bValue
                    ? 1
                    : (aValue > bValue ? -1 : 0);
                return comparisonResult;
            });
            return sortedArray;
        };

        Array.prototype.Remove = function (item: any, propertySelector?: (value: any) => void): boolean
        {
            let array: Array<any> = this;

            if (propertySelector != null)
            {
                let object: any = array.filter(i =>
                    propertySelector(i) == propertySelector(item)).FirstOrDefault();
                item = object;
            }

            let index: number = array.indexOf(item);
            let removedItems: Array<any> = new Array();

            if (index != undefined && index >= 0)
            {
                removedItems = array.splice(index, 1);
            }

            return removedItems.length > 0;
        };

        Array.prototype.RemoveFirst = function (): any
        {
            let array: Array<any> = this;
            return array.shift();
        };

        Array.prototype.RemoveLast = function (): any
        {
            let array: Array<any> = this;
            return array.pop();
        };

        Array.prototype.RemoveRange = function (items: Array<any>): boolean
        {
            let array: Array<any> = this;
            let nrOfItemsRemoved: number = 0;

            for (let item of items)
            {
                let wasRemoved = array.Remove(item);

                if (wasRemoved)
                {
                    nrOfItemsRemoved++;
                }
            }

            return nrOfItemsRemoved > 0;
        };

        Array.prototype.RemoveWhere = function (predicate: (value: any) => boolean): boolean
        {
            let array: Array<any> = this;
            let itemsToRemove: Array<any> = array.Where(predicate);
            return array.RemoveRange(itemsToRemove);
        };

        Array.prototype.Select = function (expression: (value: any) => void): Array<any>
        {
            let array: Array<any> = this;
            return array.map(expression);
        };

        Array.prototype.Sum = function (): number
        {
            let array: Array<number> = this;
            let sumValue: number = array.Any()
                ? array.reduce((previousValue, currentValue) => previousValue + currentValue)
                : 0;
            return sumValue;
        };

        Array.prototype.ToArray = function (): Array<any>
        {
            let array: Array<any> = this;
            return array.slice();
        };

        Array.prototype.Where = function (predicate: (value: any) => boolean): Array<any>
        {
            let array: Array<any> = this;
            return array.filter(predicate);
        };
    }
}
