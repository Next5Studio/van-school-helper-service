import { HttpService } from '@nestjs/axios'
import { Logger } from '@nestjs/common'

abstract class RemoteService {
    protected constructor(
        protected readonly httpService: HttpService,
        protected readonly logger: Logger
    ) {
        this.httpService.axiosRef.interceptors.response.use(
            (response) => {
                return response
            },
            (error) => {
                if (
                    error.response.status >= 400 &&
                    error.response.status < 500
                ) {
                    return Promise.resolve(error.response)
                }
                throw error
            }
        )
    }
}

export { RemoteService }
