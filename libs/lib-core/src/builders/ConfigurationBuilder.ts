import * as fs from 'fs'
import * as path from 'path'

interface IConfigurationProvider {
    load(): Promise<void>

    get(key: string): any
}

class FileConfigurationProvider implements IConfigurationProvider {
    private config: { [key: string]: string }

    constructor(private filePath: string) {
        this.config = {}
    }

    public async load() {
        const fileContent = await fs.promises.readFile(this.filePath, 'utf-8')
        const jsonContent = JSON.parse(fileContent)
        this.config = { ...this.config, ...jsonContent }
    }

    public get(key: string) {
        return this.config[key]
    }
}

class ConfigurationBuilder {
    private providers: Array<IConfigurationProvider>

    constructor() {
        this.providers = []
    }

    public addJsonFile(filePath: string) {
        const provider = new FileConfigurationProvider(filePath)
        this.providers.push(provider)
        return this
    }

    public async build() {
        let config: { [key: string]: any } = {}
        const promises = this.providers.map((provider) => provider.load())
        await Promise.all(promises)
        for (const provider of this.providers) {
            config = {
                ...config,
                ...(provider as any).config
            }
        }
        return config
    }
}

export {
    ConfigurationBuilder,
    FileConfigurationProvider,
    IConfigurationProvider
}
