import { Plugin } from "rollup";

interface AliasMap { [key: string]: string }
interface AliasEntry { find: string | RegExp, replacement: string }

interface AliasOptions {
    entries: AliasMap | AliasEntry[]
}

export function alias(options: AliasOptions): Plugin {
    const entries = normalizeEntries(options.entries)

    return {
		name: "alias",
        // key就是一个hooks
        resolveId(
            source: string,
            importer: string | undefined,
            options: {
                attributes: Record<string, string>;
                custom?: { [plugin: string]: any };
                isEntry: boolean;
            }
        ) {
			// console.log('alias - resolveId ->', source,  importer)
            // 1. 看是不是有对应的匹配 alias match
            const entry = entries.find(e => {
                return e.match(source)
            })

            if (!entry) return source

            return entry.replace(source)
		},
    };
}

/**
 * 将数组和对象两种形式的参数normalize
 * @param entries 
 * @returns 
 */
function normalizeEntries(entries: AliasOptions["entries"]) {
    if (Array.isArray(entries)) {
        return entries.map(({ find, replacement }) => {
            return new Entry(find, replacement)
        })
    } else {
        return Object.keys(entries).map(key => {
            return new Entry(key, entries[key])
        })
    }
}


class Entry {
    constructor(private find: string | RegExp, private replacement: string) {}

    match(filePath: string) {
        if (typeof this.find === 'string') {
            return filePath.startsWith(this.find)
        } else {
            // find为正则表达式的话
            return this.find.test(filePath)
        }
    }

    replace(filePath: string) {
        // TODO: 文件名后缀，别的后缀.vue .json等，rollup有个函数自动加后缀
        return filePath.replace(this.find, this.replacement) + '.js'
    }
}