import { HttpStatus } from '@nestjs/common'

/**
 * 以下是常见的 HTTP 方法及其应该返回的 HTTP 状态码和相应的场景：
 *
 * GET:
 * - 200 OK：请求成功，返回响应主体中的实际数据。
 * - 404 Not Found：请求的资源不存在。
 *
 * POST:
 * - 201 Created：请求成功创建了一个新资源，并返回新创建的资源实例。
 * - 400 Bad Request：请求中缺少必要的参数或包含不合法的参数。
 * - 409 Conflict：请求冲突，例如试图创建一个已经存在的资源。
 *
 * PUT:
 * - 200 OK：请求成功更新了现有资源，并返回更新后的资源表示形式。
 * - 204 No Content：请求成功处理，但没有更新任何内容。
 * - 404 Not Found：请求的资源不存在。
 *
 * PATCH:
 * - 200 OK：请求成功部分更新了现有资源，并返回更新后的资源表示形式。
 * - 204 No Content：请求成功处理，但没有更新任何内容。
 * - 404 Not Found：请求的资源不存在。
 *
 * DELETE:
 * - 204 No Content：请求成功删除了资源。
 * - 404 Not Found：请求的资源不存在。
 */
export abstract class Response {
    static ok<T>(
        data?: T,
        msg = '请求成功'
    ): ResultWithData<T> | ResultNoContent {
        return this.response(data, HttpStatus.OK, msg)
    }

    static created<T>(
        data?: T,
        msg = '资源创建成功'
    ): ResultWithData<T> | ResultNoContent {
        return this.response(data, HttpStatus.CREATED, msg)
    }

    static noContent(): ResultNoContent {
        return this.response(null, HttpStatus.NO_CONTENT)
    }

    static response<T>(
        data: T | null = null,
        status: HttpStatus,
        msg?: string
    ): ResultWithData<T> | ResultNoContent {
        if (!data) {
            return new ResultNoContent(status, msg)
        }
        return new ResultWithData(status, msg, data)
    }
}

export class ResultNoContent {
    public code: number
    public success = false
    public msg: string

    constructor(code: HttpStatus, msg: string) {
        this.code = code
        this.msg = msg
        this.success = code >= 200 && code < 300
    }
}

export class ResultWithData<T> extends ResultNoContent {
    public data: T

    constructor(code: HttpStatus, msg: string, data: T) {
        super(code, msg)
        this.data = data
    }
}
